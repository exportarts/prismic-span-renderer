import { Span, SpanType, TagType } from './models/span.model';

export class SpanService {

  /**
   * Applies all given spans to the target text.
   *
   * @param spans all the tags that shall be applied
   * @param text the target text
   */
  static applySpans(spans: Span[], text: string): string {
    // Sort spans by their starting point
    spans = spans.sort((a, b) => a.start - b.start);

    for (const currentSpan of spans) {
      text = SpanService.applySpan(currentSpan, text);
      const increments = {
        opening: SpanService.getTagIncrement(currentSpan, TagType.OPENING),
        both: SpanService.getTagIncrement(currentSpan, TagType.BOTH)
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
   * @example
   * text: 'hello'
   * span: strong
   * returns '<strong>hello</strong>'
   *
   * @param span the span to apply to the text
   * @param text the text to apply the span to
   */
  private static applySpan(span: Span, text: string): string {
    const before = text.substring(0, span.start);
    const between = text.substring(span.start, span.end);
    const after = text.substring(span.end);

    const opening = SpanService.getTag(span, TagType.OPENING);
    const closing = SpanService.getTag(span, TagType.CLOSING);

    return `${before}${opening}${between}${closing}${after}`;
  }

  /**
   * Returns the HTML of the selected tag- and span-type.
   *
   * @example
   * - OPENING --> <strong>
   * - CLOSING --> </strong>
   * - BOTH    --> <strong></strong>
   *
   * @param span the span
   * @param tagType the tag type
   */
  private static getTag(span: Span, tagType: TagType): string {
    switch (tagType) {
      case TagType.OPENING:
        switch (span.type) {
          case SpanType.EM: return '<em>';
          case SpanType.STRONG: return '<strong>';
          case SpanType.HYPERLINK:
            let target = `target="${span.data.value.target === '_blank' ? '_blank' : '_self'}"`;
            if (span.data.value.target === '_blank') {
              target += ' rel="noopener"';
            }
            return `<a href="${span.data.value.url}" ${target}>`;
        }
      case TagType.CLOSING:
        switch (span.type) {
          case SpanType.EM: return '</em>';
          case SpanType.STRONG: return '</strong>';
          case SpanType.HYPERLINK: return '</a>';
        }
      case TagType.BOTH:
        return SpanService.getTag(span, TagType.OPENING) + SpanService.getTag(span, TagType.CLOSING);
    }
  }

  /**
   * Returns the amount of chars that the
   * application of this span/tag would add
   * to the target string.
   *
   * @example
   * spanType: STRONG
   * tagType: OPENING
   * --> 8
   *
   * @param span the span
   * @param tagType the tag type
   */
  private static getTagIncrement(span: Span, tagType: TagType): number {
    return SpanService.getTag(span, tagType).length;
  }

}
