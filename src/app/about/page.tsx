import PokedexShell from "@/components/PokedexShell";
import Image from "next/image";

const page = () => {
    return (
        <>
            <PokedexShell showHint={false} showBack>
                <div className=" max-w-3xl mx-auto p-6 space-y-6 text-gray-800 mb-12">
                    {" "}
                    <h1 className="text-3xl font-bold font-pokemon text-center text-red-600">
                        About this Pokédex Project
                    </h1>
                    <p className="text-lg leading-relaxed font-pokemon text-center">
                        Welcome to my Pokédex project! This app was created as
                        part of my journey to become a full-stack developer.
                        Inspired by the world of Pokémon, it combines modern web
                        technologies with a nostalgic touch of childhood
                        adventure.
                    </p>
                    <div className="space-y-2 font-pokemon relative">
                        <p className="font-semibold">With this app you can:</p>
                        <ul className="space-y-2">
                            {[
                                "Explore a full Pokédex with detailed stats, types and evolutions",
                                "Catch and release Pokémon to build your own collection",
                                "Search items, berries and evolution stones",
                                "Create your own trainer profile and log in to save your progress",
                            ].map((text, idx) => (
                                <li
                                    key={idx}
                                    className="flex items-center gap-3 text-gray-800"
                                >
                                    <Image
                                        src="/pngfind.com-pokeball-icon-png-1587026.png"
                                        alt="Pokéball"
                                        width={24}
                                        height={24}
                                    />
                                    <span>{text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-2 font-pokemon">
                        <p className="font-semibold">Why I built this</p>
                        <p className="flex items-start gap-3">
                            <Image
                                src="/pngfind.com-pokeball-icon-png-1587026.png"
                                alt="Pokéball"
                                width={24}
                                height={24}
                            />
                            <span>
                                I wanted to challenge myself by bringing
                                together{" "}
                                <strong>Next.js, MongoDB, and NextAuth</strong>{" "}
                                in a fun and creative way. Pokémon felt like the
                                perfect theme to showcase my technical skills
                                while keeping the project playful and engaging.
                            </span>
                        </p>
                    </div>
                    <div className="space-y-2 font-pokemon">
                        <p className="font-semibold">What’s next?</p>
                        <ul className="space-y-2">
                            {[
                                "Achievements and trainer ranks",
                                "Battle simulations",
                                "Real-time multiplayer with friends",
                            ].map((text, idx) => (
                                <li
                                    key={idx}
                                    className="flex items-center gap-3 text-gray-800"
                                >
                                    <Image
                                        src="/pngfind.com-pokeball-icon-png-1587026.png"
                                        alt="Pokéball"
                                        width={24}
                                        height={24}
                                    />
                                    <span>{text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>{" "}
                </div>{" "}
            </PokedexShell>
        </>
    );
};

export default page;
