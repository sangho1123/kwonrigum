<<<<<<< HEAD
=======
// app/listing/new/NewClient.tsx
>>>>>>> 29451efc4fb24432e8003cc114e00a91b168e065
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

<<<<<<< HEAD
// 입력 폼에 필요한 상태 타입 정의
=======
>>>>>>> 29451efc4fb24432e8003cc114e00a91b168e065
type FormState = {
  title: string;
  category: string;
  address_area: string;
  deposit: string;
  rent_monthly: string;
  goodwill_price: string;
  monthly_sales: string;
<<<<<<< HEAD
  monthly_expenses: string;
  description: string;
};

export default function NewClient() {
  const router = useRouter();
  
  // 1. 입력 폼 상태 관리
  const [form, setForm] = useState<FormState>({
    title: "",
    category: "카페", // 기본값 설정
=======
  parking_spaces: string;
  description: string;
};

// 파일 업로드 시뮬레이션 상태
type DocsState = {
  buildingLedger: File | null;
  registry: File | null;
  revenueProof: File | null;
};

const toNumOrNull = (v: string): number | null => {
  const s = v.replace(/,/g, "").trim();
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
};

export default function NewClient() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 단계별 진행 (1:기본, 2:금액, 3:서류)
  const [form, setForm] = useState<FormState>({
    title: "",
    category: "",
>>>>>>> 29451efc4fb24432e8003cc114e00a91b168e065
    address_area: "",
    deposit: "",
    rent_monthly: "",
    goodwill_price: "",
    monthly_sales: "",
<<<<<<< HEAD
    monthly_expenses: "",
    description: "",
  });

  // 2. 사진 파일 상태 관리 및 로딩 상태
  const [photos, setPhotos] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 3. 입력값 변경 핸들러
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 4. 파일 첨부 상태 업데이트 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  // 🌟 5. S3로 직접 파일 업로드하는 함수 (Presigned URL 사용)
  const uploadFileToS3 = async (file: File) => {
    // 5-1. 우리 서버(/api/uploads)에 Presigned URL 요청
    const res = await fetch("/api/uploads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        filename: file.name, 
        contentType: file.type 
      }),
    });

    if (!res.ok) throw new Error(`업로드 URL 발급 실패: ${file.name}`);
    const { presignedUrl, fileUrl } = await res.json();

    // 5-2. 발급받은 URL로 AWS S3에 직접 파일 전송 (PUT 요청)
    const uploadRes = await fetch(presignedUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });

    if (!uploadRes.ok) throw new Error(`S3 파일 업로드 실패: ${file.name}`);

    // 5-3. 최종 저장된 S3의 실제 이미지 URL 반환
    return fileUrl;
  };

  // 🌟 6. 매물 등록 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 간단한 필수값 검증
    if (!form.title || !form.address_area || !form.deposit || !form.rent_monthly) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Step A: 첨부된 사진이 있다면 S3에 먼저 전부 업로드
      let uploadedImageUrls: string[] = [];
      if (photos.length > 0) {
        // Promise.all을 통해 여러 장의 사진을 동시에 업로드 (속도 최적화)
        uploadedImageUrls = await Promise.all(
          photos.map((file) => uploadFileToS3(file))
        );
      }

      // Step B: 입력된 문자열(String) 금액 데이터들을 DB에 맞는 숫자(Number)로 변환
      const payload = {
        title: form.title,
        category: form.category,
        address_area: form.address_area,
        deposit: parseInt(form.deposit) || 0,
        rent_monthly: parseInt(form.rent_monthly) || 0,
        goodwill_price: parseInt(form.goodwill_price) || 0,
        monthly_sales: parseInt(form.monthly_sales) || 0,
        monthly_expenses: parseInt(form.monthly_expenses) || 0,
        description: form.description,
        images: uploadedImageUrls, // S3에 올라간 실제 URL 배열
      };

      // Step C: 최종 매물 데이터를 백엔드로 전송
