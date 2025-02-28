import { ComponentUnion } from '@/types/component';
import { CldImage } from '@/components/CldWrapper';

interface BlogRendererProps {
    components: ComponentUnion[];
}

const BlogComponentRenderer = ({ components }: BlogRendererProps) => {
    const renderComponent = (component: ComponentUnion) => {
        const componentType = component.type;
        switch (componentType) {
            case 'paragraph':
                return (
                    <p key={component.id} className="my-4">
                        {component.text}
                    </p>
                );

            case 'image':
                return (
                    <figure key={component.id} className="my-8">
                        <CldImage src={component.src} alt={component.alt} width="512" height="512" style={{ width: "auto", height: "auto" }} />
                    </figure>
                );

            default:
                console.warn('Unknown component type:', componentType);
                return null;
        }
    };

    return <div className="max-w-3xl mx-auto">{components.map(renderComponent)}</div>;
};

export default BlogComponentRenderer;
