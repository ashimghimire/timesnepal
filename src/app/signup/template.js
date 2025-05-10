import  { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../assets/css/style.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Times Nepal",
  description: "Breaking news, shopping center, blogs",
};

export default function LoginLayout({
  children,
}) {
  return ( 
    <html lang="en">
      <body>
      <main className="flex items-center justify-center min-h-screen bg-gray-100">
        {children}
      </main>
      </body>
    </html>
    );
}