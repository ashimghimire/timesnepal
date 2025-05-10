import  { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../app/assets/css/style.css";
import Header from "../components/Header";
import SessionWrapper from '../components/Sessionwrapper';
import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';
import NProgressProvider from './nprogress-provider';
import { LoadingProvider } from '../context/LoadingContext';

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

export default async function RootLayout({
  children,
}) {
  const session = await getServerSession();
  // Use server-side cookies API instead of client-side getCookie
  const cookieStore = cookies();
  const jwt = cookieStore.get('JWT')?.value;
  
  console.log("Session data:", JSON.stringify(session, null, 2));
  console.log("Cookie data:", jwt);
  console.log("Condition result:", Boolean(session?.accessToken || jwt));
  
  return (
    <html lang="en">
      <head>
      <link
		      rel="stylesheet"
		      href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
		/>
		<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
		<link href="https://fonts.googleapis.com/css2?family=Material+Icons+Outlined" rel="stylesheet"/>
		<link rel="stylesheet" href="/css/style.css"/>
	
      </head>
      <body>
        <div className="mr-10 ml-10">
          <SessionWrapper>
            <LoadingProvider>
              <NProgressProvider />
              {(session?.accessToken || jwt) && <Header/>}
              <div> {children} </div>
            </LoadingProvider>
          </SessionWrapper>
          </div>
        
      </body>
    </html>
  );
}
