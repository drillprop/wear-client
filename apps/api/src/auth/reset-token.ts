import { randomBytes } from "node:crypto";

/**
 * Single source of truth for how long a password-reset token is valid (#49),
 * matching the legacy server's one-hour window. `resetPassword` stamps the
 * expiry from this; `changePassword` rejects anything past it.
 */
export const RESET_TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

/**
 * A single-use password-reset token: 32 random bytes as hex. Opaque and
 * unguessable, it is stored alongside its expiry and cleared once consumed.
 */
export function generateResetToken(): string {
	return randomBytes(32).toString("hex");
}

/** The instant a token generated `now` stops being valid. */
export function resetTokenExpiryFrom(now: Date = new Date()): Date {
	return new Date(now.getTime() + RESET_TOKEN_TTL_MS);
}
