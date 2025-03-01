// TODO: #################################################################################
// TODO: ## WARNING! Changing these interfaces may break rendering of older blog posts! ##
// TODO: #################################################################################


export type ComponentUnion =
    | ParagraphComponent
    | ImageComponent
    ;

export interface BaseComponent<T extends string> {
    id: string;
    type: T;
    style?: Record<string, any>;
}


// Component Interfaces
export interface ParagraphComponent extends BaseComponent<'paragraph'> {
    text: string;
    fontSize?: string;
}

export interface ImageComponent extends BaseComponent<'image'> {
    src: string;
    alt: string;
}
