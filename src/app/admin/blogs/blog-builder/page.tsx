import { blogService } from '@/database/services';
import BlogBuilder from './BlogBuilderClient';

export default async function BlogBuilderPage({ searchParams, }: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const editSlug = (await searchParams).filters;
    const initialData = typeof editSlug === 'string'
        ? await blogService.getBlog(editSlug)
        : null;

    return <BlogBuilder initialData={initialData} />;
}
