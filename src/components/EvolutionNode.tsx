import Image from "next/image";
import Link from "next/link";

function getIdFromSpeciesUrl(url: string) {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
}

export type EvolutionSpecies = {
    name: string;
    url: string;
};

export type EvolutionDetail = {
    min_level: number | null;
    trigger: { name: string; url: string };
    item: { name: string; url: string } | null;
};

export type EvolutionNodeType = {
    species: EvolutionSpecies;
    evolves_to: EvolutionNodeType[];
    evolution_details: EvolutionDetail[];
};
export function EvolutionNode({ node }: { node: EvolutionNodeType }) {
    const id = getIdFromSpeciesUrl(node.species.url);

    return (
        <div className="flex flex-row items-start gap-4">
            <Link
                href={`/pokedex/pokemon/${id}`}
                className="flex flex-col items-center hover:scale-105 transition"
            >
                <div className="relative w-32 h-32 mb-2">
                    <Image
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                        alt={node.species.name}
                        fill
                        className="object-contain"
                        priority={false}
                    />
                </div>
                <span className="capitalize text-sm mt-1 font-pokemon">
                    {node.species.name}
                </span>
            </Link>

            {node.evolves_to?.length > 0 && (
                <div className="flex flex-col gap-6">
                    {node.evolves_to.map((child) => (
                        <div
                            key={child.species.name}
                            className="flex flex-row items-start gap-2"
                        >
                            <span className="text-lg">➡️</span>
                            <EvolutionNode node={child} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
