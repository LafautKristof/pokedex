import Pokemon from "@/app/models/Pokemon";
import { connectDB } from "@/app/lib/mongo";
import { PokemonRes } from "@/app/types/PokemonTypes";
import Pokedex from "@/components/Pokedex/Pokedex";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PokedexModel from "@/app/models/Pokedex";

type PokemonDoc = PokemonRes & {
    _id: unknown;
    __v?: number;
};

export default async function Page({ params }: { params: { id: string } }) {
    await connectDB();

    const id = parseInt(params.id, 10);
    if (isNaN(id)) return null;

    const rawPokemon = await Pokemon.findOne({ apiId: id })
        .select("-_id -__v")
        .lean<PokemonDoc>();

    if (!rawPokemon) return null;

    const pokemon: PokemonRes = rawPokemon;
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (userId) {
        const entries = await PokedexModel.find({ userId }).lean();
        const pokedexIds = entries.map((e) => Number(e.pokemonId));
        const caught = pokedexIds.includes(pokemon.apiId);
        return (
            <div className="p-8 flex flex-col justify-start items-center border-4 rounded-full border-gray-400">
                {pokemon && (
                    <Pokedex
                        pokemon={pokemon}
                        caught={caught}
                        userId={session.user.id}
                    />
                )}
            </div>
        );
    }
}