=======
    parking_spaces: "",
    description: "",
  });
  const [docs, setDocs] = useState<DocsState>({
    buildingLedger: null,
    registry: null,
    revenueProof: null,
  });
  
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleChange = (k: keyof FormState, v: string) =>
    setForm((s) => ({ ...s, [k]: v }));

  const handleFileChange = (k: keyof DocsState, file: File | null) => {
    setDocs((s) => ({ ...s, [k]: file }));
  };

  const submit = async () => {
    if (!form.title.trim()) {
      setErr("가게 이름(제목)은 필수입니다.");
      return;
    }

    setBusy(true);
    setErr(null);

    try {
      // 실제 파일 업로드는 구현 복잡도로 인해 생략하고, 파일이 있으면 URL이 있는 것처럼 처리합니다.
      // 실제 구현 시에는 S3 등에 업로드 후 URL을 받아와야 합니다.
      const payload = {
        title: form.title.trim(),
        category: form.category || "일반음식점",
        address_area: form.address_area || "지역 미지정",
        deposit: toNumOrNull(form.deposit),
        rent_monthly: toNumOrNull(form.rent_monthly),
        goodwill_price: toNumOrNull(form.goodwill_price),
        monthly_sales: toNumOrNull(form.monthly_sales),
        parking_spaces: toNumOrNull(form.parking_spaces),
        description: form.description,
        // 위도 경도는 임의의 강남역 좌표로 모의 설정 (지도 표시용)
        lat: 37.4979,
        lng: 127.0276,
        // 파일이 선택되었으면 'uploaded_mock_url'을 보냄
        buildingLedgerUrl: docs.buildingLedger ? "mock_url_ledger" : null,
        registryUrl: docs.registry ? "mock_url_registry" : null,
        revenueProofUrl: docs.revenueProof ? "mock_url_revenue" : null,
      };

>>>>>>> 29451efc4fb24432e8003cc114e00a91b168e065
      const res = await fetch("/api/listing-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

<<<<<<< HEAD
      if (!res.ok) {
        throw new Error("매물 등록 DB 저장 실패");
      }

      // 성공 시 처리
      alert("매물이 성공적으로 등록되었습니다!");
      router.push("/listing/mine");
      router.refresh();

    } catch (error) {
      console.error("Submit Error:", error);
      alert("매물 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false); // 업로드 로딩 해제
=======
      const j = await res.json();

      if (res.status === 401) {
        setErr("로그인이 필요합니다.");
        router.push("/login?callbackUrl=/listing/new");
        return;
      }

      if (!res.ok || !j?.ok) {
        throw new Error(j?.error ?? "등록 실패");
      }

      router.replace(`/listing/${j.id}`);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setBusy(false);
>>>>>>> 29451efc4fb24432e8003cc114e00a91b168e065
    }
  };

  return (
<<<<<<< HEAD
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8 mb-16">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-4">새 매물 등록</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* --- 섹션 1: 기본 정보 --- */}
        <section className="space-y-5">
          <h2 className="text-lg font-semibold text-gray-800">기본 상가 정보</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">매물 제목 (필수)</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="예: 강남역 도보 5분, 유동인구 풍부한 1층 카페"
              required
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">업종</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="카페">카페</option>
                <option value="음식점">음식점</option>
                <option value="주점">주점</option>
                <option value="미용/뷰티">미용/뷰티</option>
                <option value="기타">기타 상업시설</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">지역/주소 (필수)</label>
              <input
                type="text"
                name="address_area"
                value={form.address_area}
                onChange={handleChange}
                placeholder="예: 서울시 강남구 역삼동"
                required
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
        </section>

        {/* --- 섹션 2: 금액 정보 --- */}
        <section className="space-y-5">
          <h2 className="text-lg font-semibold text-gray-800 pt-4 border-t">금액 정보 (단위: 만원)</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">보증금 (필수)</label>
              <input
                type="number"
                name="deposit"
                value={form.deposit}
                onChange={handleChange}
                placeholder="예: 5000"
                required
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">월세 (필수)</label>
              <input
                type="number"
                name="rent_monthly"
                value={form.rent_monthly}
                onChange={handleChange}
                placeholder="예: 300"
                required
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">희망 권리금</label>
              <input
                type="number"
                name="goodwill_price"
                value={form.goodwill_price}
                onChange={handleChange}
                placeholder="예: 8000"
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">월 평균 매출</label>
              <input
                type="number"
                name="monthly_sales"
                value={form.monthly_sales}
                onChange={handleChange}
                placeholder="예: 1500"
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">월 평균 지출(비용)</label>
              <input
                type="number"
                name="monthly_expenses"
                value={form.monthly_expenses}
                onChange={handleChange}
                placeholder="예: 800"
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
        </section>

        {/* --- 섹션 3: 상세 설명 및 사진 --- */}
        <section className="space-y-5">
          <h2 className="text-lg font-semibold text-gray-800 pt-4 border-t">상세 설명 및 사진 첨부</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">매물 상세 설명</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={6}
              placeholder="매물의 장점, 주변 상권 특징, 내부 인테리어 상태, 양도 이유 등을 상세하게 적어주시면 거래 성사에 큰 도움이 됩니다."
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">매물 사진 첨부 (여러 장 선택 가능)</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-gray-300 rounded-md cursor-pointer transition-colors"
            />
            {photos.length > 0 && (
              <p className="mt-3 text-sm font-medium text-blue-600">
                ✅ 현재 선택된 사진: {photos.length}장
              </p>
            )}
          </div>
        </section>

        {/* --- 등록 버튼 --- */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 px-4 text-white text-lg font-bold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all ${
              isSubmitting 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "사진 업로드 및 매물 등록 진행 중..." : "매물 등록하기"}
          </button>
        </div>
      </form>
=======
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* 헤더 */}
        <div className="bg-white border-b px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900">매물 등록하기</h1>
          <p className="text-gray-500 mt-1">사장님의 소중한 가게, 가치를 인정받으세요.</p>
        </div>

        {/* 진행 바 */}
        <div className="flex w-full h-1 bg-gray-100">
          <div className={`h-full bg-blue-600 transition-all duration-300 ${step === 1 ? "w-1/3" : step === 2 ? "w-2/3" : "w-full"}`} />
        </div>

        <div className="p-8 space-y-8">
          {/* 단계 1: 기본 정보 */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">1</span>
                기본 정보 입력
              </h2>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">제목 (상호명 등)</label>
                  <input
                    className="w-full rounded-lg border-gray-300 border px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    placeholder="예: 강남역 메인상권 1층 카페"
                    value={form.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">업종 카테고리</label>
                    <input
                      className="w-full rounded-lg border px-4 py-3"
                      placeholder="예: 카페/디저트"
                      value={form.category}
                      onChange={(e) => handleChange("category", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">지역</label>
                    <input
                      className="w-full rounded-lg border px-4 py-3"
                      placeholder="예: 서울 강남구 역삼동"
                      value={form.address_area}
                      onChange={(e) => handleChange("address_area", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">매물 상세 설명</label>
                   <textarea 
                      className="w-full rounded-lg border px-4 py-3 h-32 resize-none"
                      placeholder="매물의 장점, 양도 사유 등을 자세히 적어주세요."
                      value={form.description}
                      onChange={(e) => handleChange("description", e.target.value)}
                   />
                </div>
              </div>
              <button 
                onClick={() => setStep(2)}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition"
              >
                다음: 금액 정보 입력
              </button>
            </div>
          )}

          {/* 단계 2: 금액 정보 */}
          {step === 2 && (
             <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
               <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">2</span>
                금액 및 매출 정보
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">보증금 (만원)</label>
                  <input className="w-full rounded-lg border px-4 py-3" type="number" placeholder="0"
                    value={form.deposit} onChange={(e) => handleChange("deposit", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">월세 (만원)</label>
                  <input className="w-full rounded-lg border px-4 py-3" type="number" placeholder="0"
                    value={form.rent_monthly} onChange={(e) => handleChange("rent_monthly", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">희망 권리금 (만원)</label>
                  <input className="w-full rounded-lg border px-4 py-3 bg-blue-50 border-blue-200" type="number" placeholder="0"
                    value={form.goodwill_price} onChange={(e) => handleChange("goodwill_price", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">월 평균 매출 (만원)</label>
                  <input className="w-full rounded-lg border px-4 py-3" type="number" placeholder="0"
                    value={form.monthly_sales} onChange={(e) => handleChange("monthly_sales", e.target.value)} />
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium">이전</button>
                <button onClick={() => setStep(3)} className="flex-[2] bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition">다음: 서류 인증</button>
              </div>
            </div>
          )}

          {/* 단계 3: 서류 및 인증 */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">3</span>
                신뢰도 상승 서류 제출 (선택)
              </h2>
              
              <div className="bg-blue-50 p-4 rounded-xl text-sm text-blue-800 mb-4">
                💡 서류를 제출하면 매물 상세 페이지에 <span className="font-bold">인증 배지</span>가 표시되어 조회수가 2배 이상 증가합니다.
              </div>

              <div className="space-y-4">
                {/* 건축물대장 */}
                <div className="border rounded-xl p-4 hover:border-blue-300 transition cursor-pointer relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-700">건축물대장</span>
                    <span className={`text-xs px-2 py-1 rounded ${docs.buildingLedger ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {docs.buildingLedger ? "첨부됨" : "미첨부"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">면적, 용도 확인을 위해 필요합니다.</p>
                  <input 
                    type="file" 
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    onChange={(e) => handleFileChange("buildingLedger", e.target.files?.[0] || null)}
                  />
                </div>

                {/* 등기부등본 */}
                <div className="border rounded-xl p-4 hover:border-blue-300 transition cursor-pointer relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-700">등기부등본 (또는 임대차계약서)</span>
                    <span className={`text-xs px-2 py-1 rounded ${docs.registry ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {docs.registry ? "첨부됨" : "미첨부"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">소유자 및 임대 조건 확인을 위해 필요합니다.</p>
                  <input 
                    type="file" 
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    onChange={(e) => handleFileChange("registry", e.target.files?.[0] || null)}
                  />
                </div>

                {/* 매출 증빙 */}
                <div className="border rounded-xl p-4 hover:border-blue-300 transition cursor-pointer relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-700">POS/홈택스 매출 자료</span>
                    <span className={`text-xs px-2 py-1 rounded ${docs.revenueProof ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {docs.revenueProof ? "첨부됨" : "미첨부"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">최근 3개월 매출 내역을 업로드해주세요.</p>
                  <input 
                    type="file" 
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    onChange={(e) => handleFileChange("revenueProof", e.target.files?.[0] || null)}
                  />
                </div>
              </div>

              {err && <p className="text-sm text-red-600 text-center font-medium bg-red-50 p-2 rounded">{err}</p>}

              <div className="flex gap-3 pt-4">
                <button onClick={() => setStep(2)} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium">이전</button>
                <button 
                  onClick={submit} 
                  disabled={busy}
                  className="flex-[2] bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {busy ? "등록 중..." : "매물 등록 완료"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
>>>>>>> 29451efc4fb24432e8003cc114e00a91b168e065
    </div>
  );
}