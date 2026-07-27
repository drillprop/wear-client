import bcrypt from "bcrypt";

/** Work factor for bcrypt; matches the legacy server's `bcrypt.hash(pw, 12)`. */
const SALT_ROUNDS = 12;

/** Hash a plaintext password for storage. Never store or log the plaintext. */
export function hashPassword(plain: string): Promise<string> {
	return bcrypt.hash(plain, SALT_ROUNDS);
}

/** Constant-time compare of a candidate password against a stored bcrypt hash. */
export function verifyPassword(plain: string, hash: string): Promise<boolean> {
	return bcrypt.compare(plain, hash);
}
