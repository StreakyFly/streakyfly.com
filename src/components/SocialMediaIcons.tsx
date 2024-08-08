import React from 'react';
import Image from 'next/image';

export default function SocialMediaIcons() {
    return (
        <div className="fixed z-10 bottom-8 right-8 flex flex-col space-y-8">
            <a href="https://x.com/StreakyFly" target="_blank" rel="noopener noreferrer">
                <Image src="/icons/x-icon.svg" alt="X" width={0} height={0}
                       style={{ width: '36px', height: 'auto' }} className="hover:opacity-75"/>
            </a>
            <a href="https://www.youtube.com/@StreakyFly/videos" target="_blank" rel="noopener noreferrer">
                <Image src="/icons/youtube-icon.svg" alt="YouTube" width={0} height={0}
                       style={{ width: '36px', height: 'auto' }} className="hover:opacity-75"/>
            </a>
            <a href="https://discord.com/invite/t83eZHs" target="_blank" rel="noopener noreferrer">
                <Image src="/icons/discord-icon.svg" alt="Discord" width={0} height={0}
                       style={{ width: '36px', height: 'auto' }} className="hover:opacity-75"/>
            </a>
            <a href="https://github.com/StreakyFly" target="_blank" rel="noopener noreferrer">
                <Image src="/icons/github-icon.svg" alt="GitHub" width={0} height={0} priority={true}
                       style={{ width: '36px', height: 'auto' }} className="hover:opacity-75"/>
            </a>
        </div>
    );
}
