import { ImageComponent } from '@/types/component';

export default function ImageEdit({
    component,
    onUpdateAction
}: {
    component: ImageComponent;
    onUpdateAction: (updates: Partial<ImageComponent>) => void;
}) {
    return (
        <div className="bg-neutral-600 p-4 rounded-lg">
            <input
                type="text"
                value={component.src}
                onChange={(e) => onUpdateAction({ src: e.target.value })}
                placeholder="Enter image ID or URL"
                className="w-full p-2 mb-2 border rounded bg-neutral-700"
            />
            <input
                type="text"
                value={component.alt}
                onChange={(e) => onUpdateAction({ alt: e.target.value })}
                placeholder="Enter alt text"
                className="w-full p-2 border rounded bg-neutral-700"
            />
        </div>
    )
}
