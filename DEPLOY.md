# 🚀 Deployment Guide

Step-by-step instructions to deploy CheckFlow AI landing page to Vercel.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Method 1: Vercel Dashboard (Easiest)](#method-1-vercel-dashboard-easiest)
3. [Method 2: Vercel CLI](#method-2-vercel-cli)
4. [Method 3: GitHub Actions (CI/CD)](#method-3-github-actions-cicd)
5. [Custom Domain Setup](#custom-domain-setup)
6. [Environment Variables](#environment-variables)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

- [Node.js 18.17+](https://nodejs.org/) installed
- [Git](https://git-scm.com/) installed
- [Vercel account](https://vercel.com/signup) (free tier works)
- Project code pushed to [GitHub](https://github.com)

## Method 1: Vercel Dashboard (Easiest)

### Step 1: Push to GitHub

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: CheckFlow AI landing page"

# Create GitHub repo and push
gh repo create checkflow-ai-landing --public --source=. --remote=origin --push
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import from GitHub
4. Select `checkflow-ai-landing` repository
5. Vercel auto-detects Next.js - keep default settings
6. Click **Deploy**

### Step 3: Wait for Build

- Build takes 2-3 minutes
- Vercel provides preview URL
- Site is live! 🎉

## Method 2: Vercel CLI

### Step 1: Install CLI

```bash
npm install -g vercel
```

### Step 2: Login

```bash
vercel login
# Opens browser - authenticate with GitHub/Google
```

### Step 3: Deploy

```bash
# Navigate to project
cd checkflow-ai-landing

# Deploy preview (for testing)
vercel

# Deploy to production
vercel --prod
```

### Step 4: View Deployment

```bash
vercel --open
```

## Method 3: GitHub Actions (CI/CD)

This method automatically deploys on every push to `main`.

### Step 1: Get Vercel Token

```bash
# Generate token
vercel tokens create

# Or visit: https://vercel.com/account/tokens
```

### Step 2: Add GitHub Secret

1. Go to GitHub repository → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `VERCEL_TOKEN`
4. Value: (paste token from Step 1)
5. Click "Add secret"

### Step 3: Push to Main

```bash
git push origin main
```

GitHub Actions automatically:
- Lints code
- Builds project
- Deploys to Vercel

View progress in Actions tab.

## Custom Domain Setup

### Step 1: Add Domain in Vercel

1. Go to Vercel Dashboard → Project → Settings → Domains
2. Enter your domain: `checkflow.ai`
3. Click "Add"

### Step 2: Configure DNS

#### Option A: Nameservers (Recommended)

Point domain to Vercel nameservers:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

#### Option B: A/CNAME Records

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

### Step 3: Wait for Propagation

- Takes 24-48 hours maximum
- Usually works within 1 hour
- Check status in Vercel dashboard

### Step 4: Enable HTTPS

Vercel automatically provisions SSL certificates via Let's Encrypt.

## Environment Variables

### For Local Development

```bash
# Copy template
cp .env.example .env.local

# Edit file
nano .env.local
```

### For Vercel Production

1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Add each variable:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_APP_URL` | `https://your-domain.com` |
| `OPENAI_API_KEY` | `sk-...` (optional) |

3. Click "Save"
4. Redeploy project

## Troubleshooting

### Build Fails

```bash
# Check for TypeScript errors
npx tsc --noEmit

# Check for lint errors
npm run lint

# Clear cache and rebuild
rm -rf .next
npm run build
```

### 404 on Dynamic Routes

Check `next.config.js` - ensure `trailingSlash: false` is correct.

### Images Not Loading

Add domains to `next.config.js`:

```javascript
images: {
  domains: ['your-cdn.com', 'checkflow.ai'],
}
```

### API Routes Not Working

Check Vercel Functions logs:
1. Vercel Dashboard → Project → Functions
2. View error logs

### Deployment Stuck

1. Check GitHub Actions tab for errors
2. Verify `VERCEL_TOKEN` is correct
3. Ensure token has not expired

## Performance Checklist

Before going live:

- [ ] Run Lighthouse audit (aim for 90+)
- [ ] Test mobile responsiveness
- [ ] Verify all links work
- [ ] Check form submissions
- [ ] Test API routes
- [ ] Optimize images
- [ ] Enable analytics
- [ ] Add error monitoring (Sentry)

## Monitoring

### Vercel Analytics

1. Enable in Dashboard → Analytics
2. Track:
   - Page views
   - Core Web Vitals
   - Traffic sources

### Speed Insights

```bash
# Run locally
npm run build
npx next-bundle-analyzer .next
```

## Rollback

If deployment breaks:

1. Vercel Dashboard → Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Vercel Support**: [vercel.com/help](https://vercel.com/help)

---

**Your landing page should be live in under 5 minutes!** 🚀
