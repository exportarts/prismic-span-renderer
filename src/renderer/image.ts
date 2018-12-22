import { Paragraph } from '../models/paragraph.model';
import { Image } from '../models/image.model';
import { renderText } from './text';

export interface ImageConfig {
  image: Image;
  caption?: Paragraph[];
  imgClass?: string;
}

/**
 * Render an image to HTML.
 * 
 * @param config configuration to render this image
 */
export function renderImage(config: ImageConfig): string {
  const imgClass = config.imgClass ? `class="${config.imgClass}"` : '';
  const img = `<img ${imgClass} src="${config.image.url}">`;

  if (config.caption) {
    return `
      <figure>
        ${img}
        <figcaption>${renderText(config.caption)}</figcaption>
      </figure>
    `;
  }
  
  return img;
}
