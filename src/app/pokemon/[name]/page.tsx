import Pokemon from "@/app/models/Pokemon";
import { connectDB } from "@/app/lib/mongo";
import { Data, EvolutionChain, PokemonRes, Species } from "@/app/types/types";

import Pokedex from "@/components/Pokedex";

type PokemonDoc = PokemonRes & {
    _id: unknown;
    __v?: number;
};
export default async function Page({ params }: { params: { name: string } }) {
    const rawPokemon = await Pokemon.findOne({
        name: new RegExp(`^${params.name}$`, "i"),
    }).lean<PokemonDoc>();
    if (!rawPokemon) return null;

    const { _id, __v, ...rest } = rawPokemon;
    const pokemon: PokemonRes = rest;

    const MIN_ID = 1;
    const MAX_ID = 1010;

    let prevPokemon = null;
    let nextPokemon = null;

    if (pokemon.apiId > MIN_ID) {
        prevPokemon = await Pokemon.findOne({
            apiId: pokemon.apiId - 1,
        }).lean<PokemonDoc>();
    }

    if (pokemon.apiId < MAX_ID) {
        nextPokemon = await Pokemon.findOne({
            apiId: pokemon.apiId + 1,
        }).lean<PokemonDoc>();
    }

    return (
        <div className="p-8 flex flex-col justify-start items-center border-4 rounded-full border-gray-400">
            {pokemon && (
                <Pokedex
                    pokemon={pokemon}
                    prevName={prevPokemon?.name}
                    nextName={nextPokemon?.name}
                />
            )}
        </div>
    );
}
