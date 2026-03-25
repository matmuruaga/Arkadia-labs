# SEO/AEO Specialist Agent Memory

## Project Identity

- **Brand**: Elevaite Labs (rebranding from Arkadia Labs — NOT yet complete in code)
- **Domain**: arkadialabs.io (still used everywhere; elevaitelabs.io domain not yet reflected)
- **Stack**: React 18 + TypeScript + Vite + Tailwind CSS + React Router v7
- **i18n**: 3 languages — EN (`/en`), ES (`/es`), CS (`/cs`)
- **Routing**: `/:lang/*` — all routes prefixed with language code
- **Meta tag management**: `react-helmet-async` (`HelmetProvider` in `src/main.tsx`)

## Critical SEO Architecture Notes

- SPA with NO SSR or prerendering configured in `vite.config.ts`
- `index.html` has static title "Arkadia Labs | AI Agents to Automate Your Business" and no og/twitter meta
- Only 2 pages use `<Helmet>`: `SolutionsIndexPage.tsx` and `SolutionDetailPage.tsx`
- All other pages (MainPage, PricingPage, ContactPage, CaseStudyPage, etc.) have NO meta tags
- robots.txt references `arkadialabs.io` and has NO AI bot entries (GPTBot, PerplexityBot, ClaudeBot, Google-Extended)
- Sitemaps use `arkadialabs.io` domain, lastmod is 2025-01-17 (outdated)
- Sitemaps are missing: `/solutions/*` pages, `/case-studies/` index page

## Branding Inconsistency (High Priority)

- `index.html` title: "Arkadia Labs"
- Header logo: `arcadia_labs_COMPLETO_oggaxg.svg` (Arcadia, not Arkadia or Elevaite)
- Footer: references "Arkadia Labs"
- Translation files: mix of "Arkadia Labs" and "Elevaite Labs" references
- The LinkedIn URL is `elevaite-labs-io` (Elevaite brand)
- Social media handles for Twitter, YouTube, Instagram point to `#` (not real)
- Solution SEO titles use "Arkadia Labs"
- Contact page tracks as "Contact - Arkadia Labs"
- The brand name in robots.txt is "Arkadia Labs"

## Schema Markup Status

- `SolutionDetailPage`: Has JSON-LD `Product` schema (via Helmet) — partial, missing cs hreflang
- `SolutionsIndexPage`: Has Helmet but NO JSON-LD schema, missing og/twitter meta
- Homepage, Pricing, Contact, CaseStudy, Integrations: NO schema markup at all
- No `Organization`, `WebSite`, or `FAQPage` schema anywhere

## Pages WITHOUT Any Meta Tags (Helmet)

All of these need Helmet implementation:
- `MainPage.tsx`
- `PricingPage.tsx`
- `ContactPage.tsx`
- `CaseStudyPage.tsx`
- `CaseStudiesIndexPage.tsx`
- `IntegrationsPage.tsx`
- `PrivacyPolicyPage.tsx`, `TermsPage.tsx`, `CookiePolicyPage.tsx`, `LegalNoticePage.tsx`
- `GetStarted.tsx`, `ThankYouPage.tsx`

## AEO Gaps

- FAQ content exists in FaqSection.tsx (homepage) and SolutionFAQ components — no FAQPage JSON-LD
- Content is marketing-oriented; lacks definition blocks, statistics with sources in homepage
- Solution data files (e.g. lead-validator.ts) DO have cited statistics — good AEO signal
- No Organization schema with sameAs social links

## Internal Linking Issues

- Footer "Case Studies" link goes to `/#testimonials` (anchor on homepage, not `/case-studies` index page)
- Header lacks "Pricing" link (only Features, Integrations, Solutions, Case Studies visible)
- Sitemap missing: `/solutions/lead-validator`, `/solutions/sales-qualifier`, etc.
- Sitemap case-study URLs use `/case-study/` but router uses `/case-studies/`

## Performance (Positive)

- Good lazy loading with Suspense on all below-fold components in MainPage
- All pages lazy loaded in App.tsx (except MainPage which loads immediately)
- Vite gzip + brotli compression configured
- Passive scroll listeners, rAF throttling in Header
- CSS content-visibility on sections in index.html
- Fonts preloaded with `display=swap`

## Accessibility Gaps

- No skip-to-main-content link in Layout
- Layout wraps content in `<main>` — good
- Hero h2 semantic issue: subtitle rendered as `<h2>` in HeroFramed mobile section (should be `<p>`)
- Newsletter input in Footer has no `<label>` element (just placeholder)
- Footer social links for Twitter, YouTube, Instagram go to `#` — dead links

## Translation File Notes

- `public/locales/en/translation.json`, `es/translation.json`, `cs/translation.json`
- Structured with page-level keys; solutions have rich FAQ and metrics content
- Some content still references "Arkadia" instead of "Elevaite"

## Detailed Audit File

See `audit-2026-03.md` for full findings with priorities.
