/**
 * The response object returned by the Prismic CMS.
 * The type of the results depends on the Custom Types
 * in your prismic repository.
 */
export interface PrismicResponse<T> {
  page: number;
  next_page: string;
  prev_page: string;
  results: PrismicResult<T>[];
  results_per_page: number;
  results_size: number;
  total_pages: number;
  total_results_size: number;
  license: string;
  version: string;
}

/**
 * Represents a single result object found in a {@link PrismicResponse}.
 */
export interface PrismicResult<T> {
  id: string;
  uid: string;
  type: string;
  href: string;
  tags: string[];
  first_publication_date: Date;
  last_publication_date: Date;
  slugs: string[];
  linked_documents: LinkedDocument[];
  lang: string;
  alternate_languages: string[];
  data: T;
}

export interface LinkedDocument {
  id: string;
  tags: string[];
  type: string;
  slug: string;
  lang: string;
}
