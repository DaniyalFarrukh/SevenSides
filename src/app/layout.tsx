import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { DemoSwitcher } from "@/components/shared/DemoSwitcher";
import { BRAND } from "@/lib/brand";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: BRAND.name,
  description: "Premium fast-food delivery and online ordering in Lahore.",
  icons: {
    icon: "/brand/seven-sides-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
        lang="en"
        dir="ltr"
        className={`${inter.variable} ${bebasNeue.variable} h-full antialiased`}
      >
      <body className="min-h-full flex flex-col bg-dots">
        {children}
        <DemoSwitcher />
      </body>
    </html>
  );
}
