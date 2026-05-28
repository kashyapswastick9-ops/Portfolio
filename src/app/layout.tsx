import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import GlobalGlow from "@/components/GlobalGlow";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Swastick Kumar Kashyap — Portfolio",
  description:
    "CS student, developer, and builder. Explore my projects, skills, and get in touch.",
  keywords: [
    "Swastick Kumar Kashyap",
    "portfolio",
    "developer",
    "CS student",
    "web development",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="custom-cursor-active min-h-screen bg-background font-sans text-foreground">
        <CustomCursor />
        <GlobalGlow />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
