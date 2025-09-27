"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const result = await signIn("credentials", {
            redirect: false, // we doen zelf de redirect
            email,
            password,
        });

        setLoading(false);

        if (result?.error) {
            setError("❌ Inloggen mislukt: " + result.error);
        } else {
            router.push("/pokedex"); // of een andere pagina
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white shadow p-6 rounded-xl max-w-md mx-auto"
        >
            <h1 className="text-2xl font-bold">Log in</h1>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border p-2 rounded w-full"
            />

            <input
                type="password"
                placeholder="Wachtwoord"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border p-2 rounded w-full"
            />

            <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 disabled:opacity-50"
            >
                {loading ? "Bezig met inloggen..." : "Inloggen"}
            </button>
        </form>
    );
}
