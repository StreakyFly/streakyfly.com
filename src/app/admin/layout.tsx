import { ReactNode } from 'react';
import Sidenav from '@/components/admin/Sidenav';

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex">
            <div>
                <Sidenav />
            </div>
            <div className="w-full h-screen overflow-y-auto">
                <div className="m-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
