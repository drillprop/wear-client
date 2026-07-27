import type { TokenPayload } from "./auth/token.js";
import type { DbClient } from "./db/client.js";

/**
 * GraphQL execution context. `db` is injected so tests can drive the built
 * schema against pglite with no HTTP layer; `userId` is resolved from the JWT
 * cookie at the Yoga edge (and set directly in tests).
 *
 * `issueSession` / `clearSession` are the seam the auth mutations use to start
 * and end a session without knowing about JWTs or cookies: production mints the
 * token and emits a Set-Cookie header, tests pass spies. This keeps the session
 * secret and cookie mechanics entirely at the edge, out of the resolvers.
 */
export interface Context {
	db: DbClient;
	userId: string | null;
	issueSession: (payload: TokenPayload) => void;
	clearSession: () => void;
}
