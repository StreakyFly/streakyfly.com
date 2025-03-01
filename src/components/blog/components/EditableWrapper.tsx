'use client';

import React from 'react';

export default function EditableWrapper({
    viewComponent: View,
    editComponent: Edit,
    component,
    onUpdateAction,
    isEditing,
    onToggleEditingAction
}: {
    viewComponent: React.ComponentType<{ component: any }>;
    editComponent: React.ComponentType<{
        component: any;
        onUpdateAction: (updates: any) => void
    }>;
    component: any;
    onUpdateAction: (updates: any) => void;
    isEditing: boolean;
    onToggleEditingAction: (editing: boolean) => void;
}) {
    return (
        <div
            onClick={() => onToggleEditingAction(true)}
            // This gets called before the click-outside handler in BlogBuilderClient.tsx,
            //  meaning the blog-components layout shifts before the click-outside handler checks
            //  on which element/component the click happened. So if you want "tabbing" between
            //  components to work, you need to figure something out :)
            // onBlur={() => onToggleEditingAction(false)}
        >
            {isEditing ? (
                <div className="p-2 border-2 border-blue-500">
                    <Edit component={component} onUpdateAction={onUpdateAction} />
                </div>
            ) : (
                <View component={component} />
            )}
        </div>
    );
}
