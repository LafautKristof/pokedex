"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/login" })} // 👈 na logout terug naar /login
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
            Log uit
        </button>
    );
}
