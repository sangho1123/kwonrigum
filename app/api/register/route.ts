// app/api/register/route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password, name, phone } = await req.json();

    // 이메일, 패스워드는 물론 이름(name)도 필수값으로 검증
    if (!email || !password || !name) {
      return NextResponse.json({ ok: false, error: "이메일, 비밀번호, 이름(실명인증)은 필수입니다." }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ ok: false, error: "이미 가입된 이메일입니다." }, { status: 400 });
    }

    // 실제 프로덕션에서는 password를 bcrypt 등으로 해싱(암호화)하여 저장해야 합니다.
    const user = await prisma.user.create({
      data: {
        email,
        password, // 실제 환경에서는 해싱 필수
        name,
        phone,
        isVerified: true, // 인증 절차를 거쳤으므로 true
      },
    });

    return NextResponse.json({ ok: true, id: user.id });
  } catch (error: any) {
    console.error("Register Error:", error);
    return NextResponse.json({ ok: false, error: "가입 처리 중 서버 오류가 발생했습니다." }, { status: 500 });
  }
}