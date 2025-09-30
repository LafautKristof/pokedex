import Pokemon from "@/app/models/Pokemon";
import { connectDB } from "@/app/lib/mongo";
import { PokemonRes } from "@/app/types/PokemonTypes";
import Pokedex from "@/components/Pokedex/Pokedex";

type PokemonDoc = PokemonRes & {
    _id: unknown;
    __v?: number;
};

export default async function Page({ params }: { params: { id: string } }) {
    await connectDB();

    const id = parseInt(params.id, 10); // 👈 id string → nummer
    if (isNaN(id)) return null;

    const rawPokemon = await Pokemon.findOne({ apiId: id }).lean<PokemonDoc>();
    if (!rawPokemon) return null;

    const { _id, __v, ...rest } = rawPokemon;
    const pokemon: PokemonRes = rest;

    return (
        <div className="p-8 flex flex-col justify-start items-center border-4 rounded-full border-gray-400">
            {pokemon && <Pokedex pokemon={pokemon} />}
        </div>
    );
}
