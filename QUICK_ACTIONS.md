# ⚡ Quick Actions - Start Here

**Last Updated:** March 30, 2026  
**Status:** Ready for implementation  
**Audience:** Developers who want to start immediately

---

## 🎯 Do This First (Today/Tomorrow)

### Action 1: Choose & Setup Database (2 hours)

```bash
# 1. Go to https://supabase.com and create account
# 2. Create new project "checkflow-ai"
# 3. Save these credentials in .env.local

NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key
```

**Database Schema to Create:**
```sql
-- Copy this into Supabase SQL Editor

CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  use_case VARCHAR(255),
  source VARCHAR(50) DEFAULT 'landing_page',
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  verified_at TIMESTAMP,
  INDEX(email, status)
);

-- Add RLS policy
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert" ON waitlist FOR INSERT WITH CHECK (true);
```

✅ **Done:** Database ready for use

---

### Action 2: Install Dependencies (5 minutes)

```bash
npm install zod @supabase/supabase-js @upstash/ratelimit @upstash/redis resend @sentry/nextjs

# Or if using pnpm:
pnpm add zod @supabase/supabase-js @upstash/ratelimit @upstash/redis resend @sentry/nextjs
```

✅ **Done:** Dependencies installed

---

### Action 3: Fix CORS Immediately (5 minutes)

**File:** `app/api/waitlist/route.ts`

```typescript
// CHANGE THIS (line 3-6):
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// TO THIS:
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "https://checkflow.ai").split(",");

function getCorsHeaders(request: NextRequest) {
  const origin = request.headers.get('origin') || '';
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : "",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}
```

Then update the return statements:
```typescript
// Change:
return NextResponse.json({...}, { headers: corsHeaders });
// To:
return NextResponse.json({...}, { headers: getCorsHeaders(request) });
```

**Add to `.env.local`:**
```
ALLOWED_ORIGINS=https://checkflow.ai,http://localhost:3000
```

✅ **Done:** CORS secured

---

## 🔧 Do This This Week

### Action 4: Remove localStorage Anti-pattern (1 hour)

**File:** `app/components/landing/CTASection.tsx`

**REMOVE THIS (lines 17-18):**
```typescript
const emails = JSON.parse(localStorage.getItem("waitlist_emails") || "[]");
emails.push({ email, timestamp: new Date().toISOString() });
localStorage.setItem("waitlist_emails", JSON.stringify(emails));
```

**REPLACE WITH THIS:**
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!email.trim()) return;
  
  setLoading(true);
  try {
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email, 
        use_case: 'general',
        source: 'landing_page'
      }),
    });
    
    const data = await response.json();
    if (data.success) {
      setSubmitted(true);
    } else {
      setError(data.error || 'Something went wrong');
    }
  } catch (error) {
    setError('Network error. Please try again.');
  } finally {
    setLoading(false);
  }
};
```

Add to state:
```typescript
const [error, setError] = useState("");
```

✅ **Done:** localStorage removed

---

### Action 5: Add Input Validation with Zod (30 minutes)

**Create File:** `lib/schemas.ts`

```typescript
import { z } from "zod";

export const waitlistSchema = z.object({
  email: z.string()
    .email("Please enter a valid email address")
    .min(5, "Email is too short"),
  use_case: z.string().optional(),
  source: z.string().default("landing_page"),
});

export const generateSchema = z.object({
  prompt: z.string()
    .min(5, "Prompt must be at least 5 characters")
    .max(500, "Prompt must be less than 500 characters"),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
export type GenerateInput = z.infer<typeof generateSchema>;
```

**Update File:** `app/api/waitlist/route.ts`

```typescript
import { waitlistSchema } from "@/lib/schemas";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validated = waitlistSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { success: false, error: validated.error.errors[0].message },
        { status: 400, headers: getCorsHeaders(request) }
      );
    }
    
    const { email, use_case } = validated.data;
    // ... rest of code
  }
}
```

✅ **Done:** Validation in place

---

### Action 6: Setup Rate Limiting (1.5 hours)

**Create File:** `lib/rateLimit.ts`

```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const waitlistLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(10, "1 h"), // 10 per hour
  analytics: true,
});

export const generateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, "1 h"), // 5 per hour
  analytics: true,
});
```

**Update File:** `app/api/waitlist/route.ts`

```typescript
import { waitlistLimit } from "@/lib/rateLimit";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    // Rate limit check
    const ip = headers().get("x-forwarded-for") || "unknown";
    const { success, pending, reset } = await waitlistLimit.limit(ip);
    
    if (!success) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Rate limited. Try again in ${Math.ceil((reset - Date.now()) / 1000)} seconds` 
        },
        { status: 429, headers: getCorsHeaders(request) }
      );
    }
    
    // ... rest of validation and processing
  }
}
```

**Setup Upstash (2 minutes):**
1. Go to https://upstash.com
2. Create account → Create Redis Database
3. Copy REST URL and TOKEN
4. Add to `.env.local`:
```
UPSTASH_REDIS_REST_URL=your_url
UPSTASH_REDIS_REST_TOKEN=your_token
```

