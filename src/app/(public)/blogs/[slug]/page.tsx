import { notFound } from 'next/navigation';
import { blogService } from '@/database/services';
import BlogComponentRenderer from '@/components/blog/BlogComponentRenderer';
import { CldImage } from '@/components/CldWrapper';
import { getCloudinaryImageUrl } from '@/utils/cloudinary';

// If user visits invalid/not pre-rendered path (e.g. \blog\i-dont-exist-or-was-just-added-to-db),
// they should see a 404 - Not Found page -- it should **NOT** connect to the database, attempt to fetch
// the blog data and generate the page for them. Setting dynamicParams to false accomplishes this.
// However, if we want to revalidatePath() for this route, we need to set dynamicParams to true, or remove it.
// Because being able to revalidatePath() for this route is more important than saving
// some database queries, we'll comment out "export const dynamicParams = false" for now.
// TODO: Find a way to allow revalidation for this route, without connecting to
//  the database for invalid/new/not-yet-rendered slugs.
// export const dynamicParams = false;

export async function generateStaticParams() {
    const blogs = await blogService.getPublicBlogs('slug');

    return blogs.map((blog) => ({
        slug: blog.slug,
    }));
}

// TODO: we call the database (.getBlog) twice, once for generateMetadata() and once
//  for the BlogPage() component - can we optimize this, so it's only called once?
export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const blog = await blogService.getPublicBlog(params.slug, '-_id title description coverImage createdAt');

    if (!blog) {
        return {
            title: 'Blog Not Found',
            description: 'This blog does not exist or has not been published yet.',
            openGraph: {
                images: [{
                    url: '/og/not-found.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'very sad cat in tears, so sad because the page was not found',
                }],
            }
        };
    }

    return {
        title: blog.title,
        description: blog.description,
        openGraph: {
            images: [{
                url: getCloudinaryImageUrl(blog.coverImage),
                width: 1200,
                height: 630,
                alt: blog.title,  // TODO: replace with blog.coverImageAlt or smt like that
            }],
            publishedTime: blog.createdAt.toISOString(),
        }
    };
}

export default async function BlogPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const blog = await blogService.getPublicBlog(params.slug, '-_id -__v -slug -tags');

    if (!blog) {
        return notFound();
    }

    return (
        <div>
            <h1>{blog.title}</h1>
            {/* image should have alt attribute in db, in case coverImage isn't good enough */}
            <CldImage src={blog.coverImage} alt="Should alt be blog.alt? Should I add alt to blog interface & schema?" width="512" height="512" style={{ width: "auto", height: "auto" }} />
            <p>{blog.description}</p>

            {/* Blog Content Renderer */}
            {blog.components?.length > 0 ? (
                <BlogComponentRenderer components={blog.components} />
            ) : (
                <div className="text-center py-12 text-muted-foreground">
                    This blog post doesn&#39;t have any content yet.
                </div>
            )}
        </div>
    );
}
