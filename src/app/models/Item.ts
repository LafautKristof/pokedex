import mongoose, { Schema, Document } from "mongoose";

export interface ItemDoc extends Document {
    apiId: number;
    name: string;
    category: string; // bv. "medicine", "berry", "pokeball"
    pocket: string; // bv. "berries", "medicine", "balls"
    data: any;
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
