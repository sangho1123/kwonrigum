"use client";

import { use, useEffect, useState } from "react";

export default function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [thread, setThread] = useState<any>(null);

  useEffect(() => {
    async function loadChat() {
      // ✅ API 경로가 /api/chat/threads/[id] 인지 확인!
      const res = await fetch(`/api/chat/threads/${id}`);
      if (res.ok) {
        const data = await res.json();
        setThread(data);
      } else {
        console.error("채팅방을 로드할 수 없습니다.");
      }
    }
    loadChat();
  }, [id]);

  if (!thread) return <div className="p-10 text-center">채팅을 불러오는 중...</div>;

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* 채팅 헤더 */}
      <div className="p-4 bg-white border-b font-bold text-center">
        {thread.title || "문의 채팅"}
      </div>
      
      {/* 메시지 영역 (UI 구현 필요) */}
      <div className="flex-1 overflow-y-auto p-4">
        {thread.messages?.map((msg: any) => (
          <div key={msg.id} className={`mb-2 ${msg.from === 'user' ? 'text-right' : 'text-left'}`}>
            <span className="inline-block p-2 bg-blue-500 text-white rounded-lg">
              {msg.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}