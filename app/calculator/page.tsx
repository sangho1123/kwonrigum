import PremiumCalculator from "@/components/PremiumCalculator";
// import TopNav from "@/components/TopNav";  <-- 이 줄을 삭제하거나 주석 처리하세요.

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* <TopNav />  <-- 이 줄도 삭제하세요. */}
      
      <main className="container mx-auto px-4 pt-8 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            내 가게 권리금, 얼마가 적당할까?
          </h1>
          <p className="text-gray-600">
            빅데이터 기반 알고리즘으로 예상 적정 권리금을 확인해보세요.
          </p>
        </div>

        <div className="flex justify-center">
          <PremiumCalculator />
        </div>

        <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-bold mb-3">💡 권리금 계산 기준 안내</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
            <li><strong>영업권리금:</strong> 월 평균 순수익의 약 10~12개월치를 산정합니다.</li>
            <li><strong>바닥권리금:</strong> 보증금과 상권 등급을 고려하여 산정합니다.</li>
            <li><strong>시설권리금:</strong> 초기 시설 투자비에서 사용 기간에 따른 감가상각을 적용합니다.</li>
          </ul>
        </div>
      </main>
    </div>
  );
}