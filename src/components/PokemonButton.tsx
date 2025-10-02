"use client";

import { useFormStatus } from "react-dom";
import RollingPokeball from "./RollingPokeball";
import WobblingPokeball from "./WobblingPokeball";

const PokemonButton = ({
    caught,
    disabled,
}: {
    caught: boolean;
    disabled?: boolean;
}) => {
    const { pending } = useFormStatus();

    if (pending) {
        return (
            <div className="flex items-center justify-center mb-4">
                {caught ? (
                    <RollingPokeball size={48} />
                ) : (
                    <WobblingPokeball size={48} />
                )}
            </div>
        );
    }

    return (
        <button
            type="submit"
            disabled={disabled}
            className={`px-4 py-2 rounded font-pokemon border-4 shadow-md mb-4
        ${
            caught
                ? "bg-red-600 border-red-900 text-white"
                : "bg-green-500 border-green-700 text-white"
        }
        ${
            disabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:scale-105 transition"
        }
      `}
        >
            {caught ? "Release" : "Catch"}
        </button>
    );
};

export default PokemonButton;
