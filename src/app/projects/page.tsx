import { projectService } from '@/database/services';

export const metadata = {
    title: 'Projects',
    description: 'Explore my projects',
};

export const revalidate = 5; // TODO: Set to 3600 (1 hour) in production?

export default async function Projects() {
    const projects = await projectService.getProjects('-_id slug title description imageURL createdAt tags');

    if (!projects) {
        return <div>Failed to load projects. Please try again later.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">My Dope AF Projects</h1>
            <p className="text-gray-700 mb-4">the entire page, its design and all displayed projects are a placeholder, if it&apos;s not obvious</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {projects.map((project: any) => (
                    <a key={project.slug} href={`/projects/${project.slug}`} className="block no-underline text-black">
                        <div className="project-card border rounded-lg p-4 shadow-lg">
                            <img src={project.imageURL} alt={project.title} className="w-full h-48 object-cover rounded-md mb-4" />
                            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                            <p className="text-gray-700">{project.description}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
