import jwt from "jsonwebtoken";
import { SESSION_TTL_SECONDS } from "./session.js";

/** Claims carried by the session JWT — mirrors the legacy `{ id, email }`. */
export interface TokenPayload {
	id: string;
	email: string;
}

/** Mint a signed session token for a user (lifetime = the shared session TTL). */
export function createUserToken(payload: TokenPayload, secret: string): string {
	return jwt.sign(payload, secret, { expiresIn: SESSION_TTL_SECONDS });
}

/**
 * Verify a session token and return its `id` claim, or `null` when the token is
 * missing, malformed, expired, or signed with the wrong secret. Returning null
 * (rather than throwing) lets the context treat any bad cookie as anonymous.
 */
export function readUserIdFromToken(
	token: string,
	secret: string,
): string | null {
	try {
		const decoded = jwt.verify(token, secret);
		if (
			typeof decoded === "object" &&
			decoded !== null &&
			typeof decoded.id === "string"
		) {
			return decoded.id;
		}
		return null;
	} catch {
		return null;
	}
}
