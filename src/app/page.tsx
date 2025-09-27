import PokedexListServer from "@/components/PokedexListServer";
import PokemonListServer from "@/components/PokemonListServer";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const page = async () => {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/login");
    }

    return (
        <>
            <PokedexListServer />
            <PokemonListServer />;
        </>
    );
};
export default page;