✅ **Done:** Rate limiting active

---

## 📋 This Month's Tasks

### Week 1 Summary ✅
- [ ] Database setup (Supabase)
- [ ] Dependencies installed
- [ ] CORS restricted
- [ ] localStorage removed
- [ ] Input validation added
- [ ] Rate limiting active

### Week 2 Tasks 🔄
- [ ] Connect to real database in waitlist API
- [ ] Error boundary component created
- [ ] Sentry error tracking setup
- [ ] Email verification flow designed
- [ ] Auth routes scaffolded

### Week 3 Tasks 📊
- [ ] Tests written for critical paths
- [ ] Analytics integrated
- [ ] Structured data added
- [ ] Accessibility improved
- [ ] API documentation created

### Week 4 Tasks 🎉
- [ ] Full test coverage
- [ ] Performance monitoring
- [ ] Documentation complete
- [ ] Production deployment
- [ ] Team training complete

---

## 🚀 Critical Path (Minimum for Go-Live)

```
Database Setup (2h)
    ↓
Remove localStorage (1h)
    ↓
Add Validation (1h)
    ↓
Fix CORS (0.5h)
    ↓
Add Rate Limiting (1.5h)
    ↓
Connect API to DB (1h)
    ↓
Setup Error Tracking (1h)
    ↓
Email Verification (3h)
    ↓
Testing & Deployment (2h)

Total: ~13 hours
Timeline: 2-3 days with focused effort
```

---

## 🔐 Security Checklist (Do Now)

- [ ] CORS restricted to your domain
- [ ] Rate limiting on all endpoints
- [ ] Input validation on all forms
- [ ] Environment variables never hardcoded
- [ ] Database uses Supabase service key
- [ ] Error messages don't leak sensitive info
- [ ] No console.log of sensitive data
- [ ] HTTPS enforced (Vercel default ✅)

---

## 📊 Before/After Comparison

### Before These Actions ❌
```
User → Form → localStorage → Data Lost!
           ↓
      No validation
      No rate limit
      Weak security
      CORS open to all
```

### After These Actions ✅
```
User → Form → Validation ✓
           ↓
      Rate Limit Check ✓
           ↓
      Database Store ✓
           ↓
      Persistent & Secure!
```

---

## 🎯 Success Signals

### ✅ You'll Know It Works When:

1. **Form Submission**
   - User enters email
   - Form validates before submit
   - API responds with rate limit headers
   - Data appears in Supabase dashboard
   - No data lost on page refresh

2. **Rate Limiting**
   - User tries to submit 11 times
   - 11th submission returns 429 error
   - Clear message: "Rate limited. Try again in X seconds"

3. **Validation**
   - Enter "invalid" → Error message appears
   - Enter "test@test" → Error message appears
   - Enter "test@example.com" → Accepted

4. **CORS**
   - Requests from your domain work
   - Requests from random origin rejected
   - Browser console shows no CORS errors

---

## 🆘 Troubleshooting Quick Guide

### Issue: Supabase connection fails
```
✅ Check: NEXT_PUBLIC_SUPABASE_URL exists in .env.local
✅ Check: NEXT_PUBLIC_SUPABASE_ANON_KEY correct
✅ Check: Network tab shows API calls to supabase.co
✅ Check: Supabase project is active
```

### Issue: Rate limiting not working
```
✅ Check: UPSTASH_REDIS_REST_URL in .env.local
✅ Check: UPSTASH_REDIS_REST_TOKEN correct
✅ Check: Upstash database is active
✅ Check: Rate limit code reached (console.log before/after)
```

### Issue: CORS error in browser
```
✅ Check: ALLOWED_ORIGINS includes your domain
✅ Check: Domain has no typos (www vs non-www)
✅ Check: Protocol matches (http vs https)
✅ Check: getCorsHeaders(request) called in response
```

### Issue: Validation not triggering
```
✅ Check: zod schema is correct
✅ Check: safeParse used (not parse)
✅ Check: Error message returned in response
✅ Check: Frontend checks response.success
```

---

## 📈 Progress Tracking Template

Copy this to a GitHub Issue or Notion:

```markdown
## Audit Implementation Progress

### Week 1: Foundation (Critical Fixes)
- [ ] Database Integration (Supabase)
- [ ] Remove localStorage
- [ ] Fix CORS
- [ ] Add Rate Limiting
- [ ] Input Validation with Zod

**Status:** 0/5 ⏳

### Week 2: Stability (Error Handling)
- [ ] Error Boundary Component
- [ ] Email Verification Setup
- [ ] Sentry Integration
- [ ] Auth Routes Scaffolding
- [ ] Loading States

**Status:** 0/5 ⏳

### Week 3: Insights (Analytics & SEO)
- [ ] Web Analytics Setup
- [ ] Structured Data
- [ ] Accessibility Audit
- [ ] API Documentation
- [ ] Performance Monitoring

**Status:** 0/5 ⏳

### Week 4: Quality (Testing & Launch)
- [ ] Unit Tests
- [ ] Integration Tests
- [ ] E2E Tests
- [ ] Security Audit
- [ ] Production Deployment

**Status:** 0/5 ⏳
```

