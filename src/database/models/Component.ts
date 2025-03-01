import { Schema } from 'mongoose';
import { BaseComponent } from '@/types/component';

export const ComponentSchema = new Schema<BaseComponent<string>>({
    id: { type: String, required: true },
    type: { type: String, required: true },
    style: { type: Schema.Types.Mixed, required: false },
}, {
    _id: false,
    strict: false,  // allow flexibility for future components
});
