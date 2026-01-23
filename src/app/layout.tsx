import type { Metadata } from "next";
import "./globals.css";


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
        {children}
      </body>
    </html>
  );
}
