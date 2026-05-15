"use client";

import { RetroModeProvider } from "@/components/retro-mode-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <RetroModeProvider>{children}</RetroModeProvider>;
}
