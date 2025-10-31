"use client";

import { ItemsRes } from "@/app/types/ItemsTypes";
import PokedexShell from "@/components/PokedexShell";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SearchFormItem() {
    const router = useRouter();
    const params = useSearchParams();
    const mode = params.get("search") as "id" | "name" | null;

    const [query, setQuery] = useState("");
    const [results, setResults] = useState<ItemsRes[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const loaderRef = useRef<HTMLDivElement | null>(null);

    async function fetchPage(pageNum: number) {
        if (!query.trim() || !mode || loading || !hasMore) return;

        setLoading(true);
        const res = await fetch(
            `/api/search/item?name=${query}&page=${pageNum}&limit=20`
        );
        const data = await res.json();

        setResults((prev) => [...prev, ...data.items]);
        setHasMore(data.hasMore);
        setLoading(false);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const baseUrl =
            process.env.NEXTAUTH_URL ||
            (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");
        if (!query.trim() || !mode) return;
        if (mode === "id") {
            if (!isNaN(Number(query))) {
                router.push(`${baseUrl}/pokedex/item/${query.trim()}`);
            }
        } else if (mode === "name") {
            setResults([]);
            setPage(1);
            setHasMore(true);
            fetchPage(1);
        }
    }

    // Infinite scroll observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    setPage((prev) => prev + 1);
                }
            },
            { rootMargin: "200px" }
        );

        if (loaderRef.current) observer.observe(loaderRef.current);

        return () => observer.disconnect();
    }, [hasMore, loading]);

    // fetch new page when `page` increments
    useEffect(() => {
        if (page > 1) fetchPage(page);
    }, [page]);

    return (
        <PokedexShell showBack>
            <div className="flex flex-col items-center justify-center gap-6 w-full">
                <h1 className="text-3xl font-pokemon text-red-700 drop-shadow-md">
                    Pokédex Search
                </h1>

                {results.length === 0 ? (
                    // Search form
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col items-center gap-4 bg-gray-100 border-4 border-gray-400 rounded-xl shadow-lg p-6 w-full max-w-lg"
                    >
                        <input
                            type="text"
                            placeholder={
                                mode === "id"
                                    ? "Enter Item ID..."
                                    : "Enter Item name..."
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
                ) : (
                    <div className="bg-white border-4 border-gray-300 rounded-xl shadow-lg p-4 w-full max-w-lg flex flex-col">
                        <h2 className="text-lg font-pokemon mb-3 text-gray-800">
                            Results
                        </h2>
                        <div className="flex-1 pr-2">
                            {results.map((item) => (
                                <button
                                    key={item.apiId}
                                    onClick={() =>
                                        router.push(
                                            `/pokedex/item/${item.apiId}`
                                        )
                                    }
                                    className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition cursor-pointer"
                                >
                                    {item.data.sprites?.default ? (
                                        <Image
                                            src={item.data.sprites.default}
                                            alt={item.name}
                                            width={40}
                                            height={40}
                                        />
                                    ) : (
                                        <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
                                            ❓
                                        </div>
                                    )}
                                    <span className="capitalize font-pokemon text-gray-800">
                                        {item.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                        <div
                            ref={loaderRef}
                            className="h-12 flex items-center justify-center font-pokemon"
                        >
                            {loading && <span>Loading more…</span>}
                            {!hasMore && <span>No more results</span>}
                        </div>
                    </div>
                )}
            </div>
        </PokedexShell>
    );
}
