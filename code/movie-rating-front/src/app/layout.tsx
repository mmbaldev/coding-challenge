import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movie Rating Application",
  description: "This is the Neosfer code challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="container mx-auto">
          <Link href="/">
            {" "}
            <h1 className="text-4xl font-bold text-center mt-8 mb-8 text-[#00FFC2]">
              Movie Rating App
            </h1>
          </Link>
        </div>
        {children}
      </body>
    </html>
  );
}
