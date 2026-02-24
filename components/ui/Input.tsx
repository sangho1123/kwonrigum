"use client";

import cx from "classnames";
import { InputHTMLAttributes } from "react";

export default function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cx(
        "w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm shadow-sm",
        "placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/20",
        className
      )}
      {...props}
    />
  );
}
