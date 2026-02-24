"use client";

import { calculatePremium } from "@/lib/calculator";
import { useState } from "react";
import Button from "./ui/Button"; // 기존 Button 컴포넌트 활용

const SECTORS = [
  { value: "cafe", label: "카페/디저트" },
  { value: "restaurant", label: "식당/음식점" },
  { value: "pub", label: "주점/호프" },
  { value: "retail", label: "판매업/소매" },
  { value: "beauty", label: "미용/뷰티" },
  { value: "gym", label: "운동/헬스" },
  { value: "other", label: "기타" },
];

export default function PremiumCalculator() {
  const [formData, setFormData] = useState({
    monthlyRevenue: "",
    monthlyRent: "",
    deposit: "",
    area: "",
    sector: "cafe",
    facilityAge: "2",
  });

  const [result, setResult] = useState<{ min: number; max: number } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCalculate = () => {
    // 입력값 검증
    if (!formData.monthlyRevenue || !formData.monthlyRent || !formData.area) {
      alert("주요 정보를 모두 입력해주세요.");
      return;
    }

    const calculated = calculatePremium({
      monthlyRevenue: Number(formData.monthlyRevenue),
      monthlyRent: Number(formData.monthlyRent),
      deposit: Number(formData.deposit),
      area: Number(formData.area),
      sector: formData.sector,
      facilityAge: Number(formData.facilityAge),
    });

    setResult(calculated);
  };

  return (
    <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        🤖 AI 권리금 계산기
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">업종</label>
          <select
            name="sector"
            value={formData.sector}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            {SECTORS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">월 평균 매출 (만원)</label>
            <input
              type="number"
              name="monthlyRevenue"
              placeholder="예: 3000"
              value={formData.monthlyRevenue}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">월세 (만원)</label>
            <input
              type="number"
              name="monthlyRent"
              placeholder="예: 250"
              value={formData.monthlyRent}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">보증금 (만원)</label>
            <input
              type="number"
              name="deposit"
              placeholder="예: 5000"
              value={formData.deposit}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">매장 평수 (평)</label>
            <input
              type="number"
              name="area"
              placeholder="예: 20"
              value={formData.area}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">시설 사용 기간 (년)</label>
            <input
              type="number"
              name="facilityAge"
              placeholder="예: 2"
              value={formData.facilityAge}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            <p className="text-xs text-gray-400 mt-1">*시설 감가상각 계산에 사용됩니다.</p>
        </div>

        <div className="pt-4">
          <Button onClick={handleCalculate} className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 text-white">
            적정 권리금 조회하기
          </Button>
        </div>
      </div>

      {result && (
        <div className="mt-8 p-5 bg-blue-50 rounded-lg border border-blue-100 animate-fadeIn">
          <p className="text-center text-gray-600 mb-2">분석 결과 예상 적정가는</p>
          <div className="text-center">
            <span className="text-3xl font-extrabold text-blue-700">
              {result.min.toLocaleString()} ~ {result.max.toLocaleString()}
            </span>
            <span className="text-xl text-gray-700 ml-1">만원</span>
          </div>
          <p className="text-center text-xs text-gray-400 mt-3">
            * 이 결과는 추정치이며 실제 거래가는 상권과 협의에 따라 달라질 수 있습니다.
          </p>
        </div>
      )}
    </div>
  );
}