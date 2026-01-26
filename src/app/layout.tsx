import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";


export const metadata: Metadata = {
  title: "Career Hub",
  description: "Your Gateway to Exciting Job Opportunities",
  icons: {
    icon: "/Logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Navbar />
        <main className="pt-20 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
