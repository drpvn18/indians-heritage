import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
    const FIREBASE_DATABASE_URL = process.env.FIREBASE_DATABASE_URL;

    try {
        const response = await axios.get(`${FIREBASE_DATABASE_URL}/products.json`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return NextResponse.json({ status: 200, message: "fetched products successfully", data: response?.data });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ "status": 500, error: "Failed to create user", data: {} })
    }
}