import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
// import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/actions/auth.action";

const MonaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "AI interview preparation",
  description: "An AI interview preparation tool for job interviews",
};

export default  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en" className="dark">
      <body
        className={`${MonaSans.className}  antialiased pattern`}
      >
        <Toaster />
       
        {children}
      </body>
    </html>
  );
}
