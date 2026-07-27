import type { MailConfig } from "./mail/mailer.js";

/**
 * Box-local runtime config (#32). Read from the environment — a `.env` file is
 * loaded by Node's built-in `--env-file` in dev; production injects real env
 * vars, so no secrets live in the image.
 */
export interface Config {
	port: number;
	databaseUrl: string;
	jwtSecret: string;
	mail: MailConfig;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
	const databaseUrl = env.DATABASE_URL;
	if (!databaseUrl) {
		throw new Error("DATABASE_URL is required");
	}

	const jwtSecret = env.JWT_SECRET;
	if (!jwtSecret) {
		throw new Error("JWT_SECRET is required");
	}

	const port = Number(env.PORT ?? 4000);
	if (!Number.isInteger(port) || port <= 0) {
		throw new Error(`Invalid PORT: ${env.PORT}`);
	}

	return { port, databaseUrl, jwtSecret, mail: loadMailConfig(env) };
}

/**
 * SMTP settings for the password-reset mailer (#49). Host, user, and pass are
 * required — production injects real credentials; the port defaults to the SMTP
 * submission port and `from` to a box-local sender.
 */
function loadMailConfig(env: NodeJS.ProcessEnv): MailConfig {
	const host = env.MAIL_HOST;
	if (!host) {
		throw new Error("MAIL_HOST is required");
	}

	const user = env.MAIL_USER;
	if (!user) {
		throw new Error("MAIL_USER is required");
	}

	const pass = env.MAIL_PASS;
	if (!pass) {
		throw new Error("MAIL_PASS is required");
	}

	const port = Number(env.MAIL_PORT ?? 587);
	if (!Number.isInteger(port) || port <= 0) {
		throw new Error(`Invalid MAIL_PORT: ${env.MAIL_PORT}`);
	}

	const from = env.MAIL_FROM ?? "no-reply@wear.test";

	return { host, port, user, pass, from };
}
