import { connectDB } from "../lib/mongo";
import Pokedex from "../models/Pokedex";
import Pokemon from "../models/Pokemon";
import { Pokedex as PokedexType, PokemonRes } from "../types/types";

export const addToPokedex = async (pokemonId: number, userId: string) => {
    try {
        await Pokedex.create({ userId, pokemonId });
        console.log("pokemon added to pokedex");
    } catch (err) {
        console.error(err);
    }
};

export const removeFromPokedex = async (pokemonId: number, userId: string) => {
    try {
        await Pokedex.deleteOne({ userId, pokemonId });
    } catch (err) {
        console.error(err);
    }
};

export async function getMyPokemonsInfo(
    pokemonIds: number[]
): Promise<PokemonRes[]> {
    console.log("pokemonIds", pokemonIds);
    const pokemons: PokemonRes[] = await Pokemon.find(
        { apiId: { $in: pokemonIds } },
        "apiId name data.sprites.other.official-artwork.front_default data.types data.sprites.other.showdown.front_default"
    ).lean<PokemonRes[]>();
    console.log("pokemons", pokemons);
    return pokemons;
}

export async function countUserPokemons(userId: string): Promise<number> {
    const count = await Pokedex.countDocuments({ userId });
    return count;
}
