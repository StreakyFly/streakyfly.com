import { ParagraphComponent } from '@/types/component';

export default function ParagraphEdit({
    component,
    onUpdateAction
}: {
    component: ParagraphComponent;
    onUpdateAction: (updates: Partial<ParagraphComponent>) => void;
}) {
    return (
        <textarea
            value={component.text}
            onChange={(e) => onUpdateAction({ text: e.target.value })}
            className="w-full bg-neutral-900"
            autoFocus
        />
    );
}
