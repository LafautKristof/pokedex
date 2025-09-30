import mongoose from "mongoose";

const TypeSchema = new mongoose.Schema({
    apiId: { type: Number, unique: true, required: true }, // fix hier
    name: { type: String, required: true },
    damage_relations: { type: Object, required: true },
    pokemon: [{ name: String, url: String }],
});

export default mongoose.models.Type || mongoose.model("Type", TypeSchema);
