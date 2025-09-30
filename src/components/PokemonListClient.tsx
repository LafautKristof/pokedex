"use client";

import { PokemonRes, Pokedex as PokedexType } from "@/app/types/PokemonTypes";

import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";

const PokemonList = ({
    initialPokemons,
    pokedex,
    userId,
}: {
    initialPokemons: PokemonRes[];
    pokedex: PokedexType[];
    userId?: string | null;
}) => {
    const [pokemonsState, setPokemonsState] =
        useState<PokemonRes[]>(initialPokemons);
    const [pokedexState, setPokedexState] = useState(pokedex);
    const [page, setPage] = useState(2);
    const [loading, setLoading] = useState(false);

    async function loadMore() {
        if (loading) return;
        setLoading(true);

        const res = await fetch(`/api/pokemon?page=${page}&limit=20`);
        if (!res.ok) {
            setLoading(false);
            return;
        }
        const data: PokemonRes[] = await res.json();

        setPokemonsState((prev) => {
            const merged = [...prev, ...data];
            return merged.filter(
                (p, idx, self) =>
                    idx === self.findIndex((q) => q.apiId === p.apiId)
            );
        });
        setPage((prev) => prev + 1);
        setLoading(false);
    }

    // infinite scroll listener
    useEffect(() => {
        let timeout: NodeJS.Timeout | null = null;

        function handleScroll() {
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (loading) return;
                if (
                    window.innerHeight + window.scrollY >=
                    document.body.offsetHeight - 200
                ) {
                    loadMore();
                }
            }, 200); // wacht 200ms
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, page]);

    return (
        <>
            <div
                className="grid gap-4 p-4grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  xl:grid-cols-6  
  
"
            >
                {pokemonsState.map((pokemon) => (
                    <PokemonCard
                        pokemon={pokemon}
                        key={`${pokemon.apiId}`}
                        caught={pokedex
                            .map((p) => p.pokemonId)
                            .includes(pokemon.apiId)}
                        userId={userId}
                    />
                ))}
            </div>
        </>
    );
};
export default PokemonList;
