"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      aria-label={label}
      suppressHydrationWarning
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex min-h-11 min-w-11 items-center gap-2 rounded-full border border-black/10 bg-card px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted transition-colors duration-150 hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:px-4 sm:text-xs sm:tracking-[0.2em]"
    >
      <span className="text-[9px] leading-none sm:text-[10px]">
        {isDark ? "Light" : "Dark"}
      </span>
      <span className="h-2 w-2 rounded-full bg-accent" />
    </button>
  );
}
