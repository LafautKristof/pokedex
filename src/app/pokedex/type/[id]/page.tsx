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
        .select("-_id -__v")
        .lean<TypeDoc>();

    if (!rawType) {
        return null;
    }

    const type: TypeRes = rawType;

    return (
        <div className="p-8 flex flex-col justify-start items-center border-4 rounded-xl border-gray-400">
            {type && <Pokedex type={type} />}
        </div>
    );
}
