"use client";

import { useEffect, useRef } from "react";

interface Props {
  lat: number;
  lng: number;
  realStores?: any[];
  popMap?: Record<string, number>;
  onAreaClick?: (name: string, code: string, pop: number) => void;
}

const isPointInPolygon = (point: number[], coords: any[], type: string) => {
  const rayCast = (pt: number[], polygon: any[]) => {
    let inside = false;
    let x = pt[0], y = pt[1];
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      let xi = polygon[i][0], yi = polygon[i][1];
      let xj = polygon[j][0], yj = polygon[j][1];
      let intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  };
  if (type === 'Polygon') return rayCast(point, coords[0]);
  if (type === 'MultiPolygon') {
    for (let poly of coords) {
      if (rayCast(point, poly[0])) return true;
    }
  }
  return false;
};

export default function AnalysisMap({ lat, lng, realStores = [], popMap = {}, onAreaClick }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current || !window.naver) return;

    const latNum = Number(lat);
    const lngNum = Number(lng);
    if (isNaN(latNum) || isNaN(lngNum)) return;

    const center = new window.naver.maps.LatLng(latNum, lngNum);
    const map = new window.naver.maps.Map(mapRef.current, {
      center: center,
      zoom: 15,
      zoomControl: true,
    });

    // 매물 마커
    new window.naver.maps.Marker({
      position: center,
      map: map,
      icon: {
        content: `<div style="padding: 6px 12px; background: #EF4444; color: white; border-radius: 8px; font-weight: bold; font-size: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.3); border: 2px solid white;">📍 분석 위치</div>`,
        anchor: new window.naver.maps.Point(40, 15),
      }
    });

    // 상가 점포 마커 (노란 점)
    if (realStores && realStores.length > 0) {
      realStores.forEach((store) => {
        if (store.lat && store.lon) {
          new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(store.lat, store.lon),
            map: map,
            icon: {
              content: `<div style="width: 8px; height: 8px; background: #F59E0B; border-radius: 50%; border: 1px solid white; opacity: 0.9;"></div>`,
              anchor: new window.naver.maps.Point(4, 4),
            }
          });
        }
      });
    }

    // 폴리곤 로드 및 색칠
    fetch('/data/seoul_commercial_areas.geojson')
      .then(res => res.json())
      .then(geojson => {
        map.data.addGeoJson(geojson);

        map.data.setStyle((feature: any) => {
          // 💡 핵심 수정: 타입을 String으로 강제 변환하여 매칭 확률 100% 보장
          const areaCode = String(feature.getProperty('TRDAR_CD'));
          const pop = popMap[areaCode] || 0;

          // 데이터가 있으면 빨강~파랑, 없으면 회색
          let color = '#9CA3AF'; // 데이터 없음 (회색)
          if (pop >= 1000000) color = '#DC2626'; // 초밀집 (빨강)
          else if (pop >= 500000) color = '#EA580C'; // 밀집 (주황)
          else if (pop >= 200000) color = '#F59E0B'; // 보통 (노랑)
          else if (pop > 0) color = '#3B82F6'; // 여유 (파랑)

          return {
            fillColor: color,
            fillOpacity: pop > 0 ? 0.35 : 0.1, // 데이터 있으면 진하게
            strokeColor: color,
            strokeWeight: pop > 0 ? 2 : 1,
            strokeOpacity: 0.8,
            clickable: true,
          };
        });

        // 자동 탐색 로직
        const pt = [lngNum, latNum];
        let found = false;
        
        geojson.features.forEach((feature: any) => {
          if (isPointInPolygon(pt, feature.geometry.coordinates, feature.geometry.type)) {
            found = true;
            if (onAreaClick) {
              const name = feature.properties.TRDAR_CD_N || feature.properties.TRDAR_NM;
              const code = String(feature.properties.TRDAR_CD); // 여기도 String 변환
              const pop = popMap[code] || 0;
              onAreaClick(name, code, pop);
            }
          }
        });

        if (!found) {
          console.warn("해당 좌표가 서울시 상권 폴리곤 내부에 있지 않습니다.");
        }

        // 클릭 이벤트
        map.data.addListener('click', (e: any) => {
          const name = e.feature.getProperty('TRDAR_CD_N') || e.feature.getProperty('TRDAR_NM');
          const code = String(e.feature.getProperty('TRDAR_CD'));
          const pop = popMap[code] || 0;
          
          if (onAreaClick) onAreaClick(name, code, pop);
        });
      })
      .catch(err => console.error("GeoJSON Load Fail:", err));

  }, [lat, lng, realStores, popMap]); // 의존성 배열

  return <div ref={mapRef} className="w-full h-full bg-gray-100 rounded-xl" />;
}