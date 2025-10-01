import mongoose from "mongoose";
import "dotenv/config";
import Item from "@/app/models/Item";

async function fetchJson(url: string) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`❌ Fout bij ophalen ${url}`);
    return res.json();
}

async function main() {
    const MONGODB_URI = process.env.MONGODB_URI!;
    await mongoose.connect(MONGODB_URI);
    console.log("🌱 Start seeden van Items...");

    const categories = await fetchJson(
        "https://pokeapi.co/api/v2/item-category?limit=100"
    );

    for (const category of categories.results) {
        console.log(`📂 Ophalen categorie: ${category.name}`);
        const categoryDetail = await fetchJson(category.url);

        for (const item of categoryDetail.items) {
            try {
                const detail = await fetchJson(item.url);

                const pocketDetail = await fetchJson(
                    detail.category.url.replace("item-category", "item-pocket")
                ).catch(() => null);

                await Item.updateOne(
                    { apiId: detail.id },
                    {
                        apiId: detail.id,
                        name: detail.name,
                        category: category.name,
                        pocket:
                            detail.pocket?.name ||
                            pocketDetail?.name ||
                            "unknown",
                        data: detail,
                    },
                    { upsert: true }
                );

                console.log(`✅ ${detail.name} opgeslagen`);
            } catch (err) {
                console.error(`❌ Fout bij ${item.name}`, err);
            }
        }

        await new Promise((r) => setTimeout(r, 500));
    }

    await mongoose.disconnect();
    console.log("✨ Klaar met seeden van Items!");
}

main().catch((err) => {
    console.error(err);
    mongoose.disconnect();
});
