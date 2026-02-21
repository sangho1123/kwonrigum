"use client";

import { useEffect, useState } from "react";

type Item = { id: number; text: string };

export default function ToastHost() {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    let idSeq = 1;
    const onToast = (e: Event) => {
      const detail = (e as CustomEvent).detail as { message?: string };
      if (!detail?.message) return;
      const id = idSeq++;
      setItems((prev) => [...prev, { id, text: detail.message! }]);
      setTimeout(() => {
        setItems((prev) => prev.filter((x) => x.id !== id));
      }, 3000);
    };
    window.addEventListener("app:toast", onToast as EventListener);
    return () => window.removeEventListener("app:toast", onToast as EventListener);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {items.map((t) => (
        <div
          key={t.id}
          className="rounded-xl border bg-white shadow px-3 py-2 text-sm"
        >
          {t.text}
        </div>
      ))}
    </div>
  );
}
