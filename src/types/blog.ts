import { ComponentUnion } from '@/database/models/Component';

export interface BlogFormData {
    title: string;
    description: string;
    coverImage: string;
    slug: string;
    status: 'draft' | 'private' | 'public';
    tags?: string[];
    components: ComponentUnion[];
}
