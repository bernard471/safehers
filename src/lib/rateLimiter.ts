// Simple in-memory rate limiter — resets on server restart.
// For production, swap with Redis (Upstash) to persist across instances.

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

const MAX_REQUESTS = 5;         // max submissions per window
const WINDOW_MS = 60 * 60 * 1000; // 1 hour window

/**
 * Returns true when the request is ALLOWED, false when rate-limited.
 */
export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_REQUESTS) {
    return false; // rate limited
  }

  entry.count += 1;
  return true;
}

// Periodically clean up expired entries to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now > entry.resetAt) store.delete(key);
  }
}, WINDOW_MS);
