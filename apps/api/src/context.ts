import type { TokenPayload } from "./auth/token.js";
import type { DbClient } from "./db/client.js";
import type { Mailer } from "./mail/mailer.js";

/**
 * GraphQL execution context. `db` is injected so tests can drive the built
 * schema against pglite with no HTTP layer; `userId` is resolved from the JWT
 * cookie at the Yoga edge (and set directly in tests).
 *
 * `issueSession` / `clearSession` are the seam the auth mutations use to start
 * and end a session without knowing about JWTs or cookies: production mints the
 * token and emits a Set-Cookie header, tests pass spies. This keeps the session
 * secret and cookie mechanics entirely at the edge, out of the resolvers.
 *
 * `mailer` is the same kind of seam for transactional email: production injects
 * the nodemailer-backed sender, tests inject a spy, so `resetPassword` can send
 * without any resolver knowing about SMTP.
 */
export interface Context {
	db: DbClient;
	userId: string | null;
	issueSession: (payload: TokenPayload) => void;
	clearSession: () => void;
	mailer: Mailer;
}
