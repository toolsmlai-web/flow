# 🛠️ CheckFlow AI - Implementation Plan

**Created:** March 30, 2026  
**Project:** CheckFlow AI Landing Page Improvements  
**Objective:** Address critical issues, enhance functionality, and prepare for production

---

## Phase Overview

```
Phase 1: CRITICAL (Week 1-2) → Data Persistence & Security
Phase 2: HIGH (Week 2-3) → Validation & Error Handling
Phase 3: MEDIUM (Week 3-4) → Analytics & SEO
Phase 4: LONG-TERM (Ongoing) → Testing, Documentation, Enhancement
```

---

## Phase 1: Critical Fixes (Week 1-2)

### ✅ Task 1.1: Implement Database Integration
**Priority:** 🔴 CRITICAL  
**Effort:** 4-6 hours  
**Owner:** Backend Developer

#### Scope
- [ ] Choose database (Supabase recommended for quick setup with Auth)
- [ ] Create waitlist table schema
- [ ] Create workflow history table (optional)
- [ ] Setup row-level security policies
- [ ] Create migration scripts

#### Deliverables
```sql
-- Waitlist table
CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  use_case VARCHAR(255),
  source VARCHAR(50) DEFAULT 'landing_page',
  status VARCHAR(20) DEFAULT 'pending', -- pending, verified, unsubscribed
  created_at TIMESTAMP DEFAULT NOW(),
  verified_at TIMESTAMP,
  INDEX(email)
);

-- Workflow submissions (optional)
CREATE TABLE workflow_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email VARCHAR(255) NOT NULL,
  prompt TEXT NOT NULL,
  generated_workflow JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_email) REFERENCES waitlist(email)
);
```

#### Success Criteria
- Database accessible from API routes
- No data lost on page refresh
- Proper error handling for DB operations

---

### ✅ Task 1.2: Replace localStorage with API-backed Storage
**Priority:** 🔴 CRITICAL  
**Effort:** 2-3 hours  
**Owner:** Frontend Developer

#### Scope
- [ ] Update `CTASection.tsx` to call `/api/waitlist` endpoint
- [ ] Remove localStorage completely
- [ ] Add proper error handling for network failures
- [ ] Add retry logic for failed submissions

#### Changes
```typescript
// Before (CTASection.tsx - REMOVE)
const emails = JSON.parse(localStorage.getItem("waitlist_emails") || "[]");
emails.push({ email, timestamp: new Date().toISOString() });
localStorage.setItem("waitlist_emails", JSON.stringify(emails));

// After (CORRECT)
const response = await fetch('/api/waitlist', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, use_case: 'general' })
});
const data = await response.json();
```

#### Success Criteria
- No localStorage usage
- Email sent to API endpoint
- Data persisted in database
- User gets confirmation with position number

---

### ✅ Task 1.3: Fix CORS Configuration
**Priority:** 🔴 CRITICAL  
**Effort:** 0.5 hours  
**Owner:** Backend Developer

#### Scope
- [ ] Update `/api/waitlist/route.ts` CORS headers
- [ ] Update `/api/generate/route.ts` CORS headers
- [ ] Add environment variable for allowed origins
- [ ] Test from different domains

#### Changes
```typescript
// Before - INSECURE
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
};

// After - SECURE
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "https://checkflow.ai").split(",");

function getCorsHeaders(origin: string) {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : "",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}
```

#### Success Criteria
- CORS header only contains specific domain(s)
- Cross-origin requests rejected
- Same-origin requests work

---

### ✅ Task 1.4: Implement Rate Limiting on API Routes
**Priority:** 🔴 CRITICAL  
**Effort:** 3-4 hours  
**Owner:** Backend Developer

#### Scope
- [ ] Setup Upstash Redis (free tier available)
- [ ] Create rate limiting middleware
- [ ] Apply to `/api/waitlist` endpoint (10 requests per IP per hour)
- [ ] Apply to `/api/generate` endpoint (5 requests per IP per hour)
- [ ] Add clear error messages when rate limited

#### Implementation
```typescript
// lib/rateLimit.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export const waitlistRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(10, "1 h"), // 10 per hour
  analytics: true,
});

export const generateRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, "1 h"), // 5 per hour
  analytics: true,
});

// Usage in route.ts
const { success } = await waitlistRateLimit.limit(ip);
if (!success) {
  return NextResponse.json(
    { error: "Rate limit exceeded. Try again later." },
    { status: 429 }
  );
}
```

#### Success Criteria
- Rate limit enforced
- Clear error messages returned
- Analytics tracked in Upstash

---

### ✅ Task 1.5: Add Input Validation
**Priority:** 🔴 CRITICAL  
**Effort:** 2-3 hours  
**Owner:** Full-stack Developer

