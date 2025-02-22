'use server';


// TODO: GET method should not be a Route Handler nor a Server Action.
//  It should be a Server Component that is revalidated using the revalidate.ts Server Action whenever necessary.


import { auth } from '@/auth';
import { blogService } from '@/database/services';

export async function createBlog(data: any) {
    const session = await auth();
    if (!session || !session.user || session.user.email !== process.env.ADMIN_GOOGLE_EMAIL) {
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

export async function updateBlog() {
    const session = await auth();
    if (!session || !session.user || session.user.email !== process.env.ADMIN_GOOGLE_EMAIL) {
        console.error('Unauthorized attempt to update a blog.');
        throw new Error('Unauthorized attempt to update a blog.');
    }

    // TODO: implement this
}

export async function deleteBlog() {
    const session = await auth();
    if (!session || !session.user || session.user.email !== process.env.ADMIN_GOOGLE_EMAIL) {
        console.error('Unauthorized attempt to delete a blog.');
        throw new Error('Unauthorized attempt to delete a blog.');
    }

    // TODO: implement this
}
