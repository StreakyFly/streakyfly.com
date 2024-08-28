import dbConnect from '@/database/mongoose';
import Project from '@/database/models/Project';

export async function getProjects(projection: string = '') {
    await dbConnect();
    return Project.find({}, projection);
}

export async function getPublicProjects(projection: string = '') {
    await dbConnect();
    return Project.find({ status: 'public' }, projection);
}

export async function getProject(slug: string, projection: string = '') {
    await dbConnect();
    return Project.findOne({ slug }, projection);
}

export async function createProject(data: any) {
    await dbConnect();
    const newProject = new Project(data);

    if (!newProject.slug) {
        newProject.slug = generateSlug(newProject.title);
    }

    return newProject.save();
}

const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$|--+/g, '');
};
