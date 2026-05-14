import { NextRequest, NextResponse } from "next/server";
import { waitlistSchema } from "@/lib/schemas";
import { waitlistRateLimit, getClientIp, formatRateLimitError } from "@/lib/rateLimit";
import { db } from "@/lib/supabase";

// Get allowed origins from environment
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "https://checkflow.ai").split(",").map(o => o.trim());

// Get CORS headers based on origin
function getCorsHeaders(request: NextRequest) {
  const origin = request.headers.get("origin") || "";
  const isAllowed = ALLOWED_ORIGINS.some(allowed => {
    // Exact match or localhost for development
    return origin === allowed || (process.env.NODE_ENV === "development" && origin.includes("localhost"));
  });

  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : "",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

export async function OPTIONS(request: NextRequest) {
  return NextResponse.json({}, { headers: getCorsHeaders(request) });
}

export async function POST(request: NextRequest) {
  const corsHeaders = getCorsHeaders(request);

  try {
    // Get client IP for logging
    const ip = getClientIp(request);

    // Rate limiting check (if Redis is configured)
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      try {
        const rateLimitResult = await waitlistRateLimit.limit(ip);

        if (!rateLimitResult.success) {
          const retryAfter = rateLimitResult.reset ? Math.ceil((rateLimitResult.reset - Date.now()) / 1000) : 3600;
          return NextResponse.json(
            {
              success: false,
              error: formatRateLimitError({ ...rateLimitResult, retryAfter }),
            },
            {
              status: 429,
              headers: {
                ...corsHeaders,
                "Retry-After": String(retryAfter),
              },
            }
          );
        }
      } catch (rateLimitError) {
        console.error("[v0] Rate limiting service unavailable:", rateLimitError);
        // Continue without rate limiting if service is down (fail open)
      }
    }

    // Parse and validate request body
    const body = await request.json();
    const validated = waitlistSchema.safeParse(body);

    if (!validated.success) {
      const errorMessage = validated.error.errors[0]?.message || "Invalid input";
      return NextResponse.json(
        {
          success: false,
          error: errorMessage,
        },
        { status: 400, headers: corsHeaders }
      );
    }

    const { email, use_case } = validated.data;

    // Check if already on waitlist
    const existing = await db.getWaitlistEntry(email);
    if (existing.success) {
      return NextResponse.json(
        {
          success: true,
          message: "You're already on the waitlist!",
          data: {
            email,
            status: existing.data?.status,
            alreadyExists: true,
          },
        },
        { status: 200, headers: corsHeaders }
      );
    }

    // Add to waitlist
    const result = await db.addToWaitlist({
      email,
      use_case: use_case || "",
      source: "landing_page",
    });

    if (!result.success) {
      // Handle duplicate email (unique constraint)
      if (result.code === "DUPLICATE") {
        return NextResponse.json(
          {
            success: true,
            message: "You're already on the waitlist!",
            data: { email, alreadyExists: true },
          },
          { status: 200, headers: corsHeaders }
        );
      }

      return NextResponse.json(
        { success: false, error: result.error || "Failed to add to waitlist" },
        { status: 500, headers: corsHeaders }
      );
    }

    // Get position in waitlist
    const position = await db.getWaitlistPosition(email);
    const positionData = position.success ? position.data : null;

    // Log activity
    await db.logActivity("waitlist_signup", email, {
      use_case,
      ip,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "You're on the list!",
        data: {
          id: result.data?.id,
          email,
          status: result.data?.status,
          position: positionData?.position,
          totalOnWaitlist: positionData?.total,
          timestamp: result.data?.createdAt,
        },
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("[v0] Waitlist error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
