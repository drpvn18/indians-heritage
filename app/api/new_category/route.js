import axios from "axios";
import { NextResponse } from "next/server";
import { FirebaseLoginToken } from "../utils/FirebaseLoginToken";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req) {
    try {
        const FIREBASE_DATABASE_URL = process.env.FIREBASE_DATABASE_URL;
        const JWT_SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;

        const cookieStore = await cookies();
        const jwt_token = cookieStore.get("token")?.value;
        const payload = jwt.verify(jwt_token, JWT_SECRET_KEY);

        let users = null;
        let authenticated_user_info = {
            email: "",
            password: ""
        }

        if (payload?.email) {
            const users_response = await axios.get(`${FIREBASE_DATABASE_URL}/users.json`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            users = users_response?.data;
        }

        if (users) {
            Object.keys(users || {})?.map(key => {
                if (users[key]?.email === payload?.email) {
                    authenticated_user_info["email"] = payload?.email;
                    authenticated_user_info["password"] = users[key]?.password;
                }
            })
        }

        const new_category = await req.json();
        const idToken = await FirebaseLoginToken(authenticated_user_info?.email, authenticated_user_info?.password);

        const response = await axios.post(`${FIREBASE_DATABASE_URL}/categories.json?auth=${idToken}`, JSON.stringify({ ...new_category }), {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return NextResponse.json({ status: 200, message: "user created successfully", response: response?.data });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ "status": 500, error: "Failed to create user" })
    }
}