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


// Component Interfaces
export interface ParagraphComponent extends BaseComponent {
    type: 'paragraph';
    text: string;
    fontSize?: string;
}

export interface ImageComponent extends BaseComponent {
    type: 'image';
    src: string;
    alt: string;
}
