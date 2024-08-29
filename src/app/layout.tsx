import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "./SessionProvider";
import Navbar from "@/components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BodyFit: Shop online for Fitness & Gym Equipment",
  description: "Online retail platform for fitness and gym equipment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50`}>
        <SessionProvider>
          <Navbar />
          <main className="">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
