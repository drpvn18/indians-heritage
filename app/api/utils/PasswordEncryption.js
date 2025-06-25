import bcrypt from 'bcryptjs';

export async function PasswordEncryption(password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}