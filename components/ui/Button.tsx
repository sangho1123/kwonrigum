"use client";

import cx from "classnames";
import { ButtonHTMLAttributes } from "react";

export default function Button({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cx(
        "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium shadow-card",
        "bg-neutral-900 text-white hover:bg-neutral-800 active:bg-neutral-700",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
}
