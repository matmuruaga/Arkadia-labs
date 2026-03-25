---
paths: src/**/*.tsx, src/utils/dataLayer.ts
---

# Analytics & DataLayer Rules

## CRITICAL REQUIREMENT

Every interactive element in this application MUST include dataLayer tracking. This is non-negotiable for business intelligence and conversion optimization.

## DataLayer Architecture

### Central Utility

All tracking functions are defined in `src/utils/dataLayer.ts`. NEVER push directly to `window.dataLayer` from components.

```typescript
// CORRECT
import { trackCtaClick } from '@/utils/dataLayer';
trackCtaClick('schedule_demo', 'pricing_page', 'Schedule Demo');

// WRONG - Never do this
window.dataLayer.push({ event: 'cta_click', ... });
```

### Event Naming Convention

| Event Type | Function Prefix | Example |
|------------|-----------------|---------|
| Click events | `track{Element}Click` | `trackCtaClick`, `trackNavClick` |
| Form events | `trackForm{Action}` | `trackFormStart`, `trackFormSubmit` |
| View events | `track{Element}View` | `trackPageView`, `trackCaseStudyView` |
| Interaction | `track{Action}` | `trackVideoPlay`, `trackFaqToggle` |

## Required Tracking Events

### Navigation

```typescript
import { trackNavClick, trackExternalLinkClick } from '@/utils/dataLayer';

// Header/Footer navigation
<Link to={`/${lang}/pricing`} onClick={() => trackNavClick('pricing', 'header')}>
  {t('header.pricing')}
</Link>

// External links
<a
  href="https://external.com"
  target="_blank"
  onClick={() => trackExternalLinkClick('https://external.com', 'footer')}
>
  External Link
</a>
```

### CTA Buttons

```typescript
import { trackCtaClick } from '@/utils/dataLayer';

// Primary CTAs
<Button onClick={() => {
  trackCtaClick('get_started', 'hero_section', t('hero.cta'));
  navigate(`/${lang}/get-started`);
}}>
  {t('hero.cta')}
</Button>

// Secondary CTAs
<Button variant="outline" onClick={() => {
  trackCtaClick('schedule_demo', 'pricing_card', 'Schedule Demo');
  openCalendly();
}}>
  Schedule Demo
</Button>
```

### Forms

```typescript
import {
  trackFormStart,
  trackFormSubmit,
  trackFormSuccess,
  trackFormError
} from '@/utils/dataLayer';

// Form start (on first field focus)
const handleFirstFocus = () => {
  if (!formStarted) {
    trackFormStart('contact_form', 'contact_page');
    setFormStarted(true);
  }
};

// Form submission
const onSubmit = async (data: FormData) => {
  trackFormSubmit('contact_form', 'contact_page');

  try {
    await submitForm(data);
    trackFormSuccess('contact_form', 'contact_page');
  } catch (error) {
    trackFormError('contact_form', 'contact_page', error.message);
  }
};
```

### Page Views

```typescript
import { trackPageView } from '@/utils/dataLayer';

// In page component or route handler
useEffect(() => {
  trackPageView('pricing_page', lang);
}, [lang]);
```

### Modals & Widgets

```typescript
import { trackModalOpen, trackModalClose } from '@/utils/dataLayer';

// Calendly modal
const openCalendly = () => {
  trackModalOpen('calendly', 'pricing_page');
  setCalendlyOpen(true);
};

// ElevenLabs widget
const toggleWidget = () => {
  if (isOpen) {
    trackModalClose('elevenlabs_widget', 'footer');
  } else {
    trackModalOpen('elevenlabs_widget', 'footer');
  }
  setIsOpen(!isOpen);
};
```

### Interactive Elements

```typescript
import { trackFaqToggle, trackVideoPlay, trackCalculatorInteraction } from '@/utils/dataLayer';

// FAQ accordion
<AccordionItem onClick={() => trackFaqToggle('question_id', isOpen)}>

// Video
<video onPlay={() => trackVideoPlay('demo_video', 'product_page')}>

// ROI Calculator
const handleCalculation = (values: CalculatorValues) => {
  trackCalculatorInteraction('roi_calculator', 'pricing_page', values);
};
```

### Language Switch

```typescript
import { trackLanguageSwitch } from '@/utils/dataLayer';

const handleLanguageChange = (newLang: string) => {
  trackLanguageSwitch(i18n.language, newLang);
  i18n.changeLanguage(newLang);
};
```

## Event Parameters

### Standard Parameters

All events should include relevant context:

```typescript
// Location: where on the page/site the event occurred
location: 'hero_section' | 'pricing_card' | 'footer' | 'header' | ...

// Element text: the visible text of the clicked element
text: 'Get Started' | 'Schedule Demo' | ...

// Language: current language
language: 'en' | 'es' | 'cs'
```

### DO Track

- Click locations and button text
- Form field names (not values)
- Navigation paths
- Modal/widget identifiers
- Filter selections
- Scroll milestones (25%, 50%, 75%, 100%)

### DO NOT Track (PII/Sensitive)

```typescript
// NEVER track these:
// - Email addresses
// - Full names
// - Phone numbers
// - Company names
// - Form field values (user input)
// - IP addresses
// - Authentication tokens
// - Financial information
```

## Adding New Events

When adding a new type of event:

1. **Add function to dataLayer.ts**:

```typescript
/**
 * Track new feature interaction
 * @param featureId - Identifier for the feature
 * @param location - Where on page
 * @param action - What user did
 */
export const trackNewFeature = (
  featureId: string,
  location: string,
  action: string
): void => {
  pushEvent({
    event: 'new_feature_interaction',
    feature_id: featureId,
    location,
    action,
  });
};
```

2. **Add to exports**:

```typescript
export default {
  // ... existing exports
  trackNewFeature,
};
```

3. **Document in dataLayer.examples.md**:

```markdown
### New Feature Tracking

\`\`\`typescript
import { trackNewFeature } from '@/utils/dataLayer';

// Usage
trackNewFeature('feature_x', 'homepage', 'toggle_enabled');
\`\`\`
```

## Testing

Before committing:

1. Open browser DevTools → Console
2. Perform the tracked action
3. Verify "GA4 Event:" log appears with correct data
4. Check GTM Preview mode if available
5. Verify no PII is being logged

```javascript
// Console output should look like:
// GA4 Event: cta_click { cta_name: 'get_started', location: 'hero', text: 'Get Started' }
```

## Common Mistakes

### Missing Tracking

```typescript
// WRONG - No tracking
<Button onClick={() => navigate('/pricing')}>View Pricing</Button>

// CORRECT
<Button onClick={() => {
  trackCtaClick('view_pricing', 'header', 'View Pricing');
  navigate('/pricing');
}}>
  View Pricing
</Button>
```

### Inconsistent Event Names

```typescript
// WRONG - Inconsistent naming
trackCtaClick('GetStarted', ...);  // camelCase
trackCtaClick('get started', ...); // spaces
trackCtaClick('GET_STARTED', ...); // uppercase

// CORRECT - snake_case
trackCtaClick('get_started', ...);
```

### Tracking PII

```typescript
// WRONG - Never track user data
trackFormSubmit('contact', 'page', { email: formData.email });

// CORRECT - Only track metadata
trackFormSubmit('contact', 'page');
```
