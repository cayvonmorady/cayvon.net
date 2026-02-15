"use client";

import type { InputHTMLAttributes } from "react";

type RecessedInputProps = InputHTMLAttributes<HTMLInputElement>;

export function RecessedInput({ className = "", ...props }: RecessedInputProps) {
  return <input className={`retro-recessed-input ${className}`.trim()} {...props} />;
}
