import mongoose from "mongoose";

const PokedexSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    pokemonId: {
        type: Number,
        required: true,
    },
    caughtAt: { type: Date, default: Date.now },
});

PokedexSchema.index({ userId: 1, pokemonId: 1 }, { unique: true });

export default mongoose.models.Pokedex ||
    mongoose.model("Pokedex", PokedexSchema);
