import { blogService } from '@/database/services';
import BlogList from './BlogList';

export default async function BlogPage() {
    // Server-side initial load
    const initialBlogs = await blogService.getBlogs('-_id slug title description coverImage');

    return <BlogList initialBlogs={initialBlogs} />;
}
