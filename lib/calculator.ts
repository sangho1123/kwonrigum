// 업종별 평균 순수익률 (가정)
const MARGIN_RATES: Record<string, number> = {
    cafe: 0.25,      // 카페 (25%)
    restaurant: 0.20,// 식당 (20%)
    retail: 0.15,    // 소매점 (15%)
    pub: 0.25,       // 주점 (25%)
    beauty: 0.30,    // 미용/뷰티 (30%)
    gym: 0.35,       // 헬스/운동 (35%)
    other: 0.20,     // 기타
  };
  
  interface CalculatorInputs {
    monthlyRevenue: number; // 월 매출 (만원)
    monthlyRent: number;    // 월세 (만원)
    deposit: number;        // 보증금 (만원) - 바닥권리금 추산용
    area: number;           // 평수
    sector: string;         // 업종
    facilityAge: number;    // 시설 연차 (년) - 감가상각용
  }
  
  export function calculatePremium(inputs: CalculatorInputs) {
    const { monthlyRevenue, monthlyRent, deposit, sector, facilityAge, area } = inputs;
    const marginRate = MARGIN_RATES[sector] || 0.20;
  
    // 1. 영업권리금 (예상 월 순수익 * 10개월)
    // 순수익 = (매출 * 마진율) - 월세
    const monthlyProfit = (monthlyRevenue * marginRate) - monthlyRent;
    const businessPremium = Math.max(0, monthlyProfit * 10);
  
    // 2. 바닥권리금 (보증금의 10% + 평당 30만원 기본 가정)
    // *실제로는 유동인구가 중요하지만 여기선 보증금을 척도로 사용
    const locationPremium = (deposit * 0.1) + (area * 30);
  
    // 3. 시설권리금 (평당 150만원 투자 가정, 매년 20% 감가상각)
    const initialFacilityCost = area * 150;
    const depreciationFactor = Math.max(0.2, 1 - (facilityAge * 0.2)); // 최소 20%는 남김
    const facilityPremium = initialFacilityCost * depreciationFactor;
  
    // 총 권리금 합계
    const total = businessPremium + locationPremium + facilityPremium;
  
    // 범위 제공 (±15%)
    return {
      min: Math.round((total * 0.85) / 100) * 100, // 백만원 단위 반올림
      max: Math.round((total * 1.15) / 100) * 100,
      details: {
        business: Math.round(businessPremium),
        location: Math.round(locationPremium),
        facility: Math.round(facilityPremium),
      }
    };
  }