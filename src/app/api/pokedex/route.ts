import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongo";
import Pokedex from "@/app/models/Pokedex";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return NextResponse.json([], { status: 200 });
    }

    try {
        const entries = await Pokedex.find({ userId: session.user.id }).lean();

        return NextResponse.json(entries, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json([], { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await connectDB();
    const session = await getServerSession(authOptions);
    const { pokemonId } = await req.json();

    if (!session?.user?.id || !pokemonId) {
        return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    try {
        const entry = await Pokedex.findOneAndUpdate(
            { userId: session.user.id, pokemonId },
            { $setOnInsert: { userId: session.user.id, pokemonId } },
            { upsert: true, new: true }
        );

        return NextResponse.json(entry, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
}
