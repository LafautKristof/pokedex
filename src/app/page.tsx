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
    let message;
    if (session?.user?.id) {
        pokemonCount = await Pokedex.countDocuments({
            userId: session.user.id,
        });
        if (pokemonCount === 0) {
            message = "You haven’t caught any Pokémon yet!";
        } else if (pokemonCount < 12) {
            message = `You’ve caught ${pokemonCount} Pokémon so far. Keep going!`;
        } else {
            message = "You can’t catch more than 12 Pokémon right now!";
        }
    } else {
        redirect("/login");
    }

    return (
        <>
            <PokedexListServer />
            <PokemonListServer />;
            <ProfessorOakBalloon message={message} />
        </>
    );
};
export default page;
