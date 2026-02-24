"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    naver: any;
  }
}

type Props = {
  lat: number;
  lng: number;
  zoom?: number;
  height?: number;
  markerTitle?: string;
};

export default function NaverMap({
  lat,
  lng,
  zoom = 16,
  height = 360,
  markerTitle,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const clientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID;

  // 환경변수가 없으면 서버에서 OSM 백업을 그리므로 여기선 아무것도 렌더하지 않음
  if (!clientId) return null;

  useEffect(() => {
    if (!ready || !ref.current || !window.naver?.maps) return;
    const center = new window.naver.maps.LatLng(lat, lng);
    const map = new window.naver.maps.Map(ref.current, { center, zoom });
    new window.naver.maps.Marker({ position: center, map, title: markerTitle });
  }, [ready, lat, lng, zoom, markerTitle]);

  return (
    <>
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`}
        strategy="afterInteractive"
        onLoad={() => setReady(true)}
      />
      <div
        ref={ref}
        style={{ width: "100%", height }}
        className="rounded-xl border"
      />
    </>
  );
}
