import { projectService } from '@/database/services';
import { CldImage } from '@/components/CldWrapper';

export const metadata = {
    title: 'Projects',
    description: 'Explore my projects',
};

export default async function Projects() {
    const projects = await projectService.getPublicProjects('-_id slug title description imageID createdAt tags');

    if (!projects) {
        return <div>Failed to load projects. Please try again later.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">My Dope AF Projects</h1>
            <p className="text-gray-200 mb-4">the entire page, its design and all displayed projects are a placeholder, if it&apos;s not obvious</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {projects.map((project: any) => (
                    <a key={project.slug} href={`/projects/${project.slug}`} className="block no-underline">
                        <div className="project-card border-gray-500 border rounded-lg p-4 shadow-lg">
                            <div className="image-container w-full h-48 mb-4">
                                <CldImage src={project.imageID} alt={project.imageID} width="512" height="512" style={{ width: "100%", height: "100%" }} className="object-cover rounded-md w-full h-48 mb-4" />
                                {/*<img src="https://res.cloudinary.com/streakyfly/image/upload/c_limit,w_640/f_auto/q_auto/cld-sample-2?_a=BAVCr+DW0" alt={project.imageID} className="object-cover rounded-md" />*/}
                            </div>
                            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                            <p className="text-gray-200">{project.description}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
