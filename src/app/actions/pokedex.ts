"use server";

import { revalidateTag } from "next/cache";
import {
    addToPokedex,
    countUserPokemons,
    removeFromPokedex,
} from "@/app/queries/pokedex";

export async function catchPokemon(fd: FormData) {
    try {
        console.log("catchPokemon");
        const pokemon = parseInt(fd.get("id") as string);
        const userId = fd.get("userId") as string;

        if (!userId || !pokemon) return;
        const currentCount = await countUserPokemons(userId);
        if (currentCount >= 10) {
            throw new Error("Je kan maar 10 Pokémon vangen.");
        }
        await addToPokedex(pokemon, userId);

        revalidateTag("pokedex");
    } catch (err) {
        console.error(err);
    }
}

export async function releasePokemon(fd: FormData) {
    const pokemon = parseInt(fd.get("id") as string);
    const userId = fd.get("userId") as string;
    if (!userId || !pokemon) return;

    await removeFromPokedex(pokemon, userId);
    revalidateTag("pokedex");
}

// export async function releaseAllPokemon(userId: string) {
//     await removeFromPokedex(null, userId);
//     revalidateTag("pokedex");
// }
