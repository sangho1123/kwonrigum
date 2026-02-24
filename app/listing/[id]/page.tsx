// app/listing/[id]/page.tsx
"use client";

import ListingMap from "@/components/ListingMap";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

const formatMoney = (amount: number | null | undefined) => {
  if (amount === null || amount === undefined) return "정보 없음";
  return `${(amount / 10000).toLocaleString()}만원`;
};

const Badge = ({ label, color }: { label: string, color: string }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800 mr-2 mb-2`}>
    <svg className="mr-1.5 h-2 w-2 text-current" fill="currentColor" viewBox="0 0 8 8">
      <circle cx="4" cy="4" r="3" />
    </svg>
    {label}
  </span>
);

export default function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [listing, setListing] = useState<any>(null);
  
  // 💡 찜하기 관련 상태 추가
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    async function fetchDetail() {
      const res = await fetch(`/api/listings/${id}`);
      if (res.ok) {
        const data = await res.json();
        if (typeof data.photos === "string") {
          try {
            data.photos = JSON.parse(data.photos);
          } catch (e) {
            data.photos = [];
          }
        }
        setListing(data);
        // 💡 API에서 받아온 찜하기 초기값 세팅
        setIsFavorite(data.isFavorite);
        setFavoriteCount(data.favoriteCount || 0);
      }
    }
    fetchDetail();
  }, [id]);

  const startChat = async (type: string) => {
    if (!listing) return;
    const res = await fetch("/api/chat/threads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, listingId: listing.id, title: listing.title }),
    });

    if (res.status === 401) {
      router.push(`/login?callbackUrl=/listing/${id}`);
      return;
    }

    const result = await res.json();
    if (result.thread?.id) router.push(`/chat/${result.thread.id}`);
  };

  // 💡 찜하기 토글 함수
  const toggleFavorite = async () => {
    const res = await fetch(`/api/listings/${id}/favorite`, {
      method: "POST",
    });

    // 비로그인 상태일 때 로그인 페이지로 유도
    if (res.status === 401) {
      alert("로그인이 필요한 서비스입니다.");
      router.push(`/login?callbackUrl=/listing/${id}`);
      return;
    }

    if (res.ok) {
      const data = await res.json();
      setIsFavorite(data.isFavorite);
      setFavoriteCount((prev) => (data.isFavorite ? prev + 1 : prev - 1));
    }
  };

  if (!listing) return <div className="p-20 text-center">불러오는 중...</div>;
  const photos = Array.isArray(listing.photos) ? listing.photos : [];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 mt-6">
        
        {/* 사진 갤러리 */}
        <div className="grid grid-cols-4 gap-2 h-[400px] md:h-[500px] overflow-hidden rounded-xl">
          <div className="col-span-2 relative h-full bg-gray-100">
            {photos[0] ? (
              <Image src={photos[0]} alt="메인" fill className="object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">이미지 없음</div>
            )}
          </div>
          <div className="col-span-2 grid grid-cols-2 grid-rows-2 gap-2 h-full">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative h-full bg-gray-100">
                {photos[i] && (
                  <Image src={photos[i]} alt={`사진 ${i}`} fill className="object-cover" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* 메인 컨텐츠 (왼쪽 2열) */}
          <div className="col-span-2 space-y-8">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex flex-wrap mb-3">
                  {listing.isRevenueVerified && <Badge label="매출 인증완료" color="green" />}
                  {listing.isBuildingLedgerVerified && <Badge label="건축물대장 확인" color="blue" />}
                  {listing.isRegistryVerified && <Badge label="등기부 확인" color="indigo" />}
                  {!listing.isRevenueVerified && !listing.isBuildingLedgerVerified && !listing.isRegistryVerified && 
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">인증 내역 없음</span>
                  }
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">{listing.title}</h1>
                <p className="text-xl text-gray-600 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  {listing.address_area}
                </p>
              </div>

              {/* 💡 찜하기 버튼 */}
              <button 
                onClick={toggleFavorite}
                className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-gray-50 transition border border-gray-100 shadow-sm"
              >
                <svg 
                  className={`w-8 h-8 transition-colors ${isFavorite ? "text-red-500 fill-current" : "text-gray-300 stroke-current fill-none"}`} 
                  viewBox="0 0 24 24" strokeWidth="1.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                <span className="text-sm font-medium text-gray-600 mt-1">찜 {favoriteCount}</span>
              </button>
            </div>
            
            <div className="border-t border-b py-8">
              <h2 className="text-2xl font-bold mb-4">매물 상세 설명</h2>
              <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                {listing.description || "설명이 없습니다."}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">위치 확인</h2>
              <div className="w-full h-80 rounded-xl overflow-hidden border border-gray-200">
                <ListingMap 
                  items={[{ ...listing, lat: listing.lat ?? 37.5665, lng: listing.lng ?? 126.9780 }]} 
                  selectedId={listing.id}
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">* 실제 위치와 오차가 있을 수 있습니다.</p>
            </div>
          </div>

          <div className="col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="border p-6 rounded-2xl shadow-xl bg-white">
                <div className="space-y-5 mb-8">
                  <div className="flex justify-between items-center border-b pb-4">
                    <span className="text-gray-500 font-medium">보증금</span>
                    <span className="text-xl font-bold text-gray-900">{formatMoney(listing.deposit)}</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-4">
                    <span className="text-gray-500 font-medium">월세</span>
                    <span className="text-xl font-bold text-gray-900">{formatMoney(listing.rent_monthly)}</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-4">
                    <span className="text-gray-500 font-medium">권리금</span>
                    <span className="text-xl font-bold text-gray-900">{formatMoney(listing.goodwill_price)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-gray-500 font-medium">월 매출</span>
                    <span className="text-2xl font-bold text-blue-600">{formatMoney(listing.monthly_sales)}</span>
                  </div>
                </div>

                <button 
                  onClick={() => startChat("listing")} 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-blue-200"
                >
                  실시간 채팅 문의하기
                </button>
              </div>

              <Link 
              href={`/analysis?lat=${listing.lat ?? 37.4979}&lng=${listing.lng ?? 127.0276}&address=${encodeURIComponent(listing.address_area || "서울")}&category=${encodeURIComponent(listing.category || "일반업종")}`}
              className="block w-full mt-4"
              >
                <div className="border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 p-4 rounded-2xl flex items-center justify-between transition group cursor-pointer">
                  <div>
                    <div className="font-bold text-indigo-900">📍 주변 상권 분석하기</div>
                    <div className="text-xs text-indigo-600 mt-1">유동인구 및 경쟁점포 매출 확인</div>
                  </div>
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-sm group-hover:scale-110 transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}