---

## 📚 File Reference

### Files to Create
- [ ] `lib/schemas.ts` - Zod validation schemas
- [ ] `lib/rateLimit.ts` - Rate limiting setup
- [ ] `app/components/ErrorBoundary.tsx` - Error handling
- [ ] `.env.example` - Template for env vars

### Files to Update
- [ ] `app/api/waitlist/route.ts` - Add validation, rate limit, DB
- [ ] `app/api/generate/route.ts` - Add validation, rate limit
- [ ] `app/components/landing/CTASection.tsx` - Remove localStorage
- [ ] `package.json` - Add dependencies
- [ ] `.env.local` - Add new env vars

### Files to Keep As-Is (They're fine!)
- [ ] `app/layout.tsx` - Good
- [ ] `app/page.tsx` - Good
- [ ] `app/globals.css` - Good
- [ ] Navigation components - Good
- [ ] Feature components - Good

---

## 🎓 Learning Resources

### Documentation to Read
- [Supabase Docs](https://supabase.com/docs)
- [Zod Docs](https://zod.dev)
- [Upstash Ratelimit](https://upstash.com/docs/redis/features/ratelimiting)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

### Example Code
All provided in IMPLEMENTATION_PLAN.md for each task

---

## ⏱️ Time Estimates for Solo Developer

| Task | Easy? | Duration | Can Parallelize? |
|------|-------|----------|-----------------|
| Database Setup | Yes | 2h | No (do first) |
| Remove localStorage | Yes | 1h | Yes (after DB) |
| CORS Fix | Yes | 0.5h | Yes |
| Validation | Medium | 1h | Yes |
| Rate Limiting | Medium | 1.5h | Yes |
| **Subtotal** | — | **6h** | — |

**For one developer:** Doable in 1-2 days of focused work  
**For two developers:** Can parallelize Week 2+ tasks

---

## 🎯 Definition of Done (Per Task)

Checklist before marking a task complete:

```
Code Quality:
  [ ] Code follows project style
  [ ] No console.log() debugging statements
  [ ] TypeScript strict mode happy
  [ ] No deprecated dependencies

Testing:
  [ ] Tested locally with valid input
  [ ] Tested with invalid input
  [ ] Error messages make sense
  [ ] Works on mobile

Deployment:
  [ ] No hardcoded values
  [ ] All env vars documented
  [ ] Works in production
  [ ] No warnings on build

Documentation:
  [ ] Changes documented
  [ ] Code comments added if complex
  [ ] README updated if needed
```

---

## 🚦 Green/Yellow/Red Flags

### 🟢 Green Flags (You're on track!)
- Emails successfully stored in database
- Rate limiting rejecting excess requests
- Validation error messages appearing
- CORS errors gone from console
- Environment variables working

### 🟡 Yellow Flags (Needs attention)
- Occasional database connection timeouts
- Rate limit being too strict/loose
- Some validation edge cases failing
- API responses slow (>500ms)
- Errors not captured in logs

### 🔴 Red Flags (Critical issues)
- No emails stored in database
- All requests rate limited
- Validation not running
- CORS errors prevent requests
- App crashes on form submit
- Database queries failing

---

## 📞 Getting Unstuck

### If stuck on database:
→ Check Supabase dashboard status  
→ Verify API keys in env  
→ Test connection in SQL editor first  
→ Check browser network tab for errors  

### If stuck on validation:
→ Add console.log before/after validate  
→ Check Zod error output format  
→ Test schema in isolation  
→ Review zod documentation examples  

### If stuck on rate limiting:
→ Verify Upstash credentials  
→ Test Redis connection directly  
→ Check rate limit config  
→ Review HTTP headers in response  

### General:
→ Check browser console (Cmd+Option+I)  
→ Check server logs  
→ Verify all env variables set  
→ Restart dev server  
→ Clear browser cache  

---

## ✅ Final Checklist

Before considering Phase 1 complete:

- [ ] Database connected and working
- [ ] localStorage completely removed
- [ ] CORS restricted to domain
- [ ] Rate limiting active
- [ ] Input validation on all forms
- [ ] No sensitive data in errors
- [ ] Environment variables documented
- [ ] No broken features from changes
- [ ] Can refresh page without data loss
- [ ] API can handle 10 requests/hour per user

---

## 🎉 You Did It!

Once all Phase 1 tasks complete:

1. **Test the happy path:** Fill form → Submit → Check database → Refresh page → Data still there ✅
2. **Test the error path:** Try invalid email → See error message ✅
3. **Test the limit path:** Submit 11 times → 11th fails with rate limit message ✅
4. **Deploy to production:** Push to main → Verify on live site ✅

---

**Ready to start?** Follow the "Do This First" section above! 🚀

Questions? Check AUDIT_SUMMARY.md or IMPLEMENTATION_PLAN.md for more details.

Good luck! 💪
