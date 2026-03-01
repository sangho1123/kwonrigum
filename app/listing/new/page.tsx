"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

// 입력 폼 타입 정의
type FormState = {
  title: string;
  category: string;
  address_area: string;
  deposit: string;
  rent_monthly: string;
  goodwill_price: string;
  monthly_sales: string;
  monthly_expenses: string;
  parking_spaces: string;
  description: string;
};

// 서류 파일 상태
type DocsState = {
  buildingLedger: File | null;
  registry: File | null;
  revenueProof: File | null;
};

// 숫자 변환 유틸리티
const toNumOrNull = (v: string): number | null => {
  if (!v) return null;
  const s = v.replace(/,/g, "").trim();
  if (!s) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
};

export default function NewClient() {
  const router = useRouter();
  
  // 1. 상태 관리
  const [step, setStep] = useState(1); // 1:기본, 2:금액, 3:사진/서류
  const [form, setForm] = useState<FormState>({
    title: "",
    category: "",
    address_area: "",
    deposit: "",
    rent_monthly: "",
    goodwill_price: "",
    monthly_sales: "",
    monthly_expenses: "",
    parking_spaces: "",
    description: "",
  });

  const [photos, setPhotos] = useState<File[]>([]); // 매물 사진 (여러장)
  const [docs, setDocs] = useState<DocsState>({     // 인증 서류
    buildingLedger: null,
    registry: null,
    revenueProof: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // 2. 핸들러 함수들
  const handleChange = (k: keyof FormState, v: string) => {
    setForm((prev) => ({ ...prev, [k]: v }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  const handleDocChange = (k: keyof DocsState, file: File | null) => {
    setDocs((prev) => ({ ...prev, [k]: file }));
  };

  // 3. S3 업로드 로직 (복구됨)
  const uploadFileToS3 = async (file: File) => {
    // 1) Presigned URL 요청
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

    // 2) S3로 직접 업로드
    const uploadRes = await fetch(presignedUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });

    if (!uploadRes.ok) throw new Error(`S3 파일 업로드 실패: ${file.name}`);

    return fileUrl; // 최종 이미지 URL
  };

  // 4. 최종 제출 핸들러
  const handleSubmit = async () => {
    if (!form.title.trim()) {
      setErr("매물 제목은 필수입니다.");
      return;
    }
    
    setIsSubmitting(true);
    setErr(null);

    try {
      // A. 사진 업로드 처리 (Promise.all로 병렬 처리)
      let uploadedImageUrls: string[] = [];
      if (photos.length > 0) {
        uploadedImageUrls = await Promise.all(
          photos.map((file) => uploadFileToS3(file))
        );
      }

      // B. 데이터 전송 Payload 구성
      const payload = {
        ...form,
        deposit: toNumOrNull(form.deposit),
        rent_monthly: toNumOrNull(form.rent_monthly),
        goodwill_price: toNumOrNull(form.goodwill_price),
        monthly_sales: toNumOrNull(form.monthly_sales),
        monthly_expenses: toNumOrNull(form.monthly_expenses),
        parking_spaces: toNumOrNull(form.parking_spaces),
        lat: 37.4979, // TODO: 추후 주소 API 연동 시 실제 좌표로 대체 필요
        lng: 127.0276,
        images: uploadedImageUrls,
        // 서류 URL 처리 (파일이 있으면 'pending' 상태로 전송, 실제 업로드는 생략)
        buildingLedgerUrl: docs.buildingLedger ? "pending_upload" : null,
        registryUrl: docs.registry ? "pending_upload" : null,
        revenueProofUrl: docs.revenueProof ? "pending_upload" : null,
      };

      const res = await fetch("/api/listing-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "등록 실패");
      }

      alert("매물이 성공적으로 등록되었습니다!");
      router.replace(`/listing/${json.id}`);

    } catch (e: any) {
      console.error(e);
      setErr(e.message || "오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        
        {/* 헤더 */}
        <div className="bg-white border-b px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900">매물 등록하기</h1>
          <p className="text-gray-500 mt-1">사장님의 소중한 가게, 가치를 인정받으세요.</p>
        </div>

        {/* 진행 상태 바 */}
        <div className="flex w-full h-1 bg-gray-100">
          <div className={`h-full bg-blue-600 transition-all duration-300 ${
            step === 1 ? "w-1/3" : step === 2 ? "w-2/3" : "w-full"
          }`} />
        </div>

        <div className="p-8 space-y-8">
          
          {/* [단계 1] 기본 정보 */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">1</span>
                기본 정보 입력
              </h2>
              
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">제목 (필수)</label>
                  <input
                    className="w-full rounded-lg border-gray-300 border px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                    placeholder="예: 강남역 메인상권 1층 카페 양도합니다"
                    value={form.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">업종</label>
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
                    className="w-full rounded-lg border px-4 py-3 h-32 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="매물의 장점, 인테리어 상태, 양도 사유 등을 자세히 적어주세요."
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

          {/* [단계 2] 금액 및 매출 */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">2</span>
                금액 및 매출 정보 (단위: 만원)
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">보증금</label>
                  <input className="w-full rounded-lg border px-4 py-3" type="number" placeholder="0"
                    value={form.deposit} onChange={(e) => handleChange("deposit", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">월세</label>
                  <input className="w-full rounded-lg border px-4 py-3" type="number" placeholder="0"
                    value={form.rent_monthly} onChange={(e) => handleChange("rent_monthly", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">희망 권리금</label>
                  <input className="w-full rounded-lg border px-4 py-3 bg-blue-50 border-blue-200 text-blue-700 font-bold" type="number" placeholder="0"
                    value={form.goodwill_price} onChange={(e) => handleChange("goodwill_price", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">월 관리비/지출</label>
                  <input className="w-full rounded-lg border px-4 py-3" type="number" placeholder="0"
                    value={form.monthly_expenses} onChange={(e) => handleChange("monthly_expenses", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">월 평균 매출</label>
                  <input className="w-full rounded-lg border px-4 py-3" type="number" placeholder="0"
                    value={form.monthly_sales} onChange={(e) => handleChange("monthly_sales", e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">주차 가능 대수</label>
                  <input className="w-full rounded-lg border px-4 py-3" type="number" placeholder="0"
                    value={form.parking_spaces} onChange={(e) => handleChange("parking_spaces", e.target.value)} />
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium">이전</button>
                <button onClick={() => setStep(3)} className="flex-[2] bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition">다음: 사진 및 서류</button>
              </div>
            </div>
          )}

          {/* [단계 3] 사진 및 서류 */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">3</span>
                사진 및 서류 첨부
              </h2>

              {/* 매물 사진 업로드 섹션 */}
              <div className="border-2 border-dashed border-blue-200 rounded-xl p-6 text-center hover:bg-blue-50 transition cursor-pointer relative">
                <input 
                  type="file" multiple accept="image/*"
                  onChange={handlePhotoChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="text-blue-600 text-3xl mb-2">📸</div>
                <p className="font-bold text-gray-700">매물 사진 업로드 (필수)</p>
                <p className="text-sm text-gray-500">클릭하여 여러 장의 사진을 선택하세요</p>
                {photos.length > 0 && (
                  <div className="mt-4 inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                    {photos.length}장 선택됨
                  </div>
                )}
              </div>

              <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-600">
                👇 아래 서류는 선택사항입니다. 제출 시 <b>인증 매물 배지</b>가 부여됩니다.
              </div>

              {/* 서류 업로드 섹션 */}
              <div className="space-y-3">
                {[
                  { key: 'buildingLedger', label: '건축물대장' },
                  { key: 'registry', label: '등기부등본(임대차계약서)' },
                  { key: 'revenueProof', label: '매출 증빙 자료' },
                ].map((item) => (
                  <div key={item.key} className="flex justify-between items-center border p-3 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    <input 
                      type="file" 
                      className="text-xs"
                      onChange={(e) => handleDocChange(item.key as keyof DocsState, e.target.files?.[0] || null)}
                    />
                  </div>
                ))}
              </div>

              {err && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center font-bold">
                  ⚠️ {err}
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setStep(2)} 
                  disabled={isSubmitting}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium disabled:opacity-50"
                >
                  이전
                </button>
                <button 
                  onClick={handleSubmit} 
                  disabled={isSubmitting}
                  className="flex-[2] bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin">⏳</span> 등록 진행 중...
                    </>
                  ) : "매물 등록 완료"}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}