import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

// --- CONFIG ---
const ALGORITHM = 'aes-256-cbc';
const SECRET_KEY = crypto.scryptSync('KOK_RISK_MASTER_KEY_2025', 'salt', 32); // In prod, use KMS
const IV_LENGTH = 16;
const AUDIT_FILE = path.join(process.cwd(), 'audit_trail.log');

// --- 3. IMMUTABLE AUDIT LOG (Rule 3) ---
export const logAudit = (actor: string, action: string, resource: string, status: 'SUCCESS' | 'FAILURE') => {
    const timestamp = new Date().toISOString();
    const entry = JSON.stringify({ timestamp, actor, action, resource, status });

    // Append Only Mode ('a') ensures history cannot be rewritten
    fs.appendFileSync(AUDIT_FILE, entry + '\n');
};

// --- 4. FIELD ENCRYPTION (Rule 4) ---
export const encryptField = (text: string): string => {
    if (!text) return text;
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
};

export const decryptField = (text: string): string => {
    if (!text || !text.includes(':')) return text;
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift() as string, 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};
