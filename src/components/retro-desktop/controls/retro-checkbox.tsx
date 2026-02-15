"use client";

import type { InputHTMLAttributes } from "react";

type RetroCheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
};

export function RetroCheckbox({
  label,
  className = "",
  ...props
}: RetroCheckboxProps) {
  return (
    <label className={`retro-checkbox-row ${className}`.trim()}>
      <input type="checkbox" className="retro-checkbox" {...props} />
      <span>{label}</span>
    </label>
  );
}
