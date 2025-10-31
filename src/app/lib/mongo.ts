import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) {
    throw new Error("❌ MONGODB_URI is niet gedefinieerd in .env");
}

// Gebruik globale cache (belangrijk voor Next.js hot reload)
let isConnected = false;

export async function connectDB() {
    if (isConnected) {
        // ✅ Al verbonden → skip opnieuw connecteren
        return;
    }

    // ✅ Gebruik mongoose.connection.readyState voor extra veiligheid
    if (mongoose.connection.readyState >= 1) {
        isConnected = true;
        return;
    }

    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: process.env.MONGODB_DB || "pokedex",
        });
        isConnected = true;
        console.log(
            "🔍 MONGODB_URI:",
            process.env.MONGODB_URI ? "gevonden" : "NIET gevonden"
        );

        console.log("✅ Verbonden met MongoDB");
    } catch (err) {
        console.error("❌ Fout bij verbinden met MongoDB:", err);
        throw err;
    }
}
