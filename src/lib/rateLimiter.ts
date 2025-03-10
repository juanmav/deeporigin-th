const rateLimitWindowMs = 60 * 1000; // 1 minute window
const maxRequests = 5;

// A simple in-memory store mapping IP to request count and window start time.
const ipRequestCounts = new Map<string, { count: number; startTime: number }>();

/**
 * Checks if the given IP address has exceeded the maximum allowed requests.
 * Returns true if the rate limit is exceeded, false otherwise.
 */
export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = ipRequestCounts.get(ip);

  if (!record) {
    // First request from this IP.
    ipRequestCounts.set(ip, { count: 1, startTime: now });
    return false;
  }

  if (now - record.startTime < rateLimitWindowMs) {
    // Still in the same window.
    if (record.count >= maxRequests) {
      return true;
    }
    record.count++;
    return false;
  } else {
    // New window starts.
    ipRequestCounts.set(ip, { count: 1, startTime: now });
    return false;
  }
}
