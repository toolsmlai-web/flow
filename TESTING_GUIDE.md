# Testing Guide for CheckFlow AI

**Created:** March 30, 2026  
**Last Updated:** March 30, 2026  
**Status:** Ready for Testing Phase 1

---

## Quick Start Testing

### Prerequisites
1. All environment variables configured in `.env.local`
2. Supabase database initialized with `scripts/init-db.sql`
3. Development server running with `npm run dev`
4. Open browser console (Cmd+Option+I on Mac, F12 on Windows)

---

## Manual Testing Checklist

### Test 1: Basic Waitlist Signup
**Objective:** Verify form submission works and data is saved to database

**Steps:**
1. Go to `http://localhost:3000`
2. Scroll to "Ready to transform your workflow execution?" section
3. Enter valid email: `test-user@example.com`
4. Click "Get Early Access"
5. Should see success message: "You're on the list!"
6. **Verify in Database:**
   - Go to Supabase dashboard
   - Open `waitlist` table
   - Check that new entry exists with status "pending"

**Expected Results:**
- ✅ Form submission succeeds
- ✅ Success message appears
- ✅ Email saved in database
- ✅ Status is "pending"
- ✅ Created_at timestamp is recent

**Failure Indicators:**
- ❌ Form shows error message
- ❌ No success confirmation
- ❌ Network error in browser console
- ❌ No entry in database

---

### Test 2: Form Validation
**Objective:** Verify input validation works for invalid emails

**Steps:**
1. Go to CTA section
2. Try each invalid input:
   - Empty field → click button → should show "Please enter your email"
   - `invalid` → click button → should show "Please enter a valid email address"
   - `test@invalid` → click button → should show "Please enter a valid email address"
   - `test@example.com` → click button → should succeed

**Expected Results:**
- ✅ All invalid inputs show appropriate error messages
- ✅ Valid email is accepted
- ✅ Errors disappear when user corrects input

**Failure Indicators:**
- ❌ Invalid emails are accepted
- ❌ No error messages shown
- ❌ Valid emails rejected

---

### Test 3: Duplicate Email Handling
**Objective:** Verify that duplicate emails are handled gracefully

**Steps:**
1. Already added `test-user@example.com` in Test 1
2. Go to CTA section
3. Enter same email: `test-user@example.com`
4. Click "Get Early Access"
5. Should see: "You're already on the list!"

**Expected Results:**
- ✅ No duplicate created
- ✅ Friendly message shown
- ✅ No error
- ✅ Database still shows only 1 entry

**Failure Indicators:**
- ❌ Duplicate entry created
- ❌ Error message shown
- ❌ No feedback to user

---

### Test 4: Rate Limiting
**Objective:** Verify rate limiting blocks excessive requests

**Steps:**
1. Go to CTA section
2. Submit 10 different valid emails rapidly
   - Email 1-10: `user1@test.com` through `user10@test.com`
3. These should all succeed (limit is 10/hour)
4. Try submitting 11th email: `user11@test.com`
5. Should see rate limit error

**Expected Results:**
- ✅ First 10 requests succeed
- ✅ 11th request fails with: "Too many requests. Please try again in..."
- ✅ Error message includes retry time
- ✅ All 10 emails in database

**Failure Indicators:**
- ❌ Rate limiting not working (11th succeeds)
- ❌ No error message
- ❌ All 11 in database

---

### Test 5: CORS Security
**Objective:** Verify CORS headers are properly restricted

**Steps:**
1. Open browser console
2. Go to any non-localhost domain (or use curl)
3. Try to call API from different origin:
   ```javascript
   fetch('http://localhost:3000/api/waitlist', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ email: 'test@example.com' })
   })
   ```
4. Should fail with CORS error

**Expected Results:**
- ✅ Cross-origin requests blocked
- ✅ Same-origin requests work
- ✅ No CORS errors in console for legitimate requests

**Failure Indicators:**
- ❌ Cross-origin request succeeds
- ❌ Response has `Access-Control-Allow-Origin: *`
- ❌ CORS errors for legitimate requests

---

### Test 6: Error Boundary
**Objective:** Verify error boundary catches component errors

**Steps:**
1. Open browser console
2. Add intentional error to a component (temporarily):
   ```javascript
   throw new Error("Test error");
   ```
3. Should see error boundary fallback UI

**Expected Results:**
- ✅ Error page appears instead of blank screen
- ✅ "Something went wrong" message shown
- ✅ "Try Again" button works
- ✅ Error logged to console

**Failure Indicators:**
- ❌ Blank screen (error not caught)
- ❌ No user-friendly error message
- ❌ Page is broken

---

### Test 7: Hero Section Generation
**Objective:** Verify the generate workflow feature works

**Steps:**
1. Go to Hero section at top of page
2. Enter prompt: `Build a system to launch an AI SaaS`
3. Click "Generate"
4. Should see loading state
5. After ~2 seconds, should see success: "Workflow generated successfully!"

**Expected Results:**
- ✅ Loading spinner appears
- ✅ Button is disabled during loading
- ✅ Success message shown after delay
- ✅ No errors in console

**Failure Indicators:**
- ❌ No loading state
- ❌ Button enabled during request
- ❌ Error message
- ❌ Network error

---

### Test 8: Mobile Responsiveness
**Objective:** Verify forms and layout work on mobile

**Steps:**
1. Open DevTools (F12)
2. Toggle device toolbar (Cmd+Shift+M)
3. Test iPhone 14 Pro
4. Scroll through page
5. Fill out email form on mobile
6. Click submit button

**Expected Results:**
- ✅ Layout adapts to mobile width
- ✅ Form fields are readable
- ✅ Button is easily tappable
- ✅ Success message readable
- ✅ Submission works

