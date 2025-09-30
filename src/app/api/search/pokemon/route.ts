import { connectDB } from "@/app/lib/mongo";
import Pokemon from "@/app/models/Pokemon";

export async function GET(req: Request) {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name") || "";

    const pokemons = await Pokemon.find({
        name: { $regex: name, $options: "i" },
    }).limit(20);

    return Response.json(pokemons);
}
