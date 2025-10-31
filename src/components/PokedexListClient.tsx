"use client";
import { releasePokemon } from "@/app/actions/pokedex";

import { Pokedex as PokedexType, PokemonRes } from "@/app/types/PokemonTypes";
import Link from "next/link";
import Image from "next/image";

const PokedexListClient = ({ myPokemons }: { myPokemons: PokemonRes[] }) => {
    return (
        <>
            {/* ✅ Responsive container */}
            <div className="w-full sticky top-0 z-10 bg-gray-200 flex flex-wrap gap-2 sm:gap-4 justify-center items-center p-2 sm:p-4">
                {myPokemons.map((pokemon, i) => {
                    const sprite =
                        pokemon.data.sprites.other["official-artwork"]
                            ?.front_default ??
                        pokemon.data.sprites.other.dream_world?.front_default ??
                        "/International_Pokémon_logo.png";

                    return (
                        <div
                            key={pokemon.apiId ?? i}
                            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 
                                rounded-full border-2 
                                bg-[radial-gradient(circle_at_center,white_40%,#ef4444_100%)] 
                                flex items-center justify-center shadow-sm hover:scale-105 transition-transform"
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

                {/* ✅ Vul lege slots op met zelfde grootte */}
                {Array.from({ length: 10 - myPokemons.length }).map((_, i) => (
                    <div
                        key={`empty-${i}`}
                        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 
                            rounded-full border-2 
                            bg-[radial-gradient(circle_at_center,white_40%,#ef4444_100%)] 
                            opacity-30 flex items-center justify-center"
                    />
                ))}
            </div>

            {/* ✅ Optioneel: release-knop */}
            <div className="bg-blue-500 text-center py-4">
                <form action={releasePokemon}>
                    <button
                        type="submit"
                        className="text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition"
                    >
                        Release Pokémon
                    </button>
                </form>
            </div>
        </>
    );
};

export default PokedexListClient;
