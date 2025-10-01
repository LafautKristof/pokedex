// app/pokedex/pokemon/search/page.tsx
import { Suspense } from "react";

import SearchFormPokemon from "@/components/Pokedex/SearchFormPokemon";

export default function SearchPage() {
    return (
        <Suspense
            fallback={
                <p className="font-pokemon text-center">Loading search...</p>
            }
        >
            <SearchFormPokemon />
        </Suspense>
    );
}
