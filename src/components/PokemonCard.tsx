"use client";
import { catchPokemon, releasePokemon } from "@/app/actions/pokedex";
import { getTypeBadgeColor } from "@/app/helpers/typeColors";
import { PokemonRes } from "@/app/types/types";
import Link from "next/link";
import Image from "next/image";
import PokemonButton from "./PokemonButton";
import { getSprite } from "@/app/helpers/getSprites";

const PokemonCard = ({
    pokemon,
    caught,
    userId,
}: {
    pokemon: PokemonRes;
    caught: boolean;
    userId?: string | null;
}) => {
    console.log("userId in pokemoncard", typeof userId);
    return (
        <>
            <div className="bg-gray-300 rounded-xl shadow p-4 flex flex-col items-center aspect-[7/10] w-full border-4 border-gray-400 hover:cursor-pointer hover:animate-pulse">
                <div>
                    <Link href={`/pokemon/${pokemon.name}`}>
                        <Image
                            src={getSprite(pokemon)}
                            alt={pokemon.name}
                            width={200}
                            height={200}
                        />
                    </Link>
                    <span className="capitalize mt-2 font-bold text-black ">
                        {pokemon.name}
                    </span>

                    <div className="flex gap-2 mt-2">
                        {pokemon.data.types.map((t) => (
                            <span
                                key={t.type.name}
                                className={`
                                px-2 py-1 text-xs rounded capitalize text-white
                                ${getTypeBadgeColor(t.type.name)}
                            `}
                            >
                                {t.type.name}
                            </span>
                        ))}
                    </div>
                </div>{" "}
                <form action={caught ? releasePokemon : catchPokemon}>
                    <input type="hidden" name="id" value={pokemon.apiId} />
                    <input type="hidden" name="userId" value={userId ?? ""} />
                    <PokemonButton
                        text={caught ? "Release" : "Catch"}
                        caught={caught}
                    />
                </form>
            </div>{" "}
        </>
    );
};
export default PokemonCard;
