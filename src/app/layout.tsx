import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";

const bodyFont = localFont({
  src: "./fonts/GoogleSansFlex-Variable.ttf",
  variable: "--font-body",
  display: "swap",
  weight: "100 900",
  style: "normal",
});

export const metadata: Metadata = {
  title: "Cayvon's Resume",
  description: "The personal resume of Cayvon Morady.",
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
