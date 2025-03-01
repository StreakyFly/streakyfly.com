import { ImageComponent } from '@/types/component';
import { CldImage } from '@/components/CldWrapper';

export default function ImageView({ component }: { component: ImageComponent }) {
    return (
        <div className="relative group">
            <CldImage
                src={component.src}
                alt={component.alt}
                width={1200}
                height={630}
                className="rounded-lg"
            />
        </div>
    );
}
