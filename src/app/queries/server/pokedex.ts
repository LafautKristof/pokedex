import { connectDB } from "../../lib/mongo";
import Pokemon from "../../models/Pokemon";
import { PokemonRes } from "../../types/PokemonTypes";

export async function getMyPokemonsInfo(
    pokemonIds: number[]
): Promise<PokemonRes[]> {
    await connectDB();
    const pokemons: PokemonRes[] = await Pokemon.find(
        { apiId: { $in: pokemonIds } },
        "apiId name data.sprites data.types"
    ).lean<PokemonRes[]>();

    return pokemons;
}