#### Scope
- [ ] Install zod for schema validation
- [ ] Create validation schemas for both API endpoints
- [ ] Add client-side validation in forms
- [ ] Add server-side validation in API routes
- [ ] Return clear error messages

#### Implementation
```typescript
// lib/schemas.ts
import { z } from "zod";

export const waitlistSchema = z.object({
  email: z.string().email("Invalid email address"),
  use_case: z.string().optional(),
  source: z.string().default("landing_page"),
});

export const generateSchema = z.object({
  prompt: z.string().min(5, "Prompt must be at least 5 characters"),
});

// In route handlers
import { waitlistSchema } from "@/lib/schemas";

const validated = waitlistSchema.safeParse(body);
if (!validated.success) {
  return NextResponse.json(
    { error: validated.error.errors },
    { status: 400 }
  );
}
```

#### Success Criteria
- Invalid inputs rejected with clear messages
- Both client and server validation working
- Type safety improved

---

## Phase 2: High Priority Fixes (Week 2-3)

### ✅ Task 2.1: Implement Error Boundary Component
**Priority:** 🟡 HIGH  
**Effort:** 2-3 hours  
**Owner:** Frontend Developer

#### Scope
- [ ] Create `ErrorBoundary.tsx` component
- [ ] Wrap major page sections with error boundary
- [ ] Add error logging to external service
- [ ] Show user-friendly error messages
- [ ] Add recovery/retry options

#### Implementation
```typescript
// app/components/ErrorBoundary.tsx
'use client';

import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error('Error caught:', error);
    // Log to external service (Sentry, etc.)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-6 bg-red-50 rounded-lg border border-red-200">
            <h2 className="text-red-900 font-bold">Something went wrong</h2>
            <p className="text-red-700 mt-2">{this.state.error?.message}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
            >
              Try again
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

// Usage in page.tsx
<ErrorBoundary>
  <Hero />
</ErrorBoundary>
```

#### Success Criteria
- Error boundary catches component errors
- User sees helpful message instead of blank page
- Errors logged for debugging

---

### ✅ Task 2.2: Add Email Verification Flow
**Priority:** 🟡 HIGH  
**Effort:** 4-5 hours  
**Owner:** Full-stack Developer

#### Scope
- [ ] Create email verification table in database
- [ ] Generate verification tokens (6 digits or UUID)
- [ ] Send verification email via email service (Resend)
- [ ] Create verification endpoint
- [ ] Update waitlist status after verification
- [ ] Add resend verification email option

#### Database Schema
```sql
CREATE TABLE email_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL,
  token VARCHAR(255) NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  verified_at TIMESTAMP,
  attempts INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Success Criteria
- Verification email sent
- Link/code works correctly
- Status updated after verification
- Tokens expire after 24 hours

---

### ✅ Task 2.3: Improve Hero Loading State
**Priority:** 🟡 HIGH  
**Effort:** 1-2 hours  
**Owner:** Frontend Developer

#### Scope
- [ ] Add loading skeleton while generating
- [ ] Show progress/stage information
- [ ] Prevent multiple submissions during loading
- [ ] Add animation/visual feedback

#### Changes
```typescript
// In Hero.tsx
{loading ? (
  <div className="space-y-3 animate-pulse">
    <div className="h-8 bg-slate-200 rounded-lg w-full" />
    <div className="h-8 bg-slate-200 rounded-lg w-3/4" />
    <div className="h-8 bg-slate-200 rounded-lg w-4/5" />
  </div>
) : (
  // existing code
)}
```

#### Success Criteria
- Loading state clearly visible
- User can't spam submit button
- Smooth transition to results

---

### ✅ Task 2.4: Setup Error Tracking (Sentry)
**Priority:** 🟡 HIGH  
**Effort:** 2-3 hours  
**Owner:** DevOps/Backend

#### Scope
- [ ] Setup Sentry project
- [ ] Install Sentry Next.js SDK
- [ ] Configure error capture
- [ ] Setup alerts for critical errors
- [ ] Create Sentry dashboard

#### Implementation
```bash
# Install
npm install @sentry/nextjs

# Initialize
npx @sentry/wizard@latest -i nextjs
```

```typescript
// sentry.server.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

#### Success Criteria
- Errors automatically reported to Sentry
- Team notified of critical errors
- Performance metrics captured

---

### ✅ Task 2.5: Fix Navigation Links and Add Authentication Scaffolding
**Priority:** 🟡 HIGH  
**Effort:** 2-3 hours  
**Owner:** Frontend Developer

