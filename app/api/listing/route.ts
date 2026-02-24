// app/api/listing/route.ts
import { NextResponse } from "next/server";
// 별칭(@/*)이 설정돼 있다면 아래 경로 그대로 사용하세요.
// 만약 별칭이 없다면:  import { listings } from "../../../lib/mockData";
import { listings } from "@/lib/mockData";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const idParam = url.searchParams.get("id");
    if (!idParam) {
      return NextResponse.json(
        { ok: false, error: "id is required" },
        { status: 400 }
      );
    }

    const id = Number.parseInt(idParam, 10);
    if (!Number.isFinite(id)) {
      return NextResponse.json(
        { ok: false, error: "invalid id" },
        { status: 400 }
      );
    }

    const item = listings.find((l) => l.id === id) || null;
    if (!item) {
      return NextResponse.json(
        { ok: false, error: "not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, item });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? "server error" },
      { status: 500 }
    );
  }
}
