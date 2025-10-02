import { connectDB } from "@/app/lib/mongo";
import Type from "@/app/models/Type";

export async function GET(req: Request) {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const name = searchParams.get("name") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    const skip = (page - 1) * limit;

    const types = await Type.find({
        name: { $regex: name, $options: "i" },
    })
        .skip(skip)
        .limit(limit)
        .lean();

    const total = await Type.countDocuments({
        name: { $regex: name, $options: "i" },
    });

    return Response.json({
        types,
        hasMore: skip + types.length < total,
    });
}
