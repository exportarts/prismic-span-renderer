import { Span } from './span.model';

export interface Heading1 {
  type: 'heading1';
  text: string;
  spans: Span[];
}
