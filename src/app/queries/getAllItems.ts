import ItemSchema from "@/app/models/Item";
import { ItemsRes } from "@/app/types/ItemsTypes";
export const getAllItem = async ({
    skip,
    limit,
}: {
    skip: number;
    limit: number;
}): Promise<ItemsRes[]> => {
    try {
        const items = await ItemSchema.find(
            {},
            "apiId name data.sprites.default data.sprites.other.dreamworld.front_default data.sprites.other.official-artwork.front_default data.sprites.other.showdown.front_default data.types"
        )
            .sort({ apiId: 1 })
            .skip(skip)
            .limit(limit)
            .lean<ItemsRes[]>();

        return items;
    } catch (err) {
        console.error(err);
        return [];
    }
};
