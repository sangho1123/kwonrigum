"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  // session prop을 명시하면 초기 /api/auth/session fetch를 하지 않음
  return <SessionProvider session={null}>{children}</SessionProvider>;
}
