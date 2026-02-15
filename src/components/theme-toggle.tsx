"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { useRetroMode } from "@/components/retro-mode-provider";

type AnimationType = "sunrise" | "sundown" | null;

const ANIMATION_DURATION_MS = 700;
const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const { mode, isSpecialMode, deactivateMode } = useRetroMode();
  const isClient = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationType, setAnimationType] = useState<AnimationType>(null);
  const animationTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current !== null) {
        window.clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  if (!isClient || !resolvedTheme) {
    return (
      <button
        type="button"
        aria-hidden="true"
        suppressHydrationWarning
        disabled
        className="theme-toggle inline-flex min-h-10 min-w-10 items-center justify-center rounded-full border border-black/10 bg-card p-2 text-muted"
      />
    );
  }

  const isDark = resolvedTheme === "dark";
  const label = mode === "retro"
    ? "Exit retro mode"
    : mode === "vaporwave"
      ? "Exit vaporwave mode"
    : isDark
      ? "Switch to light mode"
      : "Switch to dark mode";

  const toggleTheme = () => {
    if (isSpecialMode) {
      if (animationTimeoutRef.current !== null) {
        window.clearTimeout(animationTimeoutRef.current);
        animationTimeoutRef.current = null;
      }

      setIsAnimating(false);
      setAnimationType(null);
      deactivateMode();
      return;
    }

    const targetTheme = isDark ? "light" : "dark";
    const nextAnimationType: Exclude<AnimationType, null> = isDark
      ? "sunrise"
      : "sundown";

    if (animationTimeoutRef.current !== null) {
      window.clearTimeout(animationTimeoutRef.current);
    }

    setAnimationType(nextAnimationType);
    setIsAnimating(true);
    setTheme(targetTheme);

    animationTimeoutRef.current = window.setTimeout(() => {
      setIsAnimating(false);
      setAnimationType(null);
      animationTimeoutRef.current = null;
    }, ANIMATION_DURATION_MS);
  };

  const animationClass =
    isAnimating && animationType ? `theme-toggle--${animationType}` : "";
  const modeClass =
    mode === "retro"
      ? "is-retro"
      : mode === "vaporwave"
        ? "is-vaporwave"
        : isDark
          ? "is-dark"
          : "is-light";

  return (
    <button
      type="button"
      aria-label={label}
      suppressHydrationWarning
      onClick={toggleTheme}
      className={`theme-toggle inline-flex min-h-10 min-w-10 items-center justify-center rounded-full border border-black/10 bg-card p-2 text-muted transition-colors duration-150 hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
        modeClass
      } ${animationClass}`}
    >
      <span className="theme-toggle__sky" aria-hidden="true" />
      <span className="theme-toggle__icon-wrap" aria-hidden="true">
        <SunIcon className="theme-toggle__sun h-[1.125rem] w-[1.125rem] sm:h-5 sm:w-5" />
        <MoonIcon className="theme-toggle__moon h-[1.125rem] w-[1.125rem] sm:h-5 sm:w-5" />
      </span>
    </button>
  );
}
