import { NextResponse } from 'next/server';
import { projectService } from '@/database/services';

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const newProject = await projectService.createProject(data);

        return NextResponse.json({ success: true, data: newProject }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: 'Failed to add project', error: error.message }, { status: 500 });
    }
}
