import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongo";
import Type from "@/app/models/Type";
import { getAllTypes } from "@/app/queries/getAllTypes";

export async function GET(request: Request) {
    await connectDB();
    const types = await getAllTypes();
    return NextResponse.json({ types });
}
