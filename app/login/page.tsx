// app/login/page.tsx
"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = async () => {
    setBusy(true);
    setErr(null);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setBusy(false);
    if (res?.error) {
      setErr("이메일 또는 비밀번호가 올바르지 않습니다.");
      return;
    }
    window.location.href = "/";
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <main className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">환영합니다</h1>
          <p className="text-gray-500 text-sm">서비스 이용을 위해 로그인해 주세요.</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
            <input 
              className="w-full rounded-xl border-gray-300 border px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" 
              placeholder="example@email.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
            <input 
              className="w-full rounded-xl border-gray-300 border px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" 
              placeholder="비밀번호를 입력하세요" 
              type="password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          
          {err && <p className="text-sm text-red-600 font-medium bg-red-50 p-3 rounded-lg">{err}</p>}
          
          <button 
            onClick={submit} 
            disabled={busy}
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white py-3.5 font-bold transition shadow-md shadow-blue-200 disabled:opacity-50 mt-2"
          >
            {busy ? "로그인 중…" : "로그인"}
          </button>
        </div>

        <div className="mt-6 pt-6 border-t text-center text-sm text-gray-600">
          아직 계정이 없으신가요?{" "}
          <Link href="/register" className="text-blue-600 font-semibold hover:underline">
            회원가입하기
          </Link>
        </div>
      </main>
    </div>
  );
}