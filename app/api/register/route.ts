// app/api/register/route.ts
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs"; // 👈 추가: bcryptjs 암호화 모듈 임포트
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password, name, phone } = await req.json();

    // 1. 필수 값 확인
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "이메일, 비밀번호, 이름은 필수입니다." },
        { status: 400 }
      );
    }

    // 2. 이메일 중복 확인
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "이미 가입된 이메일입니다." },
        { status: 400 }
      );
    }

    // 3. 비밀번호 해싱 (핵심 변경 사항)
    // - 두 번째 인자(10)는 salt rounds로, 숫자가 높을수록 보안이 강해지지만 해싱 시간이 오래 걸립니다. (보통 10~12 사용)
    const hashedPassword = await hash(password, 10);

    // 4. DB에 유저 생성
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword, // 👈 평문 비밀번호 대신 해싱된 비밀번호 저장
        phone: phone || null,
        // role은 스키마에 정의된 기본값("CLIENT")으로 자동 지정됩니다.
      },
    });

    return NextResponse.json(
      { 
        message: "회원가입이 성공적으로 완료되었습니다.", 
        user: { id: newUser.id, email: newUser.email } 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { error: "서버 오류: 회원가입 처리 중 문제가 발생했습니다." },
      { status: 500 }
    );
  }
}