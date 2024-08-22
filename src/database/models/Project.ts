import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * Project Properties.
 * REQUIRED:
 * - title: string
 * - description: string
 * - main imageURL: string
 * OPTIONAL:
 * - slug: string (otherwise, use title to generate slug)
 * - when did I start this project and when did I finish it: Date?
 * - tags: string[]
 * - youtube video URL: string
 * - github repo URL: string
 * - project URL: string
 * - body: string (contains the main content of the project, text, images, styling, etc.)
 * - collaborators: string[]
 * - notes (private): string (e.g. "This project was a pain to work on because of X, Y, Z")
 *
 * And possibly more...
 */

interface IProject extends Document {
    title: string;
    description: string;
    imageURL: string;
    slug?: string;
    tags?: string[];
}

const ProjectSchema = new Schema<IProject>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageURL: { type: String, required: true },
    slug: { type: String, lowercase: true, required: false, unique: true },
    tags: { type: [String], required: false },
},
    { timestamps: true }
);

const Project: Model<IProject> = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

export default Project;
