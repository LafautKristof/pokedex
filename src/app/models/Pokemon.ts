import mongoose from "mongoose";

const PokemonSchema = new mongoose.Schema({
    apiId: { type: Number, unique: true },
    name: String,
    data: Object,
    species: Object,
    evolution_chain: Object,
    type_relations: Array,
});

export default mongoose.models.Pokemon ||
    mongoose.model("Pokemon", PokemonSchema);
