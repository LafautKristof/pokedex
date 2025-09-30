import mongoose from "mongoose";
import "dotenv/config";

import Pokemon from "@/app/models/Pokemon";
import Item from "@/app/models/Item";
import Type from "@/app/models/Type";

async function fetchJson(url: string) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`❌ Fout bij ophalen ${url}`);
    return res.json();
}

async function seedPokemons() {
    console.log("🌱 Seeden van Pokémons...");
    const res = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
    );
    const data = await res.json();
    const pokemons = data.results.slice(0, 1010);

    const batchSize = 20;
    for (let i = 0; i < pokemons.length; i += batchSize) {
        const batch = pokemons.slice(i, i + batchSize);
        const details = await Promise.all(
            batch.map((p: any) => fetchJson(p.url))
        );

        for (const detail of details) {
            try {
                const species = await fetchJson(
                    `https://pokeapi.co/api/v2/pokemon-species/${detail.id}/`
                );
                let evolution_chain = null;
                if (species.evolution_chain?.url) {
                    evolution_chain = await fetchJson(
                        species.evolution_chain.url
                    );
                }

                await Pokemon.updateOne(
                    { apiId: detail.id },
                    {
                        apiId: detail.id,
                        name: detail.name,
                        data: detail,
                        species,
                        evolution_chain,
                    },
                    { upsert: true }
                );
                console.log(`✅ Pokémon ${detail.name} opgeslagen`);
            } catch (err) {
                console.error(`❌ Fout bij Pokémon ${detail.name}`, err);
            }
        }
        await new Promise((r) => setTimeout(r, 1500));
    }
}

async function seedCategory(categoryUrl: string, model: any, label: string) {
    console.log(`🌱 Seeden van ${label}...`);
    const category = await fetchJson(categoryUrl);
    const items = category.items;

    for (const item of items) {
        try {
            const detail = await fetchJson(item.url);
            await model.updateOne(
                { apiId: detail.id },
                {
                    apiId: detail.id,
                    name: detail.name,
                    data: detail,
                },
                { upsert: true }
            );
            console.log(`✅ ${label}: ${detail.name} opgeslagen`);
        } catch (err) {
            console.error(`❌ Fout bij ${label} ${item.name}`, err);
        }
    }
}

async function main() {
    const MONGODB_URI = process.env.MONGODB_URI!;
    await mongoose.connect(MONGODB_URI);

    await seedPokemons();
    await seedItems();
    await seedTypes();

    await mongoose.disconnect();
    console.log("✨ Alles klaar!");
}
async function seedItems() {
    console.log("🌱 Start seeden van Items...");

    const categories = await fetchJson(
        "https://pokeapi.co/api/v2/item-category?limit=100"
    );

    for (const category of categories.results) {
        // eventueel skippen wat je niet wil
        if (["picky-healing"].includes(category.name)) continue;

        console.log(`📂 Ophalen categorie: ${category.name}`);
        const categoryDetail = await fetchJson(category.url);

        for (const item of categoryDetail.items) {
            try {
                const detail = await fetchJson(item.url);

                await Item.updateOne(
                    { apiId: detail.id },
                    {
                        apiId: detail.id,
                        name: detail.name,
                        category: category.name,
                        pocket: detail.pocket?.name || "unknown",
                        data: detail,
                    },
                    { upsert: true }
                );

                console.log(`✅ Item opgeslagen: ${detail.name}`);
            } catch (err) {
                console.error(`❌ Fout bij item ${item.name}`, err);
            }
        }

        await new Promise((r) => setTimeout(r, 500));
    }
}

// Seed Types
async function seedTypes() {
    console.log("🌱 Seeden van Types...");
    const res = await fetchJson("https://pokeapi.co/api/v2/type");
    const types = res.results;

    for (const type of types) {
        try {
            const detail = await fetchJson(type.url);

            await Type.updateOne(
                { name: detail.name },
                {
                    name: detail.name,
                    damage_relations: detail.damage_relations,
                    pokemon: detail.pokemon.map((p: any) => p.pokemon),
                },
                { upsert: true }
            );

            console.log(`✅ Type opgeslagen: ${detail.name}`);
        } catch (err) {
            console.error(`❌ Fout bij type ${type.name}`, err);
        }
    }
}
main().catch((err) => {
    console.error(err);
    mongoose.disconnect();
});
