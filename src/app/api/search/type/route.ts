import { connectDB } from "@/app/lib/mongo";
import Type from "@/app/models/Type";

export async function GET(req: Request) {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name") || "";

    const pokemons = await Type.find({
        name: { $regex: name, $options: "i" },
    }).limit(20);

    return Response.json(pokemons);
}
