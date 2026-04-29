import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize Redis client for rate limiting
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

// Rate limiters with different configurations
export const waitlistRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(10, "1 h"), // 10 requests per hour
  analytics: true,
  prefix: "ratelimit:waitlist",
});

export const generateRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, "1 h"), // 5 requests per hour
  analytics: true,
  prefix: "ratelimit:generate",
});

export const authRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, "15 m"), // 5 attempts per 15 minutes
  analytics: true,
  prefix: "ratelimit:auth",
});

// Utility function to get client IP
export function getClientIp(request: Request | { headers: Headers }): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }
  return "unknown";
}

// Type for rate limit response
export interface RateLimitResult {
  success: boolean;
  limit?: number;
  remaining?: number;
  reset?: number;
  retryAfter?: number;
}

// Format rate limit error message
export function formatRateLimitError(result: RateLimitResult): string {
  if (result.retryAfter) {
    const seconds = result.retryAfter;
    if (seconds < 60) {
      return `Too many requests. Please try again in ${seconds} second${seconds !== 1 ? "s" : ""}.`;
    }
    const minutes = Math.ceil(seconds / 60);
    return `Too many requests. Please try again in ${minutes} minute${minutes !== 1 ? "s" : ""}.`;
  }
  return "Too many requests. Please try again later.";
}

// Verify Redis connection
export async function verifyRedisConnection(): Promise<boolean> {
  try {
    await redis.ping();
    return true;
  } catch (error) {
    console.error("[v0] Redis connection failed:", error);
    return false;
  }
}
