import { connectDB } from "@/app/lib/mongo";
import Pokedex from "@/components/Pokedex/Pokedex";
import Type from "@/app/models/Type";
import { TypeRes } from "@/app/types/TypeTypes";

type TypeDoc = TypeRes & {
    _id: unknown;
    __v?: number;
};

export default async function Page({ params }: { params: { id: string } }) {
    await connectDB();

    const id = parseInt(params.id, 10);
    if (isNaN(id)) return null;
    const rawType = await Type.findOne({ apiId: id })
        .select("-__v")
        .lean<TypeDoc>();

    if (!rawType) return null;

    const type: TypeRes = JSON.parse(JSON.stringify(rawType));
    type.pokemon = type.pokemon.filter((p) => {
        const urlId = parseInt(
            p.url.split("/").filter(Boolean).pop() || "0",
            10
        );
        return urlId <= 1010;
    });
    return <Pokedex type={type} />;
}
