"use client"

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import socket from '../socket';
import UserBlock from "./userBlock";
import NavBar from "./navBar";
import React, { useState, useEffect} from 'react';


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-800 text-slate-100 p-4`}>
        <UserBlock setIsLoggedIn={setIsLoggedIn}/>
        <NavBar/>
        
        {/* {isLoggedIn ? (
          <>{children}</>
        ) : (
          <p className="h-screen bg-gray-900 p-2 m-2">You have to log in</p>
        )} */}
        {children}
        
       
      </body>
    </html>
  );
}
