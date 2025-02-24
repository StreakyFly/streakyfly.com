import "@/styles/globals.css";

import React from "react";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL(process.env.SITE_URL || "https://streakyfly.com"),
    title: {
        default: "StreakyFly's Legendary Site",
        template: "%s | StreakyFly",
    },
    description: "StreakyFly's personal website. It contains things and words and stuff.",
    openGraph: {
        title: "StreakyFly",
        description: "StreakyFly's personal website. It contains things and words and stuff.",
        images: [{
            url: "/og/default.jpg",
            width: 1200,
            height: 630,
        }],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        creator: "@streakyfly",
        site: "@streakyfly",
        images: "/og/default.jpg"
    }
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
