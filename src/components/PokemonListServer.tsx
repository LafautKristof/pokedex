// Server component
import { Pokedex, PokemonRes } from "@/app/types/types";
import PokemonListClient from "./PokemonListClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function PokemonListServer() {
    const session = await getServerSession(authOptions);

    const resPokemons = await fetch(
        `http://localhost:3000/api/pokemon?page=1&limit=20`,
        { next: { tags: ["pokemon"] }, cache: "force-cache" }
    );
    const pokemons: PokemonRes[] = await resPokemons.json();

    const resPokedex = await fetch(`http://localhost:3000/api/pokedex`, {
        next: { tags: ["pokedex"] },
    });
    const pokedex: Pokedex[] = await resPokedex.json();
    console.log("pokedex in servercompontent", pokedex);
    return (
        <PokemonListClient
            initialPokemons={pokemons}
            pokedex={pokedex}
            userId={session?.user?.id ?? null}
        />
    );
}
