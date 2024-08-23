import { notFound } from 'next/navigation';
import { projectService } from '@/database/services';
import { CldImage } from '@/components/CldWrapper';

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
    const project = await projectService.getProject(params.slug, '-_id -__v -slug -tags');

    if (!project) {
        return notFound();
    }

    return (
        <div>
            <h1>{project.title}</h1>
            <CldImage src={project.imageID} alt={project.imageID} width="512" height="512" style={{ width: "auto", height: "auto" }} />
            <p>{project.description}</p>
        </div>
    );
}
