import { notFound } from 'next/navigation';
import { projectService } from '@/database/services';
import { CldImage } from '@/components/CldWrapper';

// if user visits invalid/not pre-rendered project slug, they should see a 404 page -
// it shouldn't connect to the database and attempt to generate the page for them
export const dynamicParams = false;

export async function generateStaticParams() {
    const projects = await projectService.getProjects('slug');

    return projects.map((project) => ({
        slug: project.slug,
    }));
}

// TODO: we call the database (.getProject) twice, once for generateMetadata() and once
//  for the ProjectPage() component - can we optimize this, so it's only called once?
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
    if (project.status !== 'public') {
        return <div>Project is not public.</div>;
    }

    return (
        <div>
            <h1>{project.title}</h1>
            {/* image should have alt attribute in db, in case imageID isn't good enough */}
            <CldImage src={project.imageID} alt={project.imageID} width="512" height="512" style={{ width: "auto", height: "auto" }} />
            <p>{project.description}</p>
        </div>
    );
}
