import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Local image upload — the Cloudinary replacement. The admin item forms POST a
 * base64 image data URL here; we decode it, write the bytes into
 * `public/uploads/<uuid>.<ext>`, and return `{ secure_url }` (the same shape the
 * forms already consumed from Cloudinary) pointing at the statically-served
 * file. Assets live on local disk for now; swapping in object storage later
 * only touches this handler and the `uploadImage` util.
 */

const MIME_EXT: Record<string, string> = {
	"image/jpeg": "jpg",
	"image/jpg": "jpg",
	"image/png": "png",
	"image/webp": "webp",
	"image/gif": "gif",
	"image/avif": "avif",
	"image/svg+xml": "svg",
};

export async function POST(request: Request): Promise<Response> {
	const { file } = (await request.json().catch(() => ({}))) as {
		file?: string;
	};

	// Split a `data:<mime>;base64,<payload>` URL at the first comma so the (large)
	// base64 body never goes through the regex engine.
	const commaIndex = typeof file === "string" ? file.indexOf(",") : -1;
	const header = commaIndex > 0 ? (file as string).slice(0, commaIndex) : "";
	const data = commaIndex > 0 ? (file as string).slice(commaIndex + 1) : "";
	const headerMatch = /^data:([^;]+);base64$/.exec(header);

	if (!headerMatch || !data) {
		return Response.json(
			{ error: "Expected a base64 image data URL in `file`." },
			{ status: 400 },
		);
	}

	const mime = headerMatch[1];
	const ext = MIME_EXT[mime.toLowerCase()];
	if (!ext) {
		return Response.json(
			{ error: `Unsupported image type: ${mime}` },
			{ status: 415 },
		);
	}

	const uploadsDir = path.join(process.cwd(), "public", "uploads");
	await mkdir(uploadsDir, { recursive: true });

	const filename = `${randomUUID()}.${ext}`;
	await writeFile(path.join(uploadsDir, filename), Buffer.from(data, "base64"));

	return Response.json({ secure_url: `/uploads/${filename}` });
}
