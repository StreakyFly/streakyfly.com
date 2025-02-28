'use client';

import React, { useState } from 'react';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import {
    IconBrandTabler,
    IconArticle,
    IconSettings,
    IconArrowLeft,
} from '@tabler/icons-react';
import Link from 'next/link';
import Image from 'next/image'
import { motion } from 'framer-motion';
import { signOut } from 'next-auth/react';

export default function Sidenav() {
    const links = [
        {
            label: "Dashboard",
            href: "/admin",
            icon: (
                <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Blogs",
            href: "/admin/blogs",
            icon: (
                <IconArticle className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Test",
            href: "/admin/placeholder-link-in-Sidenav.tsx",
            icon: (
                <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
    ];
    const [open, setOpen] = useState(false);
    return (
        <div
            className="flex flex-col md:flex-row h-screen bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border-r border-t border-b border-neutral-200 dark:border-neutral-700 overflow-hidden"
        >
            <Sidebar open={open} setOpen={setOpen} animate={true}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        <>
                            <Logo />
                        </>
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: "Sign Out",
                                href: "/",
                                icon: (
                                    <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                                ),
                            }}
                            onClick={() => signOut({ redirectTo: '/' })}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>
        </div>
    );
}

export const Logo = () => {
    return (
        <Link
            href="/"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <Image
                src="/streakyfly-logo.png"
                alt="StreakyFly Logo"
                width={24}
                height={24}
                className="rounded-md flex-shrink-0"
            />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-black dark:text-white whitespace-pre"
            >
                streakyfly.com
            </motion.span>
        </Link>
    );
};
