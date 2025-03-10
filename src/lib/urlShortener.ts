import { UrlMapping } from '@/models';

export default class UrlShortener {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:3000') {
    this.baseUrl = baseUrl;
  }

  /**
   * Creates a short URL mapping for a given original URL.
   * @param originalUrl The URL to shorten.
   * @returns An object containing the generated slug and the full short URL.
   * @throws Error if the URL is invalid.
   */
  async createShortUrl(originalUrl: string): Promise<{ slug: string; shortUrl: string }> {
    // Validate the URL
    try {
      new URL(originalUrl);
    } catch (error) {
      throw new Error('Invalid URL provided');
    }

    // Generate a unique slug
    let slug = this.generateSlug();
    while (await UrlMapping.findOne({ where: { slug } })) {
      slug = this.generateSlug();
    }

    // Save the mapping in the database with a visit counter
    // @ts-ignore
    await UrlMapping.create({ originalUrl, slug, visits: 0 });

    return { slug, shortUrl: `${this.baseUrl}/${slug}` };
  }

  /**
   * Increments the visit counter for a given slug.
   * @param slug The slug to update.
   * @returns The updated URL mapping record, or null if not found.
   */
  async incrementVisit(slug: string): Promise<UrlMapping | null> {
    const record = await UrlMapping.findOne({ where: { slug } });
    if (record) {
      record.visits++;
      await record.save();
      return record;
    }
    return null;
  }

  private generateSlug(): string {
    return Math.random().toString(36).substring(2, 8);
  }
}
