import { renderToStaticMarkup } from 'react-dom/server';
import { ReactElement } from 'react';

const convertIconToDataUrl = (element: ReactElement) => {
  const svgString = encodeURIComponent(renderToStaticMarkup(element));
  const dataUri = `"data:image/svg+xml,${svgString}"`;
  return dataUri;
};

export default convertIconToDataUrl;
