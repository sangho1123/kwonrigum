// lib/store.ts

// ---- Proof demo store ----
export type Proof = {
  id: string;
  listingId: number;
  filename?: string;
  uploadedAt: number;
};

export const proofs: Proof[] = [];

// 검증상태(인메모리)
const proofStatusByListing = new Map<number, "verified" | "unverified">();

export function setProofStatus(
  listingId: number,
  status: "verified" | "unverified"
) {
  proofStatusByListing.set(listingId, status);
}

export function getProofStatus(listingId: number) {
  return proofStatusByListing.get(listingId);
}
