export type ProofStatus = "unverified" | "verified";

export interface Listing {
  id: number;
  title: string;
  category: string;
  address_area: string;
  address_full: string;
  lat?: number | null;   // ← 옵션/널 허용
  lng?: number | null;   // ← 옵션/널 허용
  area_pyeong?: number;
  rent_monthly?: number;
  rent_mgmt_fee?: number;
  deposit?: number;
  goodwill_price?: number;
  goodwill_negotiable?: boolean;
  takeover_date?: string;
  description?: string;
  proof_status: ProofStatus;
  status: "active" | "hidden" | "closed";
  created_at: string;
  financials?: {
    monthly_revenue_avg_3m?: number;
    pos_used?: boolean;
    revenue_verified?: boolean;
  };
  media?: Array<{
    file_url: string;
    file_type: "photo" | "contract" | "pos_capture" | "etc";
    is_public: boolean;
  }>;
  thumbnail_url?: string;
}

export interface LeadPayload {
  listing_id?: number;
  lead_type: "loan" | "goodwill_eval" | "transfer_service";
  name: string;
  phone_or_contact: string;
  memo?: string;
}
