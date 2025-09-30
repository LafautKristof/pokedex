"use client";
import {
    GoArrowDown,
    GoArrowLeft,
    GoArrowRight,
    GoArrowUp,
} from "react-icons/go";

export default function DPad({
    currentId,
    step,
    onNavigate,
    entity,
}: {
    currentId: number;
    step: number;
    onNavigate: (newId: number) => void;
    entity: "pokemon" | "item" | "type";
}) {
    const isPokemon = entity === "pokemon";

    return (
        <div className="grid grid-cols-3 grid-rows-3 gap-1 w-32 h-32">
            <div />
            {/* Up */}
            <button
                onClick={() => onNavigate(currentId + step)}
                disabled={isPokemon && currentId + step > 1010}
                className="bg-gray-700 text-white rounded p-2 hover:bg-gray-600 disabled:opacity-50 flex items-center justify-center"
            >
                <GoArrowUp />
            </button>
            <div />

            {/* Left */}
            <button
                onClick={() => onNavigate(currentId - 1)}
                disabled={isPokemon && currentId <= 1}
                className="bg-gray-700 text-white rounded p-2 hover:bg-gray-600 disabled:opacity-50 flex items-center justify-center"
            >
                <GoArrowLeft />
            </button>

            <div className="bg-gray-900 rounded" />

            {/* Right */}
            <button
                onClick={() => onNavigate(currentId + 1)}
                disabled={isPokemon && currentId >= 1010}
                className="bg-gray-700 text-white rounded p-2 hover:bg-gray-600 disabled:opacity-50 flex items-center justify-center"
            >
                <GoArrowRight />
            </button>

            <div />
            {/* Down */}
            <button
                onClick={() => onNavigate(currentId - step)}
                disabled={isPokemon && currentId - step < 1}
                className="bg-gray-700 text-white rounded p-2 hover:bg-gray-600 disabled:opacity-50 flex items-center justify-center"
            >
                <GoArrowDown />
            </button>
            <div />
        </div>
    );
}
