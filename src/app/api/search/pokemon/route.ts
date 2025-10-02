import { connectDB } from "@/app/lib/mongo";
import Pokemon from "@/app/models/Pokemon";

export async function GET(req: Request) {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const name = searchParams.get("name") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "50", 10); // chunk size
    const skip = (page - 1) * limit;

    const pokemons = await Pokemon.find({
        name: { $regex: name, $options: "i" },
        apiId: { $lte: 1010 }, // filter alleen officiële
    })
        .sort({ apiId: 1 })
        .skip(skip)
        .limit(limit)
        .lean();

    const total = await Pokemon.countDocuments({
        name: { $regex: name, $options: "i" },
        apiId: { $lte: 1010 },
    });

    return Response.json({
        pokemons,
        hasMore: skip + pokemons.length < total,
    });
}
