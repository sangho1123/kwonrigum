"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    naver: any;
  }
}

// 🔥 lat, lng props 추가 및 선택적(optional)으로 변경
interface AnalysisMapProps {
  showPopulation?: boolean;
  showCompetitors?: boolean;
  lat?: number;
  lng?: number;
}

export default function AnalysisMap({ 
  showPopulation = true, 
  showCompetitors = true,
  lat = 37.498095, // 기본값 강남역
  lng = 127.027610 
}: AnalysisMapProps) {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const overlaysRef = useRef<any[]>([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const initMap = () => {
    if (!mapElement.current || !window.naver || !window.naver.maps) return;
    if (mapRef.current) return;

    const location = new window.naver.maps.LatLng(lat, lng);
    const mapOptions = {
      center: location,
      zoom: 15,
      zoomControl: true,
    };

    mapRef.current = new window.naver.maps.Map(mapElement.current, mapOptions);
    setIsMapLoaded(true);
  };

  const updateOverlays = () => {
    if (!mapRef.current || !window.naver) return;

    // 기존 오버레이(원, 마커) 삭제
    overlaysRef.current.forEach((overlay) => overlay.setMap(null));
    overlaysRef.current = [];

    // 💡 핵심: 넘어온 lat, lng(해당 매물의 위치)를 중심으로 가상 데이터 동적 생성
    const DYNAMIC_POPULATION = [
      { lat: lat + 0.001, lng: lng + 0.001, intensity: 90 },
      { lat: lat - 0.001, lng: lng - 0.001, intensity: 80 },
      { lat: lat + 0.002, lng: lng - 0.001, intensity: 60 },
      { lat: lat - 0.001, lng: lng + 0.002, intensity: 40 },
      { lat: lat, lng: lng, intensity: 100 }, // 정중앙
      { lat: lat + 0.003, lng: lng + 0.003, intensity: 30 },
      { lat: lat - 0.002, lng: lng - 0.002, intensity: 50 },
    ];

    const DYNAMIC_COMPETITORS = [
      { id: 1, name: "경쟁점포 A", lat: lat + 0.0005, lng: lng + 0.0005 },
      { id: 2, name: "경쟁점포 B", lat: lat - 0.0015, lng: lng - 0.0015 },
      { id: 3, name: "경쟁점포 C", lat: lat + 0.0025, lng: lng - 0.0005 },
      { id: 4, name: "경쟁점포 D", lat: lat - 0.0005, lng: lng + 0.0025 },
    ];

    // 유동인구 히트맵 렌더링
    if (showPopulation) {
      DYNAMIC_POPULATION.forEach((data) => {
        const color = data.intensity > 80 ? "#FF0000" : data.intensity > 50 ? "#FFA500" : "#00FF00";
        const circle = new window.naver.maps.Circle({
          map: mapRef.current,
          center: new window.naver.maps.LatLng(data.lat, data.lng),
          radius: 150,
          fillColor: color,
          fillOpacity: 0.4,
          strokeColor: color,
          strokeOpacity: 0.8,
          strokeWeight: 1,
        });
        overlaysRef.current.push(circle);
      });
    }

    // 경쟁 업체 마커 렌더링
    if (showCompetitors) {
      DYNAMIC_COMPETITORS.forEach((store) => {
        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(store.lat, store.lng),
          map: mapRef.current,
          title: store.name,
          icon: {
            content: `<div style="padding:5px; background:white; border:1px solid #333; border-radius:5px; font-size:12px; font-weight:bold; box-shadow: 2px 2px 5px rgba(0,0,0,0.2);">☕ ${store.name}</div>`,
            anchor: new window.naver.maps.Point(10, 10),
          },
        });
        overlaysRef.current.push(marker);
      });
    }
  };

  useEffect(() => {
    if (window.naver && window.naver.maps) {
      initMap();
    }
  }, []);

  useEffect(() => {
    if (isMapLoaded && mapRef.current) {
      // 매물 위치(lat, lng)가 바뀌면 지도 중심을 이동시키고 오버레이를 다시 그림
      mapRef.current.setCenter(new window.naver.maps.LatLng(lat, lng));
      updateOverlays();
    }
  }, [isMapLoaded, showPopulation, showCompetitors, lat, lng]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
        onReady={initMap}
      />
      <div ref={mapElement} className="w-full h-full rounded-lg shadow-inner" />
    </>
  );
}