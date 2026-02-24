import { prisma } from "@/lib/db";
import { compare } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const mail = String(email ?? "").trim().toLowerCase();
    const pass = String(password ?? "").trim();
    if (!mail || !pass) return NextResponse.json({ ok: false, error: "required" }, { status: 400 });

    const user = await prisma.user.findUnique({
      where: { email: mail },
      select: { id: true, email: true, name: true, role: true, password: true },
    });
    if (!user || !user.password) return NextResponse.json({ ok: false, error: "invalid" }, { status: 401 });

    const ok = await compare(pass, user.password);
    if (!ok) return NextResponse.json({ ok: false, error: "invalid" }, { status: 401 });

    return NextResponse.json({ ok: true, user: { ...user, password: undefined } });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "server error" }, { status: 500 });
  }
}
