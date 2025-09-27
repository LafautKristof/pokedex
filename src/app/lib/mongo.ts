import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error("❌ MONGODB_URI ontbreekt in .env");
}

let isConnected = false;

export async function connectDB() {
    if (isConnected) return;

    try {
        await mongoose.connect(MONGODB_URI);
        isConnected = true;
        console.log("✅ Verbonden met MongoDB");
    } catch (err) {
        console.error("❌ MongoDB connectiefout:", err);
    }
}
