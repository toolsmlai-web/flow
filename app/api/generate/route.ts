import { NextRequest, NextResponse } from "next/server";
import { MOCK_WORKFLOW } from "@/lib/mock";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt || prompt.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Prompt must be at least 5 characters" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Return mock workflow data
    return NextResponse.json(
      {
        success: true,
        data: {
          id: "wf_" + Math.random().toString(36).substring(2, 9),
          title: prompt.slice(0, 50) + (prompt.length > 50 ? "..." : ""),
          prompt: prompt,
          nodes: MOCK_WORKFLOW.nodes,
          edges: MOCK_WORKFLOW.edges,
          created_at: new Date().toISOString(),
        },
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate workflow" },
      { status: 500, headers: corsHeaders }
    );
  }
}
