"use client";

import PokedexShell from "@/components/PokedexShell";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchForm() {
    const router = useRouter();
    const params = useSearchParams();
    const mode = params.get("search") as "id" | "name" | null;

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!query.trim() || !mode) return;

        switch (mode) {
            case "id":
                if (!isNaN(Number(query))) {
                    router.push(`/pokedex/pokemon/${query.trim()}`);
                }
                break;
            case "name":
                const res = await fetch(`/api/search/pokemon?name=${query}`);
                const data = await res.json();
                setResults(data);
                break;
        }
    }

    return (
        <PokedexShell showBack>
            <div className="flex flex-col items-center justify-center gap-6 w-full">
                <h1 className="text-3xl font-pokemon text-red-700 drop-shadow-md">
                    Pokédex Search
                </h1>

                {/* Als er nog geen resultaten zijn → toon formulier */}
                {results.length === 0 ? (
                    <>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col items-center gap-4 bg-gray-100 border-4 border-gray-400 rounded-xl shadow-lg p-6 w-full max-w-lg"
                        >
                            <input
                                type="text"
                                placeholder={
                                    mode === "id"
                                        ? "Enter Pokémon ID..."
                                        : "Enter Pokémon name..."
                                }
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="flex-1 p-3 font-pokemon border-2 border-gray-400 rounded-md 
                           focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800"
                            />

                            <button
                                type="submit"
                                className="px-6 py-3 bg-red-600 text-white font-pokemon text-lg 
                           rounded-full border-4 border-red-800 shadow-md 
                           hover:bg-red-700 hover:scale-105 transition-transform"
                            >
                                Go!
                            </button>
                        </form>

                        <p className="text-xs text-gray-600 font-pokemon italic">
                            {mode === "id" &&
                                "🔎 Search by Pokémon National ID (1–1010)"}
                            {mode === "name" &&
                                "🔎 Search by Pokémon name (e.g. Pikachu)"}
                        </p>
                    </>
                ) : (
                    // Resultaten weergave
                    <div className="bg-white border-4 border-gray-300 rounded-xl shadow-lg p-4 w-full max-w-lg flex flex-col">
                        <h2 className="text-lg font-pokemon mb-3 text-gray-800">
                            Results
                        </h2>
                        <div className="flex-1   pr-2">
                            {results.map((p) => (
                                <button
                                    key={p.apiId}
                                    onClick={() =>
                                        router.push(
                                            `/pokedex/pokemon/${p.apiId}`
                                        )
                                    }
                                    className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition"
                                >
                                    <div className="relative w-10 h-10">
                                        <Image
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.apiId}.png`}
                                            alt={p.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <span className="capitalize font-pokemon text-gray-800">
                                        {p.name}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Back knop */}
                        <div className="mt-4 flex justify-center">
                            <button
                                onClick={() => {
                                    setResults([]);
                                    setQuery("");
                                }}
                                className="px-4 py-2 bg-gray-200 text-gray-800 font-pokemon 
                           rounded-md border-2 border-gray-400 
                           hover:bg-gray-300 transition"
                            >
                                ← Back to Search
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </PokedexShell>
    );
}
