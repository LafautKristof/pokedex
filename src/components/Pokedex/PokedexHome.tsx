"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PokedexShell from "../PokedexShell";

type MenuOption = { label: string; href?: string; action?: () => void };

export default function PokedexHome() {
    const router = useRouter();
    const [selected, setSelected] = useState(0);
    const [menuLevel, setMenuLevel] = useState<
        | "main"
        | "pokemon"
        | "items"
        | "types"
        | "searchPokemon"
        | "searchTypes"
        | "searchItems"
    >("main");

    const menus: Record<string, MenuOption[]> = {
        main: [
            { label: "Pokémon", action: () => setMenuLevel("pokemon") },
            { label: "Items", action: () => setMenuLevel("items") },
            { label: "Types", action: () => setMenuLevel("types") },
        ],
        pokemon: [
            {
                label: "Search Pokémon",
                action: () => setMenuLevel("searchPokemon"),
            },
            { label: "View Pokémon", href: "/pokedex/pokemon" },
            { label: "Back", action: () => setMenuLevel("main") },
        ],
        searchPokemon: [
            { label: "By ID", href: "/pokedex/pokemon/search?search=id" },
            { label: "By Name", href: "/pokedex/pokemon/search?search=name" },
            { label: "Back", action: () => setMenuLevel("pokemon") },
        ],
        items: [
            { label: "View Items", href: "/pokedex/item" },
            {
                label: "Search Items",
                action: () => setMenuLevel("searchItems"),
            },
            { label: "Back", action: () => setMenuLevel("main") },
        ],
        searchItems: [
            { label: "By ID", href: "/pokedex/item/search?search=id" },
            { label: "By Name", href: "/pokedex/item/search?search=name" },
            { label: "Back", action: () => setMenuLevel("main") },
        ],
        types: [
            { label: "View Types", href: "/pokedex/type" },
            {
                label: "Search Types",
                action: () => setMenuLevel("searchTypes"),
            },
            { label: "Back", action: () => setMenuLevel("main") },
        ],
        searchTypes: [
            { label: "By ID", href: "/pokedex/type/search?search=id" },
            { label: "By Name", href: "/pokedex/type/search?search=name" },
        ],
    };

    const options = menus[menuLevel];

    // Splits de back knop van de rest
    const normalOptions = options.filter((o) => o.label !== "Back");
    const backOption = options.find((o) => o.label === "Back");

    // Keyboard controls
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "ArrowUp") {
                setSelected((prev) =>
                    prev > 0 ? prev - 1 : options.length - 1
                );
            }
            if (e.key === "ArrowDown") {
                setSelected((prev) =>
                    prev < options.length - 1 ? prev + 1 : 0
                );
            }
            if (e.key === "Enter") {
                const chosen = options[selected];
                if (chosen.href) router.push(chosen.href);
                if (chosen.action) chosen.action();
                setSelected(0);
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [options, selected, router]);

    return (
        <PokedexShell>
            <div className="flex flex-col justify-between h-full">
                {/* Bovenste opties */}
                <div className="flex flex-col gap-4">
                    {normalOptions.map((opt, idx) => (
                        <div
                            key={opt.label}
                            onClick={() => {
                                if (opt.href) router.push(opt.href);
                                if (opt.action) opt.action();
                                setSelected(0);
                            }}
                            role="button"
                            tabIndex={0}
                            className={`cursor-pointer p-4 rounded-lg text-lg font-semibold font-pokemon transition ${
                                idx === selected ? "underline" : ""
                            }`}
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>

                {/* Back knop rechtsonder */}
                {backOption && (
                    <div className="flex justify-end mt-6">
                        <div
                            onClick={() => {
                                if (backOption.href)
                                    router.push(backOption.href);
                                if (backOption.action) backOption.action();
                                setSelected(0);
                            }}
                            role="button"
                            tabIndex={0}
                            className={`cursor-pointer p-3 rounded-lg text-lg font-semibold font-pokemon text-red-600 hover:underline`}
                        >
                            {backOption.label}
                        </div>
                    </div>
                )}
            </div>
        </PokedexShell>
    );
}
