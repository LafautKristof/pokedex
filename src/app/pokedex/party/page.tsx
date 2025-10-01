import { connectDB } from "@/app/lib/mongo";
import PokedexShell from "@/components/PokedexShell";
import { Pokedex as PokedexType, PokemonRes } from "@/app/types/PokemonTypes";
import Pokedex from "@/app/models/Pokedex";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import Image from "next/image";
import Pokemon from "@/app/models/Pokemon";
const page = async () => {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return <p>Je bent niet ingelogd</p>;
    }

    await connectDB();

    const pokedex = (await Pokedex.find({
        userId: session.user.id,
    }).lean()) as PokedexType[];
    const ids = pokedex.map((e) => e.pokemonId);

    const rawPokemons = await Pokemon.find({ apiId: { $in: ids } }).lean();

    const pokemons: PokemonRes[] = rawPokemons.map((p) => ({
        apiId: p.apiId,
        name: p.name,
        data: p.data,
        species: p.species,
        evolution_chain: p.evolution_chain,
        type_relations: p.type_relations ?? [],
    }));

    return (
        <PokedexShell
            showHint={false}
            release={true}
            userId={session.user.id}
            showBack
        >
            <div className="relative w-full h-full flex flex-col overflow-x-hidden">
                <div className="flex-1 pb-24">
                    {pokemons.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <p className="font-pokemon text-xl text-gray-700">
                                No Pokémon caught yet!
                            </p>
                            <Link
                                href="/"
                                className="mt-4 px-6 py-2 bg-red-600 text-white font-pokemon rounded-full border-4 border-gray-900 shadow-md hover:bg-red-700 transition"
                            >
                                Explore
                            </Link>
                        </div>
                    ) : (
                        <div className=" grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-20">
                            {pokemons.map((pokemon) => (
                                <div key={pokemon.apiId} className="relative">
                                    <Link
                                        href={`/pokedex/pokemon/${pokemon.apiId}`}
                                        className="flex flex-col items-center"
                                    >
                                        <div className="relative w-24 h-24 drop-shadow-lg">
                                            <Image
                                                src={
                                                    pokemon.data.sprites.other[
                                                        "official-artwork"
                                                    ]?.front_default ??
                                                    "/placeholder.png"
                                                }
                                                alt={pokemon.name}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <p className="font-pokemon text-sm">
                                            {pokemon.name}
                                        </p>
                                    </Link>
                                    <div className="absolute top-0 right-0">
                                        <p className="font-pokemon text-sm">
                                            #{pokemon.apiId}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </PokedexShell>
    );
};
export default page;
