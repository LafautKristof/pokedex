import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongo";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";
import { registerUser } from "@/app/queries/registerUser";

export async function POST(req: Request) {
    await connectDB();
    const { name, email, password } = await req.json();

    const user = await registerUser(name, email, password);
    if (!user)
        return NextResponse.json(
            { error: "User already exists" },
            { status: 400 }
        );
    return NextResponse.json(
        { id: user._id, name: user.name, email: user.email },
        { status: 201 }
    );
}
