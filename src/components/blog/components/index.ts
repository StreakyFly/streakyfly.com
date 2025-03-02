import React from 'react';
import { ComponentUnion } from '@/types/component';

// Components
import ParagraphView from './Paragraph/View';
import ParagraphEdit from './Paragraph/Edit';
import ParagraphSettings from './Paragraph/Settings';
import ImageView from './Image/View';
import ImageEdit from './Image/Edit';
import ImageSettings from './Image/Settings';

type ComponentRegistry = {
    [key: string]: {
        View: React.ComponentType<any>;
        Edit: React.ComponentType<any>;
        Settings: React.ComponentType<any>;
    };
};

export const componentRegistry: ComponentRegistry = {
    paragraph: {
        View: ParagraphView,
        Edit: ParagraphEdit,
        Settings: ParagraphSettings
    },
    image: {
        View: ImageView,
        Edit: ImageEdit,
        Settings: ImageSettings
    }
} satisfies {
    [K in ComponentUnion['type']]: {
        View: React.ComponentType<{ component: Extract<ComponentUnion, { type: K }> }>;
        Edit: React.ComponentType<{
            component: Extract<ComponentUnion, { type: K }>;
            onUpdateAction: (updates: Partial<Extract<ComponentUnion, { type: K }>>) => void;
        }>;
        Settings: React.ComponentType<{
            component: Extract<ComponentUnion, { type: K }>;
            onUpdateAction: (updates: Partial<Extract<ComponentUnion, { type: K }>>) => void;
        }>;
    };
};
