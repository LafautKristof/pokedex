"use client";

export default function ActionButtons() {
    return (
        <div className="grid grid-cols-3 grid-rows-3 gap-2 w-32 h-32">
            <div />
            {/* Triangle */}
            <button className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:scale-110">
                △
            </button>
            <div />

            {/* Square */}
            <button className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:scale-110">
                ☐
            </button>
            <div />
            {/* Circle */}
            <button className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:scale-110">
                ◯
            </button>

            <div />
            {/* Cross */}
            <button className="bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center hover:scale-110">
                ✖
            </button>
            <div />
        </div>
    );
}
