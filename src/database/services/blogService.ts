import dbConnect from '@/database/mongoose';
import Blog from '@/database/models/Blog';
import { BaseBlog } from '@/types/blog';
import { auth } from '@/auth';

export async function getPublicBlogs(projection: string = '') {
    await dbConnect();
    return Blog.find({ status: 'public' }, projection).lean();
}

export async function getPublicBlog(slug: string, projection: string = '') {
    await dbConnect();
    return Blog.findOne({ status: 'public', slug }, projection).lean();
}

export async function getBlogs(projection: string = '') {
    const session = await auth();
    if (!session?.user || session.user.email !== process.env.ADMIN_GOOGLE_EMAIL) {
        console.error('Unauthorized attempt to get all blogs (including non-public ones).');
        throw new Error('Unauthorized attempt to get all blogs (including non-public ones).');
    }

    await dbConnect();
    return Blog.find({}, projection).lean();
}

export async function getBlog(slug: string, projection: string = '') {
    const session = await auth();
    if (!session?.user || session.user.email !== process.env.ADMIN_GOOGLE_EMAIL) {
        console.error('Unauthorized attempt to get a (possibly non-public) blog.');
        throw new Error('Unauthorized attempt to get a (possibly non-public) blog.');
    }

    await dbConnect();
    // return Blog.findOne({ slug }, projection).lean();
    const doc = await Blog.findOne({ slug }, projection).lean();

    if (!doc) return null;

    // Convert Mongoose document to plain object
    return {
        ...doc,
        _id: doc._id.toString(),
        createdAt: doc.createdAt.toISOString(),
        updatedAt: doc.updatedAt.toISOString()
    };
}

export async function createBlog(data: BaseBlog) {
    const session = await auth();
    if (!session?.user || session.user.email !== process.env.ADMIN_GOOGLE_EMAIL) {
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

export async function updateBlog(slug: string, updateData: BaseBlog) {
    const session = await auth();
    if (!session?.user || session.user.email !== process.env.ADMIN_GOOGLE_EMAIL) {
        console.error('Unauthorized attempt to update a blog.');
        throw new Error('Unauthorized attempt to update a blog.');
    }

    await dbConnect();

    return Blog.findOneAndUpdate(
        { slug },
        { $set: updateData },
        { new: true }  // return updated document
    );  // should I add .lean() here?
}

export async function deleteBlog(slug: string) {
    const session = await auth();
    if (!session?.user || session.user.email !== process.env.ADMIN_GOOGLE_EMAIL) {
        console.error('Unauthorized attempt to delete a blog.');
        throw new Error('Unauthorized attempt to delete a blog.');
    }

    await dbConnect();

    return Blog.deleteOne({ slug });
}

const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$|--+/g, '');
};
