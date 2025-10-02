"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PokedexShell from "@/components/PokedexShell";
import { ItemsRes } from "@/app/types/ItemsTypes";
import { typeColors } from "@/app/helpers/typeIcons";
import Image from "next/image";

export default function Page() {
    const [items, setitems] = useState<ItemsRes[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const limit = 20;

    async function fetchitems(page: number) {
        setLoading(true);
        const res = await fetch(`/api/item?page=${page}&limit=${limit}`, {
            cache: "no-store",
        });
        const data: ItemsRes[] = await res.json();
        setitems((prev) => {
            const existingIds = new Set(prev.map((p) => p.apiId));
            const newOnes = data.filter((p) => !existingIds.has(p.apiId));
            return [...prev, ...newOnes];
        });
        setLoading(false);
    }

    useEffect(() => {
        fetchitems(page);
    }, [page]);

    return (
        <PokedexShell showHint={false} showBack>
            <div className="relative w-full h-full flex flex-col">
                <div className="flex-1 pb-24 overflow-x-hidden">
                    <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-20">
                        {loading && items.length === 0 && (
                            <p className="text-center font-pokemon">
                                Loading items...
                            </p>
                        )}
                        {items &&
                            items.map((item) => {
                                return (
                                    <Link
                                        key={item.apiId}
                                        href={`/pokedex/item/${item.apiId}`}
                                        className="flex flex-col items-center"
                                    >
                                        <Image
                                            src={
                                                item?.data?.sprites?.[
                                                    "default"
                                                ] ?? "/next.svg"
                                            }
                                            alt={item.name}
                                            width={96}
                                            height={96}
                                            className="object-contain drop-shadow-lg"
                                            style={{
                                                backgroundColor:
                                                    typeColors[
                                                        item.name.toLowerCase()
                                                    ],
                                            }}
                                        />
                                        <p className="font-item text-sm font-pokemon text-center">
                                            {item.name}
                                        </p>
                                    </Link>
                                );
                            })}
                    </div>

                    <div className=" font-pokemon flex justify-center mb-10">
                        <button
                            disabled={loading}
                            onClick={() => setPage((prev) => prev + 1)}
                            className="px-6 py-2 bg-red-600 text-white font-item rounded-full border-4 border-red-900 shadow-md hover:bg-red-700 transition disabled:opacity-50"
                        >
                            {loading ? "Loading..." : "Load more"}
                        </button>
                    </div>
                </div>
            </div>
        </PokedexShell>
    );
}
