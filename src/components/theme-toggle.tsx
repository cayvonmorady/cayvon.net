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
      className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-card px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted transition hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <span className="text-[10px] leading-none">{isDark ? "Light" : "Dark"}</span>
      <span className="h-2 w-2 rounded-full bg-accent" />
    </button>
  );
}