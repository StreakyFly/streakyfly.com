import { projectService } from '@/database/services';
import Link from 'next/link';
import { CldImage } from '@/components/CldWrapper';

export default async function ProjectsPage() {
    const projects = await projectService.getProjects('-_id slug title description imageID');

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Projects</h1>
            <Link href="/admin/projects/post-builder" className="text-blue-500 hover:underline mb-8 inline-block text-xl">Create New Project</Link>
            <ul className="space-y-4">
                {projects.map((project) => (
                    <li key={project.slug} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
                        <div className="flex items-center space-x-4">
                            <CldImage src={project.imageID} alt={project.imageID} width="64" height="64" style={{ width: "64px", height: "64px" }} className="object-cover rounded-md w-full h-48" />
                            <div>
                                <h2 className="text-xl font-semibold">{project.title}</h2>
                                <p className="text-gray-600">{project.description}</p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <Link href={`/admin/projects/post-builder/${project.slug}`} className="text-blue-500 hover:underline">Edit</Link>
                            <button className="text-red-500 hover:underline">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}