import dbConnect from '@/database/mongoose';
import Project from '@/database/models/Project';
import { auth } from '@/auth';

export async function getPublicProjects(projection: string = '') {
    await dbConnect();
    return Project.find({ status: 'public' }, projection);
}

export async function getPublicProject(slug: string, projection: string = '') {
    await dbConnect();
    return Project.findOne({ status: 'public', slug }, projection);
}

export async function getProjects(projection: string = '') {
    const session = await auth();
    if (!session || !session.user || session.user.email !== process.env.ADMIN_GOOGLE_EMAIL) {
        console.error('Unauthorized attempt to get all projects (including non-public ones).');
        throw new Error('Unauthorized attempt to get all projects (including non-public ones).');
    }

    await dbConnect();
    return Project.find({}, projection);
}

export async function getProject(slug: string, projection: string = '') {
    const session = await auth();
    if (!session || !session.user || session.user.email !== process.env.ADMIN_GOOGLE_EMAIL) {
        console.error('Unauthorized attempt to get a (possibly non-public) project.');
        throw new Error('Unauthorized attempt to get a (possibly non-public) project.');
    }

    await dbConnect();
    return Project.findOne({ slug }, projection);
}

export async function createProject(data: any) {
    const session = await auth();
    if (!session || !session.user || session.user.email !== process.env.ADMIN_GOOGLE_EMAIL) {
        console.error('Unauthorized attempt to create a project.');
        throw new Error('Unauthorized attempt to create a project.');
    }

    await dbConnect();
    const newProject = new Project(data);

    if (!newProject.slug) {
        newProject.slug = generateSlug(newProject.title);
    }

    return newProject.save();
}

export async function updateProject() {
    const session = await auth();
    if (!session || !session.user || session.user.email !== process.env.ADMIN_GOOGLE_EMAIL) {
        console.error('Unauthorized attempt to update a project.');
        throw new Error('Unauthorized attempt to update a project.');
    }

    // TODO: implement this
}

export async function deleteProject() {
    const session = await auth();
    if (!session || !session.user || session.user.email !== process.env.ADMIN_GOOGLE_EMAIL) {
        console.error('Unauthorized attempt to delete a project.');
        throw new Error('Unauthorized attempt to delete a project.');
    }

    // TODO: implement this
}


const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$|--+/g, '');
};
