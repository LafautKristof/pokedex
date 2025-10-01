// Server component
import { Pokedex as PokedexType, PokemonRes } from "@/app/types/PokemonTypes";
import PokemonListClient from "./PokemonListClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/app/lib/mongo";
import Pokedex from "@/app/models/Pokedex";

export default async function PokemonListServer() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return <p>Je bent niet ingelogd</p>;
    }

    await connectDB();

    const rawPokedex = await Pokedex.find({
        userId: session.user.id,
    }).lean();

    const pokedex: PokedexType[] = rawPokedex.map((doc) => ({
        _id: String(doc._id),
        userId: String(doc.userId),
        pokemonId: Number(doc.pokemonId),
        caughtAt: new Date(doc.caughtAt ?? Date.now()),
    }));

    const resPokemons = await fetch(
        `http://localhost:3000/api/pokemon?page=1&limit=20`,
        { next: { tags: ["pokemon"] }, cache: "force-cache" }
    );
    const pokemons: PokemonRes[] = await resPokemons.json();
    return (
        <PokemonListClient
            initialPokemons={pokemons}
            pokedex={pokedex}
            userId={session?.user?.id ?? null}
        />
    );
}
