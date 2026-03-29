# Developer Quick Reference Guide

**For:** Developers working on CheckFlow AI  
**Version:** 1.0  
**Last Updated:** March 30, 2026

---

## Getting Started (5 minutes)

### 1. Clone and Setup
```bash
# Clone the repository
git clone <repo-url>
cd checkflow-ai

# Install dependencies
npm install

# Create .env.local (copy from .env.example)
cp .env.example .env.local

# Add your secrets to .env.local
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - SUPABASE_SERVICE_ROLE_KEY
# - UPSTASH_REDIS_REST_URL
# - UPSTASH_REDIS_REST_TOKEN
```

### 2. Initialize Database
```bash
# In Supabase Dashboard:
# 1. Go to SQL Editor
# 2. Copy contents of scripts/init-db.sql
# 3. Execute the script
```

### 3. Start Development
```bash
npm run dev
# Server runs at http://localhost:3000
```

---

## Project Structure

```
checkflow-ai/
├── app/
│   ├── api/                    # API routes
│   │   ├── waitlist/route.ts   # Waitlist endpoint
│   │   └── generate/route.ts   # Generate endpoint
│   ├── components/
│   │   ├── ErrorBoundary.tsx   # Error handling
│   │   └── landing/            # Landing page sections
│   │       ├── Hero.tsx
│   │       ├── CTASection.tsx
│   │       └── ...
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   └── globals.css             # Global styles
├── lib/
│   ├── supabase.ts             # Database operations
│   ├── schemas.ts              # Validation schemas
│   ├── rateLimit.ts            # Rate limiting
│   ├── mock.ts                 # Mock data
│   └── utils.ts                # Utilities
├── scripts/
│   └── init-db.sql             # Database init
├── public/                      # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

---

## Key Files to Know

### API Routes

#### `/app/api/waitlist/route.ts`
**Purpose:** Handles email waitlist signups  
**Methods:** POST (add to waitlist), OPTIONS (CORS)  
**Validations:**
- Email format (via Zod)
- Rate limiting (10/hour)
- Duplicate detection
- CORS checking

**Request:**
```json
{
  "email": "user@example.com",
  "use_case": "workflow_automation"
}
```

**Response:**
```json
{
  "success": true,
  "message": "You're on the list!",
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "status": "pending",
    "position": 42
  }
}
```

#### `/app/api/generate/route.ts`
**Purpose:** Generates AI workflows from prompts  
**Methods:** POST (generate), OPTIONS (CORS)  
**Validations:**
- Prompt length (5-500 chars)
- Rate limiting (5/hour)
- CORS checking

---

### Library Files

#### `/lib/schemas.ts`
Zod validation schemas for all inputs.

**Usage:**
```typescript
import { waitlistSchema } from '@/lib/schemas';

const result = waitlistSchema.safeParse(data);
if (!result.success) {
  console.error(result.error);
}
```

#### `/lib/supabase.ts`
Database operations layer.

**Usage:**
```typescript
import { db } from '@/lib/supabase';

// Add to waitlist
const result = await db.addToWaitlist({
  email: 'user@example.com',
  use_case: 'automation'
});

// Get entry
const entry = await db.getWaitlistEntry('user@example.com');

// Log activity
await db.logActivity('signup', email, { details });
```

#### `/lib/rateLimit.ts`
Rate limiting utilities using Upstash Redis.

**Usage:**
```typescript
import { waitlistRateLimit, getClientIp } from '@/lib/rateLimit';

const ip = getClientIp(request);
const result = await waitlistRateLimit.limit(ip);

if (!result.success) {
  return NextResponse.json(
    { error: `Rate limited. Retry in ${result.retryAfter}s` },
    { status: 429 }
  );
}
```

#### `/lib/mock.ts`
Mock data for development.

---

## Common Tasks

### Task 1: Add New API Endpoint

```typescript
// app/api/new-endpoint/route.ts
import { NextRequest, NextResponse } from "next/server";
import { newSchema } from "@/lib/schemas";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "").split(",");

function getCorsHeaders(request: NextRequest) {
  const origin = request.headers.get("origin") || "";
  const isAllowed = ALLOWED_ORIGINS.some(allowed => origin === allowed);
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : "",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS(request: NextRequest) {
  return NextResponse.json({}, { headers: getCorsHeaders(request) });
}

export async function POST(request: NextRequest) {
  const corsHeaders = getCorsHeaders(request);

  try {
    // Rate limit
    const ip = getClientIp(request);
    const rateLimitResult = await rateLimit.limit(ip);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Rate limited" },
        { status: 429, headers: corsHeaders }
      );
    }

    // Validate
    const body = await request.json();
    const validated = newSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.errors[0].message },
        { status: 400, headers: corsHeaders }
      );
    }

    // Process
    const result = await processRequest(validated.data);

    return NextResponse.json(result, { headers: corsHeaders });
  } catch (error) {
    console.error("[v0] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
```

---

### Task 2: Add New Validation Schema

```typescript
// lib/schemas.ts
export const newFeatureSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().optional(),
  email: emailSchema,
  tags: z.array(z.string()).optional(),
});

