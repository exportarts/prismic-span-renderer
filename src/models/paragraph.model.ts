import { Span } from './span.model';

/**
 * The Prismic API returns an array of paragraphs when using
 * e.g. the 'Title'- or 'Rich Text'-elements.
 */
export interface Paragraph {
  type:
    | 'paragraph'
    | 'preformatted'
    | 'heading1'
    | 'heading2'
    | 'heading3'
    | 'heading4'
    | 'heading5'
    | 'heading6'
    | 'o-list-item'
    | 'list-item';
  text: string;
  spans: Span[];
}
