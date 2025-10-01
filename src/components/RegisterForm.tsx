"use client";

import { useState } from "react";
import Image from "next/image";
import PokedexShell from "./PokedexShell";

const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const res = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, name }),
        });

        if (res.ok) {
            alert("Registration successful 🎉");
            setEmail("");
            setPassword("");
            setName("");
        } else {
            alert("Registration failed ❌");
        }
    }

    return (
        <PokedexShell showHint={false}>
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-b">
                <div className="bg-white border-8 border-gray-900 rounded-3xl shadow-2xl p-10 flex flex-col items-center  gap-6 w-[90%] max-w-md">
                    {/* Pokémon Logo */}
                    <Image
                        src="/International_Pokémon_logo.png"
                        alt="Pokémon Logo"
                        width={200}
                        height={80}
                        className="drop-shadow-lg"
                    />

                    <h1 className="text-2xl font-pokemon text-gray-800">
                        Trainer Registration
                    </h1>

                    <form onSubmit={handleSubmit} className="w-full space-y-4">
                        <input
                            type="text"
                            placeholder="Trainer Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 font-pokemon border-4 border-gray-800 rounded-md 
                                   focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 font-pokemon border-4 border-gray-800 rounded-md 
                                   focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-800"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 font-pokemon border-4 border-gray-800 rounded-md 
                                   focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                        />

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-pokemon 
                                   bg-red-500 border-4 border-black shadow-lg hover:scale-105 transition"
                        >
                            <Image
                                src="/pngfind.com-pokeball-icon-png-1587026.png"
                                alt="Pokéball"
                                width={24}
                                height={24}
                            />
                            <span className="text-white">Register</span>
                        </button>
                    </form>
                </div>
            </div>
        </PokedexShell>
    );
};

export default RegisterForm;
