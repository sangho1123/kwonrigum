import CompareBar from "@/components/CompareBar";
import FilterBar from "@/components/FilterBar";
import ListingCard from "@/components/ListingCard";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function ListingPage({
  searchParams,
}: {
  searchParams: Promise<{ sector?: string; maxPrice?: string }>;
}) {
  const { sector, maxPrice } = await searchParams;

  // DB 쿼리 조건 설정
  const where: any = {};
  if (sector) {
    where.sector = sector;
  }
  if (maxPrice) {
    where.goodwill_price = {
      lte: parseInt(maxPrice), // 선택한 금액 이하(Less Than or Equal)
    };
  }

  const listings = await prisma.listing.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <FilterBar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {sector ? `${sector} 매물` : "전체 매물"} ({listings.length})
          </h2>
        </div>

        {listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.map((item) => (
              <ListingCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border">
            <p className="text-gray-500">조건에 맞는 매물이 없습니다.</p>
          </div>
        )}
      </div>
      <CompareBar />
    </main>
  );
}