export interface Span {
  start: number;
  end: number;
  type: SpanType;
  data?: SpanDataLinkWeb;
}

export enum SpanType {
  HYPERLINK = 'hyperlink',
  EM = 'em',
  STRONG = 'strong'
}

export interface SpanDataLinkWeb {
  type: 'Link.web';
  value: {
    url: string;
    target?: string;
  };
}

export enum TagType {
  OPENING,
  CLOSING,
  BOTH
}
