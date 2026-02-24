// components/ListingMap.tsx
"use client";

import type { Listing } from "@/lib/mockData";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    naver: any;
    navermap_authFailure?: () => void;
  }
}

// ✅ Web JS v3: openapi + ncpClientId (동작 확인된 방식)
const NAVER_CLIENT_ID =
  process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID ?? "hdlzlfn5o0";

export default function ListingMap({
  items,
  selectedId,
  onSelect,
}: {
  items: Listing[];
  selectedId?: number | null;
  onSelect?: (id: number) => void;
}) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapObj = useRef<any>(null);
  const markersRef = useRef<Record<number, any>>({});
  const [loaded, setLoaded] = useState(false);
  const [authFailed, setAuthFailed] = useState(false);

  // 인증 실패 콜백
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.navermap_authFailure = function () {
      console.error("[NAVER MAP] Authentication Failed");
      setAuthFailed(true);
    };
  }, []);

  // SDK 로드
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.naver?.maps) {
      setLoaded(true);
      return;
    }
    const id = "naver-map-sdk";
    let s = document.getElementById(id) as HTMLScriptElement | null;
    const src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NAVER_CLIENT_ID}&_=${Date.now()}`;
    if (!s) {
      s = document.createElement("script");
      s.id = id;
      s.async = true;
      s.defer = true;
      document.head.appendChild(s);
    }
    s.src = src;
    s.onload = () => {
      console.log("[NAVER MAP] SDK loaded", { ncpClientId: NAVER_CLIENT_ID });
      setLoaded(true);
    };
    s.onerror = () => console.error("[NAVER MAP] SDK load error");
  }, []);

  // 지도/마커
  useEffect(() => {
    if (!loaded || !mapRef.current || !window.naver?.maps || authFailed) return;
    const { naver } = window;

    const first = items[0];
    const center = first
      ? new naver.maps.LatLng(first.lat, first.lng)
      : new naver.maps.LatLng(37.5665, 126.9780);
    const map = new naver.maps.Map(mapRef.current, {
      center,
      zoom: 13,
      zoomControl: true,
      zoomControlOptions: { position: naver.maps.Position.TOP_RIGHT },
    });
    mapObj.current = map;

    // 기존 마커 제거
    Object.values(markersRef.current).forEach((m) => m.setMap(null));
    markersRef.current = {};

    // 마커 생성
    const bounds = new naver.maps.LatLngBounds();
    items.forEach((it) => {
      const pos = new naver.maps.LatLng(it.lat, it.lng);
      bounds.extend(pos);

      const marker = new naver.maps.Marker({
        map,
        position: pos,
      });
      markersRef.current[it.id] = marker;

      naver.maps.Event.addListener(marker, "click", () => {
        onSelect?.(it.id);
        map.panTo(pos);
      });
    });

    if (items.length > 1) {
      map.fitBounds(bounds, { top: 20, left: 20, right: 20, bottom: 20 });
    }
  }, [loaded, authFailed, items, onSelect]);

  // 선택된 마커로 포커스
  useEffect(() => {
    if (!selectedId || !mapObj.current || !window.naver?.maps) return;
    const marker = markersRef.current[selectedId];
    if (!marker) return;
    const pos = marker.getPosition();
    mapObj.current.panTo(pos);
    try {
      marker.setAnimation(window.naver.maps.Animation.BOUNCE);
      setTimeout(() => marker.setAnimation(null), 700);
    } catch {}
  }, [selectedId]);

  return (
    <div className="relative w-full h-64 rounded-2xl border border-neutral-200 overflow-hidden">
      <div ref={mapRef} className="w-full h-full" />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center text-sm">
          지도를 불러오는 중…
        </div>
      )}
      {authFailed && (
        <div className="absolute inset-0 bg-white/85 backdrop-blur flex items-center justify-center p-4 text-xs">
          <div className="text-center">
            <div className="text-red-600 font-semibold mb-1">
              네이버 지도 인증 실패
            </div>
            <div className="text-neutral-700">
              Web 서비스 URL / ncpClientId 설정을 확인하세요.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
