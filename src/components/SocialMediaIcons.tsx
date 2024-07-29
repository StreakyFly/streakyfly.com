import React from 'react';
import Image from 'next/image';

export default function SocialMediaIcons() {
    return (
        <div className="fixed bottom-8 right-8 flex flex-col space-y-8">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                <Image src="/icons/x-icon.svg" alt="X" width={0} height={0}
                       style={{ width: '36px', height: 'auto' }} className="hover:opacity-75"/>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <Image src="/icons/youtube-icon.svg" alt="YouTube" width={0} height={0}
                       style={{ width: '36px', height: 'auto' }} className="hover:opacity-75"/>
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                <Image src="/icons/discord-icon.svg" alt="Discord" width={0} height={0}
                       style={{ width: '36px', height: 'auto' }} className="hover:opacity-75"/>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Image src="/icons/github-icon.svg" alt="GitHub" width={0} height={0} priority={true}
                       style={{ width: '36px', height: 'auto' }} className="hover:opacity-75"/>
            </a>
        </div>
    );
}
