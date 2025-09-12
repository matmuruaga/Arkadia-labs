# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript web application for Elevaite Labs, built with Vite. It's a multi-language marketing website with internationalization support (Spanish and English).

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Preview production build
npm run preview
```

## Architecture

### Tech Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom component library (shadcn/ui)
- **Routing**: React Router v7 with language-based routing (/:lang/*)
- **Internationalization**: i18next with language detection
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion, Lottie React, Swiper

### Project Structure

The application follows a standard React project structure with language-aware routing:

- **src/pages/**: Page components for different routes (MainPage, PricingPage, CaseStudyPage, etc.)
- **src/components/**: Reusable components including UI primitives in `components/ui/`
- **src/data/**: Static data files for integrations and case studies
- **public/locales/**: Translation files for i18n (en/ and es/ directories)

### Key Architectural Patterns

1. **Language-Based Routing**: All routes are prefixed with language code (/:lang/*). The app defaults to `/en` if no language is specified. LanguageHandler component manages language switching.

2. **Layout System**: Uses a PublicLayout wrapper that includes Header and Footer components for all public pages.

3. **Component Library**: Uses shadcn/ui components with Tailwind CSS for consistent styling. Custom components are built using CVA (class-variance-authority) for variant management.

4. **Path Aliasing**: Uses `@/` alias for src directory imports (configured in vite.config.ts and tsconfig.json).

5. **Form Handling**: Forms use React Hook Form with Zod schemas for validation. Brevo integration for contact forms.

6. **ElevenLabs Integration**: Voice AI widget integration using @elevenlabs/react for conversational interfaces.

## Important Implementation Details

- All pages support both Spanish and English translations through i18next
- The app uses React Router's Outlet pattern for nested routing
- Tailwind configuration includes custom color schemes using CSS variables
- Components use TypeScript for type safety throughout
- The project includes integrations with various third-party services (Calendly, Brevo, ElevenLabs)