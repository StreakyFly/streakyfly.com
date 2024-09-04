'use client';  // TODO: should the entire component be client-side rendered, or just certain parts?

import { useState } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

export default function Sidenav() {
    // TODO: store isExpanded state in local storage or something, so it doesn't reset on page refresh
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className={`h-full bg-neutral-800 p-4 transition-all duration-300 flex flex-col ${isExpanded ? 'w-64' : 'w-16'}`}>
            <div className="relative">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`absolute top-3 -right-6 p-2 flex h-6 w-6 items-center justify-center border rounded-full ${isExpanded ? 'rotate-180' : 'rotate-0'} transition-transform duration-300`}
                >
                    ▷
                </button>
            </div>
            <ul className="flex-grow">
                {/* TODO: make a component for these items so you simply pass href, text and icon for each and das it*/}
                <li className="mb-2">
                    <Link
                        href="/admin/projects"
                        className="flex items-center p-2 rounded hover:bg-neutral-600 transition-colors duration-300"
                    >
                        {isExpanded && <span>Projects</span>}
                        {!isExpanded && <span>P</span>}
                    </Link>
                </li>
                <li className="mb-2">
                    <Link
                        href="/admin/nah"
                        className="flex items-center p-2 rounded hover:bg-neutral-600 transition-colors duration-300"
                    >
                        {isExpanded && <span>Test</span>}
                        {!isExpanded && <span>T</span>}
                    </Link>
                </li>
            </ul>
            <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="bg-red-600 hover:bg-red-700 w-full p-2 rounded transition-colors duration-300"
            >
                {isExpanded ? 'Sign Out' : 'S'}
            </button>
        </div>
    );
};
