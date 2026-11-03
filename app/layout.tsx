import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My First Site",
  description: "가장 단순하고 깔끔한 Next.js + TypeScript + Tailwind CSS 시작 프로젝트",
  verification: {
    google: "6D96zIneZbrCNeMF_hQW3KN5PNaCUa1rII0cSp1OEI8",
    other: {
      "naver-site-verification": "522f17693d1dd6e635bfa941d66a1e00d4140b96",
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
