import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./retro-desktop.css";
import { Providers } from "./providers";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { VideoBackground } from "@/components/video-background";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
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
    <html lang="en" suppressHydrationWarning className={cn("scroll-smooth", "font-sans", geist.variable)}>
      <body
        className={`${bodyFont.variable} min-h-screen bg-bg text-fg antialiased`}
      >
        <Providers>
          <VideoBackground />
          {children}
        </Providers>
      </body>
    </html>
  );
}
