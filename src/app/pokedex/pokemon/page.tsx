"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PokedexShell from "@/components/PokedexShell";
import { PokemonRes } from "@/app/types/PokemonTypes";
import { typeColors } from "@/app/helpers/typeIcons";
import Image from "next/image";

export default function Page() {
    const [pokemons, setPokemons] = useState<PokemonRes[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const limit = 20;

    async function fetchPokemons(page: number) {
        setLoading(true);
        const res = await fetch(`/api/pokemon?page=${page}&limit=${limit}`, {
            cache: "no-store",
        });
        const data: PokemonRes[] = await res.json();
        setPokemons((prev) => {
            const existingIds = new Set(prev.map((p) => p.apiId));
            const newOnes = data.filter((p) => !existingIds.has(p.apiId));
            return [...prev, ...newOnes];
        });
        setLoading(false);
    }

    useEffect(() => {
        fetchPokemons(page);
    }, [page]);

    return (
        <PokedexShell showHint={false} showBack>
            <div className="relative w-full h-full flex flex-col overflow-x-hidden">
                <div className="flex-1 pb-24">
                    <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-20">
                        {pokemons.map((pokemon) => (
                            <Link
                                key={pokemon.apiId}
                                href={`/pokedex/pokemon/${pokemon.apiId}`}
                                className="flex flex-col items-center"
                            >
                                <div
                                    className="relative w-24 h-24 drop-shadow-lg"
                                    style={{
                                        backgroundColor:
                                            typeColors[
                                                pokemon.name.toLowerCase()
                                            ],
                                    }}
                                >
                                    <Image
                                        src={
                                            pokemon.data.sprites.other[
                                                "official-artwork"
                                            ]?.front_default ??
                                            "/placeholder.png"
                                        }
                                        alt={pokemon.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <p className="font-pokemon text-sm">
                                    {pokemon.name}
                                </p>
                            </Link>
                        ))}
                    </div>

                    <div className="  flex justify-center mb-10">
                        <button
                            disabled={loading}
                            onClick={() => setPage((prev) => prev + 1)}
                            className="px-6 py-2 bg-red-600 text-white font-pokemon rounded-full border-4 border-red-900 shadow-md hover:bg-red-700 transition disabled:opacity-50"
                        >
                            {loading ? "Loading..." : "Load more"}
                        </button>
                    </div>
                </div>
            </div>
        </PokedexShell>
    );
}
