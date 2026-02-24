import { NextResponse } from "next/server";

// 💡 업로드하신 '서울시 주요 82장소 목록'을 기반으로 한 좌표 데이터 (일부 발췌)
// 실제 운영 시에는 이 목록을 JSON 파일로 만들어 관리하는 것이 좋습니다.
const SEOUL_HOTSPOTS = [
  { name: "강남역", lat: 37.4979, lng: 127.0276 },
  { name: "광화문·덕수궁", lat: 37.5695, lng: 126.9772 },
  { name: "역삼역", lat: 37.5006, lng: 127.0365 },
  { name: "홍대입구역(2호선)", lat: 37.5575, lng: 126.9244 },
  { name: "성수카페거리", lat: 37.5438, lng: 127.0543 },
  { name: "압구정로데오거리", lat: 37.5274, lng: 127.0385 },
  { name: "여의도", lat: 37.5215, lng: 126.9243 },
  { name: "신촌 스타광장", lat: 37.5559, lng: 126.9368 },
  { name: "가로수길", lat: 37.5203, lng: 127.0230 },
  { name: "건대입구역", lat: 37.5404, lng: 127.0692 },
  { name: "노량진", lat: 37.5135, lng: 126.9413 },
  { name: "종로·청계 관광특구", lat: 37.5699, lng: 126.9822 },
  { name: "이태원 관광특구", lat: 37.5345, lng: 126.9946 }
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = parseFloat(searchParams.get("lat") || "37.4979");
  const lng = parseFloat(searchParams.get("lng") || "127.0276");
  const apiKey = process.env.SEOUL_DATA_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "API 키가 설정되지 않았습니다." }, { status: 500 });
  }

  try {
    // 1. 현재 좌표에서 가장 가까운 서울시 핫스팟 찾기
    const closest = SEOUL_HOTSPOTS.reduce((prev, curr) => {
      const prevDist = Math.hypot(prev.lat - lat, prev.lng - lng);
      const currDist = Math.hypot(curr.lat - lat, curr.lng - lng);
      return prevDist < currDist ? prev : curr;
    });

    // 2. 서울시 실시간 도시데이터 API 호출
    const url = `http://openapi.seoul.go.kr:8088/${apiKey}/json/citydata_ppltn/1/1/${encodeURIComponent(closest.name)}`;

    const response = await fetch(url);
    const json = await response.json();

    // 3. 응답 처리
    if (json["SeoulRtd.citydata_ppltn"]) {
      const ppltnData = json["SeoulRtd.citydata_ppltn"][0];
      
      return NextResponse.json({
        totalPopulation: parseInt(ppltnData.AREA_PPLTN_MAX),
        congestLevel: ppltnData.AREA_CONGEST_LVL,
        districtName: ppltnData.AREA_NM,
        updateTime: ppltnData.PPLTN_TIME,
        // 나중에 실제 연령대 계산 로직을 넣을 수 있도록 준비만 해둡니다.
        peakAgeGroup: "30대" 
      });
    }

    // API 응답에 에러 코드가 있는 경우
    if (json.RESULT) {
      return NextResponse.json({ 
        error: "서울시 API 오류", 
        message: json.RESULT.MESSAGE 
      }, { status: 400 });
    }

    return NextResponse.json({ error: "데이터를 찾을 수 없습니다." }, { status: 404 });

  } catch (error) {
    console.error("실시간 인구 호출 중 서버 오류:", error);
    return NextResponse.json({ error: "서버 내부 오류" }, { status: 500 });
  }
}