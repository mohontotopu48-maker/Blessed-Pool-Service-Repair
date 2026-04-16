import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blessed Pool Service | Professional Pool Cleaning & Repair in Glendale, CA",
  description:
    "Blessed Pool Service offers professional pool cleaning, maintenance, and repair services in Glendale, CA and the Greater Los Angeles area. Licensed, insured, and committed to crystal-clear results.",
  keywords: [
    "pool service",
    "pool cleaning",
    "pool repair",
    "pool maintenance",
    "Glendale CA",
    "Los Angeles",
    "Orange County",
    "swimming pool",
    "pool heater",
    "pool pump",
    "pool filter",
    "water chemistry",
  ],
  authors: [{ name: "Blessed Pool Service" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Blessed Pool Service | Crystal Clear Results, Every Time",
    description:
      "Professional pool cleaning, maintenance, and repair services. Serving Glendale, CA and surrounding areas. Call (714) 561-8301.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blessed Pool Service | Crystal Clear Results, Every Time",
    description:
      "Professional pool cleaning, maintenance, and repair services in Glendale, CA.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
