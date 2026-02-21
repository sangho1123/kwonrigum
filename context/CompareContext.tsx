"use client";

import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface CompareContextType {
  selectedIds: number[];
  toggleId: (id: number) => void;
  clear: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // 초기 로드 시 로컬 스토리지에서 불러오기 (새로고침 해도 유지되도록)
  useEffect(() => {
    const saved = localStorage.getItem("compareIds");
    if (saved) setSelectedIds(JSON.parse(saved));
  }, []);

  // 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("compareIds", JSON.stringify(selectedIds));
  }, [selectedIds]);

  const toggleId = (id: number) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((i) => i !== id); // 이미 있으면 제거
      if (prev.length >= 3) {
        alert("비교는 최대 3개까지만 가능합니다."); // 최대 3개 제한
        return prev;
      }
      return [...prev, id]; // 없으면 추가
    });
  };

  const clear = () => setSelectedIds([]);

  return (
    <CompareContext.Provider value={{ selectedIds, toggleId, clear }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) throw new Error("useCompare must be used within a CompareProvider");
  return context;
}