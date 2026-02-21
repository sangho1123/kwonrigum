// app/analysis/page.tsx
"use client";

import AnalysisMap from "@/components/AnalysisMap"; // 👈 기존 지도 컴포넌트 불러오기
import { AnalysisData, getMockAnalysisData } from "@/lib/mockAnalysis";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AnalysisPage() {
  const searchParams = useSearchParams();
  const address = searchParams.get("address") || "서울 강남구 역삼동";
  const category = searchParams.get("category") || "카페/디저트";

  const [data, setData] = useState<AnalysisData | null>(null);

  useEffect(() => {
    const result = getMockAnalysisData(address, category);
    setData(result);
  }, [address, category]);

  if (!data) return <div className="min-h-screen flex items-center justify-center">분석 데이터를 불러오는 중...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* 헤더 */}
        <div className="mb-8">
          <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold mb-3">
            AI 상권 분석 리포트
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            <span className="text-indigo-600">[{data.region}]</span> 주변 <br/>
            {data.category} 업종 분석 결과입니다.
          </h1>
        </div>

        {/* 핵심 지표 4개 격자 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium mb-1">일평균 유동인구</p>
            <p className="text-2xl font-bold text-gray-900">{data.floatingPopulation.toLocaleString()}명</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium mb-1">동종업계 평균 월매출</p>
            <p className="text-2xl font-bold text-blue-600">{data.avgRevenue.toLocaleString()}만원</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium mb-1">주요 소비 연령층</p>
            <p className="text-2xl font-bold text-gray-900">{data.topAgeGroup}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 font-medium mb-1">반경 500m 내 경쟁점포</p>
            <p className="text-2xl font-bold text-red-500">{data.competitionCount}개</p>
          </div>
        </div>

        {/* 🗺️ 상권 지도 (밴다이어그램) 영역 추가 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            🗺️ 상권 반경 및 배후 수요 분석
          </h2>
          <div className="w-full h-[400px] rounded-xl overflow-hidden border border-gray-200">
            {/* 기존 AnalysisMap 컴포넌트에 필요한 props(위도, 경도 등)를 전달합니다 */}
            <AnalysisMap lat={data.lat} lng={data.lng} /> 
          </div>
          <p className="text-sm text-gray-500 mt-3 text-right">* 반경 내 원형 표시는 유동인구 및 핵심 상권을 나타냅니다.</p>
        </div>

        {/* 하단 차트 영역 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 차트 영역 1: 시간대/요일별 특징 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
              ⏱️ 소비 패턴 분석
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">가장 붐비는 시간대</span>
                  <span className="font-bold text-indigo-600">{data.peakTime}</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-3/4 rounded-full"></div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600 mb-4">평일 vs 주말 매출 비중</p>
                <div className="flex h-8 rounded-lg overflow-hidden text-xs font-bold text-white text-center leading-8 shadow-inner">
                  <div style={{ width: `${data.weekdaysRatio}%` }} className="bg-blue-500 transition-all">
                    평일 {data.weekdaysRatio}%
                  </div>
                  <div style={{ width: `${data.weekendRatio}%` }} className="bg-orange-400 transition-all">
                    주말 {data.weekendRatio}%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 차트 영역 2: 종합 평가 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
                📈 상권 종합 트렌드
              </h2>
              <p className="text-gray-500 text-sm mb-6">최근 6개월 간의 상권 활성도를 분석했습니다.</p>
              
              <div className="flex items-center justify-center p-8 bg-gray-50 rounded-xl mb-4">
                <div className="text-center">
                  <div className={`text-4xl font-black mb-2 ${
                    data.trend === "상승세" ? "text-red-500" : data.trend === "보합세" ? "text-green-500" : "text-blue-500"
                  }`}>
                    {data.trend === "상승세" ? "🔥 상승세" : data.trend === "보합세" ? "✨ 안정적 보합세" : "❄️ 하락세 주의"}
                  </div>
                  <p className="text-sm text-gray-600">
                    {data.trend === "상승세" && "유동인구와 평균 매출이 꾸준히 증가하고 있는 핫플레이스입니다."}
                    {data.trend === "보합세" && "매출 변동폭이 적어 안정적인 매장 운영이 가능한 상권입니다."}
                    {data.trend === "하락세" && "최근 상권 활성도가 다소 감소하고 있어 신중한 접근이 필요합니다."}
                  </p>
                </div>
              </div>
            </div>

            <button onClick={() => history.back()} className="w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition">
              매물 상세로 돌아가기
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}