import { useBlogStore } from '@/stores/useBlogStore';
import { componentRegistry } from '@/components/blog/components';
import EditableWrapper from '@/components/blog/components/EditableWrapper';

export default function EditableBlogComponentRenderer({
                                                          editingComponentId,
                                                          setEditingComponentId
                                                      }: {
    editingComponentId: string | null;
    setEditingComponentId: (id: string | null) => void;
}) {
    const { blog, updateComponent } = useBlogStore();

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            {blog.components?.map((component) => (
                <EditableWrapper
                    key={component.id}
                    isEditing={editingComponentId === component.id}
                    onToggleEditingAction={(editing) =>
                        editing
                            ? setEditingComponentId(component.id)
                            : setEditingComponentId(null)
                    }
                    viewComponent={componentRegistry[component.type].View}
                    editComponent={componentRegistry[component.type].Edit}
                    component={component}
                    onUpdateAction={(updates) => updateComponent(component.id, updates)}
                />
            ))}
        </div>
    );
}
