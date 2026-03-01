"use client";

import AnalysisMap from "@/components/AnalysisMap";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function AnalysisContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const address = searchParams.get("address") || "위치 정보 없음";
  const category = searchParams.get("category") || "기타";
  const lat = parseFloat(searchParams.get("lat") || "37.4979");
  const lng = parseFloat(searchParams.get("lng") || "127.0276");

  const [realStores, setRealStores] = useState<any[]>([]);
  const [popMap, setPopMap] = useState<Record<string, number>>({});
  const [selectedArea, setSelectedArea] = useState<{ name: string; code: string; pop: number } | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [storeRes, popRes] = await Promise.all([
          fetch(`/api/analysis?lat=${lat}&lng=${lng}&radius=300`),
          fetch(`/api/seoul-data`)
        ]);
        const storeJson = await storeRes.json();
        const popJson = await popRes.json();
        setRealStores(storeJson.stores || []);
        if (popJson.popMap) setPopMap(popJson.popMap);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      }
    }
    loadData();
  }, [lat, lng]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* ✅ [살려낸 상단 영역] 매물 주소 및 분석 요약 */}
        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold mb-2">
            📍 상권 분석 리포트
          </span>
          <h1 className="text-2xl font-bold text-gray-900">
            {selectedArea ? `${selectedArea.name} 상권` : address} 분석 결과
          </h1>
        </div>

        {/* ✅ [살려낸 상단 요약 카드] 유동인구, 경쟁사 정보 등 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-xs mb-1">유동인구 (분기)</p>
            <p className="text-2xl font-bold text-indigo-600">
              {selectedArea?.pop ? selectedArea.pop.toLocaleString() : "-"}명
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-xs mb-1">경쟁 점포 수</p>
            <p className="text-2xl font-bold text-gray-800">{realStores.length}개</p>
            <p className="text-xs text-gray-400 mt-1">반경 300m 이내</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-xs mb-1">상권 등급</p>
            <p className="text-2xl font-bold text-gray-800">
              {selectedArea ? "활성 상권" : "일반 주거지"}
            </p>
          </div>
        </div>

        {/* 지도 영역 */}
        <div className="bg-white p-2 rounded-2xl border border-gray-200 shadow-sm h-[450px] mb-10">
          <AnalysisMap 
            lat={lat} lng={lng} 
            realStores={realStores} popMap={popMap} 
            onAreaClick={(name, code, pop) => setSelectedArea({ name, code, pop })} 
          />
        </div>

        {/* 📸 [대표님 시안 디자인] 하단 분석 카드 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
          
          {/* 소비 패턴 분석 카드 */}
          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xl">⏱️</span>
              <h2 className="text-xl font-bold text-gray-800">소비 패턴 분석</h2>
            </div>
            
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-indigo-100 text-indigo-600 text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-tighter">상권 분석</span>
                <span className="text-sm font-bold text-gray-700">{selectedArea?.name || address} 상권 분석 결과</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">가장 붐비는 시간대</span>
                <span className="text-sm font-bold text-indigo-600">12:00 ~ 18:00</span>
              </div>
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="w-[75%] h-full bg-indigo-500 rounded-full" />
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-bold text-gray-700">평일 vs 주말 매출 비중</p>
              <div className="flex h-14 rounded-2xl overflow-hidden text-white font-bold text-sm">
                <div className="w-[45%] bg-blue-500 flex items-center justify-center">평일 45%</div>
                <div className="w-[55%] bg-orange-500 flex items-center justify-center">주말 55%</div>
              </div>
            </div>
          </div>

          {/* 상권 종합 트렌드 카드 */}
          <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">📊</span>
                <h2 className="text-xl font-bold text-gray-800">상권 종합 트렌드</h2>
              </div>
              <p className="text-sm text-gray-400 mb-10">최근 6개월 간의 상권 활성도를 분석했습니다.</p>
              
              <div className="bg-gray-50 rounded-[24px] py-10 px-6 text-center mb-8">
                <div className="flex justify-center items-center gap-2 mb-3">
                  <span className="text-4xl">🔥</span>
                  <span className="text-4xl font-black text-red-500">상승세</span>
                </div>
                <p className="text-gray-500 leading-relaxed font-semibold">
                  유동인구와 평균 매출이 꾸준히 증가하고 있는<br />핫플레이스입니다.
                </p>
              </div>
            </div>

            <button 
              onClick={() => router.back()}
              className="w-full py-5 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition text-lg"
            >
              매물 상세로 돌아가기
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function AnalysisPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">데이터를 통합 분석 중입니다...</div>}>
      <AnalysisContent />
    </Suspense>
  );
}