'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"
import Provider from "@/app/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout(props) {
   const { children } = props;
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}  
      > <Provider>
        {children}</Provider>
      </body>
    </html>
  );
}
