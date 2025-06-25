import { NextResponse } from "next/server";
import { FirebaseLoginToken } from "../utils/FirebaseLoginToken";
import { generateToken } from "../utils/jwt";
import { PasswordEncryption } from "../utils/PasswordEncryption";
import axios from "axios";

export async function POST(req) {
    const FIREBASE_DATABASE_URL = process.env.FIREBASE_DATABASE_URL;

    const body = await req.json();

    const email = body?.email;
    const password = body?.password || "";

    try {
        const idToken = await FirebaseLoginToken(email, password);
        if (idToken) {
            const new_user = {
                email: email,
                password: password,
            };

            const response = await axios.get(`${FIREBASE_DATABASE_URL}/users.json `, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const users = response?.data;
            let isUserFound = false;

            if (users) {
                Object.keys(users).forEach((key) => {
                    if (users[key].email === email) {
                        isUserFound = true;
                    }
                });
            }

            if (!isUserFound) {
                const users_response = await axios.post(`${FIREBASE_DATABASE_URL}/users.json`, JSON.stringify({ ...new_user }), {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const user = users_response?.data;
                if (user) {
                    console.log("User created successfully");
                }
            }

            if (isUserFound) {
                console.log("user already found");
            }

            const hashedPassword = await PasswordEncryption(password);

            const jwt_token = await generateToken({ email: email, password: hashedPassword });
            return NextResponse.json({ status: 200, message: "user found", jwt_token: jwt_token });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ "status": 500, error: "Failed to find user" })
    }
}