"use client";

import type { SelectHTMLAttributes } from "react";

type RetroSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: Array<{ value: string; label: string }>;
};

export function RetroSelect({
  options,
  className = "",
  ...props
}: RetroSelectProps) {
  return (
    <select className={`retro-select ${className}`.trim()} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
