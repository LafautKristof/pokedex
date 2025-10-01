// app/pokedex/type/search/page.tsx
import { Suspense } from "react";

import SearchFormType from "@/components/Pokedex/SearchFormType";

export default function SearchPage() {
    return (
        <Suspense
            fallback={
                <p className="font-pokemon text-center">Loading search...</p>
            }
        >
            <SearchFormType />
        </Suspense>
    );
}
