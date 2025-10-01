import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongo";

import { getAllPokemon } from "@/app/queries/getAllPokemon";

export async function GET(req: Request) {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const pokemons = await getAllPokemon({ limit, skip });

    return NextResponse.json(pokemons);
}
