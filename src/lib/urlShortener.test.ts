import { prepareTestingDb } from '../models/prepareDB';
import UrlShortener from './urlShortener';
import UrlMapping from '../models/UrlMapping';
import { sequelize } from '../models';

describe('UrlShortener with Postgres', () => {

  afterAll(async () => {
    await sequelize.close();
  });

  beforeEach(async () => {
    // Clean out the UrlMapping table before each test.
    await prepareTestingDb();
  });

  it('Just a test', async () => {
    console.log('Debug Creation DB');
  });

  it('should create a short URL for a valid URL', async () => {
    const baseUrl = 'http://test.com';
    const shortener = new UrlShortener(baseUrl);
    const { slug, shortUrl } = await shortener.createShortUrl('https://example.com');

    expect(slug).toHaveLength(6);
    expect(shortUrl).toBe(`${baseUrl}/${slug}`);

    const mapping = await UrlMapping.findOne({ where: { slug } });
    expect(mapping).not.toBeNull();
    expect(mapping!.originalUrl).toBe('https://example.com');
    expect(mapping!.visits).toBe(0);
  });

  it('should throw an error for an invalid URL', async () => {
    const shortener = new UrlShortener();
    await expect(shortener.createShortUrl('not-a-url')).rejects.toThrow('Invalid URL provided');
  });

  it('should increment visits for a valid slug', async () => {
    const baseUrl = 'http://test.com';
    const shortener = new UrlShortener(baseUrl);
    const { slug } = await shortener.createShortUrl('https://example.com');

    let mapping = await UrlMapping.findOne({ where: { slug } });
    expect(mapping!.visits).toBe(0);

    await shortener.incrementVisit(slug);
    mapping = await UrlMapping.findOne({ where: { slug } });
    expect(mapping!.visits).toBe(1);
  });
});
