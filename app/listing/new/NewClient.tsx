// app/listing/new/NewClient.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type FormState = {
  title: string;
  category: string;
  address_area: string;
  deposit: string;
  rent_monthly: string;
  goodwill_price: string;
  monthly_sales: string;
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
    address_area: "",
    deposit: "",
    rent_monthly: "",
    goodwill_price: "",
    monthly_sales: "",
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

      const res = await fetch("/api/listing-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

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
    </div>
  );
}