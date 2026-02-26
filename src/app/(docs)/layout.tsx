import type { Metadata } from "next";

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
      <body className={`antialiased`}>
          <main className="pt-20 min-h-screen">
            {children}
          </main>
      </body>
    </html>
  );
}