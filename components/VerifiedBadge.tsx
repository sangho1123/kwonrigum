// components/VerifiedBadge.tsx (Server OK)
export default function VerifiedBadge({ verified }: { verified: boolean }) {
    return (
      <span className={
        verified
          ? "inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200"
          : "inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-neutral-50 text-neutral-600 border border-neutral-200"
      }>
        {verified ? "Verified" : "Unverified"}
      </span>
    );
  }
  