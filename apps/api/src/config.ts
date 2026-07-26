/**
 * Box-local runtime config (#32). Read from the environment — a `.env` file is
 * loaded by Node's built-in `--env-file` in dev; production injects real env
 * vars, so no secrets live in the image.
 */
export interface Config {
	port: number;
	databaseUrl: string;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
	const databaseUrl = env.DATABASE_URL;
	if (!databaseUrl) {
		throw new Error("DATABASE_URL is required");
	}

	const port = Number(env.PORT ?? 4000);
	if (!Number.isInteger(port) || port <= 0) {
		throw new Error(`Invalid PORT: ${env.PORT}`);
	}

	return { port, databaseUrl };
}
