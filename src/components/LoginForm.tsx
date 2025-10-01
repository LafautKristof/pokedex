"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import PokedexShell from "./PokedexShell";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            setError("Invalid email or password");
        } else {
            router.push("/"); // naar homepage
        }
    }
    return (
        <PokedexShell showHint={false}>
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-b">
                <div className="bg-white border-8 border-gray-900 rounded-3xl shadow-2xl p-10 flex flex-col items-center  gap-6 w-[90%] max-w-md">
                    {/* Logo */}
                    <Image
                        src="/International_Pokémon_logo.png"
                        alt="Pokémon Logo"
                        width={200}
                        height={80}
                        className="drop-shadow-lg"
                    />

                    <h1 className="text-2xl font-pokemon text-gray-800">
                        Trainer Login
                    </h1>
                    <p className="text-sm text-gray-600 font-pokemon text-center">
                        Log in to catch, train and battle with your Pokémon!
                    </p>

                    {/* Pokéball styled login buttons */}
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4 w-full"
                    >
                        <input
                            type="email"
                            placeholder="Trainer Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="p-3 font-pokemon border-2 border-gray-400 rounded-md 
                                focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="p-3  border-2 border-gray-400 rounded-md 
                                focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800"
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 bg-red-600 text-white font-pokemon text-lg 
                                rounded-full border-4 border-red-800 shadow-md 
                                hover:bg-red-700 hover:scale-105 transition-transform"
                        >
                            Login
                        </button>
                    </form>

                    {error && (
                        <p className="text-red-600 font-pokemon mt-2">
                            {error}
                        </p>
                    )}

                    <p className="mt-4 text-xs text-gray-500 font-pokemon italic">
                        Don’t have an account? Register to become a Pokémon
                        trainer!
                    </p>
                </div>
            </div>
        </PokedexShell>
    );
}
