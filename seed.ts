import mongoose from "mongoose";
import "dotenv/config";
import Pokemon from "./src/app/models/Pokemon";

async function fetchJson(url: string) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`❌ Fout bij ophalen ${url}`);
    return res.json();
}

async function main() {
    const MONGODB_URI = process.env.MONGODB_URI!;

    await mongoose.connect(MONGODB_URI);

    const res = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
    );
    const data = await res.json();

    const pokemons = data.results.slice(0, 1010); // max 1010 pokémon

    const batchSize = 20; // klein houden, want elke Pokémon = 3 requests
    for (let i = 0; i < pokemons.length; i += batchSize) {
        const batch = pokemons.slice(i, i + batchSize);

        // basis info
        const details = await Promise.all(
            batch.map((p: any) => fetchJson(p.url))
        );

        for (const detail of details) {
            try {
                // species ophalen
                const species = await fetchJson(
                    `https://pokeapi.co/api/v2/pokemon-species/${detail.id}/`
                );

                // evolutieketen ophalen
                let evolution_chain = null;
                if (species.evolution_chain?.url) {
                    evolution_chain = await fetchJson(
                        species.evolution_chain.url
                    );
                }

                // opslaan in MongoDB
                await Pokemon.updateOne(
                    { apiId: detail.id },
                    {
                        apiId: detail.id,
                        name: detail.name,
                        data: detail,
                        species: species,
                        evolution_chain: evolution_chain,
                    },
                    { upsert: true }
                );
            } catch (err) {
                console.error(`❌ Fout bij ${detail.name}`, err);
            }
        }

        await new Promise((r) => setTimeout(r, 1500)); // kleine pauze voor API
    }

    await mongoose.disconnect();
}

main().catch((err) => {
    console.error(err);
    mongoose.disconnect();
});
