"use client";

import ListingMap from "@/components/ListingMap";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

// 금액 포맷팅 유틸리티
const formatMoney = (amount: number | null | undefined) => {
  if (amount === null || amount === undefined || amount === 0) return "없음";
  if (amount >= 10000) {
    const eok = Math.floor(amount / 10000);
    const man = amount % 10000;
    return `${eok}억 ${man > 0 ? `${man.toLocaleString()}만` : ""}원`;
  }
  return `${amount.toLocaleString()}만원`;
};

export default function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // Next.js 15 params 언래핑
  const router = useRouter();
  
  const [listing, setListing] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    async function fetchListing() {
      try {
        const res = await fetch(`/api/listings/${id}`);
        if (!res.ok) throw new Error("매물 로드 실패");
        const data = await res.json();
        setListing(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchListing();
  }, [id]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">매물 정보를 불러오는 중...</div>;
  if (!listing) return <div className="min-h-screen flex items-center justify-center">존재하지 않는 매물입니다.</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 1. 이미지 갤러리 섹션 */}
      <div className="bg-black relative h-[400px] w-full">
        {listing.images && listing.images.length > 0 ? (
          <>
            <Image
              src={listing.images[activeImage]}
              alt="매물 이미지"
              fill
              className="object-contain"
              priority
            />
            {/* 썸네일 네비게이션 */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto">
              {listing.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative w-16 h-16 border-2 rounded-md overflow-hidden transition-all ${
                    activeImage === idx ? "border-white scale-110" : "border-transparent opacity-70"
                  }`}
                >
                  <Image src={img} alt="썸네일" fill className="object-cover" />
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            이미지 없음
          </div>
        )}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition"
        >
          ⬅️ 뒤로가기
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* 2. 좌측: 핵심 정보 및 지도 */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-md">
                  {listing.category || "업종미정"}
                </span>
                <span className="text-gray-500 text-xs">{listing.address_area}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{listing.title}</h1>
              
              {/* 핵심 가격 정보 Grid */}
              <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="text-center border-r border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">권리금</p>
                  <p className="text-lg font-bold text-indigo-600">{formatMoney(listing.premium)}</p>
                </div>
                <div className="text-center border-r border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">보증금</p>
                  <p className="text-lg font-bold text-gray-900">{formatMoney(listing.deposit)}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">월세</p>
                  <p className="text-lg font-bold text-gray-900">{formatMoney(listing.rent)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-4">📝 매물 상세 설명</h2>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed min-h-[100px]">
                {listing.description || "상세 설명이 없습니다."}
              </p>
            </div>

            {/* 위치 및 지도 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-4">📍 위치 확인</h2>
              <div className="w-full h-[300px] rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                <ListingMap lat={listing.lat} lng={listing.lng} />
              </div>
              <p className="text-sm text-gray-500 mt-3 text-center">
                * 상세 주소는 매도인의 요청에 의해 일부 마스킹 처리될 수 있습니다.
              </p>
            </div>
          </div>

          {/* 3. 우측: 수익률 & 분석 리포트 */}
          <div className="md:col-span-1 space-y-6">
            {/* 담당자/문의 카드 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-4">
              <h3 className="text-lg font-bold mb-4">📞 매물 문의</h3>
              <button 
                onClick={() => alert("준비 중인 기능입니다.")}
                className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 mb-3"
              >
                매도인에게 연락하기
              </button>
              <button 
                className="w-full py-3 bg-white border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition"
              >
                관심 매물 등록 ❤️
              </button>

              <hr className="my-6 border-gray-100" />

              {/* 📊 상권 분석 리포트 버튼 (충돌 해결 및 기능 복구) */}
              <Link 
                href={`/analysis?lat=${listing.lat}&lng=${listing.lng}&address=${encodeURIComponent(listing.address_area || "서울")}&category=${encodeURIComponent(listing.category || "일반")}`}
                className="block w-full group"
              >
                <div className="border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 p-4 rounded-2xl flex items-center justify-between transition cursor-pointer">
                  <div>
                    <p className="font-bold text-indigo-900 text-sm mb-1">📊 상권 입지 분석</p>
                    <p className="text-[11px] text-indigo-700">주변 유동인구/매출 데이터 확인</p>
                  </div>
                  <span className="text-2xl group-hover:scale-110 transition-transform">👉</span>
                </div>
              </Link>

              {/* 추가 정보 */}
              <div className="mt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">관리비</span>
                  <span className="font-bold">{formatMoney(listing.admin_cost)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">층수</span>
                  <span className="font-bold">{listing.floor}층</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">면적</span>
                  <span className="font-bold">{listing.area}평</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}