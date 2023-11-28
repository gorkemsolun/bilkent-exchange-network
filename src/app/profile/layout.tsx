import "../../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import HomeNavbar from "../../components/navbar";
import Header from "../../components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BEN",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-100 contain`}>
        <Header></Header>
        <HomeNavbar></HomeNavbar>
        {children}
      </body>
    </html>
  );
}
