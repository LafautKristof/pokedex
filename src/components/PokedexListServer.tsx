// Server component
import { Pokedex as PokedexType } from "@/app/types/PokemonTypes";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PokedexListClient from "./PokedexListClient";
import { connectDB } from "@/app/lib/mongo";
import Pokedex from "@/app/models/Pokedex";
import { getMyPokemonsInfo } from "@/app/queries/server/pokedex";

export default async function PokedexListServer() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return <p>Je bent niet ingelogd</p>;
    }

    await connectDB();

    const pokedexDocs = await Pokedex.find({
        userId: session.user.id,
    }).lean();

    // ✅ Converteer naar plain JSON-objects (zonder BSON / ObjectId)
    const pokedex: PokedexType[] = JSON.parse(JSON.stringify(pokedexDocs));
    const ids = pokedex.map((p) => Number(p.pokemonId));
    const myPokemons = await getMyPokemonsInfo(ids);
    const myPokemonPlain = JSON.parse(JSON.stringify(myPokemons));
    return <PokedexListClient myPokemons={myPokemonPlain} />;
}
