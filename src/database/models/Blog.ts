import mongoose, { Schema, Document, Model } from 'mongoose';
import { ComponentUnion, ComponentSchema } from './Component';

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

export interface Blog extends Document {
    title: string;
    description: string;
    coverImage: string;  // Cloudinary image ID or URL to image
    slug: string;
    status: BlogStatus;
    types: BlogType[];
    tags: string[];
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
        enum: Object.values(BlogStatus),
        default: BlogStatus.Draft,
    },
    types: {
        type: [String],
        required: true,
        enum: Object.values(BlogType),
    },
    tags: {
        type: [String],
        required: true,
    },
    components: {
        type: [ComponentSchema],
        required: false,
    },
    }, {
        timestamps: true,
        versionKey: '__v',
        strict: true,
        _id: true,
    }
);

const Blog: Model<Blog> = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
export default Blog;
