// lib/mockAnalysis.ts

export type AnalysisData = {
  region: string;
  category: string;
  floatingPopulation: number;
  topAgeGroup: string;
  peakTime: string;
  avgRevenue: number;
  competitionCount: number;
  trend: "상승세" | "보합세" | "하락세";
  weekdaysRatio: number;
  weekendRatio: number;
  lat: number; // 추가됨
  lng: number; // 추가됨
};

export function getMockAnalysisData(address: string, category: string): AnalysisData {
  let data: AnalysisData = {
    region: address || "지역 미상",
    category: category || "일반업종",
    floatingPopulation: 12500,
    topAgeGroup: "30대",
    peakTime: "12:00 ~ 14:00",
    avgRevenue: 3500,
    competitionCount: 15,
    trend: "보합세",
    weekdaysRatio: 60,
    weekendRatio: 40,
    lat: 37.5665, // 기본값 (서울시청)
    lng: 126.9780,
  };

  if (address.includes("역삼동")) {
    data = { ...data, lat: 37.4979, lng: 127.0276, floatingPopulation: 85000, topAgeGroup: "30대 직장인", peakTime: "11:30 ~ 13:30", avgRevenue: 8500, competitionCount: 42, trend: "상승세", weekdaysRatio: 85, weekendRatio: 15 };
  } else if (address.includes("서교동") || address.includes("홍대")) {
    data = { ...data, lat: 37.5565, lng: 126.9239, floatingPopulation: 62000, topAgeGroup: "20대 대학생", peakTime: "18:00 ~ 22:00", avgRevenue: 5200, competitionCount: 55, trend: "상승세", weekdaysRatio: 40, weekendRatio: 60 };
  } else if (address.includes("한남동")) {
    data = { ...data, lat: 37.5344, lng: 127.0022, floatingPopulation: 25000, topAgeGroup: "30-40대", peakTime: "13:00 ~ 16:00", avgRevenue: 6800, competitionCount: 18, trend: "상승세", weekdaysRatio: 50, weekendRatio: 50 };
  } else if (address.includes("성수동")) {
    data = { ...data, lat: 37.5446, lng: 127.0560, floatingPopulation: 58000, topAgeGroup: "20-30대", peakTime: "12:00 ~ 18:00", avgRevenue: 6500, competitionCount: 38, trend: "상승세", weekdaysRatio: 45, weekendRatio: 55 };
  } else if (address.includes("이태원동")) {
    data = { ...data, lat: 37.5358, lng: 126.9899, floatingPopulation: 35000, topAgeGroup: "20-30대, 외국인", peakTime: "20:00 ~ 02:00", avgRevenue: 5000, competitionCount: 25, trend: "보합세", weekdaysRatio: 30, weekendRatio: 70 };
  } else if (address.includes("여의도동")) {
    data = { ...data, lat: 37.5216, lng: 126.9242, floatingPopulation: 95000, topAgeGroup: "40대 직장인", peakTime: "11:30 ~ 13:00", avgRevenue: 7500, competitionCount: 48, trend: "보합세", weekdaysRatio: 90, weekendRatio: 10 };
  } else if (address.includes("송파동")) {
    data = { ...data, lat: 37.5070, lng: 127.1064, floatingPopulation: 42000, topAgeGroup: "20-30대 여성", peakTime: "14:00 ~ 18:00", avgRevenue: 4800, competitionCount: 32, trend: "상승세", weekdaysRatio: 40, weekendRatio: 60 };
  } else if (address.includes("신사동")) {
    data = { ...data, lat: 37.5208, lng: 127.0227, floatingPopulation: 45000, topAgeGroup: "20-30대", peakTime: "18:00 ~ 21:00", avgRevenue: 8200, competitionCount: 28, trend: "보합세", weekdaysRatio: 55, weekendRatio: 45 };
  } else if (address.includes("익선동")) {
    data = { ...data, lat: 37.5744, lng: 126.9898, floatingPopulation: 38000, topAgeGroup: "20대, 관광객", peakTime: "13:00 ~ 19:00", avgRevenue: 4500, competitionCount: 22, trend: "하락세", weekdaysRatio: 35, weekendRatio: 65 };
  } else if (address.includes("가회동") || address.includes("북촌")) {
    data = { ...data, lat: 37.5829, lng: 126.9835, floatingPopulation: 28000, topAgeGroup: "30-50대", peakTime: "11:00 ~ 15:00", avgRevenue: 3200, competitionCount: 12, trend: "보합세", weekdaysRatio: 40, weekendRatio: 60 };
  }

  return data;
}