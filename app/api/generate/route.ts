import { NextRequest, NextResponse } from "next/server";
import { generateSchema } from "@/lib/schemas";
import { generateRateLimit, getClientIp, formatRateLimitError } from "@/lib/rateLimit";
import { db } from "@/lib/supabase";
import { MOCK_WORKFLOW } from "@/lib/mock";

// Get allowed origins from environment
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "https://checkflow.ai").split(",").map(o => o.trim());

// Get CORS headers based on origin
function getCorsHeaders(request: NextRequest) {
  const origin = request.headers.get("origin") || "";
  const isAllowed = ALLOWED_ORIGINS.some(allowed => {
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
    // Rate limiting check
    const ip = getClientIp(request);
    const rateLimitResult = await generateRateLimit.limit(ip);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: formatRateLimitError(rateLimitResult),
        },
        {
          status: 429,
          headers: {
            ...corsHeaders,
            "Retry-After": String(rateLimitResult.retryAfter || 3600),
          },
        }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validated = generateSchema.safeParse(body);

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

    const { prompt } = validated.data;

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Return mock workflow data
    // Note: In production, this would call actual AI API (OpenAI, Anthropic, etc.)
    const workflowId = "wf_" + Math.random().toString(36).substring(2, 9);
    const timestamp = new Date().toISOString();

    // Log the submission
    await db.logActivity("workflow_generated", undefined, {
      prompt,
      workflowId,
      timestamp,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          id: workflowId,
          title: prompt.slice(0, 50) + (prompt.length > 50 ? "..." : ""),
          prompt: prompt,
          nodes: MOCK_WORKFLOW.nodes,
          edges: MOCK_WORKFLOW.edges,
          created_at: timestamp,
        },
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("[v0] Generation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate workflow" },
      { status: 500, headers: corsHeaders }
    );
  }
}
