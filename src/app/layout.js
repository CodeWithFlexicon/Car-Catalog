"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import HeaderNav from "./components/HeaderNav";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children, pageProps }) {
  return (
    <SessionProvider session={pageProps?.session}>
      <html lang="en">
        <body className={inter.className}>
          <HeaderNav />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
