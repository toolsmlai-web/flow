import { NextRequest, NextResponse } from "next/server";

// CORS headers for API routes
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
    const { email, use_case, source = "landing_page" } = body;

    // Validation
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Valid email is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Here you would typically:
    // 1. Save to database (MongoDB, Supabase, etc.)
    // 2. Add to email service (Resend, SendGrid, etc.)
    // 3. Trigger welcome email
    // 4. Add to CRM (HubSpot, Salesforce, etc.)

    // Mock success response
    return NextResponse.json(
      {
        success: true,
        message: "You're on the list!",
        data: {
          email,
          use_case,
          source,
          timestamp: new Date().toISOString(),
          position: Math.floor(Math.random() * 2000) + 1000,
        },
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
