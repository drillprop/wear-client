/**
 * Uploads a base64 image data URL to the app's own `/api/upload` route and
 * returns the saved asset descriptor (`{ secure_url }`). Replaces the old
 * Cloudinary preset upload — assets are stored on local disk for now (see
 * `app/api/upload/route.ts`); call sites keep consuming `file.secure_url`
 * unchanged.
 */
const uploadImage = async (
	dataUrl: string,
): Promise<{ secure_url: string }> => {
	const response = await fetch("/api/upload", {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({ file: dataUrl }),
	});

	if (!response.ok) {
		const { error } = await response.json().catch(() => ({}));
		throw new Error(error ?? "Image upload failed");
	}

	return response.json();
};

export default uploadImage;
