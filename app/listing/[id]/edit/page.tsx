// app/listing/[id]/edit/page.tsx
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import EditClient from "./EditClient";

export default async function ListingEditPage({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  // Next 14/15에서 params가 Promise일 수도 있으므로 통일
  const { id } = await Promise.resolve(params as any);
  const num = Number(id);
  if (!Number.isFinite(num)) notFound();

  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const meId = (session.user as any).id as string | undefined;
  const myRole = (session.user as any).role as "ADMIN" | "CLIENT" | undefined;

  const row = await prisma.listing.findUnique({
    where: { id: num },
    select: {
      id: true,
      title: true,
      category: true,
      address_area: true,
      deposit: true,
      rent_monthly: true,
      goodwill_price: true,
      monthly_sales: true,
      parking_spaces: true,
      ownerId: true,
    },
  });

  if (!row) notFound();

  // 소유자 아니고 ADMIN도 아니면 접근 차단
  if (!meId || (row.ownerId !== meId && myRole !== "ADMIN")) {
    redirect("/login");
  }

  const initial = {
    id: row.id,
    title: row.title ?? "",
    category: row.category ?? "",
    address_area: row.address_area ?? "",
    deposit: row.deposit != null ? String(row.deposit) : "",
    rent_monthly: row.rent_monthly != null ? String(row.rent_monthly) : "",
    goodwill_price: row.goodwill_price != null ? String(row.goodwill_price) : "",
    monthly_sales: row.monthly_sales != null ? String(row.monthly_sales) : "",
    parking_spaces:
      row.parking_spaces != null ? String(row.parking_spaces) : "",
  };

  return <EditClient initial={initial} />;
}
