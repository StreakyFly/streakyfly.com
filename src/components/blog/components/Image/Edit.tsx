import { ImageComponent } from '@/types/component';
import { CldImage } from '@/components/CldWrapper';

export default function ImageEdit({
    component,
    onUpdateAction
}: {
    component: ImageComponent;
    onUpdateAction: (updates: Partial<ImageComponent>) => void;
}) {
    return (
        <CldImage
            src={component.src}
            alt={component.alt}
            width={1200}
            height={630}
            className="rounded-lg"
        />
    )
}
