"use client";

import Image from "next/image";

export default function ProfessorOakBalloon({
    pokemonCount,
}: {
    pokemonCount: number;
}) {
    let message = "Hello Trainer!";

    if (pokemonCount === 0) {
        message = "You haven’t caught any Pokémon yet!";
    } else if (pokemonCount < 10) {
        message = `You’ve caught ${pokemonCount} Pokémon so far. Keep going!`;
    } else {
        message = "You can’t catch more than 10 Pokémon right now!";
    }

    return (
        <div className="fixed bottom-0 left-40 -translate-x-1/2 z-50 flex flex-col items-center">
            {/* Tekstballon */}
            <div className="relative bg-white border-4 border-gray-800 rounded-2xl px-4 py-2 shadow-lg font-pokemon text-gray-800 text-sm max-w-xs text-center mb-2">
                <p>{message}</p>
                {/* Driehoekje */}
                <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-800"></div>
                <div className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-7 border-r-7 border-t-7 border-l-transparent border-r-transparent border-t-white"></div>
            </div>

            {/* Professor Oak */}
            <Image
                src="/professor-oak-png-1480569.png"
                alt="Professor Oak"
                width={100}
                height={100}
            />
        </div>
    );
}