**Failure Indicators:**
- ❌ Layout broken on mobile
- ❌ Text too small
- ❌ Button hard to tap
- ❌ Form submission fails

---

### Test 9: Page Refresh Data Persistence
**Objective:** Verify data is NOT lost on page refresh

**Steps:**
1. Add new email: `persist-test@example.com`
2. See success message
3. **Refresh page** (Cmd+R)
4. Scroll back to CTA section
5. Try to add same email again
6. Should see: "You're already on the list!"

**Expected Results:**
- ✅ After refresh, data still exists
- ✅ Duplicate detection works
- ✅ No data loss
- ✅ Database shows email was saved

**Failure Indicators:**
- ❌ Data lost on refresh
- ❌ Can add same email twice
- ❌ Error on duplicate detection

---

### Test 10: Network Error Handling
**Objective:** Verify graceful handling of network failures

**Steps:**
1. Open DevTools
2. Go to Network tab
3. Enable offline mode
4. Try to submit email form
5. Should see network error message

**Expected Results:**
- ✅ Friendly error message shown
- ✅ "Network error. Please check your connection and try again."
- ✅ Form remains functional after going online

**Failure Indicators:**
- ❌ Crash on network error
- ❌ No feedback to user
- ❌ Confusing error message

---

## Automated Test Examples

### Test Email Validation
```javascript
// lib/schemas.ts testing
import { validateEmail } from '@/lib/schemas';

const tests = [
  { input: 'valid@example.com', expected: true },
  { input: 'invalid', expected: false },
  { input: 'test@invalid', expected: false },
  { input: '', expected: false },
  { input: 'test@example', expected: false },
];

tests.forEach(test => {
  const result = validateEmail(test.input);
  console.assert(result.valid === test.expected, `Failed for ${test.input}`);
});
```

### Test Rate Limiting
```javascript
// lib/rateLimit.ts testing
import { waitlistRateLimit } from '@/lib/rateLimit';

// Simulate multiple requests
async function testRateLimit() {
  const ip = '192.168.1.1';
  const results = [];
  
  for (let i = 0; i < 15; i++) {
    const result = await waitlistRateLimit.limit(ip);
    results.push(result);
  }
  
  // First 10 should succeed
  console.assert(results.slice(0, 10).every(r => r.success));
  // Next 5 should fail
  console.assert(results.slice(10).every(r => !r.success));
}
```

---

## Database Testing

### Check Waitlist Table
```sql
-- View all waitlist entries
SELECT id, email, status, created_at 
FROM waitlist 
ORDER BY created_at DESC;

-- Check for duplicates
SELECT email, COUNT(*) 
FROM waitlist 
GROUP BY email 
HAVING COUNT(*) > 1;

-- Get stats
SELECT 
  COUNT(*) as total,
  SUM(CASE WHEN status = 'verified' THEN 1 ELSE 0 END) as verified,
  SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending
FROM waitlist;
```

---

## API Testing with curl

### Test Waitlist Endpoint
```bash
# Valid request
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "use_case": "workflow_automation"}'

# Invalid email
curl -X POST http://localhost:3000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email": "invalid"}'

# Rate limit test (run 11 times)
for i in {1..11}; do
  curl -X POST http://localhost:3000/api/waitlist \
    -H "Content-Type: application/json" \
    -d "{\"email\": \"user$i@test.com\"}"
done
```

### Test Generate Endpoint
```bash
# Valid request
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Build a system to launch an AI SaaS"}'

# Prompt too short
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "test"}'
```

---

## Performance Testing

### Lighthouse Audit
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Click "Analyze page load"
4. Check scores:
   - **Performance:** Should be 85+
   - **Accessibility:** Should be 80+
   - **Best Practices:** Should be 85+
   - **SEO:** Should be 85+

### Bundle Size
```bash
# Check build output
npm run build

# Look for output like:
# ○ (Static)   revalidate: false
#   ├ /                     123 B (from /app/page.tsx)
#   └ ...
```

---

## Production Checklist Before Deployment

- [ ] All manual tests pass
- [ ] Database backups configured
- [ ] Rate limiting tuned for expected traffic
- [ ] CORS origins updated to production domain
- [ ] Email service verified (if using)
- [ ] Error tracking configured (if using)
- [ ] Analytics installed
- [ ] Security headers verified
- [ ] HTTPS enforced
- [ ] Monitoring alerts configured

---

## Troubleshooting

### Issue: `Cannot find module '@supabase/supabase-js'`
**Solution:** Run `npm install` to install dependencies

### Issue: Database connection error
**Solution:**
1. Check `NEXT_PUBLIC_SUPABASE_URL` is set
2. Check `SUPABASE_SERVICE_ROLE_KEY` is set
3. Verify Supabase project is active
4. Check network connectivity

### Issue: Rate limiting not working
**Solution:**
1. Check `UPSTASH_REDIS_REST_URL` is set
2. Check `UPSTASH_REDIS_REST_TOKEN` is set
3. Verify Upstash Redis database is active
4. Check Redis connection in browser console

### Issue: CORS errors in console
**Solution:**
1. Check `ALLOWED_ORIGINS` includes your domain
2. Remove `http://` from origin check
3. Verify domain matches exactly
4. Check `NODE_ENV` is correct

---

## Next Steps

1. **Run all 10 manual tests** - Takes ~15 minutes
2. **Fix any failures** - Debug and re-test
3. **Performance testing** - Run Lighthouse audit
4. **Production checklist** - Verify all items
5. **Deploy to production** - Push to main branch

---

**Testing Complete!** Once all tests pass, the application is ready for production deployment. 🚀
