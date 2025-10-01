"use client";
import { PokemonRes, Pokedex as PokedexType } from "@/app/types/PokemonTypes";
import { useCallback, useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";

const PokemonListClient = ({
    initialPokemons,
    pokedex,
    userId,
}: {
    initialPokemons: PokemonRes[];
    pokedex: PokedexType[];
    userId?: string | null;
}) => {
    const [pokemonsState, setPokemonsState] = useState(initialPokemons);
    const [pokedexState, setPokedexState] = useState(pokedex);
    const [page, setPage] = useState(2);
    const [loading, setLoading] = useState(false);

    const loadMore = useCallback(async () => {
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
    }, [loading, page]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 200
            ) {
                loadMore();
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loadMore]);
    return (
        <div className="grid gap-4 p-4 grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {pokemonsState.map((pokemon) => (
                <PokemonCard
                    key={pokemon.apiId}
                    pokemon={pokemon}
                    caught={pokedexState.some(
                        (p) => p.pokemonId === pokemon.apiId
                    )}
                    userId={userId}
                    onCatch={() =>
                        setPokedexState((prev) => [
                            ...prev,
                            {
                                _id: `temp-${pokemon.apiId}`,
                                pokemonId: pokemon.apiId,
                                userId: userId!,
                                caughtAt: new Date(),
                            } as PokedexType,
                        ])
                    }
                    onRelease={() =>
                        setPokedexState((prev) =>
                            prev.filter((p) => p.pokemonId !== pokemon.apiId)
                        )
                    }
                />
            ))}
        </div>
    );
};

export default PokemonListClient;
