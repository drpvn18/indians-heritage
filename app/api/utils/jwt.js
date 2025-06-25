import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET_KEY || "";

export async function generateToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}