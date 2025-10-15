# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript web application for Arkadia Labs, built with Vite. It's a multi-language marketing website with internationalization support (Spanish and English).

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

## Analytics & Tracking

### Google Analytics 4 DataLayer

**CRITICAL**: This project uses Google Tag Manager (GTM) with a comprehensive GA4 dataLayer implementation for tracking user interactions and conversions.

#### DataLayer Files

- **src/utils/dataLayer.ts**: Central tracking utility with all GA4 event functions
- **src/utils/dataLayer.examples.md**: Implementation examples and best practices

#### Maintenance Requirements

**IMPORTANT**: When making changes to the codebase, you MUST update the dataLayer tracking if:

1. **Adding New Components**: Any new interactive component (buttons, forms, modals, etc.) should include appropriate tracking
2. **Modifying Existing Features**: Update tracking calls if you change the behavior or purpose of tracked elements
3. **Adding New Pages**: Implement page view tracking for new routes
4. **Creating New CTAs**: All call-to-action buttons must be tracked with descriptive event names
5. **Implementing New Forms**: Track form start, submission, success, and errors
6. **Adding Third-Party Integrations**: Track user interactions with external services
7. **Creating User Flows**: Track critical steps in conversion funnels (signup, demo requests, etc.)

#### Events That Must Be Tracked

Always track these user interactions:
- Navigation clicks (header, footer, internal links)
- CTA button clicks (Get Started, Schedule Demo, Login, etc.)
- Form interactions (start, submit, success, errors)
- Page views with language context
- External link clicks
- Social media clicks
- Video plays/completions
- Calculator/tool interactions (ROI calculator, etc.)
- FAQ expansions
- Case study views
- Integration/feature filter changes
- Modal opens/closes (Calendly, AI widget, etc.)
- Language switches
- Scroll depth milestones
- Error occurrences

#### How to Add Tracking

1. Import the appropriate tracking function from `@/utils/dataLayer`
2. Call the tracking function in the event handler (onClick, onSubmit, etc.)
3. Pass relevant context data (location, text, values, etc.)
4. Test in browser console to verify events fire correctly

**Example**:
```typescript
import { trackCtaClick } from '@/utils/dataLayer';

const MyNewButton = () => {
  const handleClick = () => {
    trackCtaClick('new_feature', 'homepage_hero', 'Try New Feature');
    // Proceed with action
  };

  return <button onClick={handleClick}>Try New Feature</button>;
};
```

#### When to Update dataLayer.ts

If you need to track a new type of event that doesn't exist in the current utility:

1. Add a new tracking function to `src/utils/dataLayer.ts`
2. Follow the existing naming conventions (trackActionName)
3. Include all relevant parameters for context
4. Add the function to the default export object
5. Document the new function with JSDoc comments
6. Add usage examples to `dataLayer.examples.md`

#### Testing Tracking

Before committing changes:
1. Open browser DevTools Console
2. Look for "GA4 Event:" log messages
3. Verify event names and parameters are correct
4. Test in GTM Preview mode if available

#### What NOT to Track

Do NOT track:
- Personally Identifiable Information (PII) - names, emails, phone numbers
- Sensitive business data
- Full form field values (only metadata like field names, not actual user input)
- Authentication tokens or credentials
- Excessive/redundant events that don't provide value

---

**Remember**: Analytics tracking is critical for understanding user behavior and measuring business success. Treat dataLayer maintenance with the same importance as feature development.