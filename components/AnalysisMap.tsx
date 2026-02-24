"use client";

import { useEffect, useRef } from "react";

interface Props {
  lat: number;
  lng: number;
  realStores?: any[];
  popMap?: Record<string, number>; // 백엔드에서 받은 1,671개 유동인구 데이터
  onAreaClick?: (name: string, code: string, pop: number) => void;
}

// 💡 매물 좌표가 어떤 다각형(상권) 안에 있는지 검사하는 수학 알고리즘 (Ray-casting)
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
    // popMap(전체 데이터)이 로드되지 않았다면 아직 지도를 그리지 않음
    if (!mapRef.current || !window.naver || Object.keys(popMap).length === 0) return;

    const map = new window.naver.maps.Map(mapRef.current, {
      center: new window.naver.maps.LatLng(lat, lng),
      zoom: 15,
    });

    // 매물 위치 마커
    new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(lat, lng),
      map: map,
      icon: {
        content: `<div style="padding: 6px 12px; background: #EF4444; color: white; border-radius: 8px; font-weight: bold; font-size: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.3); border: 2px solid white;">📍 매물 위치</div>`,
        anchor: new window.naver.maps.Point(40, 15),
      }
    });

    // 경쟁 업체 마커
    if (realStores.length > 0) {
      realStores.forEach((store) => {
        if (store.lat && store.lon) {
          new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(store.lat, store.lon),
            map: map,
            icon: {
              content: `<div style="width: 14px; height: 14px; background: #F59E0B; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"></div>`,
              anchor: new window.naver.maps.Point(7, 7),
            }
          });
        }
      });
    }

    // GeoJSON 로드 및 처리
    fetch('/data/seoul_commercial_areas.geojson')
      .then(res => res.json())
      .then(geojson => {
        map.data.addGeoJson(geojson);

        // 💡 1. 데이터 기반 스타일링 (Data-Driven Styling) - 유동인구 수에 따라 색칠
        map.data.setStyle((feature: any) => {
          const areaCode = feature.getProperty('TRDAR_CD');
          const pop = popMap[areaCode] || 0;

          // 유동인구 구간별 색상 설정 (히트맵 효과)
          let color = '#3B82F6'; // 파란색 (여유, 50만 미만)
          if (pop >= 1500000) color = '#E11D48'; // 짙은 빨강 (초밀집, 150만 이상)
          else if (pop >= 1000000) color = '#EF4444'; // 빨강 (밀집, 100만 이상)
          else if (pop >= 500000) color = '#F59E0B'; // 주황 (보통, 50만 이상)

          return {
            fillColor: color,
            fillOpacity: 0.35, // 색상이 보이도록 투명도 조절
            strokeColor: color,
            strokeWeight: 1,
            strokeOpacity: 0.8,
          };
        });

        // 마우스 오버/아웃 효과
        map.data.addListener('mouseover', (e: any) => map.data.overrideStyle(e.feature, { fillOpacity: 0.7, strokeWeight: 3 }));
        map.data.addListener('mouseout', (e: any) => map.data.revertStyle(e.feature));

        // 💡 2. 매물이 속한 상권 자동 찾기 로직
        const pt = [lng, lat]; // GeoJSON은 [경도, 위도] 순서 사용
        let targetFeature: any = null;

        geojson.features.forEach((feature: any) => {
          const coords = feature.geometry.coordinates;
          const type = feature.geometry.type;
          // 광선 투사 알고리즘으로 매물이 이 다각형 안에 있는지 검사
          if (isPointInPolygon(pt, coords, type)) {
            targetFeature = feature;
          }
        });

        // 매물이 특정 상권 안에 있다면 즉시 부모 컴포넌트로 데이터 전송 (초기화면 세팅)
        if (targetFeature && onAreaClick) {
          const areaName = targetFeature.properties.TRDAR_CD_N || targetFeature.properties.TRDAR_NM;
          const areaCode = targetFeature.properties.TRDAR_CD;
          const areaPop = popMap[areaCode] || 0;
          onAreaClick(areaName, areaCode, areaPop);
        }

        // 💡 3. 클릭 이벤트 (사용자가 다른 영역을 클릭할 때)
        const infoWindow = new window.naver.maps.InfoWindow({
          backgroundColor: "transparent", borderWidth: 0, disableAnchor: true, pixelOffset: new window.naver.maps.Point(0, -15),
        });

        map.data.addListener('click', (e: any) => {
          const areaName = e.feature.getProperty('TRDAR_CD_N') || e.feature.getProperty('TRDAR_NM');
          const areaCode = e.feature.getProperty('TRDAR_CD');
          const areaPop = popMap[areaCode] || 0;
          
          if (onAreaClick) onAreaClick(areaName, areaCode, areaPop);
          
          infoWindow.setContent(`
            <div style="padding: 10px 15px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); border: 1px solid #e5e7eb;">
              <p style="font-weight: 900; color: #111827; margin: 0; font-size: 14px;">🏘️ ${areaName}</p>
              <p style="font-size: 11px; color: #EF4444; margin: 4px 0 0 0; font-weight: bold;">유동인구: ${areaPop.toLocaleString()}명</p>
            </div>
          `);
          infoWindow.setPosition(e.coord);
          infoWindow.open(map);
        });

      })
      .catch(err => console.error("GeoJSON 로드 실패:", err));

  // popMap 객체가 변경될 때마다 지도를 다시 그립니다.
  }, [lat, lng, realStores, popMap, onAreaClick]); 

  return <div ref={mapRef} className="w-full h-full bg-gray-100" />;
}