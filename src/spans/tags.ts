import { Span, TagType, SpanType } from '../models/span.model';

/**
 * Returns the HTML of the selected tag- and span-type.
 *
 * @param span the span
 * @param tagType the tag type
 *
 * @example
 * ```ts
 * getTag({ ...strong... }, TagType.BOTH);
 * // returns '<strong></strong>'
 * ```
 */
export function getTag(span: Span, tagType: TagType): string {
  switch (tagType) {
    case TagType.OPENING:
      switch (span.type) {
        case SpanType.EM:
          return '<em>';
        case SpanType.STRONG:
          return '<strong>';
        case SpanType.HYPERLINK:
          let target = `target="${span.data.target === '_blank' ? '_blank' : '_self'}"`;
          if (span.data.target === '_blank') {
            target += ' rel="noopener"';
          }
          return `<a href="${span.data.url}" ${target}>`;
      }
    case TagType.CLOSING:
      switch (span.type) {
        case SpanType.EM:
          return '</em>';
        case SpanType.STRONG:
          return '</strong>';
        case SpanType.HYPERLINK:
          return '</a>';
      }
    case TagType.BOTH:
      return getTag(span, TagType.OPENING) + getTag(span, TagType.CLOSING);
  }
}

/**
 * Returns the amount of chars that the
 * application of this span/tag would add
 * to the target string.
 *
 * @param span the span
 * @param tagType the tag type
 *
 * @example
 * ```ts
 * getTagIncrement({ ...strong... }, TagType.OPENING);
 * // returns 8
 * ```
 */
export function getTagIncrement(span: Span, tagType: TagType): number {
  return getTag(span, tagType).length;
}
