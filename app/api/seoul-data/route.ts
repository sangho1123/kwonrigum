import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // 1. API 키 확인 (없으면 하드코딩된 키라도 사용)
  const apiKey = process.env.SEOUL_OPEN_DATA_KEY || "776155664373616e33316977566f45"; 

  try {
    // 💡 핵심 수정: 연도만 쓰면 에러나는 경우가 많아 '20234'(23년 4분기)로 명시
    const targetYearQuarter = "20234"; 
    
    const url1 = `http://openapi.seoul.go.kr:8088/${apiKey}/json/VwsmTrdarFlpopQq/1/1000/${targetYearQuarter}`;
    const url2 = `http://openapi.seoul.go.kr:8088/${apiKey}/json/VwsmTrdarFlpopQq/1001/2000/${targetYearQuarter}`;

    console.log(`📡 서울시 데이터 요청 시작: ${targetYearQuarter}`);

    const [res1, res2] = await Promise.all([
      fetch(url1, { next: { revalidate: 3600 } }), // 1시간 캐시
      fetch(url2, { next: { revalidate: 3600 } })
    ]);

    const data1 = await res1.json();
    const data2 = await res2.json();

    const rows = [
      ...(data1?.VwsmTrdarFlpopQq?.row || []),
      ...(data2?.VwsmTrdarFlpopQq?.row || [])
    ];

    console.log(`✅ 서울시 데이터 수신 완료: 총 ${rows.length}개 상권 데이터`);

    // 💡 데이터 가공 (타입 불일치 방지를 위해 키를 String으로 통일)
    const popMap: Record<string, number> = {};
    rows.forEach((r: any) => {
      if (r && r.TRDAR_CD) {
        // 여기서 상권코드를 문자열로 강제 변환하여 저장
        popMap[String(r.TRDAR_CD)] = r.TOT_FLPOP_CO;
      }
    });

    return NextResponse.json({ popMap });

  } catch (error: any) {
    console.error("❌ 서울시 데이터 연동 에러:", error);
    return NextResponse.json({ popMap: {} });
  }
}