#### Scope
- [ ] Create `/auth/signin` and `/auth/signup` pages
- [ ] Create `/auth/callback` for OAuth
- [ ] Update navigation button links
- [ ] Setup authentication context (if using custom auth)
- [ ] Document OAuth flow

#### Success Criteria
- Sign In button navigates to auth page
- Get Started button initiates signup
- Navigation links functional

---

## Phase 3: Medium Priority (Week 3-4)

### ✅ Task 3.1: Add Web Analytics
**Priority:** 🟡 MEDIUM  
**Effort:** 1-2 hours  
**Owner:** Marketing/Frontend

#### Scope
- [ ] Setup Vercel Web Analytics or Plausible
- [ ] Track page views, clicks, conversions
- [ ] Monitor waitlist signup completion rate
- [ ] Setup goals/events
- [ ] Create marketing dashboard

#### Success Criteria
- Analytics visible in dashboard
- Conversion funnel tracked
- Campaign attribution working

---

### ✅ Task 3.2: Add Structured Data (Schema.org)
**Priority:** 🟡 MEDIUM  
**Effort:** 1.5-2 hours  
**Owner:** Frontend/SEO

#### Scope
- [ ] Add Organization schema
- [ ] Add SoftwareApplication schema
- [ ] Add FAQ schema
- [ ] Validate with Google Structured Data Tool
- [ ] Add meta tags for OG and Twitter

#### Implementation
```typescript
// In layout.tsx or page.tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "CheckFlow AI",
      description: "AI-powered workflow automation platform",
      applicationCategory: "ProductivityApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: "0",
      },
    }),
  }}
/>
```

#### Success Criteria
- Schema validates without errors
- Rich snippets visible in search results
- Meta tags correct

---

### ✅ Task 3.3: Implement Accessibility Improvements
**Priority:** 🟡 MEDIUM  
**Effort:** 2-3 hours  
**Owner:** Frontend Developer

#### Scope
- [ ] Add proper ARIA labels to buttons
- [ ] Add skip-to-content link
- [ ] Support `prefers-reduced-motion`
- [ ] Improve color contrast where needed
- [ ] Add semantic HTML improvements
- [ ] Test with screen readers

#### Implementation
```typescript
// Add skip link
<a href="#main" className="sr-only focus:not-sr-only">
  Skip to main content
</a>

// Support reduced motion
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5 }}
>
  Content
</motion.div>

// Add ARIA labels
<button aria-label="Close menu">
  <X />
</button>
```

#### Success Criteria
- WAVE accessibility checker passes
- Keyboard navigation works
- Screen reader compatible

---

### ✅ Task 3.4: Create API Documentation
**Priority:** 🟡 MEDIUM  
**Effort:** 1-2 hours  
**Owner:** Backend Developer

#### Scope
- [ ] Document `/api/waitlist` endpoint
- [ ] Document `/api/generate` endpoint
- [ ] Create OpenAPI/Swagger spec
- [ ] Add example requests/responses
- [ ] Deploy API docs at `/api/docs`

#### Success Criteria
- API endpoints fully documented
- Examples working
- Clear rate limits and authentication info

---

## Phase 4: Long-term Enhancements

### ✅ Task 4.1: Setup Testing Infrastructure
**Priority:** 🟠 MEDIUM-LOW  
**Effort:** 4-6 hours  
**Owner:** QA/Developer

#### Scope
- [ ] Install Jest and React Testing Library
- [ ] Create test utilities and helpers
- [ ] Add unit tests for utilities
- [ ] Add component tests for major sections
- [ ] Add E2E tests with Playwright/Cypress
- [ ] Setup CI/CD for test runs

#### Testing Strategy
```
Unit Tests (50%)
  - lib/utils.ts
  - lib/schemas.ts
  - lib/rateLimit.ts

Component Tests (30%)
  - Hero.tsx
  - CTASection.tsx
  - Navigation.tsx

E2E Tests (20%)
  - Waitlist signup flow
  - Demo generation flow
  - Navigation and scrolling
```

#### Success Criteria
- 70%+ test coverage
- All critical paths tested
- Tests pass in CI/CD

---

### ✅ Task 4.2: Setup Performance Monitoring
**Priority:** 🟠 MEDIUM-LOW  
**Effort:** 2-3 hours  
**Owner:** DevOps

#### Scope
- [ ] Setup Vercel Analytics Dashboard
- [ ] Monitor Core Web Vitals
- [ ] Setup performance budget
- [ ] Create alerts for degradation
- [ ] Track bundle size
- [ ] Monitor API response times

#### Success Criteria
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- Bundle size monitored

---

### ✅ Task 4.3: Create Comprehensive Documentation
**Priority:** 🟢 LOW  
**Effort:** 3-4 hours  
**Owner:** Tech Lead/Developer

