// app/mypage/page.tsx
import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function MyPage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/login");
  }

  // 로그인한 유저의 정보와 관련된 데이터(등록 매물, 채팅 기록)를 모두 불러옵니다.
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      listings: {
        orderBy: { createdAt: "desc" }
      },
      threads: {
        include: { listing: true },
        orderBy: { createdAt: "desc" }
      },
      // 💡 이 부분이 추가되어야 합니다!
      favorites: { 
        include: { listing: true }, // 찜한 매물의 상세 정보도 같이 가져옴
        orderBy: { createdAt: "desc" }
      }
    }
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* 상단 프로필 요약 */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              반갑습니다, <span className="text-blue-600">{user.name || "고객"}</span>님!
            </h1>
            <p className="text-gray-500">{user.email}</p>
          </div>
          <Link href="/listing/new">
            <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition">
              새 매물 등록하기
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 좌측 (등록 매물 & 관심 매물) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 내가 등록한 매물 섹션 */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                🏠 내가 등록한 매물 <span className="text-blue-600">{user.listings.length}</span>
              </h2>
              {user.listings.length === 0 ? (
                <div className="py-10 text-center text-gray-500 bg-gray-50 rounded-xl">
                  등록한 매물이 없습니다.
                </div>
              ) : (
                <div className="space-y-3">
                  {user.listings.map((listing) => (
                    <Link key={listing.id} href={`/listing/${listing.id}`} className="block">
                      <div className="border p-4 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition flex justify-between items-center group">
                        <div>
                          <div className="font-bold text-gray-900 group-hover:text-blue-700 transition">
                            {listing.title}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {listing.address_area} · {(listing.goodwill_price! / 10000).toLocaleString()}만원
                          </div>
                        </div>
                        <div className="text-gray-400 group-hover:text-blue-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </section>

            {/* 관심 매물 (UI 플레이스홀더) */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                ❤️ 관심 매물 (찜) <span className="text-red-500">{user.favorites?.length || 0}</span>
              </h2>
              {!user.favorites || user.favorites.length === 0 ? (
                <div className="py-10 text-center text-gray-500 bg-gray-50 rounded-xl">
                  아직 찜한 매물이 없습니다.
                </div>
              ) : (
                <div className="space-y-3">
                  {user.favorites.map((fav) => (
                    <Link key={fav.id} href={`/listing/${fav.listing.id}`} className="block">
                      <div className="border p-4 rounded-xl hover:border-red-300 hover:bg-red-50 transition flex justify-between items-center group">
                        <div>
                          <div className="font-bold text-gray-900 group-hover:text-red-700 transition">
                            {fav.listing.title}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {fav.listing.address_area} · {(fav.listing.goodwill_price! / 10000).toLocaleString()}만원
                          </div>
                        </div>
                        <div className="text-red-300 group-hover:text-red-500 transition">
                           <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </section>

          </div>

          {/* 우측 (채팅 문의 내역) */}
          <div className="lg:col-span-1">
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                💬 나의 문의 내역 <span className="text-blue-600">{user.threads.length}</span>
              </h2>
              {user.threads.length === 0 ? (
                <div className="py-8 text-center text-gray-500 bg-gray-50 rounded-xl">
                  진행 중인 대화가 없습니다.
                </div>
              ) : (
                <div className="space-y-3">
                  {user.threads.map((thread) => (
                    <Link key={thread.id} href={`/chat/${thread.id}`} className="block">
                      <div className="p-3 border rounded-xl hover:border-blue-400 transition">
                        <div className="text-xs font-semibold text-blue-600 mb-1 bg-blue-50 inline-block px-2 py-0.5 rounded">
                          {thread.type === "listing" ? "매물 문의" : "상담"}
                        </div>
                        <div className="font-medium text-gray-800 line-clamp-1">
                          {thread.title || thread.listing?.title || "채팅방"}
                        </div>
                        <div className="text-xs text-gray-400 mt-2">
                          {new Date(thread.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}