"use client";
import { useFormStatus } from "react-dom";

import ClosedPokeball from "./ClosedPokeball";
import OpenPokeball from "./OpenPokeball";
import RollingPokeball from "./RollingPokeball";
import WobblingPokeball from "./WobblingPokeball";
const PokemonButton = ({ caught }: { caught: boolean }) => {
    const { pending } = useFormStatus();

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
