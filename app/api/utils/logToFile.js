"use server";

import fs from 'fs';
import path from 'path';

export async function logToFile(message) {
    const logPath = path.join(process.cwd(), 'product_save_error.txt');

    const logMessage = `${message}\n`;

    fs.appendFileSync(logPath, logMessage, 'utf8');
}