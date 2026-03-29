# Contributing to CheckFlow AI Landing Page

First off, thank you for considering contributing to CheckFlow AI! It's people like you that make this project a great tool for the community.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Workflow](#development-workflow)
- [Style Guidelines](#style-guidelines)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our commitment to:
- Being respectful and inclusive
- Welcoming newcomers
- Focusing on constructive feedback
- Prioritizing user experience

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17.0 or higher
- npm, yarn, or pnpm
- Git

### Setup

```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/checkflow-ai-landing.git
cd checkflow-ai-landing

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🎯 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues. When you create a bug report, include:

- **Use a clear descriptive title**
- **Describe the exact steps to reproduce**
- **Provide specific examples**
- **Describe the behavior you observed**
- **Explain which behavior you expected**
- **Include screenshots if possible**

Example:
```
**Bug:** Hero section text overlaps on mobile
**Steps:**
1. Open site on iPhone 14
2. Scroll to hero section
3. Rotate to landscape
**Expected:** Text remains readable
**Actual:** Text overlaps with buttons
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. Include:

- **Use a clear title**
- **Provide a step-by-step description**
- **Provide specific examples**
- **Explain why this enhancement would be useful**

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code follows style guidelines
6. Issue the pull request

## 💻 Development Workflow

### Branch Naming

- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `docs/description` - Documentation changes
- `refactor/description` - Code refactoring

Example: `feature/add-dark-mode-toggle`

### Running Tests

```bash
# Lint code
npm run lint

# Type check
npx tsc --noEmit

# Build test
npm run build
```

### Project Structure

```
app/
├── api/              # API routes
├── components/       # React components
├── globals.css       # Global styles
├── layout.tsx        # Root layout
└── page.tsx          # Home page

lib/
├── mock.ts           # Mock data
└── utils.ts          # Utilities
```

## 🎨 Style Guidelines

### TypeScript

- Use strict TypeScript settings
- Define interfaces for all props
- Avoid `any` types
- Use meaningful variable names

```typescript
// Good
interface HeroProps {
  title: string;
  onGenerate: () => void;
}

// Avoid
interface Props {
  data: any;
}
```

### React Components

- Use functional components with hooks
- Use `"use client"` directive when needed
- Keep components under 300 lines
- Extract reusable logic to custom hooks

```typescript
// Good
"use client";

import { useState } from "react";

export default function Hero({ title, onGenerate }: HeroProps) {
  const [input, setInput] = useState("");
  // ...
}
```

### CSS/Tailwind

- Use Tailwind classes
- Prefer semantic color names
- Use CSS variables for theme colors
- Keep responsive design in mind

```css
/* Good */
.bg-primary { background-color: #635BFF; }
.text-slate-900 { color: rgb(15 23 42); }

/* Avoid */
.bg-blue { background-color: blue; }
```

### Naming Conventions

- Components: PascalCase (`Hero.tsx`, `Navigation.tsx`)
- Utilities: camelCase (`formatDate`, `generateId`)
- Constants: UPPER_SNAKE_CASE (`API_URL`, `MAX_ITEMS`)
- Files: kebab-case for non-components (`use-local-storage.ts`)

## 💬 Commit Messages

Use [Conventional Commits](https://conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Formatting (no code change)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

Examples:
```
feat: add dark mode toggle to navigation
fix: resolve mobile menu not closing on click
docs: update deployment instructions
refactor: extract animation logic to hook
test: add unit tests for utils
```

## 🔀 Pull Request Process

1. **Update README** if you change functionality
2. **Update DEPLOY.md** if you change deployment process
3. **Add yourself to contributors** (optional)
4. **Wait for review** - Maintainers will review ASAP
5. **Address feedback** - Make requested changes
6. **Merge** - Maintainers will merge when ready

### PR Template

When creating a PR, use this format:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation
- [ ] Refactoring

## Testing
How did you test these changes?

## Screenshots
If applicable, add screenshots

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
```

## 🏆 Recognition

Contributors will be:
- Listed in README.md
- Mentioned in release notes
- Given credit in relevant documentation

## ❓ Questions?

- Open an issue with the `question` label
- Join our Discord: https://discord.gg/checkflow
- Email: hello@checkflow.ai

Thank you for contributing! 🚀
