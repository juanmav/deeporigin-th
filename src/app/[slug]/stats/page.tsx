import { notFound } from 'next/navigation';
import { UrlMapping } from '@/models';

type tParams = Promise<{ slug: string }>;

export default async function StatsPage({ params }: { params: tParams }) {
  const { slug } = (await params);
  // Query the database for the URL mapping using the slug parameter.
  const mapping = await UrlMapping.findOne({ where: { slug: slug } });

  if (!mapping) {
    notFound();
  }

  return (
    <main className="min-h-screen p-6 bg-gray-100 text-black">
      <div className="max-w-md mx-auto bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Stats for {mapping.slug}</h1>
        <ul className="space-y-2">
          <li>
            <strong>Original URL:</strong>{' '}
            <a
              href={mapping.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {mapping.originalUrl}
            </a>
          </li>
          <li>
            <strong>Visits:</strong> {mapping.visits}
          </li>
          <li>
            <strong>Created At:</strong> {mapping.createdAt.toLocaleString()}
          </li>
          <li>
            <strong>Updated At:</strong> {mapping.updatedAt.toLocaleString()}
          </li>
        </ul>
        <div className="mt-6 flex flex-col gap-3 text-center">
          {/* This link goes to the redirection endpoint, recording a visit */}
          <a
            href={`/${mapping.slug}`}
            className="inline-block bg-purple-600 text-white font-bold py-2 px-4 rounded hover:bg-purple-700 transition-colors"
          >
            Go to (Record Visit)
          </a>
          {/* This link goes directly to the original URL, without recording a visit */}
          <a
            href={mapping.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gray-600 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 transition-colors"
          >
            Direct Link (No Visit)
          </a>
        </div>
      </div>
    </main>
  );
}
