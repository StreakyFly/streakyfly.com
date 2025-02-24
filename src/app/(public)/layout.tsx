import React from 'react';
import Navbar from '@/components/Navbar';
import SocialMediaIcons from '@/components/SocialMediaIcons';
import Footer from '@/components/Footer';

export default function PublicLayout({ children }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow mt-20 md:mt-24">
                {children}
            </main>
            <Navbar />
            <SocialMediaIcons />
            <Footer />
        </div>
    );
}
