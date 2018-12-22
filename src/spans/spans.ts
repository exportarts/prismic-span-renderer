import { Span, TagType } from '../models/span.model';
import { getTag, getTagIncrement } from './tags';

/**
 * Applies all given spans to the target text.
 *
 * @param spans all the tags that shall be applied
 * @param text the target text
 *
 * @example
 * ```ts
 * applySpans([{ ...strong... }, { ...em... }], 'hello');
 * // returns '<em><strong>hello</strong></em>'
 * ```
 */
export function applySpans(spans: Span[], text: string): string {
  // Sort spans by their starting point
  spans = spans.sort((a, b) => a.start - b.start);

  for (const currentSpan of spans) {
    text = applySpan(currentSpan, text);
    const increments = {
      opening: getTagIncrement(currentSpan, TagType.OPENING),
      both: getTagIncrement(currentSpan, TagType.BOTH)
    };

    // Now, shift the following spans by the amount of characters inserted.
    // The following situations can occur (S = start, E = end | 1 = current, 2 = following):
    //     S1 |      |   E1  |      |
    //     ---------------------------
    // 1.  S2 |      |   E2  |      |    (Start equal, end equal)
    // 2.  S2 |      E2  |   |      |    (Start equal, end between)
    // 3.  S2 |      |   |   E2     |    (Start equal, end after)
    // 4.  |  S2     |   E2  |      |    (Start between, end equal)
    // 5.  |  S2     E2  |   |      |    (Start between, end between)
    // 6.  |  S2     |   |   E2     |    (Start between, end after)
    // 7.  |  |      |   |   S2     E2   (Start after, end after)
    const followingSpans = spans.filter((value, index) => index > spans.indexOf(currentSpan));
    for (const followingSpan of followingSpans) {
      const start = {
        isBetween: followingSpan.start > currentSpan.start && followingSpan.start < currentSpan.end,
        isAfter: followingSpan.start > currentSpan.end,
        isEqual: followingSpan.start === currentSpan.start
      };
      const end = {
        isBetween: followingSpan.end > currentSpan.start && followingSpan.end < currentSpan.end,
        isAfter: followingSpan.end > currentSpan.end,
        isEqual: followingSpan.end === currentSpan.end
      };

      if (start.isEqual || start.isBetween) {
        followingSpan.start += increments.opening;
      } else if (start.isAfter) {
        followingSpan.start += increments.both;
      }

      if (end.isEqual || end.isBetween) {
        followingSpan.end += increments.opening;
      } else if (end.isAfter) {
        followingSpan.end += increments.both;
      }
    }
  }

  return text;
}

/**
 * Apply a single span to the given text
 * and return the final HTML.
 *
 * @param span the span to apply to the text
 * @param text the text to apply the span to
 *
 * @example
 * ```ts
 * applySpan({ ...strong... }, 'hello');
 * // returns '<strong>hello</strong>'
 * ```
 */
export function applySpan(span: Span, text: string): string {
  const before = text.substring(0, span.start);
  const between = text.substring(span.start, span.end);
  const after = text.substring(span.end);

  const opening = getTag(span, TagType.OPENING);
  const closing = getTag(span, TagType.CLOSING);

  return `${before}${opening}${between}${closing}${after}`;
}
