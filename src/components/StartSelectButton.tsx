"use client";

export default function StartSelectButtons() {
    return (
        <div className="flex gap-6 items-center">
            {/* Select */}
            <button className="bg-gray-700 text-white px-4 py-1 rounded-lg shadow hover:bg-gray-600 active:scale-95">
                Select
            </button>

            {/* Start */}
            <button className="bg-gray-700 text-white px-4 py-1 rounded-lg shadow hover:bg-gray-600 active:scale-95">
                Start
            </button>
        </div>
    );
}
