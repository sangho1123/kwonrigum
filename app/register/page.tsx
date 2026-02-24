// app/register/page.tsx
"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // 실명 인증 관련 상태
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // 📱 본인 인증 시뮬레이션 함수
  const handleVerify = () => {
    // 실제 운영 시에는 여기에 아임포트(포트원)나 토스페이먼츠 본인인증 모듈을 연결합니다.
    alert("본인 인증기관 팝업이 호출됩니다. (현재는 테스트 환경이므로 자동으로 인증 완료 처리됩니다.)");
    
    // 가상의 인증 완료 데이터 세팅
    setName("홍길동");
    setPhone("010-1234-5678");
    setIsVerified(true);
    setErr(null);
  };

  const submit = async () => {
    if (!isVerified || !name) {
      setErr("먼저 실명(본인) 인증을 진행해 주세요.");
      return;
    }
    
    setBusy(true);
    setErr(null);
    try {
      const r = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, phone, password }), // name과 phone 함께 전송
      });
      const j = await r.json();
      if (!j?.ok) {
        setErr(j?.error ?? "회원가입 중 오류가 발생했습니다.");
        return;
      }
      await signIn("credentials", { email, password, callbackUrl: "/" });
    } catch (e: any) {
      setErr(e?.message ?? "네트워크 오류가 발생했습니다.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 py-10">
      <main className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">회원가입</h1>
          <p className="text-gray-500 text-sm">허위매물 방지를 위해 실명 회원가입을 진행합니다.</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
            <input 
              className="w-full rounded-xl border-gray-300 border px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition" 
              placeholder="example@email.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
            <input 
              className="w-full rounded-xl border-gray-300 border px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition" 
              placeholder="안전한 비밀번호를 입력하세요" 
              type="password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          {/* 실명 인증 섹션 */}
          <div className="pt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">이름 (본인인증 필수)</label>
            <div className="flex gap-2">
              <input 
                className={`flex-1 rounded-xl border px-4 py-3 outline-none transition ${isVerified ? "bg-gray-100 text-gray-600 border-gray-200" : "border-gray-300"}`} 
                placeholder="인증 시 자동 입력됩니다"
                value={name} 
                readOnly // 사용자가 임의로 입력 불가
              />
              <button 
                onClick={handleVerify}
                disabled={isVerified}
                className={`px-4 rounded-xl font-bold whitespace-nowrap transition ${
                  isVerified ? "bg-green-100 text-green-700 border border-green-200" : "bg-gray-800 text-white hover:bg-gray-900 shadow-md"
                }`}
              >
                {isVerified ? "✓ 인증완료" : "본인 인증"}
              </button>
            </div>
            {isVerified && (
              <p className="text-xs text-green-600 mt-2 font-medium flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                {name}({phone})님 인증되었습니다.
              </p>
            )}
          </div>

          {err && <p className="text-sm text-red-600 font-medium bg-red-50 p-3 rounded-lg mt-2">{err}</p>}
          
          <button 
            onClick={submit} 
            disabled={busy}
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white py-3.5 font-bold transition shadow-md shadow-blue-200 disabled:opacity-50 mt-4"
          >
            {busy ? "가입 중…" : "가입 완료하기"}
          </button>
        </div>

        <div className="mt-6 pt-6 border-t text-center text-sm text-gray-600">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="text-blue-600 font-semibold hover:underline">
            로그인하기
          </Link>
        </div>
      </main>
    </div>
  );
}