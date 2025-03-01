import { ParagraphComponent } from '@/types/component';

export default function ParagraphView({ component }: { component: ParagraphComponent }) {
    return <p className="my-4">{component.text}</p>;
}
