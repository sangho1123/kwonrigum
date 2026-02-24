// lib/mockData.ts

export type Listing = {
  id: number;
  title: string;
  category: string;      // 업종
  gu: string;            // 구
  dong: string;          // 동
  address_area: string;  // 표시용
  lat: number;
  lng: number;

  rent_monthly?: number;     // 월세
  deposit?: number;          // 임대보증금
  goodwill_price?: number;   // 권리금
  monthly_sales?: number;    // 월매출
  parking_spaces?: number;   // 주차 가능 대수

  photos?: string[];         // 상세/목록 사진 (public 기준 경로)
  verification_status?: "verified" | "unverified";
};

export const listings: Listing[] = [
  {
    id: 45,
    title: "논현동 소형 카페",
    category: "카페/디저트",
    gu: "강남구",
    dong: "논현동",
    address_area: "강남구 논현동",
    lat: 37.512345,
    lng: 127.032198,
    rent_monthly: 3_800_000,
    deposit: 30_000_000,
    goodwill_price: 50_000_000,
    monthly_sales: 35_000_000,
    parking_spaces: 1,
    photos: ["/photos/coffee.jpg"],
    verification_status: "unverified",
  },
  {
    id: 47,
    title: "봉천동 치킨 전문",
    category: "치킨",
    gu: "관악구",
    dong: "봉천동",
    address_area: "관악구 봉천동",
    lat: 37.485555,
    lng: 126.955,
    rent_monthly: 2_500_000,
    deposit: 20_000_000,
    goodwill_price: 0,
    monthly_sales: 28_000_000,
    parking_spaces: 0,
    photos: ["/photos/chicken.jpg"],
    verification_status: "unverified",
  },
];
