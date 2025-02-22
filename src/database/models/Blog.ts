import mongoose, { Schema, Document, Model } from 'mongoose';
import { ComponentUnion, ComponentSchema } from './Component';

/**
 * OPTIONAL BLOG PROPERTIES:
 * - when did I start this project and when did I finish it: Date? (if it's a project)
 * - youtube video URL: string
 * - github repo URL: string
 * - project URL: string (e.g. live demo)
 * - collaborators: string[]
 * - notes (private): string (e.g. "This project was a pain to work on because of X, Y, Z")
 *
 * And possibly more...
 */

export interface Blog extends Document {
    title: string;
    description: string;
    coverImage: string;  // Cloudinary image ID or URL to image
    slug: string;
    status: 'draft' | 'private' | 'public';
    tags?: string[];
    createdAt: Date;  // automatically added by mongoose
    updatedAt: Date;  // automatically added by mongoose
    __v: number;      // automatically added by mongoose
    components: ComponentUnion[];
}

const BlogSchema = new Schema<Blog>({
    title: { type: String, required: true, },
    description: { type: String, required: true, },
    coverImage: { type: String, required: true, },
    slug: {
        type: String,
        required: false,
        unique: true,
        sparse: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['draft', 'private', 'public'],
        default: 'draft',
    },
    tags: { type: [String], required: false, },
    components: { type: [ComponentSchema], required: false, },
    },
    {
        timestamps: true,
        versionKey: '__v',
        strict: true,
        _id: true,
    }
);

const Blog: Model<Blog> = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
export default Blog;
