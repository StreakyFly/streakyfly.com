'use client';  // TODO: the entire page shouldn't be client-side rendered, only the necessary parts - or should it be?

import { revalidate } from '@/actions/revalidate';
import { createBlog } from '@/actions/blogActions';

export default function BlogBuilder() {
    // TEMPORARY ABSOLUTE GARBAGE POST BUILDER, if I can even call it that - but it works (if you know exactly
    // what to write in the textarea and how to structure it).
    // Example textarea input for a dumbass blog:
    // {
    //     "title": "blog-buildah-eggsampul",
    //     "description": "yo did it actually work on just badjillion-th try??",
    //     "imageID": "cld-sample-3",
    //     "status": "public"
    // }
    const saveBlog = async () => {
        const textArea = document.getElementById('json-input') as HTMLTextAreaElement;

        let jsonData;
        try {
            jsonData = JSON.parse(textArea.value)
        } catch (error) {
            console.error('Error parsing JSON:', error);
            alert('Failed to parse JSON. Fix the JSON format and try again.');
            return;
        }

        try {
            const result = await createBlog(jsonData);

            if (result.success) {
                alert('Blog saved successfully!');
                // Revalidate both the blog page and the blogs page for now
                //  -- later check what things changed, did title, desc and imageID change? If not, revalidating
                //  blogs page might not be necessary. Or if blog status is private, or stuff like that.
                // Perhaps even add a button for manual revalidation in the admin panel?
                // Or will that overcomplicate things for barely any benefit?
                try {
                    await revalidate('/blogs');
                    await revalidate(`/blogs/${result.slug}`);
                } catch (error) {
                    console.error('Failed to revalidate pages:', error);
                    alert('Failed to revalidate pages.\n' + error);
                }
            } else {
                console.error('Failed to save the blog:', result.error);
                alert(`Failed to save the blog.\nError: ${result.error}`);
            }
        } catch (error) {
            console.error('Error saving blog:', error);
            alert('An error occurred while saving the blog.\nError: ' + error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1>Blog Builder</h1>
            <div>
                <textarea
                    id="json-input"
                    placeholder="Write your blog in JSON form here..."
                    className="w-96 h-96 p-4 bg-dark"
                />
            </div>
            <button
                onClick={saveBlog}
                className="bg-blue-600 text-white font-bold py-1.5 px-4 rounded-full transition hover:bg-blue-800"
            >
                Save blog
            </button>
        </div>
    );
}
