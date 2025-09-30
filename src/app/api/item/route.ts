import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongo";

import { getAllItem } from "@/app/queries/getAllItems";

export async function GET(req: Request) {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;
    console.log("page", page, "limit", limit, "skip", skip); // 👈 debug
    const items = await getAllItem({ limit, skip });

    return NextResponse.json(items);
}
