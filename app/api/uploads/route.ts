// app/api/uploads/route.ts
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import { NextResponse } from "next/server";

// S3 클라이언트 초기화
const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const { filename, contentType } = await req.json();

    if (!filename || !contentType) {
      return NextResponse.json({ error: "파일명과 파일 타입이 필요합니다." }, { status: 400 });
    }

    // 파일명 충돌(덮어쓰기)을 막기 위해 랜덤 문자열(고유 ID) 추가
    const uniqueId = crypto.randomBytes(16).toString("hex");
    const ext = filename.split('.').pop();
    const objectKey = `uploads/${uniqueId}.${ext}`;

    // S3 업로드 커맨드 생성
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: objectKey,
      ContentType: contentType,
    });

    // 클라이언트가 이 URL로 직접 PUT 요청을 보낼 수 있게 서명된 URL 발급 (유효시간: 60초)
    const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });

    // 최종적으로 저장될 파일의 실제 S3 접근 URL
    const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${objectKey}`;

    return NextResponse.json({
      presignedUrl,
      fileUrl, // 프론트엔드가 이 URL을 받아서 DB(Listing)에 저장하게 됩니다.
    });

  } catch (error) {
    console.error("Presigned URL 발급 오류:", error);
    return NextResponse.json({ error: "URL 발급 중 서버 오류가 발생했습니다." }, { status: 500 });
  }
}