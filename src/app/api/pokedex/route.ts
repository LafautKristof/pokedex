// app/api/pokedex/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongo";
import Pokedex from "@/app/models/Pokedex";

export async function GET() {
    await connectDB();
    try {
        const entries = await Pokedex.find().lean();
        return NextResponse.json(entries, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    await connectDB();
    const body = await req.json();
    const { userId, pokemonId } = body;

    if (!userId || !pokemonId) {
        return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    try {
        const newEntry = await Pokedex.create({ userId, pokemonId });
        return NextResponse.json(newEntry, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}
