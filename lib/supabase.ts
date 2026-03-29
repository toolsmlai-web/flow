import { createClient } from "@supabase/supabase-js";
import { WaitlistInput } from "./schemas";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// Client for public operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Service role client for admin operations (server-side only)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Verify Supabase configuration
export function verifySupabaseConfig(): { valid: boolean; error?: string } {
  if (!supabaseUrl) {
    return { valid: false, error: "NEXT_PUBLIC_SUPABASE_URL is not configured" };
  }
  if (!supabaseAnonKey) {
    return { valid: false, error: "NEXT_PUBLIC_SUPABASE_ANON_KEY is not configured" };
  }
  if (!supabaseServiceKey) {
    return { valid: false, error: "SUPABASE_SERVICE_ROLE_KEY is not configured" };
  }
  return { valid: true };
}

// Database operations
export const db = {
  // Waitlist operations
  async addToWaitlist(data: WaitlistInput) {
    try {
      const { data: result, error } = await supabaseAdmin
        .from("waitlist")
        .insert([
          {
            email: data.email,
            use_case: data.use_case,
            source: data.source,
            status: "pending",
            metadata: {
              ipAddress: null,
              userAgent: null,
            },
          },
        ])
        .select()
        .single();

      if (error) {
        // Check if email already exists
        if (error.code === "23505") {
          return { success: false, error: "This email is already on the waitlist", code: "DUPLICATE" };
        }
        return { success: false, error: error.message };
      }

      return {
        success: true,
        data: {
          id: result.id,
          email: result.email,
          status: result.status,
          createdAt: result.created_at,
        },
      };
    } catch (error) {
      console.error("[v0] Failed to add to waitlist:", error);
      return { success: false, error: "Failed to add to waitlist" };
    }
  },

  // Get waitlist entry
  async getWaitlistEntry(email: string) {
    try {
      const { data, error } = await supabaseAdmin
        .from("waitlist")
        .select("*")
        .eq("email", email)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          return { success: false, error: "Email not found" };
        }
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.error("[v0] Failed to get waitlist entry:", error);
      return { success: false, error: "Failed to retrieve entry" };
    }
  },

  // Get waitlist position
  async getWaitlistPosition(email: string) {
    try {
      const { count, error } = await supabaseAdmin
        .from("waitlist")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending")
        .lt("created_at", new Date().toISOString())
        .order("created_at", { ascending: true });

      if (error) {
        return { success: false, error: error.message };
      }

      // Get user's position
      const { data: entries, error: posError } = await supabaseAdmin
        .from("waitlist")
        .select("created_at")
        .eq("email", email)
        .single();

      if (posError) {
        return { success: false, error: posError.message };
      }

      // Count how many entries were created before this email
      const { count: position } = await supabaseAdmin
        .from("waitlist")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending")
        .lt("created_at", entries.created_at);

      return {
        success: true,
        data: {
          position: (position || 0) + 1,
          total: count || 0,
        },
      };
    } catch (error) {
      console.error("[v0] Failed to get waitlist position:", error);
      return { success: false, error: "Failed to get position" };
    }
  },

  // Email verification operations
  async createVerificationToken(email: string, token: string) {
    try {
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      const { error } = await supabaseAdmin
        .from("email_verifications")
        .insert([
          {
            email,
            token,
            expires_at: expiresAt.toISOString(),
          },
        ]);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error("[v0] Failed to create verification token:", error);
      return { success: false, error: "Failed to create verification token" };
    }
  },

  // Update verification status
  async verifyEmail(email: string, token: string) {
    try {
      // Find and verify the token
      const { data: verification, error: findError } = await supabaseAdmin
        .from("email_verifications")
        .select("*")
        .eq("email", email)
        .eq("token", token)
        .single();

      if (findError || !verification) {
        return { success: false, error: "Invalid verification token" };
      }

      // Check if expired
      if (new Date(verification.expires_at) < new Date()) {
        return { success: false, error: "Verification token has expired" };
      }

      // Check attempts
      if (verification.attempts >= 5) {
        return { success: false, error: "Too many verification attempts" };
      }

      // Mark as verified
      const { error: updateError } = await supabaseAdmin
        .from("email_verifications")
        .update({
          verified_at: new Date().toISOString(),
          attempts: verification.attempts + 1,
        })
        .eq("id", verification.id);

      if (updateError) {
        return { success: false, error: updateError.message };
      }

      // Update waitlist status
      const { error: statusError } = await supabaseAdmin
        .from("waitlist")
        .update({ status: "verified", verified_at: new Date().toISOString() })
        .eq("email", email);

      if (statusError) {
        return { success: false, error: statusError.message };
      }

      return { success: true };
    } catch (error) {
      console.error("[v0] Failed to verify email:", error);
      return { success: false, error: "Failed to verify email" };
    }
  },

  // Activity logging
  async logActivity(action: string, email?: string, details?: Record<string, unknown>) {
    try {
      await supabaseAdmin
        .from("activity_logs")
        .insert([
          {
            action,
            user_email: email,
            details,
          },
        ]);
    } catch (error) {
      console.error("[v0] Failed to log activity:", error);
      // Don't throw - logging failures shouldn't break the app
    }
  },

  // Get waitlist stats (for admin)
  async getWaitlistStats() {
    try {
      const { count: total } = await supabaseAdmin
        .from("waitlist")
        .select("*", { count: "exact", head: true });

      const { count: verified } = await supabaseAdmin
        .from("waitlist")
        .select("*", { count: "exact", head: true })
        .eq("status", "verified");

      const { count: pending } = await supabaseAdmin
        .from("waitlist")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      return {
        success: true,
        data: {
          total: total || 0,
          verified: verified || 0,
          pending: pending || 0,
          verificationRate: total ? ((verified || 0) / total) * 100 : 0,
        },
      };
    } catch (error) {
      console.error("[v0] Failed to get stats:", error);
      return { success: false, error: "Failed to retrieve statistics" };
    }
  },
};

export type Database = typeof db;
