import mongoose, { Schema, Document } from "mongoose";

export interface ItemDoc extends Document {
    apiId: number;
    name: string;
    category: string;
    pocket: string;
    data: Record<string, unknown>;
}

const ItemSchema = new Schema<ItemDoc>({
    apiId: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    pocket: { type: String, required: true },
    data: { type: Schema.Types.Mixed, required: true },
});

export default mongoose.models.Item ||
    mongoose.model<ItemDoc>("Item", ItemSchema);
