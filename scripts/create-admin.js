const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const email = "admin@local.test"; // 👈 로그인할 이메일
  const plainPassword = "admin";    // 👈 로그인할 비밀번호

  // 1. 비밀번호 해시화
  const passwordHash = await hash(plainPassword, 10);

  // 2. 유저가 있는지 확인
  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    // 3. 이미 있으면 비밀번호 업데이트 (Update)
    const updated = await prisma.user.update({
      where: { email },
      data: {
        password: passwordHash, // 비밀번호 재설정
        role: "ADMIN",          // 관리자 권한 확실히 부여
      },
    });
    console.log(`✅ 기존 유저(${email})의 비밀번호를 '${plainPassword}'로 초기화했습니다.`);
    console.log(updated);
  } else {
    // 4. 없으면 새로 생성 (Create)
    const user = await prisma.user.create({
      data: {
        email,
        name: "Admin",
        role: "ADMIN",
        password: passwordHash,
      },
    });
    console.log(`✅ 새 관리자 유저(${email})를 생성했습니다. 비밀번호: ${plainPassword}`);
    console.log(user);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });