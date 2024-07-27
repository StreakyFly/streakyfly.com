import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StreakyFly",
  description: "StreakyFly's personal website. A place to share uhh... stuff.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className={inter.className}>{children}
          {/* Temporary footer - create a footer component */}
          <footer className="flex justify-center items-center h-12 bg-black text-white">
              <p>&copy; 2024 StreakyFly. All rights reserved.</p>
          </footer>
      </body>
      </html>
  );
}
