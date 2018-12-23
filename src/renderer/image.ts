import { Paragraph } from '../models/paragraph.model';
import { Image } from '../models/image.model';
import { renderText } from './text';

export interface ImageConfig {
  image: Image;
  caption?: Paragraph[];
  /**
   * CSS classes which will be added to the <img> tag.
   * 
   * @example
   * ```html
   * <!-- imgClass: 'img img-avatar' -->
   * <img class="img img-avatar" src="...">
   * ```
   */
  imgClass?: string;
}

/**
 * Render an image to HTML.
 * This method will return a `<figure>` if you pass an
 * image caption, otherwise just an `<img>`.
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
