import { getSprite } from "@/app/helpers/getSprites";
import Pokedex from "@/app/models/Pokedex";
import { getMyPokemonsInfo } from "@/app/queries/pokedex";
import { PokemonRes, Pokedex as PokedexType } from "@/app/types/types";
import Image from "next/image";

const PokedexListClient = async ({
    initialPokemons,
    pokedex,
    userId,
}: {
    initialPokemons: PokemonRes[];
    pokedex: PokedexType[];
    userId?: string | null;
}) => {
    const myPokemons = await getMyPokemonsInfo(pokedex.map((p) => p.pokemonId));
    const map = myPokemons.map((pokemon) => pokemon.apiId);

    return (
        <div className="w-full bg-gray-200 flex flex-wrap gap-[1vw] justify-around items-center">
            {/* Eerst je eigen pokemons mappen */}
            {myPokemons.map((pokemon, i) => (
                <div
                    key={pokemon.apiId ?? i}
                    className="w-[6vw] h-[6vw] relative rounded-full 
             bg-[radial-gradient(circle_at_center,white_40%,#ef4444_100%)] 
             border-2 flex items-center justify-center"
                >
                    <img
                        src={
                            pokemon.data.sprites.other.showdown
                                ?.front_default ??
                            pokemon.data.sprites.other["official-artwork"]
                                ?.front_default ??
                            pokemon.data.sprites.other.dream_world
                                ?.front_default ??
                            "/International_Pokémon_logo.png"
                        }
                        alt={pokemon.name}
                        className=" object-contain"
                    />
                </div>
            ))}

            {/* De resterende slots vullen tot 10 */}
            {Array.from({ length: 10 - myPokemons.length }).map((_, i) => (
                <div
                    key={`empty-${i}`}
                    className="w-[4vw] h-[4vw] rounded-full 
             bg-[radial-gradient(circle_at_center,white_40%,#ef4444_100%)] 
             border-2 flex flex-col items-center justify-center"
                />
            ))}
        </div>
    );
};
export default PokedexListClient;
