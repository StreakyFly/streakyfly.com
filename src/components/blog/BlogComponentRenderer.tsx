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




// 'use client';
//
// import { useBlogStore } from '@/stores/useBlogStore';
// import { ComponentUnion } from '@/types/component';
//
// export default function BlogComponentRenderer() {
//     const components = useBlogStore(state => state.blog.components);
//     const { updateComponent, deleteComponent } = useBlogStore();
//
//     return (
//         <div className="space-y-4 max-w-2xl mx-auto">
//             {components.map((component) => (
//                 <div key={component.id} className="group relative">
//                     <ComponentSwitch
//                         component={component}
//                         onUpdate={updateComponent}
//                     />
//                     <button
//                         onClick={() => deleteComponent(component.id)}
//                         className="absolute -right-8 top-0 opacity-0 group-hover:opacity-100 text-red-500"
//                     >
//                         ×
//                     </button>
//                 </div>
//             ))}
//         </div>
//     );
// }
//
// function ComponentSwitch({ component, onUpdate }: {
//     component: ComponentUnion;
//     onUpdate: (id: string, updates: Partial<ComponentUnion>) => void;
// }) {
//     switch(component.type) {
//         case 'paragraph':
//             return (
//                 <div
//                     contentEditable
//                     className="p-4 border rounded hover:bg-gray-50 outline-none"
//                     onBlur={(e) => onUpdate(component.id, {
//                         text: e.currentTarget.innerHTML
//                     })}
//                     dangerouslySetInnerHTML={{ __html: component.text }}
//                 />
//             );
//
//         case 'image':
//             return (
//                 <div className="space-y-2">
//                     <input
//                         type="text"
//                         value={component.src}
//                         onChange={(e) => onUpdate(component.id, { src: e.target.value })}
//                         placeholder="Image URL"
//                         className="w-full p-2 border rounded"
//                     />
//                     <input
//                         type="text"
//                         value={component.alt}
//                         onChange={(e) => onUpdate(component.id, { alt: e.target.value })}
//                         placeholder="Alt text"
//                         className="w-full p-2 border rounded"
//                     />
//                 </div>
//             );
//
//         default:
//             return null;
//     }
// }
