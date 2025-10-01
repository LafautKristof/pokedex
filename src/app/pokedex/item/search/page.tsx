// app/pokedex/item/search/page.tsx
import { Suspense } from "react";

import SearchFormItem from "@/components/Pokedex/SearchFormItem";

export default function SearchPage() {
    return (
        <Suspense
            fallback={
                <p className="font-pokemon text-center">Loading search...</p>
            }
        >
            <SearchFormItem />
        </Suspense>
    );
}
