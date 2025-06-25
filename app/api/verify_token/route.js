import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";

export async function POST(req) {
    const { jwt_token } = await req.json();

    const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET_KEY || "";

    try {
        const payload = jwt.verify(jwt_token, SECRET_KEY);
        return NextResponse.json({ status: 200, message: "token valid", payload: payload });
    } catch (err) {
        console.error('Invalid token', err);
        return NextResponse.json({ "status": 500, error: "token not valid" });
    }
}