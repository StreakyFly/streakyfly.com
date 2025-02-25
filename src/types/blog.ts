import { ComponentUnion } from '@/types/component';

export interface BaseBlog {
    title: string;
    description: string;
    coverImage: string;  // Cloudinary image ID or URL to image
    slug: string;
    status: BlogStatus;
    types: BlogType[];
    tags: string[];
    components: ComponentUnion[];
}

export interface BlogState extends BaseBlog {
    createdAt?: Date;  // only to display in the UI, not editable
    updatedAt?: Date;  // only to display in the UI, not editable
    __v?: number;      // only to display in the UI, not editable
}

export enum BlogStatus {
    Draft = 'draft',
    Private = 'private',
    Public = 'public',
}

export enum BlogType {
    Project = 'project',
    Tutorial = 'tutorial',
    Review = 'review',
    // more to be added...
}
