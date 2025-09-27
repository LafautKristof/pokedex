import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const page = async () => {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/login"); // 👈 geen JSON return hier
    }

    return <div>je bent op de pokedex beland</div>;
};
export default page;
