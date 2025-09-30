import PokemonSchema from "@/app/models/Pokemon";
import { PokemonRes } from "../types/PokemonTypes";

export const getAllPokemon = async ({
    skip,
    limit,
}: {
    skip: number;
    limit: number;
}): Promise<PokemonRes[]> => {
    try {
        const pokemons = await PokemonSchema.find(
            {},
            "apiId name data.sprites.front_default data.sprites.other.dreamworld.front_default data.sprites.other.official-artwork.front_default data.sprites.other.showdown.front_default data.types"
        )
            .sort({ apiId: 1 })
            .skip(skip)
            .limit(limit)
            .lean<PokemonRes[]>();

        return pokemons;
    } catch (err) {
        console.error(err);
        return [];
    }
};
