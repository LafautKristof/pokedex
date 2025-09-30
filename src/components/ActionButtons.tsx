"use client";

export default function ActionButtons() {
    return (
        <div className="grid grid-cols-3 grid-rows-3 gap-2 w-40 h-40">
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

            {/* Extra 1 */}
            <button className="bg-yellow-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:scale-110">
                ★
            </button>

            {/* Circle */}
            <button className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:scale-110">
                ◯
            </button>

            {/* Extra 2 */}
            <button className="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:scale-110">
                ◆
            </button>

            {/* Cross */}
            <button className="bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center hover:scale-110">
                ✖
            </button>
            <button className="bg-gray-800 text-white rounded-full w-10 h-10 flex items-center justify-center hover:scale-110">
                ✖
            </button>

            <div />
        </div>
    );
}
