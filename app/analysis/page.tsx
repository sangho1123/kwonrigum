"use client";

import AnalysisMap from "@/components/AnalysisMap";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

// 업종 매칭 테이블
const CATEGORY_MAP: { [key: string]: string } = {
  "카페/디저트": "I212", "카페": "I212", "디저트": "I212", "커피전문점": "I212",
  "한식": "I201", "중식": "I202", "일식/수산물": "I203", "분식": "I207",
  "치킨": "I205", "양식": "I204", "패스트푸드": "I206", "주점": "I211",
  "주점/바": "I211", "호프/맥주": "I211", "고기요리": "I201", "일반음식점": "I2",
};

function AnalysisContent() {
  const searchParams = useSearchParams();
  
  const address = searchParams.get("address") || "선택된 위치";
  const category = searchParams.get("category") || "카페";
  const lat = searchParams.get("lat") || "37.4979";
  const lng = searchParams.get("lng") || "127.0276";

  const [isLoading, setIsLoading] = useState(true);
  
  // 1. 공공데이터 상가 정보
  const [realStores, setRealStores] = useState<any[]>([]);
  
  // 💡 2. 서울시 "전체" 상권 유동인구 맵 (지도 색칠용)
  const [popMap, setPopMap] = useState<Record<string, number>>({});
  
  // 3. 지도에서 자동 탐색되거나 클릭된 "현재 매물" 상권 정보
  const [selectedArea, setSelectedArea] = useState<{ name: string; code: string; pop: number } | null>(null);

  // 🚀 최초 1회 로드 시 상가 리스트와 서울시 "전체 데이터"를 동시에 가져옵니다.
  useEffect(() => {
    async function fetchInitialData() {
      setIsLoading(true);
      try {
        // 1. 반경 내 동종 업계 상가 데이터 호출
        const categoryCode = CATEGORY_MAP[category] || "";
        const storeRes = await fetch(`/api/analysis?lat=${lat}&lng=${lng}&radius=300&indsMclsCd=${categoryCode}`);
        const storeJson = await storeRes.json();
        setRealStores(storeJson.stores || []);

        // 💡 2. 서울시 전체 유동인구 데이터(1,671개) 호출하여 popMap에 캐싱
        const popRes = await fetch(`/api/seoul-data`);
        const popJson = await popRes.json();
        
        if (popJson.popMap) {
          setPopMap(popJson.popMap);
        }
      } catch (error) {
        console.error("데이터 초기 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchInitialData();
  }, [lat, lng, category]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center font-bold text-indigo-600">상권 정밀 분석 데이터를 불러오는 중입니다...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4">
        
        <div className="mb-8">
          <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold mb-3">
            📍 서울시 공식 상권 정밀 분석 리포트
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
            <span className="text-indigo-600">[{address}]</span> <br/>
            {selectedArea ? `${selectedArea.name} 분석 결과` : '반경 300m 분석 결과'}
          </h1>
        </div>

        {/* 핵심 통계 지표 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
            <p className="text-sm text-gray-500 font-bold mb-2">분기별 총 유동인구</p>
            <p className="text-3xl font-black text-indigo-600">
              {/* 💡 selectedArea의 숫자를 즉시 보여줍니다 */}
              {selectedArea?.pop ? `${selectedArea.pop.toLocaleString()}명` : "해당 없음(일반주거지)"}
            </p>
            <p className="text-[10px] text-gray-400 mt-2">서울 열린데이터광장 (골목상권 기준)</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-bold mb-2">매물 소속 상권 여부</p>
            <p className="text-xl font-bold">
              {/* 💡 매물이 주요 상권 안인지 밖인지 표시 */}
              {selectedArea ? '주요 상권 내 위치' : '일반 주거지 및 이면도로'}
            </p>
            <p className="text-sm text-orange-500 font-bold mt-1">
              {selectedArea ? '유동인구 분석 가능' : '인접 상권 데이터 참고 요망'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-bold mb-2">인근 경쟁 업체</p>
            <p className="text-3xl font-black text-red-500">{realStores.length}개</p>
            <p className="text-[10px] text-gray-400 mt-2">{category} 업종 기준</p>
          </div>
        </div>

        {/* 지도 영역 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-lg font-bold">🗺️ 상권 입지 시각화 및 밀집도 히트맵</h2>
          </div>
          <div className="w-full h-[450px] rounded-xl overflow-hidden border border-gray-200">
            {/* 💡 AnalysisMap에 전체 데이터(popMap)를 넘겨주어 색칠하게 만듭니다 */}
            <AnalysisMap 
              lat={Number(lat)} 
              lng={Number(lng)} 
              realStores={realStores} 
              popMap={popMap} 
              onAreaClick={(name, code, pop) => setSelectedArea({ name, code, pop })} 
            />
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-4">🧐 분석 코멘트</h2>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 mb-6">
            <p className="text-gray-700 text-sm leading-relaxed">
              지도의 상권 영역을 클릭하시면 서울시 공식 유동인구가 실시간으로 갱신됩니다. 
              해당 매물 주변으로 <b>{realStores.length}개</b>의 동종 업체가 확인되며,
              {realStores.length > 5 ? " 주변 경쟁이 치열하므로 차별화된 전략이 필요합니다." : " 동종 업계 경쟁이 적어 선점 효과를 기대할 수 있습니다."}
            </p>
          </div>
          <button onClick={() => window.history.back()} className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all">
            매물 상세 정보로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}

// 🌟 [중요] Next.js 페이지의 기본 내보내기
export default function AnalysisPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold text-indigo-600">페이지 로딩 중...</div>}>
      <AnalysisContent />
    </Suspense>
  );
}