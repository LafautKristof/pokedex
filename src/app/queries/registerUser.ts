import { NextResponse } from "next/server";
import User from "../models/User";
import bcrypt from "bcryptjs";

export const registerUser = async (
    name: string,
    email: string,
    password: string
) => {
    try {
        const existingUser = await User.findOne({ email, name });
        if (existingUser) return null;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return newUser;
    } catch (err) {
        console.error(err);
        return null;
    }
};
