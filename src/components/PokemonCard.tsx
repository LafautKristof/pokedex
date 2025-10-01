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
};

const PokemonCard = ({
    pokemon,
    caught,
    userId,
    onCatch,
    onRelease,
}: PokemonCardProps) => {
    return (
        <div
            className=" relative bg-gray-300 rounded-xl shadow p-4 flex flex-col justify-between items-center 
                w-full border-4 border-gray-400 hover:cursor-pointer hover:animate-pulse min-h-[350px]"
        >
            <div>
                <Link href={`/pokedex/pokemon/${pokemon.apiId}`}>
                    <Image
                        src={getSprite(pokemon)}
                        alt={pokemon.name}
                        width={200}
                        height={200}
                    />
                </Link>
                <span className="capitalize mt-2 font-bold text-black font-pokemon ">
                    {pokemon.name}
                </span>

                <div className="flex gap-2 mt-2 mb-8">
                    {pokemon.data.types.map((t) => (
                        <span
                            key={t.type.name}
                            className={`px-2 py-1 text-xs rounded capitalize text-white font-pokemon ${getTypeBadgeColor(
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
            >
                <input type="hidden" name="id" value={pokemon.apiId} />
                <input type="hidden" name="userId" value={userId ?? ""} />
                <PokemonButton caught={caught} />
            </form>
            <div className="absolute flex top-2 right-2">
                <p className="font-pokemon"> #{pokemon.apiId}</p>
            </div>
        </div>
    );
};

export default PokemonCard;
