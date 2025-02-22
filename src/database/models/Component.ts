import { Schema } from 'mongoose';

// TODO: #################################################################################
// TODO: ## WARNING! Changing these interfaces may break rendering of older blog posts! ##
// TODO: #################################################################################


export type ComponentUnion =
    | ParagraphComponent
    | ImageComponent
    ;

export interface BaseComponent {
    id: string;
    type: string;
    style?: Record<string, any>;
}

export const ComponentSchema = new Schema<BaseComponent>({
    id: { type: String, required: true },
    type: { type: String, required: true },
    style: { type: Schema.Types.Mixed, required: false },
}, {
    _id: false,
    strict: false,  // allow flexibility for future components
});


// Component Interfaces
export interface ParagraphComponent extends BaseComponent {
    type: 'paragraph';
    text: string;
}

export interface ImageComponent extends BaseComponent {
    type: 'image';
    src: string;
    alt: string;
}
