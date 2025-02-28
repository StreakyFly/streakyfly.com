import { ReactNode } from 'react';
import Sidenav from '@/components/admin/Sidenav';

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex">
            <div>
                <Sidenav />
            </div>
            {/* border on all sides except the left, as Sidenav already takes care of that border */}
            <div className="w-full h-screen overflow-y-auto border-t border-b border-r border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
                {children}
            </div>
        </div>
    );
}
