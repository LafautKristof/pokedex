import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongo";

import { getAllTypes } from "@/app/queries/getAllTypes";

export async function GET() {
    await connectDB();
    const types = await getAllTypes();
    return NextResponse.json({ types });
}
