// /api/search/item?name=ball&page=1&limit=20

import { connectDB } from "@/app/lib/mongo";
import Item from "@/app/models/Item";

export async function GET(req: Request) {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const name = searchParams.get("name") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    const skip = (page - 1) * limit;

    const items = await Item.find({
        name: { $regex: name, $options: "i" },
    })
        .skip(skip)
        .limit(limit)
        .lean();

    const total = await Item.countDocuments({
        name: { $regex: name, $options: "i" },
    });

    return Response.json({
        items,
        hasMore: skip + items.length < total,
    });
}
