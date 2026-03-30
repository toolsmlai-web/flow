import { z } from "zod";

// Email validation schema - strict RFC 5322 compliance
export const emailSchema = z
  .string()
  .email("Please enter a valid email address")
  .min(5, "Email is too short")
  .max(255, "Email is too long")
  .toLowerCase()
  .trim();

// Waitlist signup validation
export const waitlistSchema = z.object({
  email: emailSchema,
  use_case: z
    .string()
    .max(255, "Use case is too long")
    .optional()
    .or(z.literal("")),
  source: z.string().default("landing_page").optional(),
});

// Generate workflow validation
export const generateSchema = z.object({
  prompt: z
    .string()
    .min(5, "Prompt must be at least 5 characters")
    .max(500, "Prompt must be less than 500 characters")
    .trim(),
});

// Email verification validation
export const verifyEmailSchema = z.object({
  email: emailSchema,
  token: z.string().min(1, "Verification token is required"),
});

// Rate limit response schema
export const rateLimitResponseSchema = z.object({
  success: z.boolean(),
  error: z.string().optional(),
  retryAfter: z.number().optional(),
});

// API response schemas
export const successResponseSchema = z.object({
  success: z.literal(true),
  message: z.string().optional(),
  data: z.unknown().optional(),
});

export const errorResponseSchema = z.object({
  success: z.literal(false),
  error: z.string(),
  details: z.unknown().optional(),
});

// Type exports for TypeScript
export type WaitlistInput = z.infer<typeof waitlistSchema>;
export type GenerateInput = z.infer<typeof generateSchema>;
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;
export type SuccessResponse = z.infer<typeof successResponseSchema>;
export type ErrorResponse = z.infer<typeof errorResponseSchema>;

// Validation utilities
export function validateEmail(email: string): { valid: boolean; error?: string } {
  const result = emailSchema.safeParse(email);
  if (!result.success) {
    return { valid: false, error: result.error.errors[0]?.message };
  }
  return { valid: true };
}

export function validateWaitlist(data: unknown): { valid: boolean; data?: WaitlistInput; error?: string } {
  const result = waitlistSchema.safeParse(data);
  if (!result.success) {
    return { valid: false, error: result.error.errors[0]?.message };
  }
  return { valid: true, data: result.data };
}

export function validateGenerate(data: unknown): { valid: boolean; data?: GenerateInput; error?: string } {
  const result = generateSchema.safeParse(data);
  if (!result.success) {
    return { valid: false, error: result.error.errors[0]?.message };
  }
  return { valid: true, data: result.data };
}
