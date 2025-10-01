import Item from "@/app/models/Item";
import { connectDB } from "@/app/lib/mongo";
import { ItemsRes } from "@/app/types/ItemsTypes";
import Pokedex from "@/components/Pokedex/Pokedex";

type ItemDoc = ItemsRes & {
    _id: unknown;
    __v?: number;
};

export default async function Page({ params }: { params: { id: string } }) {
    await connectDB();

    const id = parseInt(params.id, 10);

    if (isNaN(id)) return null;

    const rawItem = await Item.findOne({ apiId: id })
        .select("-_id -__v")
        .lean<ItemDoc>();
    if (!rawItem) return null;

    const item: ItemsRes = rawItem;

    return (
        <div className="p-8 flex flex-col justify-start items-center border-4 rounded-full border-gray-400">
            {item && <Pokedex items={item} />}
        </div>
    );
}
