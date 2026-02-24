// app/listing/new/page.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import NewClient from "./NewClient";

export default async function NewListingPage() {
  const session = await auth();
  if (!session) redirect("/login");      // 필요 시 session.user.id, role 사용 가능
  return <NewClient />;
}
