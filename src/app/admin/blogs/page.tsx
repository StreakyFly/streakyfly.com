import { blogService } from '@/database/services';
import Link from 'next/link';
import { CldImage } from '@/components/CldWrapper';

export default async function BlogPage() {
    const blogs = await blogService.getBlogs('-_id slug title description coverImage');

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Blogs</h1>
            <Link href="/admin/blogs/blog-builder" className="text-blue-500 hover:underline mb-8 inline-block text-xl">Create New Blog</Link>
            <ul className="space-y-4">
                {blogs.map((blog) => (
                    <li key={blog.slug} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
                        <div className="flex items-center space-x-4">
                            <CldImage src={blog.coverImage} alt={blog.coverImage} width="64" height="64" style={{ width: "64px", height: "64px" }} className="object-cover rounded-md w-full h-48" />
                            <div>
                                <h2 className="text-xl font-semibold">{blog.title}</h2>
                                <p className="text-gray-600">{blog.description}</p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <Link href={`/admin/blogs/blog-builder/${blog.slug}`} className="text-blue-500 hover:underline">Edit</Link>
                            <button className="text-red-500 hover:underline">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}