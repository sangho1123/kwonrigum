// app/listing/mine/page.tsx
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const fmt = (n?: number | null) =>
  n == null ? "-" : new Intl.NumberFormat("ko-KR").format(n);

export default async function MyListingsPage() {
  const session = await auth();
  const meId = (session?.user as any)?.id as string | undefined;

  // 로그인 안 되어 있으면 로그인 페이지로 보냄
  if (!meId) {
    redirect("/login");
  }

  // 내가 올린 매물만 조회
  const rows = await prisma.listing.findMany({
    where: { ownerId: meId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      address_area: true,
      deposit: true,
      rent_monthly: true,
      goodwill_price: true,
      createdAt: true,
    },
  });

  // --- 리드 개수 집계 (Prisma Lead 테이블 기준) ---
  const listingIds = rows.map((x) => x.id);

  let leadCountByListing: Record<number, number> = {};

  if (listingIds.length > 0) {
    const leads = await prisma.lead.findMany({
      where: {
        listingId: { in: listingIds },
      },
      select: {
        listingId: true,
      },
    });

    for (const l of leads) {
      if (l.listingId == null) continue;
      leadCountByListing[l.listingId] =
        (leadCountByListing[l.listingId] ?? 0) + 1;
    }
  }

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-4">
      <header className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-semibold">내 매물</h1>
          <p className="text-sm text-neutral-600">
            현재 로그인한 계정으로 등록한 매물 목록입니다.
          </p>
        </div>
        <Link
          href="/listing/new"
          className="rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-sm px-3 py-1.5"
        >
          새 매물 등록
        </Link>
      </header>

      {rows.length === 0 ? (
        <div className="rounded-lg border bg-white p-4 text-sm text-neutral-600">
          아직 등록된 매물이 없습니다.{" "}
          <Link href="/listing/new" className="underline">
            첫 매물을 등록해 보세요.
          </Link>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden bg-white">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-3 py-2 text-left w-16">ID</th>
                <th className="px-3 py-2 text-left">제목</th>
                <th className="px-3 py-2 text-left w-40">지역</th>
                <th className="px-3 py-2 text-right w-32">보증금</th>
                <th className="px-3 py-2 text-right w-32">월세</th>
                <th className="px-3 py-2 text-right w-32">권리금</th>
                <th className="px-3 py-2 text-right w-24">리드</th>
                <th className="px-3 py-2 text-left w-40">등록일</th>
                <th className="px-3 py-2 text-left w-24"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((x) => {
                const leadCount = leadCountByListing[x.id] ?? 0;
                return (
                  <tr key={x.id} className="border-t">
                    <td className="px-3 py-2 align-top">{x.id}</td>
                    <td className="px-3 py-2 align-top">
                      <Link
                        href={`/listing/${x.id}`}
                        className="underline underline-offset-2 hover:text-sky-700"
                      >
                        {x.title || "(제목 없음)"}
                      </Link>
                    </td>
                    <td className="px-3 py-2 align-top text-neutral-700">
                      {x.address_area || "-"}
                    </td>
                    <td className="px-3 py-2 align-top text-right">
                      {fmt(x.deposit)}
                    </td>
                    <td className="px-3 py-2 align-top text-right">
                      {fmt(x.rent_monthly)}
                    </td>
                    <td className="px-3 py-2 align-top text-right">
                      {fmt(x.goodwill_price)}
                    </td>
                    <td className="px-3 py-2 align-top text-right">
                      {leadCount > 0 ? (
                        // 🔥 여기만 Link → a 로 바꿔서 무조건 네비게이션 되게
                        <a
                          href={`/listing/${x.id}/leads`}
                          className="inline-flex items-center justify-center min-w-[2rem] rounded-full bg-sky-50 text-sky-700 border border-sky-100 px-2 py-0.5 text-xs hover:bg-sky-100"
                        >
                          {leadCount}
                        </a>
                      ) : (
                        <span className="text-neutral-400">0</span>
                      )}
                    </td>
                    <td className="px-3 py-2 align-top text-neutral-600">
                      {new Date(x.createdAt).toLocaleDateString("ko-KR")}
                    </td>
                    <td className="px-3 py-2 align-top">
                      <Link
                        href={`/listing/${x.id}/edit`}
                        className="text-xs rounded border px-2 py-1 hover:bg-neutral-50"
                      >
                        수정
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
