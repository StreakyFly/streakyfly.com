import { ParagraphComponent } from '@/types/component';

export default function ParagraphSettings({
    component,
    onUpdateAction
}: {
    component: ParagraphComponent;
    onUpdateAction: (updates: Partial<ParagraphComponent>) => void;
}) {
    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">Text</label>
                <textarea
                    value={component.text}
                    onChange={(e) => onUpdateAction({ text: e.target.value })}
                    className="w-full p-2 bg-neutral-700 rounded"
                    rows={4}
                />
            </div>
        </div>
    );
}
