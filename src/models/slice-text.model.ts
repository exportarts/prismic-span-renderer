import { Span } from './span.model';

export interface Paragraph {
  type:
    | "paragraph"
    | "preformatted"
    | "heading1"
    | "heading2"
    | "heading3"
    | "heading4"
    | "heading5"
    | "heading6"
    | "o-list-item"
    | "list-item";
  text: string;
  spans: Span[];
}
