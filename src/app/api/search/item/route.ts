import { connectDB } from "@/app/lib/mongo";
import Item from "@/app/models/Item";

export async function GET(req: Request) {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name") || "";

    const items = await Item.find({
        name: { $regex: name, $options: "i" },
    }).limit(20);

    return Response.json(items);
}