export type NewFeatureInput = z.infer<typeof newFeatureSchema>;
```

---

### Task 3: Add Database Operation

```typescript
// lib/supabase.ts
export const db = {
  async newOperation(data: NewInput) {
    try {
      const { data: result, error } = await supabaseAdmin
        .from("table_name")
        .insert([data])
        .select()
        .single();

      if (error) return { success: false, error: error.message };
      return { success: true, data: result };
    } catch (error) {
      console.error("[v0] Error:", error);
      return { success: false, error: "Operation failed" };
    }
  }
};
```

---

### Task 4: Modify a Component

```typescript
// app/components/landing/MyComponent.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export default function MyComponent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/endpoint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ /* data */ }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error);
        return;
      }

      // Success handling
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="p-3 bg-red-500/20 text-red-300 rounded">
          {error}
        </div>
      )}
      {/* Component JSX */}
    </div>
  );
}
```

---

## Debugging

### Check API Requests

**Browser Console:**
```javascript
// F12 to open DevTools
// Go to Network tab
// Filter by "api" to see API calls
// Click on request to see:
// - Request body
// - Response body
// - Headers (including CORS)
// - Status code
```

**Using curl:**
```bash
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

### Check Database Queries

```typescript
// Add logging to supabase.ts:
console.log("[v0] Query:", query);
console.log("[v0] Result:", result);
console.log("[v0] Error:", error);
```

**Supabase Dashboard:**
- Go to SQL Editor
- Run queries manually
- Check Logs section for errors

### Check Rate Limiting

```typescript
// In rate limit check:
console.log("[v0] Rate limit result:", rateLimitResult);
console.log("[v0] Client IP:", ip);
```

---

## Testing

### Unit Tests Example

```typescript
// __tests__/schemas.test.ts
import { validateEmail } from '@/lib/schemas';

describe('Email Validation', () => {
  it('accepts valid emails', () => {
    const result = validateEmail('test@example.com');
    expect(result.valid).toBe(true);
  });

  it('rejects invalid emails', () => {
    const result = validateEmail('invalid');
    expect(result.valid).toBe(false);
  });
});
```

### Integration Tests

```typescript
// __tests__/api.test.ts
it('POST /api/waitlist adds to database', async () => {
  const response = await fetch('/api/waitlist', {
    method: 'POST',
    body: JSON.stringify({ email: 'test@example.com' })
  });
  expect(response.ok).toBe(true);
});
```

---

## Performance Tips

### 1. Minimize Database Queries
```typescript
// GOOD - Single query
const { data } = await supabase
  .from("waitlist")
  .select("*, email_verifications(*)")
  .eq("id", id);

// BAD - Multiple queries
const user = await getUser();
const verification = await getVerification(user.id);
```

### 2. Use Proper Indexes
```typescript
// In init-db.sql, indexes are created on:
// - email (unique)
// - status
// - created_at
// Query these columns efficiently!
```

### 3. Cache Where Possible
```typescript
// Rate limit results are cached in Redis
// Avoid repeated calls for same IP
```

---

## Error Handling Best Practices

### 1. Always Wrap API Calls
```typescript
try {
  const response = await fetch('/api/endpoint', { ... });
  const data = await response.json();
  
  if (!response.ok) {
    setError(data.error || 'Request failed');
    return;
  }
  // Success handling
} catch (error) {
  setError('Network error');
}
```

### 2. Log Errors for Debugging
```typescript
console.error("[v0] Operation failed:", {
  error: error.message,
  stack: error.stack,
  timestamp: new Date().toISOString()
});
```

### 3. Show User-Friendly Messages
```typescript
// GOOD
"Invalid email address. Please check and try again."

// BAD
"Error: PGRST116 - Row not found"
```

---

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes
# Test locally

# Commit with clear message
git commit -m "feat: description of changes"

# Push to GitHub
git push origin feature/your-feature

# Create Pull Request on GitHub
# Await review and merge

# Update local main
git checkout main
git pull origin main
```

---

## Environment Variables Checklist

Before running locally, ensure you have:

```bash
# Required for Database
NEXT_PUBLIC_SUPABASE_URL=✓
NEXT_PUBLIC_SUPABASE_ANON_KEY=✓
SUPABASE_SERVICE_ROLE_KEY=✓

# Required for Rate Limiting
UPSTASH_REDIS_REST_URL=✓
UPSTASH_REDIS_REST_TOKEN=✓

# Required for Security
ALLOWED_ORIGINS=http://localhost:3000

# Optional (for Phase 2+)
RESEND_API_KEY=
SENTRY_DSN=
```

---

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm start               # Start production server
npm run lint            # Run ESLint

# Database
# Open Supabase SQL Editor and run scripts/init-db.sql

# Testing
npm run test            # Run tests (when configured)
npm run test:watch      # Watch mode (when configured)
```

---

## Documentation

- **Quick Start:** This file
- **Testing Guide:** `TESTING_GUIDE.md`
- **Implementation Plan:** `IMPLEMENTATION_PLAN.md`
- **Audit Report:** `AUDIT_REPORT.md`
- **Phase 1 Summary:** `PHASE_1_COMPLETED.md`

---

## Getting Help

1. **Check the docs first:**
   - TESTING_GUIDE.md - Test failures
   - IMPLEMENTATION_PLAN.md - Task details
   - AUDIT_REPORT.md - Issue explanations

2. **Debug in browser:**
   - Open DevTools (F12)
   - Check Console tab for errors
   - Check Network tab for API calls

3. **Check database:**
   - Go to Supabase dashboard
   - View tables directly
   - Run test queries in SQL Editor

4. **Ask for help:**
   - Check existing GitHub issues
   - Search Discord/Slack
   - Create new issue with details

---

## Next Steps

1. Copy `.env.example` to `.env.local`
2. Add your Supabase and Upstash credentials
3. Run `npm install`
4. Run database init script
5. Run `npm run dev`
6. Follow TESTING_GUIDE.md to verify setup
7. Start implementing Phase 2 tasks

---

**Happy coding!** If you have questions, refer to the documentation files or create an issue on GitHub. 🚀
