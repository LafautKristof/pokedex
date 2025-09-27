"use client";
import Link from "next/link";
import {
    GoArrowDown,
    GoArrowLeft,
    GoArrowRight,
    GoArrowUp,
} from "react-icons/go";
export default function DPad({
    prevName,
    nextName,
}: {
    prevName?: string;
    nextName?: string;
}) {
    return (
        <div className="grid grid-cols-3 grid-rows-3 gap-1 w-32 h-32">
            <div />
            <button className="bg-gray-700 text-white rounded p-2 hover:bg-gray-600 flex items-center justify-center">
                <GoArrowUp />
            </button>
            <div />
            {prevName ? (
                <Link
                    href={`/pokemon/${prevName}`}
                    className="bg-gray-700 text-white rounded p-2 hover:bg-gray-600 flex items-center justify-center"
                >
                    <GoArrowLeft />
                </Link>
            ) : (
                <button
                    disabled
                    className="bg-gray-600 text-white rounded p-2 opacity-50 cursor-not-allowed"
                >
                    <GoArrowLeft />
                </button>
            )}

            <div className="bg-gray-900 rounded" />
            {nextName ? (
                <Link
                    href={`/pokemon/${nextName}`}
                    className="bg-gray-700 text-white rounded p-2 hover:bg-gray-600 flex items-center justify-center"
                >
                    <GoArrowRight />
                </Link>
            ) : (
                <button
                    disabled
                    className="bg-gray-600 text-white rounded p-2 opacity-50 cursor-not-allowed"
                >
                    <GoArrowRight />
                </button>
            )}
            <div />
            {/* Down */}
            <button className="bg-gray-700 text-white rounded p-2 hover:bg-gray-600 flex items-center justify-center">
                <GoArrowDown />
            </button>
            <div />
        </div>
    );
}
