import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import socket from '../socket';
import UserBlock from "./userBlock";
import NavBar from "./navBar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Online App",
 };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-800 text-slate-100 p-4`}>
        <UserBlock />
        <NavBar />
        {children}
      </body>
    </html>
  );
}
