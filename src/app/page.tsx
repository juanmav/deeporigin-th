'use client';

import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [statsUrl, setStatsUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (data.shortUrl) {
        setShortUrl(data.shortUrl);
        // Append '/stats' to the created short URL for the stats page.
        setStatsUrl(`${data.shortUrl}/stats`);
      } else {
        alert(data.error || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  const handleCopy = (text: string) => {
    if (text) {
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center text-black">
      <div className="bg-white rounded-lg shadow-md p-6 w-[360px]">
        <h1 className="text-2xl font-bold text-center mb-2">URL Shortener</h1>
        <p className="text-center mb-4">Enter the URL to shorten</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label htmlFor="url" className="font-medium">
            URL
          </label>
          <input
            id="url"
            type="url"
            placeholder="https://example.com"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          />
          <button
            type="submit"
            className="bg-purple-600 text-white font-bold py-2 rounded hover:bg-purple-700 transition-colors"
          >
            Shorten
          </button>
        </form>

        {shortUrl && (
          <div className="mt-4 text-center">
            <p className="mb-2">Shortened URL:</p>
            <div className="flex items-center justify-center gap-2">
              <a
                href={shortUrl}
                className="text-purple-600 font-semibold hover:underline"
              >
                {shortUrl}
              </a>
              <button
                type="button"
                onClick={() => handleCopy(shortUrl)}
                className="bg-gray-200 text-black px-2 py-1 rounded hover:bg-gray-300 transition-colors"
              >
                Copy
              </button>
            </div>
            {statsUrl && (
              <div className="mt-4">
                <p className="mb-2">Stats URL:</p>
                <div className="flex items-center justify-center gap-2">
                  <a
                    href={statsUrl}
                    className="text-purple-600 font-semibold hover:underline"
                  >
                    {statsUrl}
                  </a>
                  <button
                    type="button"
                    onClick={() => handleCopy(statsUrl)}
                    className="bg-gray-200 text-black px-2 py-1 rounded hover:bg-gray-300 transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
