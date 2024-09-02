import * as bcrypt from 'bcrypt';

/**
 * Hashes a given password with a salt of 10 rounds.
 *
 * @param password The password to hash.
 * @returns A Promise that resolves with the hashed password.
 */
/**
 * Hashes a given password with a salt of 10 rounds.
 *
 * @param {string} password The password to hash.
 * @returns {Promise<string>} A Promise that resolves with the hashed password.
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds: number = 10;
  return bcrypt.hash(password, saltRounds);
}
