"use client";
import { PokemonRes } from "@/app/types/types";
import Link from "next/link";
import DPad from "./DPad";
import ActionButtons from "./ActionButtons";
import StartSelectButtons from "./StartSelectButton";
import { getPastelColor } from "@/app/helpers/pastelColor";
import Image from "next/image";
import { typeIcons } from "@/app/helpers/typeIcons";
import { TypeBadge } from "./TypeBadge";

export default function Pokedex({
    pokemon,
    prevName,
    nextName,
}: {
    pokemon: PokemonRes;
    prevName?: string;
    nextName?: string;
}) {
    const bgColor = getPastelColor(pokemon.name);
    console.log(
        "pokemon",
        pokemon.data.types.map((t) => t.type.name)
    );
    return (
        <div className="flex justify-center items-center ">
            <div className="bg-red-600 rounded-2xl shadow-2xl w-[50vw] p-8 border-8 border-red-800 relative">
                {/* Scherm */}
                <div className="bg-gray-200 rounded-lg p-4 border-4 border-gray-400 h-60 grid grid-cols-2 gap-4">
                    {/* Linkerkant: sprite */}
                    <div
                        className="flex flex-col items-center justify-around rounded-md shadow-inner"
                        style={{ backgroundColor: bgColor }}
                    >
                        <h2 className="text-xl font-bold capitalize">
                            {pokemon.name}
                        </h2>
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
                            className="object-contain"
                        />
                    </div>

                    {/* Rechterkant: details */}
                    <div
                        className="flex flex-col justify-center  rounded-md p-3
                    "
                        style={{ backgroundColor: bgColor }}
                    >
                        {pokemon.data.types.map((t) => (
                            <TypeBadge key={t.type.name} type={t.type.name} />
                        ))}
                        <p className="text-gray-600">#{pokemon.apiId}</p>
                        <div className="flex gap-2 mt-2 flex-wrap"></div>
                    </div>
                </div>
                {/* Navigatie knoppen */}
                <div className="mt-6 flex justify-between">
                    <DPad prevName={prevName} nextName={nextName} />
                    <StartSelectButtons />
                    <ActionButtons />
                </div>
                {/* Decoratieve knoppen */}
                <div className="absolute top-2 left-2 flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-400 border-2 border-white"></div>
                    <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                    <div className="w-4 h-4 rounded-full bg-green-400"></div>
                    <div className="w-4 h-4 rounded-full bg-red-400"></div>
                </div>
            </div>
        </div>
    );
}
