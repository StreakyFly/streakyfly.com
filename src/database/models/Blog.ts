import mongoose, { Schema, Document, Model } from 'mongoose';
import { ComponentSchema } from './Component';
import { BaseBlog, BlogStatus, BlogType } from '@/types/blog';

export interface Blog extends BaseBlog, Document {
    createdAt: Date;  // automatically added by Mongoose
    updatedAt: Date;  // automatically added by Mongoose
    __v: number;      // automatically added by Mongoose
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
    }
);

const Blog: Model<Blog> = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
export default Blog;
