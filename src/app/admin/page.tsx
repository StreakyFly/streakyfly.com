'use client';  // TODO: the entire page shouldn't be client-side rendered, only the necessary parts - or should it be?

import { signOut } from 'next-auth/react';

export default function AdminPanel() {
    return (
        <div>
            <h1>Lovely admin panel</h1>
            <a href="/admin/blog-builder">EPIC BLOG BUILDER</a>
            <button onClick={() => signOut()}
                    className="bg-red-600 text-white font-bold py-1.5 px-4 rounded-full transition hover:bg-red-800"
            >
                Sign out
            </button>
        </div>
    );
}
