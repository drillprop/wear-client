/**
 * The single source of truth for how long a session lasts (#46). The JWT's
 * `expiresIn` and the cookie's `Max-Age` both derive from this, so the token and
 * its cookie can never drift out of sync.
 */
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days
