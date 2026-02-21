export function formatCurrencyKRW(amount?: number): string {
    if (amount == null) return "-";
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0
    }).format(amount);
  }
  
  export function shortProofBadge(proof_status: "verified" | "unverified") {
    return proof_status === "verified"
      ? "증빙확인됨 ✅"
      : "증빙없음";
  }
  