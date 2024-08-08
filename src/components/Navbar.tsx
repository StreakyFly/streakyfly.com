'use client';

import { useState, useEffect, useRef } from 'react';
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
    const [showLogo, setShowLogo] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setShowLogo(isUserScrolledDownEnough());

        const handleScroll = () => {
            setShowLogo(isUserScrolledDownEnough());
            if (isMenuOpen) {
                setIsMenuOpen(false);
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        const isMobile = window.matchMedia('(hover: none)').matches;
        if (isMobile) {
            // if not isMenuOpen, the button shouldn't have hover effect on mobile devices
            if (!isMenuOpen && buttonRef.current) {
                buttonRef.current?.classList.remove('hover:bg-white/15');
            } else {
                buttonRef.current?.classList.add('hover:bg-white/15');
            }
        } else {
            // if isMenuOpen, the button should have hover effect, even if not hovered
            if (isMenuOpen && buttonRef.current) {
                buttonRef.current?.classList.add('bg-white/15');
            } else {
                buttonRef.current?.classList.remove('bg-white/15');
            }
        }

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('click', handleClickOutside);
        };
    }, [isMenuOpen]);

    // TODO: move navbar higher & closer to borders on mobile devices
    return (
        <nav className="fixed z-10 text-3xl top-9 w-full flex justify-between items-center text-white">
            <div className={`flex ml-10 space-x-4 items-center transition-transform duration-500 ${
                showLogo ? 'translate-y-0' : '-translate-y-20'
            }`}
            >
                <Link href="/">
                    <div className="flex items-center space-x-4">
                        <Image src="/streakyfly-logo.png" alt="logo" width={36} height={36} className="logo-round" />
                        <span className="font-bold">StreakyFly</span>
                    </div>
                </Link>
            </div>

            {/* Navbar links visible on screens wider than md breakpoint (768px) */}
            <ul className="hidden md:flex mr-10 justify-end space-x-12 font-light">
                <li><Link href="/projects">Projects</Link></li>
                <li><Link href="/wisdom">Wisdom</Link></li>
            </ul>

            {/* Hamburger menu visible on screens narrower than md breakpoint (768px) */}
            <div className="mr-10 md:hidden relative" ref={menuRef}>
                <button
                    ref={buttonRef}
                    className="flex items-center px-3 py-3 rounded-md border border-white/10 hover:bg-white/15 backdrop-blur transition duration-150 ease-in-out"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <div className="relative w-6 h-5 flex flex-col justify-between items-center cursor-pointer">
                        <span className="block w-full h-1 bg-white rounded"></span>
                        <span className="block w-full h-1 bg-white rounded"></span>
                        <span className="block w-full h-1 bg-white rounded"></span>
                    </div>
                </button>

                {/* Dropdown menu */}
                <div
                    className={`absolute right-0 top-full mt-3 py-3 rounded-lg border border-white/10 bg-white/15 backdrop-blur text-white transition-all duration-200 ease-in-out transform ${
                        isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
                    }`}
                    style={{ transformOrigin: 'top right' }}
                >
                    <ul className="space-y-6">
                        <li className="relative">
                            <Link href="/projects" className="block text-lg px-5 hover:text-green-light transition duration-150">
                                Projects
                            </Link>
                            <span className="absolute -bottom-3 left-3 right-3 border-b border-white/20"></span>
                        </li>
                        <li>
                            <Link href="/wisdom" className="block text-lg px-5 hover:text-green-light transition duration-150">
                                Wisdom
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
