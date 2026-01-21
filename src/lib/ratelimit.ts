import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';
import { headers } from 'next/headers';

// Rate limiters using Vercel KV
const hourlyLimiter = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(5, '1 h'),
  prefix: 'ratelimit:hourly',
});

const dailyLimiter = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(20, '24 h'),
  prefix: 'ratelimit:daily',
});

export async function getClientIP(): Promise<string> {
  const headersList = await headers();
  const forwardedFor = headersList.get('x-forwarded-for');
  const realIP = headersList.get('x-real-ip');

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  return 'anonymous';
}

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfter?: number;
  reason?: 'hourly' | 'daily';
};

export async function checkRateLimit(identifier: string): Promise<RateLimitResult> {
  // Check hourly limit first
  const hourlyResult = await hourlyLimiter.limit(identifier);
  if (!hourlyResult.success) {
    const retryAfter = Math.ceil((hourlyResult.reset - Date.now()) / 1000);
    return {
      allowed: false,
      remaining: 0,
      retryAfter,
      reason: 'hourly',
    };
  }

  // Check daily limit
  const dailyResult = await dailyLimiter.limit(identifier);
  if (!dailyResult.success) {
    const retryAfter = Math.ceil((dailyResult.reset - Date.now()) / 1000);
    return {
      allowed: false,
      remaining: 0,
      retryAfter,
      reason: 'daily',
    };
  }

  return {
    allowed: true,
    remaining: Math.min(hourlyResult.remaining, dailyResult.remaining),
  };
}
