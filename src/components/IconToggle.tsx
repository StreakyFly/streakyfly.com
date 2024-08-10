'use client';

import Image from 'next/image';

interface IconToggleProps {
    isToggled: boolean;
    icon1Src: string;
    icon1Alt: string;
    icon2Src: string;
    icon2Alt: string;
    iconSize?: number;
    transitionDuration?: number;
}

export default function IconToggle({
                                       isToggled,
                                       icon1Src,
                                       icon1Alt,
                                       icon2Src,
                                       icon2Alt,
                                       iconSize = 24,
                                       transitionDuration = 300,
                                   }: IconToggleProps) {
    return (
        <>
            {/* First icon */}
            <Image
                src={icon1Src}
                alt={icon1Alt}
                width={0}
                height={0}
                className={`absolute transform transition-all duration-${transitionDuration} ease-in-out ${
                    isToggled ? 'rotate-180 scale-75 opacity-0' : 'rotate-0 scale-100 opacity-100'
                }`}
                style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
            />

            {/* Second icon */}
            <Image
                src={icon2Src}
                alt={icon2Alt}
                width={0}
                height={0}
                className={`absolute transform transition-all duration-${transitionDuration} ease-in-out ${
                    isToggled ? 'rotate-0 scale-100 opacity-100' : '-rotate-180 scale-75 opacity-0'
                }`}
                style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
            />
        </>
    );
}
