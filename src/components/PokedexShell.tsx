// components/PokedexShell.tsx
"use client";

import { releaseAllPokemon } from "@/app/actions/pokedex";
import Link from "next/link";

type Props = {
    children: React.ReactNode;
    showHint?: boolean;
    showBack?: boolean;
    showNext?: boolean;
    backHref?: string;
    nextHref?: string;
    onBack?: () => void;
    onNext?: () => void;
    release?: boolean;
    userId?: string;
};

export default function PokedexShell({
    children,
    showHint = true,
    showBack = false,
    showNext = false,
    backHref = "/pokedex",
    nextHref,
    onBack,
    onNext,
    release,
    userId,
}: Props) {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-red-600 to-red-800 p-8">
            <div
                className="bg-gray-100 text-gray-900 rounded-2xl shadow-2xl border-8 border-red-900 
          w-[90vw] max-w-3xl h-[80vh] flex flex-col p-6 relative"
            >
                {/* Titel */}
                <h1 className="text-3xl font-bold text-center mb-6 font-pokemon">
                    Pokédex
                </h1>

                {/* Hint */}
                {showHint && (
                    <p className="text-center text-sm text-gray-700 mb-8 font-pokemon">
                        Use ↑ ↓ to choose, press Enter to select
                    </p>
                )}

                {/* Content */}
                <div className="flex-1 overflow-y-auto">{children}</div>

                {/* Buttons altijd onderaan */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-between px-6">
                    {showBack &&
                        (backHref ? (
                            <Link
                                href={backHref}
                                className="px-6 py-2 bg-gray-600 text-white font-pokemon rounded-full border-4 border-gray-800 shadow-md hover:bg-gray-700 transition"
                            >
                                Back
                            </Link>
                        ) : (
                            <button
                                onClick={onBack}
                                className="px-6 py-2 bg-gray-600 text-white font-pokemon rounded-full border-4 border-gray-800 shadow-md hover:bg-gray-700 transition"
                            >
                                Back
                            </button>
                        ))}

                    {showNext &&
                        (nextHref ? (
                            <Link
                                href={nextHref}
                                className="px-6 py-2 bg-red-600 text-white font-pokemon rounded-full border-4 border-gray-900 shadow-md hover:bg-red-700 transition"
                            >
                                Next
                            </Link>
                        ) : (
                            <button
                                onClick={onNext}
                                className="px-6 py-2 bg-red-600 text-white font-pokemon rounded-full border-4 border-gray-900 shadow-md hover:bg-red-700 transition cursor-pointer"
                            >
                                Next
                            </button>
                        ))}
                    {release && (
                        <form action={releaseAllPokemon}>
                            <input
                                type="hidden"
                                name="userId"
                                value={userId ?? ""}
                            />
                            <button className="px-6 py-2 bg-red-600 text-white font-pokemon rounded-full border-4 border-gray-900 shadow-md hover:bg-red-700 transition cursor-pointer">
                                Release
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
