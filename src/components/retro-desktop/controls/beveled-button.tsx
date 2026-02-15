"use client";

import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";

type BeveledButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  pressed?: boolean;
};

export const BeveledButton = forwardRef<HTMLButtonElement, BeveledButtonProps>(
  ({ className = "", pressed = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={props.type ?? "button"}
        className={`retro-beveled-button ${pressed ? "is-pressed" : ""} ${className}`.trim()}
        {...props}
      />
    );
  },
);

BeveledButton.displayName = "BeveledButton";
