# Elevaite Labs Web - Project Rules

This document provides comprehensive guidance for Claude Code when working with this codebase.

## Quick Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## Project Overview

**Elevaite Labs** (formerly Arkadia Labs) is a React + TypeScript marketing website built with Vite. It's a multi-language application supporting English (en), Spanish (es), and Czech (cs).

### Tech Stack

- **Framework**: React 18 + TypeScript 5.5
- **Build**: Vite 5.4
- **Styling**: Tailwind CSS 3.4 + shadcn/ui
- **Routing**: React Router v7 (language-based: `/:lang/*`)
- **i18n**: i18next with HTTP backend
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion, Lottie, Swiper
- **Analytics**: GTM + GA4 dataLayer

## Core Rules

### 1. Always Use Path Aliases

```typescript
// CORRECT
import { Button } from '@/components/ui/button';
import { trackCtaClick } from '@/utils/dataLayer';

// WRONG
import { Button } from '../../../components/ui/button';
```

### 2. Analytics is Mandatory

Every interactive element MUST include dataLayer tracking. See `.claude/rules/analytics/tracking.md` for details.

### 3. i18n for All User-Facing Text

Never hardcode text. Always use translation keys:

```typescript
// CORRECT
const { t } = useTranslation();
<h1>{t('hero.title')}</h1>

// WRONG
<h1>Welcome to Elevaite Labs</h1>
```

### 4. Component Organization

- **UI primitives**: `src/components/ui/` (shadcn/ui pattern)
- **Feature components**: `src/components/` (Header, Footer, Hero, etc.)
- **Domain components**: `src/components/{domain}/` (e.g., `solutions/`)
- **Pages**: `src/pages/` (route-level components)

### 5. Performance First

- Use lazy loading for below-the-fold components
- Disable parallax effects on mobile
- Use `content-visibility: auto` for heavy sections
- Prefer CSS animations over JS when possible

## File Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui base components
│   ├── solutions/       # Solution page components
│   └── *.tsx            # Feature components
├── pages/
│   └── solutions/       # Solution pages
├── data/
│   └── solutions/       # Solution data files
├── utils/
│   └── dataLayer.ts     # GA4 tracking functions
├── lib/
│   └── utils.ts         # Helper functions (cn)
└── i18n.ts              # i18next configuration
```

## Imported Rules

See individual rule files for detailed guidance:

- @.claude/rules/frontend/react.md - React patterns and best practices
- @.claude/rules/frontend/styling.md - Tailwind and CSS conventions
- @.claude/rules/frontend/forms.md - Form handling patterns
- @.claude/rules/analytics/tracking.md - GA4 dataLayer implementation
- @.claude/rules/i18n/translations.md - Internationalization rules
- @.claude/rules/performance.md - Performance optimization guidelines
- @.claude/rules/security.md - Security requirements
