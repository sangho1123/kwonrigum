"use client";

import { CSSProperties, useEffect, useMemo, useState } from "react";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
const fmt = (n: number) => new Intl.NumberFormat("ko-KR").format(n);

export default function RangeBar({
  label,
  min,
  max,
  step = 100_000,
  valueMin,
  valueMax,
  onChange,
  barHeight = 44,   // ✅ 트랙/손잡이 높이(px). 손잡이가 세로로 꽉 차도록 동일 사용
  thumbWidth = 12, // ✅ 손잡이 가로 폭(px) — 세로로 긴 막대 느낌
  thumbRadius = 6, // ✅ 둥근 사각 모서리
}: {
  label: string;
  min: number;
  max: number;
  step?: number;
  valueMin?: number;
  valueMax?: number;
  onChange: (v: { min?: number; max?: number }) => void;
  barHeight?: number;
  thumbWidth?: number;
  thumbRadius?: number;
}) {
  const [lo, setLo] = useState<number>(valueMin ?? min);
  const [hi, setHi] = useState<number>(valueMax ?? max);

  useEffect(() => setLo(valueMin ?? min), [valueMin, min]);
  useEffect(() => setHi(valueMax ?? max), [valueMax, max]);

  const left = useMemo(() => ((lo - min) / (max - min)) * 100, [lo, min, max]);
  const right = useMemo(
    () => 100 - ((hi - min) / (max - min)) * 100,
    [hi, min, max]
  );

  const changeLo = (v: number) => {
    const next = clamp(v, min, hi);
    setLo(next);
    onChange({ min: next });
  };
  const changeHi = (v: number) => {
    const next = clamp(v, lo, max);
    setHi(next);
    onChange({ max: next });
  };

  // CSS 변수로 높이/폭/모서리 전달 → thumb가 트랙 높이를 그대로 채움
  const vars: CSSProperties = {
    // @ts-expect-error custom props
    "--bar-h": `${barHeight}px`,
    // @ts-expect-error custom props
    "--thumb-w": `${thumbWidth}px`,
    // @ts-expect-error custom props
    "--thumb-r": `${thumbRadius}px`,
  };

  return (
    <div className="w-full" style={vars}>
      <div className="flex items-center justify-between text-sm mb-1">
        <span className="text-neutral-700">{label}</span>
        <span className="text-neutral-600">
          {fmt(lo)} ~ {fmt(hi)} 원
        </span>
      </div>

      <div className="relative" style={{ height: "var(--bar-h)" }}>
        {/* 트랙 */}
        <div className="absolute inset-0 rounded-full bg-neutral-200" />
        {/* 선택 영역 */}
        <div
          className="absolute inset-y-0 bg-sky-200 rounded-full"
          style={{ left: `${left}%`, right: `${right}%` }}
        />

        {/* 최소/최대 슬라이더 (겹침) */}
        <input
          type="range"
          aria-label={`${label} 최소값`}
          min={min}
          max={max}
          step={step}
          value={lo}
          onChange={(e) => changeLo(Number(e.target.value))}
          className="range"
          style={{ zIndex: 30 }}
        />
        <input
          type="range"
          aria-label={`${label} 최대값`}
          min={min}
          max={max}
          step={step}
          value={hi}
          onChange={(e) => changeHi(Number(e.target.value))}
          className="range"
          style={{ zIndex: 40 }}
        />

        {/* 스타일: 트랙은 이벤트 차단, Thumb만 드래그.
           Thumb를 '세로로 긴 둥근 사각형'으로 표시(트랙 높이=thumb 높이). */}
        <style jsx>{`
          .range {
            position: absolute;
            inset: 0;
            width: 100%;
            background: transparent;
            appearance: none;
            pointer-events: none; /* 트랙 클릭 방지 */
          }
          /* WebKit */
          .range::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            height: var(--bar-h);  /* ✅ 트랙 높이와 동일 → 위아래 꽉 채움 */
            width: var(--thumb-w); /* ✅ 좁고 세로로 긴 손잡이 */
            border-radius: var(--thumb-r);
            background: #0ea5e9;    /* sky-500 */
            border: 2px solid #fff; /* 대비 */
            box-shadow: 0 1px 2px rgba(0,0,0,.12);
            pointer-events: all;    /* Thumb만 이벤트 허용 */
            cursor: ew-resize;
          }
          .range::-webkit-slider-runnable-track {
            height: var(--bar-h);
            background: transparent;
          }
          .range:focus-visible::-webkit-slider-thumb {
            box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.35);
          }

          /* Firefox */
          .range::-moz-range-thumb {
            height: var(--bar-h);   /* ✅ 동일 */
            width: var(--thumb-w);
            border-radius: var(--thumb-r);
            background: #0ea5e9;
            border: 2px solid #fff;
            box-shadow: 0 1px 2px rgba(0,0,0,.12);
            pointer-events: all;
            cursor: ew-resize;
          }
          .range::-moz-range-track {
            height: var(--bar-h);
            background: transparent;
          }
          .range:focus-visible::-moz-range-thumb {
            box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.35);
          }
        `}</style>
      </div>

      <div className="mt-1 text-xs text-neutral-500">
        막대를 드래그하여 범위를 조절하세요.
      </div>
    </div>
  );
}
