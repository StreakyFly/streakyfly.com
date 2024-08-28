import { NextResponse } from 'next/server';
import { projectService } from '@/database/services';

// TODO: Temporary solution to upload projects, later I'll build a "proper"
//  blog post system, to write posts more intuitively and with previews.
export async function POST(request: Request) {
    const apiKey = request.headers.get('x-api-key');

    if (apiKey !== process.env.SECRET_KEY) {
        return NextResponse.json({ success: false, message: 'Unauthorized', error: 'Invalid secret key' }, { status: 401 });
    }

    try {
        const data = await request.json();
        const newProject = await projectService.createProject(data);

        return NextResponse.json({ success: true, data: newProject }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: 'Failed to add project', error: error.message }, { status: 500 });
    }
}
