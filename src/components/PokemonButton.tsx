"use client";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { TbPokeballOff } from "react-icons/tb";
import ClosedPokeball from "./ClosedPokeball";
import OpenPokeball from "./OpenPokeball";
import RollingPokeball from "./RollingPokeball";
import WobblingPokeball from "./WobblingPokeball";
const PokemonButton = ({ text, caught }: { text: string; caught: boolean }) => {
    const { pending } = useFormStatus();
    console.log("text", text);
    console.log("pending", pending);

    // <Image
    //     src="/pngfind.com-pokeball-icon-png-1587026.png"
    //     alt="Pokéball"
    //     width={60}
    //     height={60}
    // />
    if (pending) {
        return (
            <button disabled>
                {caught ? <RollingPokeball /> : <WobblingPokeball />}
            </button>
        );
    }

    return <button>{caught ? <OpenPokeball /> : <ClosedPokeball />}</button>;
};

export default PokemonButton;
