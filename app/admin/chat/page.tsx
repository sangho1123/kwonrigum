// app/admin/chat/page.tsx
"use client";

import Link from "next/link";
import useSWR from "swr";

type Row = {
  id: string;
  type: "listing" | "loan" | "fitout" | string;
  listingId: number | null;
  title: string | null;
  createdAt: string;
  lastAt: string | null;
  lastText: string | null;
  messageCount: number;
  unreadAdmin: boolean;
  unreadUser: boolean;
};

const fetcher = (url: string) =>
  fetch(url, { cache: "no-store" }).then((r) => r.json());

function timeago(iso?: string | null) {
  if (!iso) return "-";
  const d = new Date(iso).getTime();
  const diff = Date.now() - d;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "방금";
  if (m < 60) return `${m}분`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}시간`;
  const dday = Math.floor(h / 24);
  return `${dday}일`;
}

export default function AdminChatList() {
  const { data, isLoading } = useSWR<{ ok: boolean; items: Row[] }>(
    "/api/chat/threads",
    fetcher,
    { refreshInterval: 3000 }
  );

  const rows = data?.items ?? [];

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-lg font-semibold mb-4">채팅(관리자)</h1>

      <div className="rounded-2xl border overflow-hidden bg-white">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-neutral-600">
            <tr>
              <th className="text-left px-3 py-2 w-12">상태</th>
              <th className="text-left px-3 py-2">제목</th>
              <th className="text-left px-3 py-2 w-28">유형</th>
              <th className="text-left px-3 py-2 w-24">매물ID</th>
              <th className="text-left px-3 py-2 w-40">최근</th>
              <th className="text-right px-3 py-2 w-24">메시지</th>
              <th className="px-3 py-2 w-24">열기</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-3 py-6 text-center text-neutral-500">
                  목록을 불러오는 중…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-3 py-6 text-center text-neutral-500">
                  대화가 없습니다.
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr
                  key={r.id}
                  className="border-t hover:bg-neutral-50 transition-colors"
                >
                  <td className="px-3 py-2">
                    {r.unreadAdmin ? (
                      <span className="inline-flex w-2.5 h-2.5 rounded-full bg-sky-500" title="안읽음" />
                    ) : (
                      <span className="inline-flex w-2.5 h-2.5 rounded-full bg-neutral-300" title="읽음" />
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <div className="font-medium">
                      {r.title ?? "(제목 없음)"}
                    </div>
                    <div className="text-xs text-neutral-500 line-clamp-1">
                      {r.lastText ?? "-"}
                    </div>
                  </td>
                  <td className="px-3 py-2">{r.type}</td>
                  <td className="px-3 py-2">{r.listingId ?? "-"}</td>
                  <td className="px-3 py-2">
                    {r.lastAt ? `${timeago(r.lastAt)} 전` : "-"}
                  </td>
                  <td className="px-3 py-2 text-right">{r.messageCount}</td>
                  <td className="px-3 py-2 text-center">
                    <Link
                      href={`/chat/${r.id}?role=admin`}
                      className="rounded-lg border px-3 py-1.5 hover:bg-neutral-100"
                      title="채팅 열기"
                    >
                      열기
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
