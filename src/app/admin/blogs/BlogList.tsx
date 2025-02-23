'use client';

import { useState } from 'react';
import { CldImage } from 'next-cloudinary';
import { blogActions } from '@/actions';
import { Blog } from '@/database/models/Blog';
import DeleteButton from './DeleteButton';
import Link from 'next/link';
import { FiRefreshCw } from 'react-icons/fi';

export default function BlogList({ initialBlogs }: { initialBlogs: Blog[] }) {
    const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
    const [loading, setLoading] = useState(false);

    const refreshBlogs = async () => {
        setLoading(true);
        try {
            const { blogs: newBlogs } = await blogActions.getBlogs('-_id slug title description coverImage');
            setBlogs(newBlogs || []);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 relative">
            <h1 className="text-2xl font-bold mb-4">Blogs</h1>
            <Link href="/admin/blogs/blog-builder" className="text-blue-500 hover:underline mb-8 inline-block text-xl">
                Create New Blog
            </Link>
            <button
                onClick={refreshBlogs}
                className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded mb-4 flex items-center absolute top-4 right-4"
                disabled={loading}
            >
                <FiRefreshCw className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Refreshing...' : 'Refresh Blogs'}
            </button>

            {loading && <div className="text-gray-500 mb-4">Refreshing blogs...</div>}

            <ul className="space-y-4">
                {blogs.map((blog) => (
                    <li key={blog.slug} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
                        <div className="flex items-center space-x-4">
                            <CldImage
                                src={blog.coverImage}
                                alt={blog.coverImage}
                                width="64"
                                height="64"
                                className="object-cover rounded-md w-16 h-16"
                            />
                            <div>
                                <h2 className="text-xl font-semibold">{blog.title}</h2>
                                <p className="text-gray-600">{blog.description}</p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <Link
                                href={`/admin/blogs/blog-builder?edit=${blog.slug}`}
                                className="text-blue-500 hover:underline"
                            >
                                Edit
                            </Link>
                            <DeleteButton
                                slug={blog.slug}
                                onDelete={() => {
                                    // Optimistic update
                                    setBlogs(prev => prev.filter(b => b.slug !== blog.slug));
                                    refreshBlogs();
                                }}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
