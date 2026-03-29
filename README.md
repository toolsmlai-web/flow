# 🚀 CheckFlow AI - Landing Page

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000)](https://vercel.com)

A stunning, conversion-optimized landing page for **CheckFlow AI** - an AI-powered workflow automation platform. Built with Next.js 15, React 18, TypeScript, and Tailwind CSS.

## ✨ Features

- **⚡ Next.js 15 App Router** - Latest features with optimized performance
- **🎨 Stripe-Style Design** - Bold gradients, deep navy, electric purple accents
- **📱 Fully Responsive** - Mobile-first design, works on all devices
- **🎬 Advanced Animations** - Framer Motion scroll reveals, hover effects
- **🔍 SEO Optimized** - Meta tags, Open Graph, Twitter Cards
- **⚙️ API Routes** - Built-in `/api/waitlist` and `/api/generate` endpoints
- **🚀 CI/CD Ready** - GitHub Actions workflow for automated Vercel deployment
- **📊 10 Sections** - Hero, Social Proof, How It Works, Features, Demo, Integrations, Testimonials, FAQ, CTA, Footer

## 🎯 Demo

![CheckFlow AI Landing Page](https://checkflow-ai.vercel.app/og-image.png)

**Live Demo**: [https://checkflow-ai.vercel.app](https://checkflow-ai.vercel.app)

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.1.0 | React Framework |
| React | 18.3.1 | UI Library |
| TypeScript | 5.x | Type Safety |
| Tailwind CSS | 3.4.x | Styling |
| Framer Motion | 11.15 | Animations |
| Lucide React | 0.460 | Icons |

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17.0 or higher
- npm, yarn, or pnpm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/checkflow-ai-landing.git
cd checkflow-ai-landing

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
checkflow-ai-landing/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── generate/route.ts     # Workflow generation API
│   │   └── waitlist/route.ts     # Email capture API
│   ├── components/               # React Components
│   │   └── landing/
│   │       ├── Hero.tsx          # Hero with input & ideas chips
│   │       ├── Navigation.tsx    # Sticky responsive nav
│   │       ├── SocialProof.tsx   # Stats bar
│   │       ├── HowItWorks.tsx    # 3-step process
│   │       ├── Features.tsx      # 6 feature cards
│   │       ├── DemoPreview.tsx   # Interactive workflow mock
│   │       ├── Integrations.tsx  # Logo grid
│   │       ├── Testimonials.tsx  # Customer quotes
│   │       ├── FAQ.tsx           # Accordion FAQ
│   │       ├── CTASection.tsx    # Email capture form
│   │       └── Footer.tsx        # Links & social
│   ├── globals.css               # Tailwind + custom styles
│   ├── layout.tsx                # Root layout with SEO
│   └── page.tsx                  # Home page
├── lib/                          # Utilities & Data
│   ├── mock.ts                   # Mock data (workflows, features, etc.)
│   └── utils.ts                  # Helper functions (cn, formatDate)
├── .github/workflows/            # CI/CD
│   └── vercel-deploy.yml         # Automated deployment
├── .env.example                  # Environment variables template
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── vercel.json                   # Vercel deployment config
└── package.json                  # Dependencies
```

## 🎨 Design System

### Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Primary Purple** | `#635BFF` | Buttons, accents, gradients |
| **Primary Blue** | `#3B82F6` | Secondary accents |
| **Deep Navy** | `#0A2540` | Dark sections background |
| **Coral** | `#FF6B6B` | Highlights, badges |
| **Emerald** | `#10B981` | Success states, progress |

### Typography

- **Font Family**: Inter (Google Fonts)
- **Headings**: 700-800 weight
- **Body**: 400 weight, 1.6 line-height

### Spacing

- Section padding: `py-24` (96px)
- Container max-width: `max-w-7xl` (1280px)
- Component gap: `gap-6` to `gap-8`

## 🌐 Deployment

### Option 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

### Option 2: Vercel Git Integration

1. Push code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Vercel auto-detects Next.js
4. Deploys automatically on every push

### Option 3: GitHub Actions (CI/CD)

1. Add `VERCEL_TOKEN` to GitHub Secrets
2. Push to `main` branch
3. GitHub Actions auto-deploys to production

#### Setting up VERCEL_TOKEN

```bash
# Generate token
vercel tokens create

# Or get from: https://vercel.com/account/tokens
```

Add to GitHub:
- Go to Settings → Secrets and variables → Actions
- Click "New repository secret"
- Name: `VERCEL_TOKEN`
- Value: Your token

## 🔧 Customization

### Change Colors

Edit `app/globals.css`:

```css
:root {
  --primary-purple: 252 100% 64%; /* Your HSL values */
}
```

### Update Content

Edit `lib/mock.ts`:

```typescript
export const DEMO_PROMPTS = [
  { id: 1, icon: "🚀", text: "Your custom prompt", category: "Custom" }
];
```

### Add API Integration

Replace mock data with real API calls:

```typescript
// app/page.tsx
const handleGenerate = async (prompt: string) => {
  const response = await fetch('/api/generate', {
    method: 'POST',
    body: JSON.stringify({ prompt })
  });
  const data = await response.json();
  // Handle response
};
```

## 📝 Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
# App URL
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Optional: For backend integration
OPENAI_API_KEY=sk_...
RESEND_API_KEY=re_...
```

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 📈 Performance

- **Lighthouse Score**: 95+
- **First Contentful Paint**: <1.5s
- **Bundle Size**: ~180KB gzipped
- **Image Optimization**: Automatic via Next.js Image
- **Font Loading**: `display: swap` for fast text render

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🏆 Contributors

Thanks to all the amazing people who have contributed to this project!

<a href="https://github.com/yourusername/checkflow-ai-landing/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=yourusername/checkflow-ai-landing" />
</a>

Want to join? See our [Contributing Guide](CONTRIBUTING.md)!

## 🔒 Security

For security concerns, please email security@checkflow.ai instead of using the issue tracker.

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/checkflow-ai-landing?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/checkflow-ai-landing?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/checkflow-ai-landing)
![GitHub license](https://img.shields.io/github/license/yourusername/checkflow-ai-landing)


## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgments

- Design inspired by [Stripe](https://stripe.com)
- Icons by [Lucide](https://lucide.dev)
- Animations by [Framer Motion](https://framer.com/motion)

## 📞 Support

For support, email hello@checkflow.ai or join our [Discord](https://discord.gg/checkflow).

---

**Built with ❤️ by the CheckFlow AI Team**
