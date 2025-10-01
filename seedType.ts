import mongoose from "mongoose";
import "dotenv/config";
import Type from "./src/app/models/Type";

async function fetchJson(url: string) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`❌ Fout bij ophalen ${url}`);
    return res.json();
}

async function main() {
    const MONGODB_URI = process.env.MONGODB_URI!;
    await mongoose.connect(MONGODB_URI);

    console.log("🌱 Start seeden van Types...");

    const res = await fetchJson("https://pokeapi.co/api/v2/type");
    const types = res.results;

    for (const type of types) {
        try {
            const detail = await fetchJson(type.url);

            await Type.updateOne(
                { apiId: Number(detail.id) },
                {
                    apiId: Number(detail.id),
                    name: detail.name,
                    damage_relations: detail.damage_relations,
                    pokemon: detail.pokemon.map((p: any) => p.pokemon),
                },
                { upsert: true }
            );

            console.log(
                `✅ Type opgeslagen: ${detail.name} (apiId: ${detail.id})`
            );
        } catch (err) {
            console.error(`❌ Fout bij type ${type.name}`, err);
        }
    }

    const all = await Type.find({}, { apiId: 1, name: 1 });
    console.log("🎯 Alle types in DB:", all);

    await mongoose.disconnect();
    console.log("🎉 Klaar met seeden van Types!");
}

main().catch((err) => {
    console.error(err);
    mongoose.disconnect();
});
