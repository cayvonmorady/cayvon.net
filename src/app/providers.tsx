"use client";

import { ThemeProvider } from "next-themes";
import { RetroModeProvider } from "@/components/retro-mode-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <RetroModeProvider>{children}</RetroModeProvider>
    </ThemeProvider>
  );
}
