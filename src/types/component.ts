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
    // TODO: this won't store text as one, but rather paragraph segments, so each part/segment can have
    //   its own style, and we don't want duplication, so styles will be stored in a separate object as well.
    //  And to make styles between blogs more consistent, we'll have global styles as well, that will be stored
    //   in a database separately.
    //  Btw, the default text that will be used most of the time should NOT store any styles. The default styles
    //   should be set in the renderer and that's it.
    text: string;
    // fontSize?: number;
    // fontFamily?: string;
    // fontWeight?: number;
    // fontStyle?: string;
    // color?: string;
    // backgroundColor?: string;
    // textDecoration?: string;
    // lineHeight?: number;
}

export interface ImageComponent extends BaseComponent<'image'> {
    src: string;
    alt: string;
}
