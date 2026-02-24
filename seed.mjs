import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('🚀 각기 다른 10개의 가상 매물 삽입 시작...');

  await prisma.listing.deleteMany({});

  const items = [
    {
      title: "강남역 초역세권 대형 베이커리",
      category: "카페/디저트",
      address_area: "서울 강남구 역삼동",
      description: "강남역 도보 1분 거리. 유동인구 최상급이며 직장인 단골이 매우 많습니다. 최고급 오븐 시설 완비.",
      lat: 37.4979, lng: 127.0276,
      deposit: 100000000, rent_monthly: 8500000, goodwill_price: 250000000, monthly_sales: 95000000,
      photos: ["https://images.unsplash.com/photo-1554118811-1e0d58224f24", "https://images.unsplash.com/photo-1559925393-8be0ec41b507"]
    },
    {
      title: "홍대 메인상권 힙한 수제맥주 펍",
      category: "주점",
      address_area: "서울 마포구 서교동",
      description: "MZ세대가 줄 서는 힙한 인테리어의 펍입니다. 루프탑 공간이 있어 봄/가을 매출이 폭발적입니다.",
      lat: 37.5565, lng: 126.9239,
      deposit: 50000000, rent_monthly: 4500000, goodwill_price: 120000000, monthly_sales: 42000000,
      photos: ["https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b", "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae"]
    },
    {
      title: "한남동 감성 가득한 브런치 카페",
      category: "카페/브런치",
      address_area: "서울 용산구 한남동",
      description: "고급 주택가 인근이라 객단가가 높습니다. 조용한 분위기에서 여유를 즐기는 단골층이 두텁습니다.",
      lat: 37.5344, lng: 127.0022,
      deposit: 70000000, rent_monthly: 5000000, goodwill_price: 150000000, monthly_sales: 38000000,
      photos: ["https://images.unsplash.com/photo-1495474472287-4d71bcdd2085", "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb"]
    },
    {
      title: "성수동 팩토리 컨셉 쇼룸 겸 카페",
      category: "카페/쇼룸",
      address_area: "서울 성동구 성수동",
      description: "인스타그램 핫플레이스로 소문난 곳입니다. 노출 콘크리트 디자인과 넓은 공간이 특징입니다.",
      lat: 37.5446, lng: 127.0560,
      deposit: 80000000, rent_monthly: 6000000, goodwill_price: 180000000, monthly_sales: 55000000,
      photos: ["https://images.unsplash.com/photo-1525610553991-2bede1a236e2", "https://images.unsplash.com/photo-1552566626-52f8b828add9"]
    },
    {
      title: "이태원 경리단길 정통 바(Bar)",
      category: "주점/바",
      address_area: "서울 용산구 이태원동",
      description: "외국인 고객 비중이 높고 야경 뷰가 환상적인 공간입니다. 프라이빗한 모임 장소로 인기.",
      lat: 37.5358, lng: 126.9899,
      deposit: 40000000, rent_monthly: 3200000, goodwill_price: 90000000, monthly_sales: 28000000,
      photos: ["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4", "https://images.unsplash.com/photo-1469957761103-559300b71aa4"]
    },
    {
      title: "여의도 오피스 상권 샌드위치 전문점",
      category: "음식점/간편식",
      address_area: "서울 영등포구 여의도동",
      description: "오전 7시부터 아침 식사 수요가 폭발하는 매장입니다. 점심 회전율이 매우 높습니다.",
      lat: 37.5216, lng: 126.9242,
      deposit: 60000000, rent_monthly: 5500000, goodwill_price: 110000000, monthly_sales: 48000000,
      photos: ["https://images.unsplash.com/photo-1509042239860-f550ce710b93"]
    },
    {
      title: "잠실 송리단길 마카롱 맛집",
      category: "디저트",
      address_area: "서울 송파구 송파동",
      description: "선물용 박스 판매 비중이 70% 이상인 곳입니다. 테이크아웃 위주라 운영이 매우 편리합니다.",
      lat: 37.5070, lng: 127.1064,
      deposit: 30000000, rent_monthly: 2500000, goodwill_price: 70000000, monthly_sales: 22000000,
      photos: ["https://images.unsplash.com/photo-1559339352-11d035aa65de"]
    },
    {
      title: "가로수길 일식 다이닝 오마카세",
      category: "음식점",
      address_area: "서울 강남구 신사동",
      description: "100% 예약제로 운영되는 프라이빗 일식집입니다. 고정 VIP 고객 명단 승계 가능합니다.",
      lat: 37.5208, lng: 127.0227,
      deposit: 120000000, rent_monthly: 9000000, goodwill_price: 300000000, monthly_sales: 120000000,
      photos: ["https://images.unsplash.com/photo-1579027989536-b7b1f875659b"]
    },
    {
      title: "익선동 한옥 갤러리 찻집",
      category: "카페/전통차",
      address_area: "서울 종로구 익선동",
      description: "한옥의 고즈넉함을 살린 인테리어. 관광객 필수 코스로 유명하며 차별화된 메뉴를 보유하고 있습니다.",
      lat: 37.5744, lng: 126.9898,
      deposit: 50000000, rent_monthly: 4000000, goodwill_price: 130000000, monthly_sales: 35000000,
      photos: ["https://images.unsplash.com/photo-1544787210-282744347841"]
    },
    {
      title: "북촌 조용한 도자기 공방 겸 스튜디오",
      category: "공방/체험",
      address_area: "서울 종로구 가회동",
      description: "체험 클래스 예약이 항상 차 있는 공방입니다. 조용하게 작업하며 운영하고 싶은 분께 추천.",
      lat: 37.5829, lng: 126.9835,
      deposit: 35000000, rent_monthly: 2200000, goodwill_price: 50000000, monthly_sales: 15000000,
      photos: ["https://images.unsplash.com/photo-1565191999001-551c187427bb"]
    }
  ];

  for (const item of items) {
    await prisma.listing.create({
      data: {
        ...item,
        isRevenueVerified: Math.random() > 0.5,
        // ✅ 건축물대장 및 등기부등본 인증 플래그 추가
        isBuildingLedgerVerified: Math.random() > 0.5,
        isRegistryVerified: Math.random() > 0.5,
        photos: JSON.stringify(item.photos)
      }
    });
  }

  console.log('✅ 10개의 고유 매물이 성공적으로 등록되었습니다!');
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());