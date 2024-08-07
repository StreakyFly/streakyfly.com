'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

function isUserScrolledDownEnough(): boolean {
    const aboutMeSection = document.getElementById('about-me');
    if (aboutMeSection) {
        const rect = aboutMeSection.getBoundingClientRect();
        return rect.top <= aboutMeSection.clientHeight / 8;
        // return rect.top <= 0;
    }
    return false;
}

export default function Navbar() {
    let initialState = false;
    const [showLogo, setShowLogo] = useState(initialState);

    useEffect(() => {
        setShowLogo(isUserScrolledDownEnough());

        const handleScroll = () => {
            setShowLogo(isUserScrolledDownEnough());
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className="fixed z-10 text-3xl top-9 w-full flex justify-between items-center text-white">
            <div className={`flex ml-10 space-x-4 items-center left-10 transition-transform duration-500 ${showLogo ? 'translate-y-0' : '-translate-y-20'}`}>
                <Link href="/">
                    <div className="flex items-center space-x-4">
                        <Image src="/streakyfly-logo.png" alt="logo" width={36} height={36} className="logo-round" />
                        <span className="font-bold">StreakyFly</span>
                    </div>
                </Link>
            </div>
            <ul className="flex mr-10 justify-end space-x-12 font-light">
                <li><Link href="/projects">Projects</Link></li>
                <li><Link href="/wisdom">Wisdom</Link></li>
            </ul>
        </nav>
    );
}
