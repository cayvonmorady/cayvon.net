import type { Metadata } from "next";
import { Google_Sans_Flex } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const bodyFont = Google_Sans_Flex({
  subsets: ["latin"],
  variable: "--font-body",
  weight: "variable",
  axes: ["opsz", "wdth", "GRAD"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Cayvon's Resume",
  description: "Cayvon's 2026 resume.",
  icons: {
    icon: [{ url: "/academic-cap.svg", type: "image/svg+xml" }],
    shortcut: ["/academic-cap.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${bodyFont.variable} min-h-screen bg-bg text-fg antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
