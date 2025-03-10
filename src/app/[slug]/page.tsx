import { redirect, notFound } from 'next/navigation';
import UrlShortener from '@/lib/urlShortener';

type tParams = Promise<{ slug: string }>;

export default async function SlugPage({ params }: { params: tParams }) {
  const shortener = new UrlShortener();
  const { slug } = await (params);
  const record = await shortener.incrementVisit(slug);
  if (record) {
    redirect(record.originalUrl);
  } else {
    notFound();
  }
}
