import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const apiKey = process.env.SEOUL_OPEN_DATA_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "API키 없음" }, { status: 400 });
  }

  try {
    // 💡 서울시 API는 한 번에 1000건까지만 호출 가능. 
    // 1671개 전체를 가져오기 위해 1~1000, 1001~2000 두 번을 동시에 호출합니다.
    const url1 = `http://openapi.seoul.go.kr:8088/${apiKey}/json/VwsmTrdarFlpopQq/1/1000/20234`;
    const url2 = `http://openapi.seoul.go.kr:8088/${apiKey}/json/VwsmTrdarFlpopQq/1001/2000/20234`;

    const [res1, res2] = await Promise.all([fetch(url1), fetch(url2)]);
    const data1 = await res1.json();
    const data2 = await res2.json();

    const rows = [
      ...(data1.VwsmTrdarFlpopQq?.row || []),
      ...(data2.VwsmTrdarFlpopQq?.row || [])
    ];

    // 💡 프론트엔드에서 색칠하기 편하도록 { "2120195": 150000, "2120196": 80000 } 형태로 가공
    const popMap: Record<string, number> = {};
    rows.forEach((r: any) => {
      popMap[r.TRDAR_CD] = r.TOT_FLPOP_CO;
    });

    return NextResponse.json({ popMap, rawRows: rows });

  } catch (error: any) {
    console.error("서울시 전체 데이터 연동 에러:", error);
    return NextResponse.json({ error: "에러 발생" }, { status: 500 });
  }
}