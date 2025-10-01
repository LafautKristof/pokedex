import PokedexListServer from "@/components/PokedexListServer";
import PokemonListServer from "@/components/PokemonListServer";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ProfessorOakBalloon from "@/components/ProfessorOak";
import { connectDB } from "./lib/mongo";
import Pokedex from "./models/Pokedex";

const page = async () => {
    const session = await getServerSession(authOptions);
    await connectDB();

    let pokemonCount = 0;
    if (session?.user?.id) {
        pokemonCount = await Pokedex.countDocuments({
            userId: session.user.id,
        });
    }

    return (
        <>
            <PokedexListServer />
            <PokemonListServer />;
            <ProfessorOakBalloon pokemonCount={pokemonCount} />
        </>
    );
};
export default page;
