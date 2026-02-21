// app/api/listing-intake/route.ts
import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user?.email) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      category,
      address_area,
      deposit,
      rent_monthly,
      goodwill_price,
      monthly_sales,
      parking_spaces,
      description,
      // 추가된 필드들
      lat,
      lng,
      buildingLedgerUrl,
      registryUrl,
      revenueProofUrl,
    } = body;

    // 간단한 서버 측 유효성 검사 (여기서는 파일이 업로드 되었다면 인증된 것으로 간주하는 로직 예시)
    // 실제로는 관리자가 확인 후 true로 변경하는 것이 일반적입니다.
    const isBuildingLedgerVerified = !!buildingLedgerUrl; 
    const isRegistryVerified = !!registryUrl;
    const isRevenueVerified = !!revenueProofUrl;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ ok: false, error: "User not found" }, { status: 404 });
    }

    const newListing = await prisma.listing.create({
      data: {
        ownerId: user.id,
        title,
        category,
        address_area,
        deposit,
        rent_monthly,
        goodwill_price,
        monthly_sales,
        parking_spaces,
        description,
        lat: lat || 37.5665, // 기본값 (서울 시청)
        lng: lng || 126.9780,
        buildingLedgerUrl,
        registryUrl,
        revenueProofUrl,
        isBuildingLedgerVerified,
        isRegistryVerified,
        isRevenueVerified,
        photos: JSON.stringify([]), // 사진은 별도 업로드가 필요하므로 빈 배열
      },
    });

    return NextResponse.json({ ok: true, id: newListing.id });
  } catch (error: any) {
    console.error("Listing Create Error:", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}