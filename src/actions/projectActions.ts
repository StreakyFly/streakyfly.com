'use server';


// TODO: GET method should not be a Route Handler nor a Server Action.
//  It should be a Server Component that is revalidated using the revalidate.ts Server Action whenever necessary.


import { auth } from '@/auth';
import { projectService } from '@/database/services';

export async function createProject(data: any) {
    const session = await auth();
    if (!session || !session.user || session.user.email !== process.env.ADMIN_GOOGLE_EMAIL) {
        console.error('Unauthorized attempt to create a project.');
        throw new Error('Unauthorized attempt to create a project.');
    }

    try {
        const newProject = await projectService.createProject(data);
        return { success: true, slug: newProject.slug };
    } catch (error: any) {
        return { success: false, message: 'Failed to add project', error: error.message };
    }
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
