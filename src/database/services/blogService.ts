import dbConnect from '@/database/mongoose';
import Blog from '@/database/models/Blog';
import { auth } from '@/auth';

export async function getPublicBlogs(projection: string = '') {
    await dbConnect();
    return Blog.find({ status: 'public' }, projection);
}

export async function getPublicBlog(slug: string, projection: string = '') {
    await dbConnect();
    return Blog.findOne({ status: 'public', slug }, projection);
}

export async function getBlogs(projection: string = '') {
    const session = await auth();
    if (!session || !session.user || session.user.email !== process.env.ADMIN_GOOGLE_EMAIL) {
        console.error('Unauthorized attempt to get all blogs (including non-public ones).');
        throw new Error('Unauthorized attempt to get all blogs (including non-public ones).');
    }

    await dbConnect();
    return Blog.find({}, projection);
}

export async function getBlog(slug: string, projection: string = '') {
    const session = await auth();
    if (!session || !session.user || session.user.email !== process.env.ADMIN_GOOGLE_EMAIL) {
        console.error('Unauthorized attempt to get a (possibly non-public) blog.');
        throw new Error('Unauthorized attempt to get a (possibly non-public) blog.');
    }

    await dbConnect();
    return Blog.findOne({ slug }, projection);
}

export async function createBlog(data: any) {
    const session = await auth();
    if (!session || !session.user || session.user.email !== process.env.ADMIN_GOOGLE_EMAIL) {
        console.error('Unauthorized attempt to create a blog.');
        throw new Error('Unauthorized attempt to create a blog.');
    }

    await dbConnect();
    const newBlog = new Blog(data);

    if (!newBlog.slug) {
        newBlog.slug = generateSlug(newBlog.title);
    }

    return newBlog.save();
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


const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$|--+/g, '');
};
