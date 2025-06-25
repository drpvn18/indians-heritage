export const runtime = 'nodejs';

import { google } from 'googleapis';
import { Readable } from 'stream';

const DRIVE_FOLDER_ID = '16P5BIRlEShDm5Izh2vSfMBpZQVcWCLi4';

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

        const auth = new google.auth.GoogleAuth({
            credentials: {
                type: process.env.GDRIVE_TYPE,
                project_id: process.env.GDRIVE_PROJECT_ID,
                private_key_id: process.env.GDRIVE_PRIVATE_KEY_ID,
                private_key: process.env.GDRIVE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                client_email: process.env.GDRIVE_CLIENT_EMAIL,
                client_id: process.env.GDRIVE_CLIENT_ID,
                auth_uri: process.env.GDRIVE_AUTH_URI,
                token_uri: process.env.GDRIVE_TOKEN_URI,
                auth_provider_x509_cert_url: process.env.GDRIVE_AUTH_PROVIDER_CERT_URL,
                client_x509_cert_url: process.env.GDRIVE_CLIENT_CERT_URL,
            },
            scopes: ['https://www.googleapis.com/auth/drive'],
        });

        const drive = google.drive({ version: 'v3', auth });

        const fileMetaData = {
            name: file.name,
            parents: [DRIVE_FOLDER_ID],
        };

        const media = {
            mimeType: file.type,
            body: Readable.from(buffer),
        };

        const response = await drive.files.create({
            requestBody: fileMetaData,
            media: media,
            fields: 'id, webViewLink, webContentLink',
        });

        await drive.permissions.create({
            fileId: response.data.id,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });

        const finalFile = await drive.files.get({
            fileId: response.data.id,
            fields: 'id, webViewLink, webContentLink',
        });

        return new Response(JSON.stringify(finalFile.data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        console.error('Upload error:', err);
        return new Response(JSON.stringify({ error: 'Upload failed' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}