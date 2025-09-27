"use client";

export default function WobblingPokeball({ size = 64 }: { size?: number }) {
    return (
        <div
            className="relative animate-wobble"
            style={{ width: size, height: size }}
        >
            {/* bovenste helft */}
            <div
                className="absolute top-0 left-0 right-0 rounded-t-full border-4 border-b-0 border-black bg-red-600"
                style={{ height: size / 2 }}
            />
            {/* onderste helft */}
            <div
                className="absolute bottom-0 left-0 right-0 rounded-b-full border-4 border-t-0 border-black bg-white"
                style={{ height: size / 2 }}
            />
            {/* zwarte streep in het midden */}
            <div className="absolute top-1/2 left-0 w-full h-[6px] -translate-y-1/2 bg-black" />
            {/* knop */}
            <div className="absolute top-1/2 left-1/2 w-6 h-6 rounded-full border-4 border-black bg-white -translate-x-1/2 -translate-y-1/2" />
        </div>
    );
}
