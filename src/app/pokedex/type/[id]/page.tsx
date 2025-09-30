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

    // params.id → number
    const id = parseInt(params.id, 10);
    if (isNaN(id)) return null;

    // 🔑 Gewone findOne (apiId is nu number in DB)
    const rawType = await Type.findOne({ apiId: params.id }).lean<TypeDoc>();

    console.log("params.id (raw)", params.id, typeof params.id);
    console.log("DB apiId voorbeeld:", (await Type.findOne()).apiId);

    if (!rawType) {
        console.log("Geen type gevonden voor id:", id);
        return null;
    }

    // Schoonmaken
    const { _id, __v, ...rest } = rawType;
    const type: TypeRes = rest;
    const cleanType: TypeRes = JSON.parse(JSON.stringify(rest));

    return (
        <div className="p-8 flex flex-col justify-start items-center border-4 rounded-xl border-gray-400">
            {type && <Pokedex type={cleanType} />}
        </div>
    );
}
