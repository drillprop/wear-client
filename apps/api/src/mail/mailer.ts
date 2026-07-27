import { createTransport } from "nodemailer";

/**
 * The mail seam (#49). Resolvers depend on this narrow interface, never on
 * nodemailer directly, so tests inject a spy and no message ever leaves the
 * process. Only the one transactional message the API sends today lives here;
 * later mail (order confirmations, etc.) extends the interface.
 */
export interface Mailer {
	/** Send a customer the token they need to complete `changePassword`. */
	sendPasswordResetEmail(to: string, token: string): Promise<void>;
}

/**
 * Box-local SMTP settings (#32) the production mailer is built from. Injected
 * as part of {@link Config}, so no transport secrets live in this module.
 */
export interface MailConfig {
	host: string;
	port: number;
	user: string;
	pass: string;
	from: string;
}

/**
 * The production `Mailer`, backed by nodemailer@9 SMTP. Built once at boot from
 * the mail config; the reset token is placed in the body so the customer can
 * feed it back to `changePassword`.
 */
export function createNodemailerMailer(config: MailConfig): Mailer {
	const transport = createTransport({
		host: config.host,
		port: config.port,
		auth: { user: config.user, pass: config.pass },
	});

	return {
		async sendPasswordResetEmail(to, token) {
			await transport.sendMail({
				from: config.from,
				to,
				subject: "Reset your Wear password",
				text: `Use this token to reset your password: ${token}`,
			});
		},
	};
}
