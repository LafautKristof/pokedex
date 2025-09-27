"use client";

export default function OpenPokeball({ size = 64 }: { size?: number }) {
    return (
        <div className="flex flex-col items-center gap-2">
            {/* Bovenkant (rood deksel) */}
            <div
                className="rounded-t-full border-4 border-black bg-red-600"
                style={{ width: size, height: size / 2 }}
            />
            {/* Onderkant (wit bakje) */}
            <div
                className="rounded-b-full border-4 border-black bg-white"
                style={{ width: size, height: size / 2 }}
            />
        </div>
    );
}
