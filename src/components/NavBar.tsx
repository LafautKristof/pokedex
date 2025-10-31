"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import LogoutButton from "./LogoutButton";
import { useSession } from "next-auth/react";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const { data: session } = useSession();

    const links = [
        { href: "/", label: "Home" },
        { href: "/pokedex", label: "Pokédex" },
        { href: "/about", label: "About" },
    ];

    return (
        <div className="relative font-pokemon">
            <Image
                src="/Pokemon.svg"
                alt="Pokemon Logo"
                width={80}
                height={80}
                className="absolute -top-15 left-3/5 -translate-x-1/3 z-10"
                priority
            />
            <Image
                src="/NicePng_kanto-badges-png_3680351.png"
                alt="poks"
                width={100}
                height={100}
                className="absolute -top-13 left-2/5 -translate-x-1/3 z-10"
            />
            <motion.nav
                className="bg-pink-400 text-white shadow-lg md:w-2xl sm:w-xl mx-auto mt-35 rounded-3xl relative z-20"
                animate={{ rotate: [0, -0.3, 0.3, 0] }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <div className="mx-auto max-w-6xl px-4">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo Pokéball */}
                        <motion.div
                            animate={{ rotate: [0, -5, 5, 0] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <Image
                                src="/pngfind.com-pokeball-icon-png-1587026.png"
                                alt="Pokéball"
                                width={60}
                                height={60}
                            />
                        </motion.div>

                        {/* Tekstlogo */}
                        <Link
                            href="/"
                            className="flex items-center gap-2 font-bold text-xl"
                        >
                            <Image
                                src="/International_Pokémon_logo.png"
                                alt="logo"
                                width={80}
                                height={40}
                            />
                        </Link>

                        {/* Desktop links */}
                        <div className="hidden md:flex space-x-6 items-center">
                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="hover:text-yellow-300 transition"
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {session ? (
                                <LogoutButton />
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="hover:text-yellow-300 transition"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="hover:text-yellow-300 transition"
                                    >
                                        Registreren
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setOpen(!open)}
                            className="md:hidden text-white"
                        >
                            {open ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {open && (
                    <div className="md:hidden bg-red-700 px-4 pb-4 space-y-2">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="block py-2 hover:text-yellow-300 transition"
                                onClick={() => setOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {session ? (
                            <LogoutButton />
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="block py-2 hover:text-yellow-300 transition"
                                    onClick={() => setOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="block py-2 hover:text-yellow-300 transition"
                                    onClick={() => setOpen(false)}
                                >
                                    Registreren
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </motion.nav>
        </div>
    );
}
