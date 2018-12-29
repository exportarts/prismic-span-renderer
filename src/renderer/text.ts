import { Paragraph } from '../models/paragraph.model';
import { RichText } from 'prismic-dom/dist/prismic-dom.min.js';

/**
 * Render a list of paragraphs (e.g. from a Rich Text Section)
 * to HTML.
 * 
 * @param paragraphs a list of paragraphs to transform to HTML
 */
export function renderText(paragraphs: Paragraph[]): string {
  return RichText.asHtml(paragraphs);
}
