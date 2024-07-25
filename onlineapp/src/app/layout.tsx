import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
        <div className="userBlock  h-full">
          <div className="appDescription bg-gray-900 m-1 p-5 h-1/3 text-7xl font-bold text-center">CHAT SYSTEM</div>
          <div className="userDescription bg-gray-900 m-1 p-5 h-2/3">
            <div className="userPFP p-4 m-4"></div>
            <div className="userNameTag p-2 m-2">Name:</div>
            <div className="userName">User</div>
            <button className="disconnectButton pt-2">Connect</button>
          </div>
        </div>

        <div className="navBar bg-gray-900 m-1 p-5 h-1/4"> 
          <div className="buttonsLayout">
            <button className="">Home</button>
            <button>Paint</button>
            <button>Game</button>
          </div>
        </div>

        {children}
      </body>
    </html>
  );
}
