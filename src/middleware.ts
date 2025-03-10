// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { RateLimiterMemory } from 'rate-limiter-flexible';

// Create a rate limiter instance that applies to every request.
// For example, 10 requests per minute per IP.
const rateLimiter = new RateLimiterMemory({
  points: 30, // Number of requests
  duration: 60, // Per 60 seconds
});

export async function middleware(request: NextRequest) {
  // Extract the IP address from headers. Adjust as needed for your deployment.
  const ip = request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip') ||
    'anonymous';

  console.log(ip);

  try {
    // Consume 1 point for the current IP.
    await rateLimiter.consume(ip);
    return NextResponse.next();
  } catch (error) {
    // If rate limit is exceeded, return a 429 response.
    return new NextResponse('Too many requests', { status: 429 });
  }
}

// Apply this middleware to every endpoint/page.
export const config = {
  matcher: '/:path*',
};
