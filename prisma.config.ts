// prisma.config.ts  (프로젝트 루트)
// Prisma 6.x에서 .env 자동 로드 이슈 방지용: 명시적으로 로드

import { config } from "dotenv";
import { join } from "path";

// 1) prisma/.env 우선 로드
config({ path: join(process.cwd(), "prisma", ".env") });
// 2) 루트 .env도 있으면 추가 로드(이미 있는 값은 덮어쓰지 않음)
config();

export default {
  schema: "./prisma/schema.prisma",
};
