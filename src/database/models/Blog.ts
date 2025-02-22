import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * Blog Properties.
 * REQUIRED:
 * - title: string
 * - description: string
 * - cover imageID: string
 * - status: string (public, private, draft)
 * - slug: string (otherwise, use title to generate slug)
 * OPTIONAL:
 * - when did I start this project and when did I finish it: Date? (if it's a project)
 * - tags: string[]
 * - youtube video URL: string
 * - github repo URL: string
 * - project URL: string (e.g. live demo)
 * - body: string (contains the main content of the blog, text, images, styling, etc.)
 * - collaborators: string[]
 * - notes (private): string (e.g. "This project was a pain to work on because of X, Y, Z")
 *
 * And possibly more...
 */

interface IBlog extends Document {
    title: string;
    description: string;
    imageID: string;
    slug: string;
    status: string;
    tags?: string[];
}

const BlogSchema = new Schema<IBlog>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageID: { type: String, required: true },
    slug: { type: String, lowercase: true, required: false, unique: true },
    status: { type: String, required: true, default: 'draft' },
    tags: { type: [String], required: false },
},
    { timestamps: true }
);

const Blog: Model<IBlog> = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

export default Blog;
