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

/**
 * Compares a given password with a hashed password.
 *
 * @param password The password to compare.
 * @param hashedPassword The hashed password to compare against.
 * @returns A Promise that resolves with a boolean indicating whether the passwords match.
 */
export async function comparePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
