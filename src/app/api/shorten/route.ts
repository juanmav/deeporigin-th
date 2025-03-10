import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import UrlShortener from '@/lib/urlShortener';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    const shortener = new UrlShortener(process.env.BASE_URL || 'http://localhost:3000');
    const result = await shortener.createShortUrl(url);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Invalid URL provided' }, { status: 400 });
  }
}
