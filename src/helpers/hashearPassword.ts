import bcrypt from 'bcrypt';

/**
 * Hashes a password using bcrypt.
 * @param password - The password to hash.
 * @returns A promise that resolves to the hashed password.
 */
export async function hashearPassword(password: string): Promise<string> {
    const saltRounds = 10; //Aplica algoritmo de hashing con 10 rondas de sal
    return await bcrypt.hash(password, saltRounds);
}

export async function verificarPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}