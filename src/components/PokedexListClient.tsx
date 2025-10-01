import { releasePokemon } from "@/app/actions/pokedex";
import { getMyPokemonsInfo } from "@/app/queries/pokedex";
import { Pokedex as PokedexType } from "@/app/types/PokemonTypes";
import Link from "next/link";
import Image from "next/image";

const PokedexListClient = async ({ pokedex }: { pokedex: PokedexType[] }) => {
    const ids = pokedex.map((p) => Number(p.pokemonId));
    const myPokemons = await getMyPokemonsInfo(ids);

    console.log("pokedex", pokedex);
    console.log("myPokemons", myPokemons);
    return (
        <>
            <div className="w-full sticky top-0 z-10 bg-gray-200 flex flex-wrap gap-[1vw] justify-around items-center">
                {myPokemons.map((pokemon, i) => {
                    const sprite =
                        pokemon.data.sprites.other["official-artwork"]
                            ?.front_default ??
                        pokemon.data.sprites.other.dream_world?.front_default ??
                        "/International_Pokémon_logo.png";

                    return (
                        <div
                            key={pokemon.apiId ?? i}
                            className="w-[6vw] h-[6vw] rounded-full 
              bg-[radial-gradient(circle_at_center,white_40%,#ef4444_100%)] 
              border-2 flex items-center justify-center"
                        >
                            <Link href={`/pokedex/pokemon/${pokemon.apiId}`}>
                                <Image
                                    src={sprite}
                                    alt={pokemon.name}
                                    width={80}
                                    height={80}
                                    className="object-contain"
                                />
                            </Link>
                        </div>
                    );
                })}

                {Array.from({ length: 10 - myPokemons.length }).map((_, i) => (
                    <div
                        key={`empty-${i}`}
                        className="w-[6vw] h-[6vw] rounded-full 
            bg-[radial-gradient(circle_at_center,white_40%,#ef4444_100%)] 
            border-2 flex flex-col items-center justify-center"
                    />
                ))}
            </div>
            <div className="bg-blue">
                <form action={releasePokemon}>
                    <button type="submit"></button>
                </form>
            </div>
        </>
    );
};
export default PokedexListClient;
