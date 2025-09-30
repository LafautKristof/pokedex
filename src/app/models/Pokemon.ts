import mongoose from "mongoose";

const PokemonSchema = new mongoose.Schema({
    apiId: { type: Number, unique: true },
    name: String,
    data: Object, // volledige /pokemon data
    species: Object, // /pokemon-species data
    evolution_chain: Object, // /evolution-chain data
    type_relations: Array,
});

export default mongoose.models.Pokemon ||
    mongoose.model("Pokemon", PokemonSchema);
