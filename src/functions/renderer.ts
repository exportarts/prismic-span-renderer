import { Paragraph } from '../models/slice-text.model';
import { Image } from '../models/image.model';
import { applySpans } from './apply-spans';

/**
 * Render a list of paragraphs (e.g. from a Rich Text Section)
 * to HTML.
 * 
 * @param paragraphs a list of paragraphs to transform to HTML
 */
export function renderText(paragraphs: Paragraph[]): string {
  const htmlPieces = [];

  for (const paragraph of paragraphs) {
    switch (paragraph.type) {
      case 'preformatted':
        htmlPieces.push(`<pre>${paragraph.text}</pre>`);
        break;
      case 'paragraph':
        htmlPieces.push(`<p>${applySpans(paragraph.spans, paragraph.text)}</p>`);
        break;
      case 'heading1':
        htmlPieces.push(`<h1>${applySpans(paragraph.spans, paragraph.text)}</h1>`);
        break;
      case 'heading2':
        htmlPieces.push(`<h2>${applySpans(paragraph.spans, paragraph.text)}</h2>`);
        break;
      case 'heading3':
        htmlPieces.push(`<h3>${applySpans(paragraph.spans, paragraph.text)}</h3>`);
        break;
      case 'heading4':
        htmlPieces.push(`<h4>${applySpans(paragraph.spans, paragraph.text)}</h4>`);
        break;
      case 'heading5':
        htmlPieces.push(`<h5>${applySpans(paragraph.spans, paragraph.text)}</h5>`);
        break;
      case 'heading6':
        htmlPieces.push(`<h6>${applySpans(paragraph.spans, paragraph.text)}</h6>`);
        break;
      case 'list-item':
        htmlPieces.push(`<ul><li>${applySpans(paragraph.spans, paragraph.text)}</li></ul>`);
        break;
      case 'o-list-item':
        htmlPieces.push(`<ol><li>${applySpans(paragraph.spans, paragraph.text)}</li></ol>`);
        break;
      }
  }

  return htmlPieces.join('')
    .replace(/<\/ul><ul>/g, '') // '<ul>...</ul><ul>...</ul>' --> '<ul>...</ul>'
    .replace(/<\/ol><ol>/g, '');  // '<ol>...</ol><ol>...</ol>' --> '<ol>...</ol>'
}

/**
 * Render an image to HTML.
 * 
 * @param image image object from prismic
 * @param caption (optional) image caption, can be multiple paragraphs
 */
export function renderImage(image: Image, caption?: Paragraph[]): string {
  const img = `<img src="${image.url}">`;
  if (caption) {
    return `
      <figure>
        ${img}
        <figcaption>${renderText(caption)}</figcaption>
      </figure>
    `;
  } else {
    return img;
  }
}
