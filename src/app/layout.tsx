import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/NavBar";
import localFont from "next/font/local";
import Providers from "@/components/Providers";
import FallingPsyduck from "@/components/Psyduck";
import Ash from "@/components/Ash";

const pokemonFont = localFont({
    src: "../fonts/pokemon.ttf",
    variable: "--font-pokemon",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Kristof's Pokedex",
    description: "Gotta Catch 'Em All!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${pokemonFont.variable} bg-blue-300`}>
                <Providers>
                    {" "}
                    <Navbar />{" "}
                    <div className="relative">
                        <Ash />
                        {children}
                    </div>
                    <FallingPsyduck />
                </Providers>
            </body>
        </html>
    );
}
