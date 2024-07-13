import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Capital Gym",
  description: "Gym website providing fitness services for better health and performance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth no-scrollbar">
      <body className={`${inter.className} bg-[#262626]`} suppressHydrationWarning={true} >
        {children}
      </body>
    </html>
  );
}
