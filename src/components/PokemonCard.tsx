"use client";

import { catchPokemon, releasePokemon } from "@/app/actions/pokedex";
import { getTypeBadgeColor } from "@/app/helpers/typeColors";
import { PokemonRes } from "@/app/types/PokemonTypes";
import Link from "next/link";
import Image from "next/image";
import PokemonButton from "./PokemonButton";
import { getSprite } from "@/app/helpers/getSprites";

type PokemonCardProps = {
    pokemon: PokemonRes;
    caught: boolean;
    userId?: string | null;
    onCatch?: () => void;
    onRelease?: () => void;
    disableCatch?: boolean;
};

const PokemonCard = ({
    pokemon,
    caught,
    userId,
    onCatch,
    onRelease,
    disableCatch,
}: PokemonCardProps) => {
    return (
        <div
            className="relative bg-gray-300 rounded-xl shadow-md border-4 border-gray-400 
                 hover:cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-transform 
                 flex flex-col justify-between items-center p-3 sm:p-4 w-full h-full"
        >
            <div className="flex flex-col items-center text-center w-full">
                <Link href={`/pokedex/pokemon/${pokemon.apiId}`}>
                    <div className="w-full flex justify-center">
                        <Image
                            src={getSprite(pokemon)}
                            alt={pokemon.name}
                            width={160}
                            height={160}
                            className="object-contain sm:w-40 sm:h-40 w-28 h-28"
                        />
                    </div>
                </Link>

                <span className="capitalize mt-2 font-bold text-black font-pokemon text-sm sm:text-base md:text-lg">
                    {pokemon.name}
                </span>

                <div className="flex flex-wrap justify-center gap-2 mt-2 mb-4">
                    {pokemon.data.types.map((t) => (
                        <span
                            key={t.type.name}
                            className={`px-2 py-1 text-[10px] sm:text-xs md:text-sm rounded capitalize text-white font-pokemon ${getTypeBadgeColor(
                                t.type.name
                            )}`}
                        >
                            {t.type.name}
                        </span>
                    ))}
                </div>
            </div>

            <form
                action={async (fd) => {
                    if (caught) {
                        await releasePokemon(fd);
                        onRelease?.();
                    } else {
                        await catchPokemon(fd);
                        onCatch?.();
                    }
                }}
                className="w-full flex justify-center"
            >
                <input type="hidden" name="id" value={pokemon.apiId} />
                <input type="hidden" name="userId" value={userId ?? ""} />
                <PokemonButton caught={caught} disabled={disableCatch} />
            </form>

            <div className="absolute top-2 right-2 text-xs  sm:text-sm md:text-base font-pokemon">
                #{pokemon.apiId}
            </div>
        </div>
    );
};

export default PokemonCard;
