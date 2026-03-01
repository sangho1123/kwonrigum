"use client";

import { useEffect, useRef } from "react";

interface ListingMapProps {
  lat?: number | string | null;
  lng?: number | string | null;
}

export default function ListingMap({ lat, lng }: ListingMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 💡 데이터가 없으면 지도 생성을 아예 중단하여 에러(reading '0')를 방지
    if (!mapRef.current || !window.naver || !lat || !lng) return;

    const latNum = Number(lat);
    const lngNum = Number(lng);

    // 숫자가 아니면 중단
    if (isNaN(latNum) || isNaN(lngNum)) return;

    const center = new window.naver.maps.LatLng(latNum, lngNum);
    
    const map = new window.naver.maps.Map(mapRef.current, {
      center: center,
      zoom: 16,
    });

    new window.naver.maps.Marker({
      position: center,
      map: map,
    });
  }, [lat, lng]);

  return <div ref={mapRef} className="w-full h-full bg-gray-100 rounded-xl" />;
}