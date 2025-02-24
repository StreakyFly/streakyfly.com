import { blogService } from '@/database/services';
import { CldImage } from '@/components/CldWrapper';
import Link from 'next/link';

export const metadata = {
    title: 'Blogs',
    description: 'Explore my blogs',
};

export default async function Blogs() {
    const blogs = await blogService.getPublicBlogs('-_id slug title description coverImage createdAt tags');

    if (!blogs) {
        return <div>Failed to load blogs. Please try again later.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">My Dope AF Blogs</h1>
            <p className="text-gray-200 mb-4">the entire page, its design and all displayed blogs are a placeholder, if it&apos;s not obvious</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {blogs.map((blog: any) => (
                    <Link key={blog.slug} href={`/blogs/${blog.slug}`} className="block no-underline">
                        <div className="blog-card border-gray-500 border rounded-lg p-4 shadow-lg">
                            <div className="image-container w-full h-48 mb-4">
                                {/*alt=should be actual alt, not just coverImage url or id or whateva*/}
                                <CldImage src={blog.coverImage} alt={blog.coverImage} width="512" height="512" style={{ width: "100%", height: "100%" }} className="object-cover rounded-md w-full h-48 mb-4" />
                                {/*<img src="https://res.cloudinary.com/streakyfly/image/upload/c_limit,w_640/f_auto/q_auto/cld-sample-2?_a=BAVCr+DW0" alt={blog.coverImage} className="object-cover rounded-md" />*/}
                            </div>
                            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                            <p className="text-gray-200">{blog.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
