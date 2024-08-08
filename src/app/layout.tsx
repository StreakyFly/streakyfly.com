import "@/styles/globals.css";

import React from "react";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StreakyFly",
  description: "StreakyFly's personal website. A place to share uhh... stuff.",
};

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={dmSans.className}>{children}</body>
      </html>
  );
}
