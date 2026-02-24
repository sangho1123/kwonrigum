import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const radius = searchParams.get("radius") || "300";
  const categoryCode = searchParams.get("indsMclsCd") || "I212"; // 기본값 카페
  
  // 💡 중요: 인코딩된 키와 디코딩된 키 이슈가 잦으므로 확인 필요
  const serviceKey = process.env.PUBLIC_DATA_API_KEY;

  if (!lat || !lng) return NextResponse.json({ error: "좌표 누락" }, { status: 400 });

  try {
    // 💡 주소 체계를 '공공데이터포털 가이드'에 맞춰 재구성
    // 서비스명이 'sdsc2'인지 'sdsc'인지, 그리고 인증키 위치를 확인하세요.
    const flowPopUrl = `https://apis.data.go.kr/B553077/api/open/sdsc2/flowPopByRadius?serviceKey=${serviceKey}&lat=${lat}&lon=${lng}&radius=${radius}&type=json`;
    const storeUrl = `https://apis.data.go.kr/B553077/api/open/sdsc2/storeListInRadius?serviceKey=${serviceKey}&lat=${lat}&lon=${lng}&radius=${radius}&indsMclsCd=${categoryCode}&type=json`;

    console.log("실제 호출 주소(복사해서 브라우저에 넣어보세요):", flowPopUrl);

    const [flowRes, storeRes] = await Promise.all([
      fetch(flowPopUrl).then(async (r) => {
        const text = await r.text();
        try { return JSON.parse(text); } catch(e) { throw new Error(`유동인구 API 에러: ${text}`); }
      }),
      fetch(storeUrl).then(async (r) => {
        const text = await r.text();
        try { return JSON.parse(text); } catch(e) { throw new Error(`상가정보 API 에러: ${text}`); }
      })
    ]);

    // 결과 처리
    const totalPopulation = flowRes?.body?.totalCount ?? 0;
    const stores = storeRes?.body?.items ?? [];

    return NextResponse.json({
      population: {
        total: totalPopulation,
        mainAge: totalPopulation > 0 ? "3040 세대" : "데이터 없음",
        peakDay: totalPopulation > 0 ? "금/토요일" : "-",
      },
      stores: stores,
    });

  } catch (error: any) {
    console.error("최종 API 호출 에러:", error.message);
    return NextResponse.json({ 
      population: { total: 0, mainAge: "연결 오류", peakDay: "점검 중" },
      stores: [],
      debugMessage: error.message // 💡 무엇이 문제인지 프론트에 찍어줌
    });
  }
}