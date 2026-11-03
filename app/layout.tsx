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
  metadataBase: new URL("https://candoit30.vercel.app/"),
  title: "안녕하세요, 서주형입니다",
  description: "내 하루의 이야기가 가장 생생한 영어 문장이 됩니다",
  openGraph: {
    title: "안녕하세요, 서주형입니다",
    description: "내 하루의 이야기가 가장 생생한 영어 문장이 됩니다",
    url: "https://candoit30.vercel.app/",
    images: ["/tree.jpg"],
    type: "website",
  },
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
