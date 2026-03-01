import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const radius = searchParams.get("radius") || "300";
  const indsMclsCd = searchParams.get("indsMclsCd"); 

  const serviceKey = process.env.DATA_GO_KR_API_KEY || "da888c616bebe64f65330be9bcffc05575b99f67bf23d5fec8bff0ea57b42d34"; 

  // 좌표가 없으면 빈 값 반환 (에러 방지)
  if (!lat || !lng) {
    return NextResponse.json({ stores: [], population: null });
  }

  try {
    // 소상공인 상가 목록 API 호출 (살아있는 API)
    const storeUrl = `https://apis.data.go.kr/B553077/api/open/sdsc2/storeListInRadius?serviceKey=${encodeURIComponent(serviceKey)}&pageNo=1&numOfRows=100&radius=${radius}&cx=${lng}&cy=${lat}&indsMclsCd=${indsMclsCd}&type=json`;

    const storeRes = await fetch(storeUrl);
    let stores = [];
    
    if (storeRes.ok) {
      const storeData = await storeRes.json();
      if (storeData.body && storeData.body.items) {
        stores = storeData.body.items;
      }
    }

    return NextResponse.json({ stores, population: null });

  } catch (error) {
    console.error("Analysis API Error:", error);
    return NextResponse.json({ stores: [], population: null });
  }
}