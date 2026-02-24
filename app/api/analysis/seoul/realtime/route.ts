import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const radius = searchParams.get("radius") || "300";
  const categoryCode = searchParams.get("indsMclsCd") || ""; // 업종 코드
  const serviceKey = process.env.PUBLIC_DATA_API_KEY;

  if (!lat || !lng) return NextResponse.json({ error: "좌표가 누락되었습니다." }, { status: 400 });

  try {
    // 💡 호출 주소 정밀 교정 (소상공인시장진흥공단_상권분석서비스 엔드포인트)
    // 1. 지정된 좌표 반경 내 유동인구 통계
    const flowPopUrl = `https://apis.data.go.kr/B553077/api/open/sdsc2/flowPopByRadius?serviceKey=${serviceKey}&lat=${lat}&lon=${lng}&radius=${radius}&type=json`;
    
    // 2. 지정된 좌표 반경 내 상가 업소 정보
    const storeUrl = `https://apis.data.go.kr/B553077/api/open/sdsc2/storeListInRadius?serviceKey=${serviceKey}&lat=${lat}&lon=${lng}&radius=${radius}&indsMclsCd=${categoryCode}&type=json`;

    console.log("요청 URL 확인:", flowPopUrl); // 터미널에서 주소 클릭해서 직접 확인 가능

    const [flowRes, storeRes] = await Promise.all([
      fetch(flowPopUrl).then(res => res.json()),
      fetch(storeUrl).then(res => res.json())
    ]);

    // 💡 공공데이터 API 특유의 에러 핸들링 (결과 코드가 00이 아닐 경우)
    if (flowRes?.header?.resultCode !== "00") {
      throw new Error(flowRes?.header?.resultMsg || "유동인구 API 응답 오류");
    }

    const totalPopulation = flowRes?.body?.totalCount || 0;
    const stores = storeRes?.body?.items || [];

    return NextResponse.json({
      population: {
        total: totalPopulation,
        mainAge: totalPopulation > 0 ? "3040세대" : "데이터 없음",
        peakDay: totalPopulation > 0 ? "금/토요일" : "-",
      },
      stores: stores,
    });

  } catch (error: any) {
    console.error("API 연동 에러 상세:", error.message);
    // 💡 에러 발생 시 프론트엔드에서 '0'으로 고정되지 않도록 명확한 에러 구조 반환
    return NextResponse.json({ 
      population: { total: null, mainAge: "연결 오류", peakDay: "점검 중" },
      stores: [],
      error: error.message 
    });
  }
}