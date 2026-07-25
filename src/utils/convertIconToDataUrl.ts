import type { ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const convertIconToDataUrl = (element: ReactElement) => {
	const svgString = encodeURIComponent(renderToStaticMarkup(element));
	const dataUri = `"data:image/svg+xml,${svgString}"`;
	return dataUri;
};

export default convertIconToDataUrl;
