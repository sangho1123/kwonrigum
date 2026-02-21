// lib/partners.ts

export type PartnerType = "broker" | "lender" | "fitout" | "closure";

export type Partner = {
  id: string;
  name: string;
  type: PartnerType;
  areas?: string[];       // ["강남구", "관악구"] 등
  categories?: string[];  // ["카페/디저트", "치킨"] 등
  webhookUrl: string;     // 우리 서버의 수신 데모 엔드포인트로 연결
};

// 데모 파트너 레지스트리
export const partners: Partner[] = [
  {
    id: "lend-001",
    name: "샘플 대출 제휴사",
    type: "lender",
    areas: ["강남구", "관악구"],
    webhookUrl: "/api/partners/webhook",
  },
  {
    id: "fit-001",
    name: "샘플 인테리어 제휴사",
    type: "fitout",
    areas: ["강남구", "관악구"],
    webhookUrl: "/api/partners/webhook",
  },
  {
    id: "close-001",
    name: "샘플 폐업정리 제휴사",
    type: "closure",
    webhookUrl: "/api/partners/webhook",
  },
];
