"use client";

export default function VerificationBadge({
  status,
}: {
  status?: "verified" | "unverified";
}) {
  const isOk = status === "verified";
  return (
    <span
      className={[
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs",
        isOk ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800",
      ].join(" ")}
      title={isOk ? "증빙 검토 완료" : "증빙 미검토"}
    >
      {isOk ? "검증됨" : "미검증"}
    </span>
  );
}
