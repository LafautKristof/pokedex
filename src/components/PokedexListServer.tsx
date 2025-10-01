// Server component
import { Pokedex as PokedexType } from "@/app/types/PokemonTypes";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PokedexListClient from "./PokedexListClient";
import { connectDB } from "@/app/lib/mongo";
import Pokedex from "@/app/models/Pokedex";

export default async function PokedexListServer() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return <p>Je bent niet ingelogd</p>;
    }

    await connectDB();

    const pokedex = (await Pokedex.find({
        userId: session.user.id,
    }).lean()) as PokedexType[];

    return <PokedexListClient pokedex={pokedex} />;
}
