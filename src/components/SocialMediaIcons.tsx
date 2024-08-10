'use client'

import { useEffect, useRef, useState } from 'react';
import SocialMediaIcon from './SocialMediaIcon';
import IconToggle from './IconToggle';

function checkTouchDevice(): boolean {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    // return window.matchMedia('(hover: none)').matches;
}

export default function SocialMediaIcons() {
    const [isExpanded, setIsExpanded] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Preload images (right "after" the website loads, when the component is mounted)
        //  -- otherwise, the first time you open the menu, you can see the images are missing for a split second
        const imageUrls = [
            '/icons/x-twitter.svg',
            '/icons/youtube.svg',
            '/icons/discord.svg',
            '/icons/github.svg'
        ];

        imageUrls.forEach(url => {
            const img = new window.Image();
            img.src = url;
        });
    }, []);

    useEffect(() => {
        // Close the menu if user scrolls or clicks outside the menu.
        // Remove hover effect if user closes the menu by clicking on the menu button.

        // Basically a copy-paste from Navbar's useEffect that handles the hamburger menu, but I don't feel like
        //  refactoring into a custom hook right now :)
        const handleScroll = () => {
            if (isExpanded) {
                setIsExpanded(false);
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (isExpanded && menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsExpanded(false);
            }
        };

        const isTouchDevice = checkTouchDevice();
        if (!isTouchDevice) {
            // if user uses mouse (not touch) and isMenuOpen, the button should have hover effect, even if not hovered
            if (isExpanded && menuRef.current) {
                menuRef.current?.classList.add('bg-white/15');
                menuRef.current?.classList.remove('bg-white/5');
            } else if (!isExpanded && menuRef.current) {
                menuRef.current?.classList.remove('bg-white/15');
                menuRef.current?.classList.add('bg-white/5');
            }
        }

        const handleTouchStart = (event: TouchEvent) => {
            // if hamburger menu is opened and the user touches the hamburger button, remove hover effect
            if (isExpanded && menuRef.current) {
                menuRef.current?.classList.remove('hover:bg-white/15');
                // if hamburger menu is closed and the user touches (and doesn't let go immediately) the hamburger button, add hover effect
            } else if (!isExpanded && menuRef.current && menuRef.current.contains(event.target as Node)) {
                menuRef.current?.classList.add('hover:bg-white/15');
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
    }, [isExpanded]);

    return (
        <>
            { /* big screens */}
            <div className="hidden md:flex fixed z-10 bottom-8 right-8 flex-col space-y-8">
                <SocialMediaIcon src="/icons/x-twitter.svg" alt="X" width={36} href="https://x.com/StreakyFly"/>
                <SocialMediaIcon src="/icons/youtube.svg" alt="YouTube" width={36} href="https://www.youtube.com/@StreakyFly/videos"/>
                <SocialMediaIcon src="/icons/discord.svg" alt="Discord" width={36} href="https://discord.com/invite/t83eZHs"/>
                <SocialMediaIcon src="/icons/github.svg" alt="GitHub" width={36} href="https://github.com/StreakyFly"/>
            </div>

            { /* small screens */}
            <div ref={menuRef}
                 className="fixed md:hidden z-10 bottom-4 right-4 group rounded-md backdrop-blur bg-white/5 border border-white/10 hover:bg-white/15 transition duration-200 ease-in-out"
                 style={{ clipPath: 'inset(0 round 8px)' }}
            >
                <button className={`flex flex-col items-center p-3 transition-all duration-300 ease-in-out ${
                    isExpanded ? 'w-12 h-52' : 'w-12 h-12'
                }`}
                        onClick={() => setIsExpanded(!isExpanded)}
                >
                    <IconToggle isToggled={isExpanded}
                                icon1Src="/icons/network-wired.svg" icon1Alt="Social media"
                                icon2Src="/icons/arrow-down.svg" icon2Alt="Close"
                                iconSize={24}
                                transitionDuration={300}
                    />
                </button>

                <div
                    className={`absolute bottom-0 right-0 flex flex-col items-center space-y-0 transition-transform duration-300 ease-in-out ${
                        isExpanded ? 'translate-y-0 pointer-events-auto' : 'translate-y-40 pointer-events-none'
                    }`}
                >
                    <SocialMediaIcon src="/icons/x-twitter.svg" alt="X" width={24} href="https://x.com/StreakyFly" outerClassName="p-3 pt-2.5"/>
                    <SocialMediaIcon src="/icons/youtube.svg" alt="YouTube" width={24} href="https://www.youtube.com/@StreakyFly/videos" outerClassName="p-3 pt-2.5"/>
                    <SocialMediaIcon src="/icons/discord.svg" alt="Discord" width={24} href="https://discord.com/invite/t83eZHs" outerClassName="p-3 pt-2.5"/>
                    <SocialMediaIcon src="/icons/github.svg" alt="GitHub" width={24} href="https://github.com/StreakyFly" outerClassName="p-3 pt-2.5"/>
                </div>
            </div>
        </>
    );
}
