import { Paragraph } from '../models/paragraph.model';
import { applySpans } from '../spans/spans';

/**
 * Maps prismics paragraph types to the corresponding
 * html tag.
 */
const htmlTags: Map<string, string> = new Map([
  ['paragraph', 'p'],
  ['heading1', 'h1'],
  ['heading2', 'h2'],
  ['heading3', 'h3'],
  ['heading4', 'h4'],
  ['heading5', 'h5'],
  ['heading6', 'h6'],
]);

/**
 * Render a list of paragraphs (e.g. from a Rich Text Section)
 * to HTML.
 * 
 * @param paragraphs a list of paragraphs to transform to HTML
 */
export function renderText(paragraphs: Paragraph[]): string {
  const htmlPieces = [];

  for (const paragraph of paragraphs) {
    if (paragraph.type === 'preformatted') {
      htmlPieces.push(`<pre>${paragraph.text}</pre>`);
      continue;
    }

    const formatted = applySpans(paragraph.spans, paragraph.text);
    if (paragraph.type.includes('list-item')) {
      let listTag = 'ul';
      if (paragraph.type === 'o-list-item') {
        listTag = 'ol';
      }
      htmlPieces.push(`<${listTag}><li>${formatted}</li></${listTag}>`);
      continue;
    }
    
    const tag = htmlTags.get(paragraph.type);
    htmlPieces.push(`<${tag}>${formatted}</${tag}>`);
  }

  return htmlPieces.join('')
    .replace(/<\/ul><ul>/g, '') // '<ul>...</ul><ul>...</ul>' --> '<ul>...</ul>'
    .replace(/<\/ol><ol>/g, '');  // '<ol>...</ol><ol>...</ol>' --> '<ol>...</ol>'
}
