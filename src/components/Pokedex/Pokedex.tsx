"use client";

import { useState } from "react";
import PokedexShell from "../PokedexShell";
import { PokemonRes } from "@/app/types/PokemonTypes";
import { TypeBadge } from "../TypeBadge";
import { EvolutionNode, EvolutionNodeType } from "../EvolutionNode";
import {
    EffectEntries,
    FlavorTextEntries,
    ItemsRes,
} from "@/app/types/ItemsTypes";
import { TypeRes } from "@/app/types/TypeTypes";

import { typeColors, typeIcons } from "@/app/helpers/typeIcons";
import Link from "next/link";
import { getPastelColor } from "@/app/helpers/pastelColor";
import { formatText } from "@/app/helpers/formatText";
import Image from "next/image";
import { catchPokemon, releasePokemon } from "@/app/actions/pokedex";
import PokemonButton from "../PokemonButton";

export default function Pokedex({
    pokemon,
    items,
    type,
    caught = false,
    userId,
}: {
    pokemon?: PokemonRes;
    items?: ItemsRes;
    type?: TypeRes;
    caught?: boolean;
    userId?: string | null;
}) {
    const [viewPokemon, setViewPokemon] = useState<
        "base" | "stats" | "evolving" | "effectiveness"
    >("base");
    const [viewType, setViewType] = useState<"base" | "pokemon">("base");
    const viewsPokemon: ("base" | "stats" | "evolving" | "effectiveness")[] = [
        "base",
        "stats",
        "evolving",
        "effectiveness",
    ];
    const viewsType: ("base" | "pokemon")[] = ["base", "pokemon"];
    const bgColor = getPastelColor(items?.name ?? "");
    const currentIndexPokemon = viewsPokemon.indexOf(viewPokemon);
    const currentIndexType = viewsType.indexOf(viewType);

    function getIdFromUrl(url: string): string {
        const parts = url.split("/").filter(Boolean);
        return parts[parts.length - 1];
    }

    return (
        <PokedexShell
            showHint={false}
            showBack={true}
            showNext={true}
            backHref="/pokedex"
            onBack={() => {
                const prev =
                    (currentIndexType - 1 + viewsType.length) %
                    viewsType.length;
                setViewType(viewsType[prev]);
            }}
            onNext={() => {
                if (pokemon) {
                    const next =
                        (currentIndexPokemon + 1) % viewsPokemon.length;
                    setViewPokemon(viewsPokemon[next]);
                } else if (type) {
                    const next = (currentIndexType + 1) % viewsType.length;
                    setViewType(viewsType[next]);
                }
            }}
        >
            <div className="relative w-full h-full flex flex-col">
                <div className="flex-1 overflow-y-auto pb-24">
                    {pokemon && (
                        <>
                            {viewPokemon === "base" && (
                                <div className="flex-1 flex flex-col items-center gap-4">
                                    <div className="flex items-center justify-around w-full relative">
                                        <div className="relative w-60 h-60">
                                            <Image
                                                src={
                                                    pokemon.data.sprites.other[
                                                        "official-artwork"
                                                    ]?.front_default ??
                                                    pokemon.data.sprites.other
                                                        .dream_world
                                                        ?.front_default ??
                                                    "/placeholder.png"
                                                }
                                                alt={pokemon.name}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>

                                        <div className="mt-2 text-xs text-gray-700 grid grid-cols-2 gap-4">
                                            <div className="space-y-1 pt-2 font-pokemon">
                                                <div className="flex justify-start">
                                                    <p className="font-semibold">
                                                        Height:&nbsp;
                                                    </p>
                                                    <p>
                                                        {pokemon.data.height /
                                                            10}{" "}
                                                        m
                                                    </p>
                                                </div>
                                                <div className="flex justify-start">
                                                    <p className="font-semibold">
                                                        Weight:&nbsp;
                                                    </p>
                                                    <p>
                                                        {pokemon.data.weight /
                                                            10}{" "}
                                                        kg
                                                    </p>
                                                </div>
                                                <div className="flex justify-start">
                                                    <p className="font-semibold">
                                                        Base XP:&nbsp;
                                                    </p>
                                                    <p>
                                                        {
                                                            pokemon.data
                                                                .base_experience
                                                        }
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-2 justify-end items-start font-pokemon">
                                                {pokemon.data.types.map((t) => (
                                                    <TypeBadge
                                                        key={t.type.name}
                                                        type={t.type.name}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <p className="absolute top-2 left-2 text-gray-600 text-md font-semibold font-pokemon">
                                            #{pokemon.apiId}
                                        </p>
                                    </div>
                                    <h1 className="font-pokemon text-3xl text-center">
                                        {pokemon.name}
                                    </h1>
                                    {userId && (
                                        <form
                                            action={
                                                caught
                                                    ? releasePokemon
                                                    : catchPokemon
                                            }
                                        >
                                            <input
                                                type="hidden"
                                                name="id"
                                                value={pokemon.apiId}
                                            />
                                            <input
                                                type="hidden"
                                                name="userId"
                                                value={userId}
                                            />
                                            <PokemonButton caught={caught} />
                                        </form>
                                    )}
                                </div>
                            )}

                            {viewPokemon === "stats" && (
                                <div className="flex-1 flex flex-col items-center p-4 font-pokemon">
                                    <h2 className="text-xl font-bold mb-4">
                                        Stats
                                    </h2>
                                    <ul className="space-y-3 text-sm w-full max-w-md">
                                        {pokemon?.data.stats.map((s) => {
                                            const value = s.base_stat;
                                            const percent = Math.min(
                                                100,
                                                (value / 255) * 100
                                            );
                                            return (
                                                <li key={s.stat.name}>
                                                    <div className="flex justify-between mb-1">
                                                        <span className="capitalize">
                                                            {s.stat.name}
                                                        </span>
                                                        <span className="font-semibold">
                                                            {value}
                                                        </span>
                                                    </div>
                                                    <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full rounded-full bg-green-500"
                                                            style={{
                                                                width: `${percent}%`,
                                                            }}
                                                        />
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}

                            {viewPokemon === "evolving" && (
                                <div className="flex flex-col items-center gap-6 p-6 font-pokemon overflow-hidden">
                                    <h2 className="text-xl font-bold">
                                        Evolution Chain
                                    </h2>
                                    <div className="w-full overflow-x-auto overflow-y-hidden">
                                        <div className="flex items-center gap-6">
                                            <EvolutionNode
                                                node={
                                                    pokemon?.evolution_chain
                                                        .chain as EvolutionNodeType
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {viewPokemon === "effectiveness" &&
                                pokemon?.type_relations && (
                                    <div className="flex-1 flex flex-col items-center p-4 font-pokemon overflow-y-auto">
                                        <h2 className="text-xl font-bold mb-4">
                                            Type Matchups
                                        </h2>

                                        <div className="grid grid-cols-2 gap-6 w-full max-w-2xl text-sm">
                                            <div>
                                                <p className="font-semibold">
                                                    Weak to:
                                                </p>
                                                <div className="flex flex-wrap gap-2 mt-1">
                                                    {Array.from(
                                                        new Set(
                                                            pokemon.type_relations.flatMap(
                                                                (tr) =>
                                                                    tr.damage_relations.double_damage_from.map(
                                                                        (t) =>
                                                                            t.name
                                                                    )
                                                            )
                                                        )
                                                    ).map((name) => (
                                                        <TypeBadge
                                                            key={name}
                                                            type={name}
                                                        />
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <p className="font-semibold">
                                                    Strong against:
                                                </p>
                                                <div className="flex flex-wrap gap-2 mt-1">
                                                    {Array.from(
                                                        new Set(
                                                            pokemon.type_relations.flatMap(
                                                                (tr) =>
                                                                    tr.damage_relations.double_damage_to.map(
                                                                        (t) =>
                                                                            t.name
                                                                    )
                                                            )
                                                        )
                                                    ).map((name) => (
                                                        <TypeBadge
                                                            key={name}
                                                            type={name}
                                                        />
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <p className="font-semibold">
                                                    Resistant to:
                                                </p>
                                                <div className="flex flex-wrap gap-2 mt-1">
                                                    {Array.from(
                                                        new Set(
                                                            pokemon.type_relations.flatMap(
                                                                (tr) =>
                                                                    tr.damage_relations.no_damage_from.map(
                                                                        (t) =>
                                                                            t.name
                                                                    )
                                                            )
                                                        )
                                                    ).map((name) => (
                                                        <TypeBadge
                                                            key={name}
                                                            type={name}
                                                        />
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <p className="font-semibold">
                                                    Not effective against:
                                                </p>
                                                <div className="flex flex-wrap gap-2 mt-1">
                                                    {Array.from(
                                                        new Set(
                                                            pokemon.type_relations.flatMap(
                                                                (tr) =>
                                                                    tr.damage_relations.no_damage_to.map(
                                                                        (t) =>
                                                                            t.name
                                                                    )
                                                            )
                                                        )
                                                    ).map((name) => (
                                                        <TypeBadge
                                                            key={name}
                                                            type={name}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                        </>
                    )}

                    {type && (
                        <div
                            className="relative w-full flex-1 flex flex-col items-center"
                            style={{
                                backgroundColor: typeColors[type.name],
                            }}
                        >
                            <div className="flex-1 w-full overflow-y-auto">
                                {viewType === "base" && (
                                    <>
                                        <div className="flex flex-col items-center py-6">
                                            <div className="relative w-60 h-60">
                                                <Image
                                                    src={
                                                        typeIcons[type.name] ||
                                                        typeIcons["normal"]
                                                    }
                                                    alt={type.name}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                            <p className="text-3xl font-bold text-white font-pokemon">
                                                {type.name}
                                            </p>
                                        </div>
                                    </>
                                )}
                                {viewType === "pokemon" && (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-20 ">
                                        {type?.pokemon.map((p) => {
                                            const id = getIdFromUrl(p.url);
                                            return (
                                                <div
                                                    key={p.name}
                                                    className="flex flex-col items-center"
                                                >
                                                    <Link
                                                        href={`/pokedex/pokemon/${id}`}
                                                        className="capitalize text-sm font-pokemon"
                                                    >
                                                        <div className="relative w-20 h-20">
                                                            <Image
                                                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                                                                alt={p.name}
                                                                fill
                                                                className="object-contain"
                                                            />
                                                        </div>
                                                        {p.name}
                                                    </Link>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}{" "}
                            </div>
                        </div>
                    )}

                    {items && (
                        <div
                            className="relative w-full h-full flex flex-col"
                            style={{ backgroundColor: bgColor }}
                        >
                            {" "}
                            <div className="grid grid-cols-2 ">
                                <div className="flex flex-col items-center">
                                    <div className="relative w-60 h-60">
                                        <Image
                                            src={
                                                items.data.sprites.default ||
                                                "/next.svg"
                                            }
                                            alt={items.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <p className="text-3xl font-bold text-black font-pokemon">
                                        {items.name}
                                    </p>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    {items.data.effect_entries
                                        .filter(
                                            (entry) =>
                                                entry.language.name === "en"
                                        )
                                        .map(
                                            (
                                                entry: EffectEntries,
                                                idx: number
                                            ) => (
                                                <div
                                                    key={idx}
                                                    className="text-sm text-gray-800 space-y-1"
                                                >
                                                    <div className="flex flex-col items-center justify-center text-center font-pokemon">
                                                        <p className="font-semibold align-middle">
                                                            Effect:{" "}
                                                        </p>
                                                        <p>{entry.effect}</p>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    {items.data.flavor_text_entries
                                        .filter(
                                            (entry) =>
                                                entry.language.name === "en"
                                        )
                                        .slice(0, 1)
                                        .map(
                                            (
                                                entry: FlavorTextEntries,
                                                idx: number
                                            ) => {
                                                const safeText =
                                                    entry.flavor_text
                                                        ? entry.flavor_text
                                                              .replace(
                                                                  /\f/g,
                                                                  " "
                                                              )
                                                              .replace(
                                                                  /\u00ad/g,
                                                                  ""
                                                              )
                                                              .replace(
                                                                  /\s+/g,
                                                                  " "
                                                              )
                                                              .trim()
                                                        : "";

                                                return (
                                                    <p
                                                        key={idx}
                                                        className="italic text-gray-600 text-sm pt-4 font-pokemon text-center"
                                                    >
                                                        {formatText(safeText)}
                                                    </p>
                                                );
                                            }
                                        )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PokedexShell>
    );
}
