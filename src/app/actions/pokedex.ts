"use server";

import { revalidateTag } from "next/cache";
import Pokemon from "../models/Pokemon";
import { connectDB } from "../lib/mongo";
import { PokemonRes } from "../types/PokemonTypes";
import Pokedex from "../models/Pokedex";

export async function catchPokemon(fd: FormData) {
    try {
        await connectDB();
        const pokemonId = parseInt(fd.get("id") as string);
        const userId = fd.get("userId") as string;

        if (!userId || isNaN(pokemonId)) return;

        const count = await Pokedex.countDocuments({ userId });
        if (count >= 10) {
            throw new Error("Je kan maar 10 Pokémon vangen.");
        }

        await Pokedex.create({ userId, pokemonId });

        revalidateTag("pokedex");
    } catch (err) {
        console.error(err);
    }
}

export async function releasePokemon(fd: FormData) {
    const pokemonId = parseInt(fd.get("id") as string);
    const userId = fd.get("userId") as string;
    if (!userId || !pokemonId) return;

    await Pokedex.deleteOne({ userId, pokemonId });
    revalidateTag("pokedex");
}

export async function getMyPokemonsInfo(
    pokemonIds: number[]
): Promise<PokemonRes[]> {
    await connectDB();
    const pokemons: PokemonRes[] = await Pokemon.find(
        { apiId: { $in: pokemonIds } },
        "apiId name data.sprites.other.official-artwork.front_default data.types data.sprites.other.showdown.front_default"
    ).lean<PokemonRes[]>();

    return pokemons;
}

export async function releaseAllPokemon(fd: FormData) {
    await connectDB();
    const userId = fd.get("userId") as string;
    if (!userId) return;

    await Pokedex.deleteMany({ userId });
    revalidateTag("pokedex");
}
