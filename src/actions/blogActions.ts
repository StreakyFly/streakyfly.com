'use server';

// TODO: GET method should not be a Route Handler nor a Server Action.
//  It should be a Server Component that is revalidated using the revalidate.ts Server Action whenever necessary.


import { auth } from '@/auth';
import { blogService } from '@/database/services';
import { BaseBlog } from '@/types/blog';

export async function createBlog(data: any) {
    const session = await auth();
    if (!session?.user || session.user.email !== process.env.ADMIN_GOOGLE_EMAIL) {
        console.error('Unauthorized attempt to create a blog.');
        throw new Error('Unauthorized attempt to create a blog.');
    }

    try {
        const newBlog = await blogService.createBlog(data);
        return { success: true, slug: newBlog.slug };
    } catch (error: any) {
        return { success: false, message: 'Failed to add blog', error: error.message };
    }
}

export async function updateBlog(slug: string, updateData: BaseBlog) {
    const session = await auth();
    if (!session?.user || session.user.email !== process.env.ADMIN_GOOGLE_EMAIL) {
        console.error('Unauthorized attempt to update a blog.');
        throw new Error('Unauthorized attempt to update a blog.');
    }

    try {
        await blogService.updateBlog(slug, updateData);
        return { success: true, slug: slug };
    } catch (error: any) {
        return { success: false, message: 'Failed to update blog', error: error.message };
    }
}

export async function deleteBlog(slug: string) {
    const session = await auth();
    if (!session?.user || session.user.email !== process.env.ADMIN_GOOGLE_EMAIL) {
        console.error('Unauthorized attempt to delete a blog.');
        throw new Error('Unauthorized attempt to delete a blog.');
    }

    try {
        await blogService.deleteBlog(slug);
        return { success: true, slug: slug };
    } catch (error: any) {
        return { success: false, message: 'Failed to delete blog', error: error.message };
    }
}

export async function getBlogs(projection: string = '') {
    const session = await auth();
    if (!session?.user || session.user.email !== process.env.ADMIN_GOOGLE_EMAIL) {
        console.error('Unauthorized attempt to get all blogs (including non-public ones).');
        throw new Error('Unauthorized attempt to get all blogs (including non-public ones).');
    }

    try {
        const blogs = await blogService.getBlogs(projection);
        return { success: true, blogs: blogs };
    } catch (error: any) {
        return { success: false, message: 'Failed to get blogs', error: error.message };
    }
}
