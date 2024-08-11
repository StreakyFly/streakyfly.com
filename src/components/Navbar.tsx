'use client';

import { useEffect, useRef, useState } from 'react';
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

function checkTouchDevice(): boolean {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    // return window.matchMedia('(hover: none)').matches;
}

export default function Navbar() {
    const [showLogo, setShowLogo] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Effect to handle hamburger menu
        const handleScroll = () => {
            if (isMenuOpen) {
                setIsMenuOpen(false);
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        const isTouchDevice = checkTouchDevice();
        if (!isTouchDevice) {
            // if user uses mouse (not touch) and isMenuOpen, the button should have hover effect, even if not hovered
            if (isMenuOpen && buttonRef.current) {
                buttonRef.current?.classList.add('bg-white/15');
                buttonRef.current?.classList.remove('bg-white/5');
            } else if (!isMenuOpen && buttonRef.current) {
                buttonRef.current?.classList.remove('bg-white/15');
                buttonRef.current?.classList.add('bg-white/5');
            }
        }

        const handleTouchStart = (event: TouchEvent) => {
            // if hamburger menu is opened and the user touches the hamburger button, remove hover effect
            if (isMenuOpen && buttonRef.current) {
                buttonRef.current?.classList.remove('hover:bg-white/15');
            // if hamburger menu is closed and the user touches (and doesn't let go immediately) the hamburger button, add hover effect
            } else if (!isMenuOpen && buttonRef.current && buttonRef.current.contains(event.target as Node)) {
                buttonRef.current?.classList.add('hover:bg-white/15');
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('click', handleClickOutside);
        if (isTouchDevice) window.addEventListener('touchstart', handleTouchStart);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('click', handleClickOutside);
            if (isTouchDevice) window.removeEventListener('touchstart', handleTouchStart);
        };
    }, [isMenuOpen]);

    // TODO: If user is on home page, animate quick "scrolling" to top when clicking on logo.
    //  Or maybe not just on home page but any page? Somehow transition between the current page and the home page,
    //  so it looks like you were on home page even if you weren't? :flushed:
    useEffect(() => {
        // Effect to handle logo/home button
        setShowLogo(isUserScrolledDownEnough());

        const handleScroll = () => {
            setShowLogo(isUserScrolledDownEnough());
        };

        const isTouchDevice = checkTouchDevice();
        if (isTouchDevice) {
            if (showLogo && logoRef.current) {
                logoRef.current?.classList.remove('hover:bg-white/15');
            }
        }

        const handleTouchStart = (event: TouchEvent) => {
            if (showLogo && logoRef.current && logoRef.current.contains(event.target as Node)) {
                logoRef.current?.classList.add('hover:bg-white/15');
            }
        };

        window.addEventListener('scroll', handleScroll);
        if (isTouchDevice) window.addEventListener('touchstart', handleTouchStart);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (isTouchDevice) window.removeEventListener('touchstart', handleTouchStart);
        };
    }, [showLogo]);

    return (
        <nav className="fixed z-10 top-4 md:top-9 flex w-full items-center justify-between text-3xl text-white">
            <div
                className={`ml-4 md:ml-10 flex items-center space-x-4 transition-transform duration-500 ${
                    showLogo ? 'translate-y-0' : '-translate-y-20'
                }`}
            >
                <Link href="/">
                    {/* big screens */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Image src="/streakyfly-logo.png" alt="logo" width={36} height={36} className="rounded"/>
                        <span className="font-bold">StreakyFly</span>
                    </div>
                    {/* small screens */}
                    <div
                        ref={logoRef}
                        className="flex md:hidden items-center space-x-4 rounded-md border border-white/10 bg-white/5 p-1.5 pr-2.5 backdrop-blur transition duration-200 ease-in-out hover:bg-white/15"
                    >
                        <Image src="/streakyfly-logo.png" alt="logo" width={32} height={32} className="rounded"/>
                        <span className="text-2xl font-bold" style={{ fontSize: '1.5rem', lineHeight: '1.7rem' }}>StreakyFly</span>

                    </div>
                </Link>
            </div>

            {/* Navbar links visible on screens wider than md breakpoint (768px) */}
            <ul className="hidden md:flex mr-10 justify-end space-x-12 font-light">
                <li><Link href="/projects">Projects</Link></li>
                <li><Link href="/wisdom">Wisdom</Link></li>
            </ul>

            {/* Hamburger menu visible on screens narrower than md breakpoint (768px) */}
            <div className="relative md:hidden mr-4 md:mr-10" ref={menuRef}>
                <button
                    ref={buttonRef}
                    className="flex items-center rounded-md border border-white/10 bg-white/5 px-3 py-3 backdrop-blur transition duration-200 ease-in-out hover:bg-white/15"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <div className="relative flex h-5 w-6 cursor-pointer flex-col items-center justify-between">
                        <span className="block h-1 w-full rounded bg-white"></span>
                        <span className="block h-1 w-full rounded bg-white"></span>
                        <span className="block h-1 w-full rounded bg-white"></span>
                    </div>
                </button>

                {/* Dropdown menu */}
                <div
                    className={`absolute right-0 top-full mt-3 py-3 origin-top-right transform rounded-lg border border-white/10 bg-white/15 text-white backdrop-blur transition-all duration-200 ease-in-out ${
                        isMenuOpen ? 'scale-100 opacity-100' : 'pointer-events-none scale-75 opacity-0'}`}
                >
                    <ul className="space-y-6">
                        <li className="relative">
                            <Link href="/projects" className="block px-5 text-lg transition duration-150 hover:text-green-light">Projects</Link>
                            <span className="absolute -bottom-3 left-3 right-3 border-b border-white/20"></span>
                        </li>
                        <li>
                            <Link href="/wisdom" className="block px-5 text-lg transition duration-150 hover:text-green-light">Wisdom</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
