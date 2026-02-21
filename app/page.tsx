import ListingCard from "@/components/ListingCard";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

// 데이터가 항상 최신이도록 설정 (캐시 끄기)
export const dynamic = "force-dynamic"; 

export default async function Home() {
  // DB에서 최신 매물 8개 가져오기
  const listings = await prisma.listing.findMany({
    orderBy: { createdAt: "desc" },
    take: 8,
  });

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* 히어로 섹션 */}
      <section className="bg-blue-600 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            성공적인 창업의 시작, 권리금 마켓
          </h1>
          <p className="text-xl opacity-90 mb-8">
            검증된 매물과 투명한 권리금 거래를 경험해보세요.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/listing" className="bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
              매물 구경하기
            </Link>
            <Link href="/listing/new" className="bg-blue-700 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-800 transition-colors">
              내 가게 내놓기
            </Link>
          </div>
        </div>
      </section>

      {/* 추천 매물 섹션 */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">🔥 최신 등록 매물</h2>
            <p className="text-gray-500 mt-1">방금 올라온 따끈따끈한 매물들을 확인하세요.</p>
          </div>
          <Link href="/listing" className="text-blue-600 font-medium hover:underline">
            전체보기 &rarr;
          </Link>
        </div>

        {listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {listings.map((item) => (
              <ListingCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-gray-500">등록된 매물이 없습니다.</p>
          </div>
        )}
      </section>
      
      {/* 서비스 소개 섹션 */}
      <section className="bg-white py-12 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">권리금 시세 조회</h3>
              <p className="text-gray-600">빅데이터 분석으로 우리 가게 적정 권리금을 확인하세요.</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-xl font-bold mb-2">안전한 계약 지원</h3>
              <p className="text-gray-600">표준 계약서 제공 및 법률 자문 서비스로 안전하게 거래하세요.</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-2">1:1 채팅 상담</h3>
              <p className="text-gray-600">매도인과 매수인이 직접 소통하며 조율할 수 있습니다.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}