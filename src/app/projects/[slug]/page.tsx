import { notFound } from 'next/navigation';
import { projectService } from '@/database/services';

// TODO we call the database twice, once for metadata and once for the project
//  - can we optimize this, so it's only done once?
export async function generateMetadata({ params }: { params: { slug: string } }) {
    const project = await projectService.getProject(params.slug, 'title description');

    if (!project) {
        return {
            title: 'Project Not Found',
        };
    }

    return {
        title: project.title,
        description: project.description,
    };
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
    const project = await projectService.getProject(params.slug, '-_id -tags');

    if (!project) {
        return notFound();
    }

    return (
        <div>
            <h1>{project.title}</h1>
            <img src={project.imageURL} alt={project.title} width={ 512 } />
            <p>{project.description}</p>
        </div>
    );
}
