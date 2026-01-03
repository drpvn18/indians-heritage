export const runtime = 'nodejs';

import { storage } from '@/app/api/utils/firebase_storage';
import { randomUUID } from 'crypto';

export async function POST(req) {
    try {
        const form = await req.formData();
        const file = form.get('file');

        if (!file || typeof file === 'string') {
            return new Response(JSON.stringify({ error: 'No file uploaded' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = `${randomUUID()}-${file.name}`;

        const bucket = storage.bucket();
        const fileRef = bucket.file(`products/${fileName}`);

        await fileRef.save(buffer, {
            metadata: { contentType: file.type },
        });

        await fileRef.makePublic();

        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileRef.name}`;

        return new Response(JSON.stringify({ url: publicUrl }), { status: 200 });
    } catch (err) {
        console.error('Upload error:', err);
        return new Response(JSON.stringify({ error: 'Upload failed' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}