#### Scope
- [ ] Architecture documentation
- [ ] Database schema documentation
- [ ] API endpoint documentation
- [ ] Setup and deployment guide
- [ ] Contributing guide
- [ ] Troubleshooting guide

#### Success Criteria
- New developer can setup in <30 minutes
- All components documented
- Deployment process clear

---

## Resource Requirements

### Infrastructure
- Supabase/Neon Database: Free tier sufficient initially
- Upstash Redis: Free tier (10,000 requests/day)
- Sentry: Free tier (5k errors/month)
- Email Service (Resend): Pay-as-you-go (~$0.20 per email)
- Analytics: Vercel Web Analytics (included with Vercel)

### Team
- Backend Developer: 15-20 hours (Phases 1-2)
- Frontend Developer: 10-15 hours (Phases 1-2)
- DevOps/Full-stack: 5-10 hours (Phases 1-3)
- QA: 5-10 hours (Phase 4)
- **Total:** 35-55 hours of effort

---

## Timeline

| Phase | Duration | Tasks | Status |
|-------|----------|-------|--------|
| Phase 1 (Critical) | Week 1-2 | Tasks 1.1-1.5 | 🔴 Not Started |
| Phase 2 (High) | Week 2-3 | Tasks 2.1-2.5 | 🔴 Not Started |
| Phase 3 (Medium) | Week 3-4 | Tasks 3.1-3.4 | 🔴 Not Started |
| Phase 4 (Long-term) | Ongoing | Tasks 4.1-4.3 | 🔴 Not Started |

---

## Success Metrics

### Security
- ✅ Zero CORS exploits
- ✅ Zero unauthorized API access
- ✅ Rate limiting prevents abuse

### Data Quality
- ✅ 100% email validation
- ✅ Email verification before use
- ✅ No duplicate emails in database

### User Experience
- ✅ Page load < 2.5 seconds
- ✅ Form submission feedback within 1 second
- ✅ 99% uptime

### Business
- ✅ Capture 100% of waitlist signups
- ✅ Track conversion funnel
- ✅ Monitor user engagement

---

## Risk Mitigation

### Risk: Database Downtime
**Mitigation:** Use managed database with 99.9% SLA, implement error handling

### Risk: Rate Limiting Too Strict
**Mitigation:** Start generous (20/hour), reduce based on actual usage

### Risk: Email Deliverability
**Mitigation:** Use reputable email service (Resend), monitor bounce rates

### Risk: Breaking Changes
**Mitigation:** Feature flags for major changes, gradual rollouts

---

## Dependencies

### NPM Packages to Install
```json
{
  "zod": "^3.22.0",
  "@upstash/ratelimit": "^1.0.0",
  "@upstash/redis": "^1.28.0",
  "@supabase/supabase-js": "^2.38.0",
  "resend": "^1.0.0",
  "@sentry/nextjs": "^7.98.0"
}
```

### Environment Variables to Add
```
# Database
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=

# Rate Limiting
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Email
RESEND_API_KEY=

# Sentry
SENTRY_DSN=

# CORS
ALLOWED_ORIGINS=https://checkflow.ai,https://www.checkflow.ai
```

---

## Quality Gates

Before merging any PR:
- [ ] All tests passing
- [ ] No security issues in dependency check
- [ ] Code coverage maintained or improved
- [ ] No console errors or warnings
- [ ] Accessibility check passes
- [ ] Performance budget not exceeded

---

## Review Schedule

- **Weekly Sync:** Progress review and blockers
- **Bi-weekly Demo:** Show stakeholders progress
- **End of Phase:** Full QA and user acceptance testing

---

## Appendix: Task Checklist

### Phase 1 Checklist
- [ ] Task 1.1: Database Integration
- [ ] Task 1.2: Remove localStorage
- [ ] Task 1.3: Fix CORS
- [ ] Task 1.4: Rate Limiting
- [ ] Task 1.5: Input Validation

### Phase 2 Checklist
- [ ] Task 2.1: Error Boundary
- [ ] Task 2.2: Email Verification
- [ ] Task 2.3: Loading States
- [ ] Task 2.4: Error Tracking
- [ ] Task 2.5: Auth Scaffolding

### Phase 3 Checklist
- [ ] Task 3.1: Analytics
- [ ] Task 3.2: Structured Data
- [ ] Task 3.3: Accessibility
- [ ] Task 3.4: API Documentation

### Phase 4 Checklist
- [ ] Task 4.1: Testing
- [ ] Task 4.2: Performance Monitoring
- [ ] Task 4.3: Documentation

---

**Report Created:** March 30, 2026  
**Next Review:** After Phase 1 completion  
**Responsible Party:** Technical Lead
