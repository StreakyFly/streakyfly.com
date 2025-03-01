import { ComponentUnion } from '@/types/component';
import { componentRegistry } from '@/components/blog/components';

export default function PublicBlogComponentRenderer({ components }: { components: ComponentUnion[] }) {
    return (
        <div className="max-w-3xl mx-auto space-y-8">
            {components.map((component) => {
                const Component = componentRegistry[component.type].View;
                return (
                    <Component
                        key={component.id}
                        component={component}
                    />
                );
            })}
        </div>
    );
}
