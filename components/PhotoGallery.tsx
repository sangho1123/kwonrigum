"use client";

import Image from "next/image";
import { useState } from "react";

export default function PhotoGallery({
  photos,
  alt,
}: {
  photos: string[];
  alt: string;
}) {
  const [idx, setIdx] = useState(0);
  if (!photos || photos.length === 0) return null;

  const current = photos[Math.min(idx, photos.length - 1)];

  return (
    <div className="w-full">
      {/* 메인 이미지 */}
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl border">
        <Image
          src={current}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 720px"
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      {/* 썸네일 리스트 */}
      {photos.length > 1 && (
        <div className="mt-2 flex gap-2 overflow-x-auto">
          {photos.map((p, i) => (
            <button
              key={p + i}
              onClick={() => setIdx(i)}
              className={[
                "relative h-16 w-24 rounded-lg overflow-hidden border",
                i === idx ? "ring-2 ring-emerald-500 border-emerald-500" : "border-neutral-200",
              ].join(" ")}
              aria-label={`사진 ${i + 1}`}
            >
              <Image
                src={p}
                alt={`${alt} - ${i + 1}`}
                fill
                sizes="96px"
                style={{ objectFit: "cover" }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
