"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

// 입력 폼에 필요한 상태 타입 정의
type FormState = {
  title: string;
  category: string;
  address_area: string;
  deposit: string;
  rent_monthly: string;
  goodwill_price: string;
  monthly_sales: string;
  monthly_expenses: string;
  description: string;
};

export default function NewClient() {
  const router = useRouter();
  
  // 1. 입력 폼 상태 관리
  const [form, setForm] = useState<FormState>({
    title: "",
    category: "카페", // 기본값 설정
    address_area: "",
    deposit: "",
    rent_monthly: "",
    goodwill_price: "",
    monthly_sales: "",
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
      const res = await fetch("/api/listing-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

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
    }
  };

  return (
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
    </div>
  );
}