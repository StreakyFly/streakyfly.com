'use server';

import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

export async function revalidate(path: string) {
    const session = await auth();
    if (!session || !session.user || session.user.email !== process.env.ADMIN_GOOGLE_EMAIL) {
        console.error('Unauthorized attempt to revalidate path.');
        throw new Error('Unauthorized attempt to revalidate path.');
    }

    revalidatePath(path);
}
