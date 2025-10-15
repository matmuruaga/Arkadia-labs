# GA4 DataLayer Implementation - Arkadia Labs

## Overview

This directory contains a comprehensive Google Analytics 4 (GA4) event tracking system for the Arkadia Labs website. All user interactions, conversions, and engagement metrics are tracked through Google Tag Manager's dataLayer.

## Files

### 1. `dataLayer.ts`
The main tracking utility containing all GA4 event functions. This is the single source of truth for all analytics tracking.

**Contains**:
- 40+ pre-defined tracking functions
- Type-safe implementations with TypeScript
- Console logging for development debugging
- Organized by category (Forms, Navigation, CTAs, etc.)

### 2. `dataLayer.examples.md`
Comprehensive implementation guide with real-world examples.

**Contains**:
- Code examples for each tracking scenario
- Best practices and conventions
- Testing guidelines
- Integration patterns

### 3. `dataLayer.README.md` (this file)
Overview and quick reference for the tracking system.

## Quick Start

### Basic Implementation

```typescript
// 1. Import the tracking function
import { trackCtaClick } from '@/utils/dataLayer';

// 2. Call it in your event handler
const handleClick = () => {
  trackCtaClick('demo_request', 'hero_section', 'Request Demo');
  // Your action logic here
};

// 3. Use in your component
<button onClick={handleClick}>Request Demo</button>
```

## Event Categories

### 1. Page Views
- `trackPageView()` - Track page views with language context

### 2. Navigation
- `trackNavigationClick()` - Header/footer navigation
- `trackMobileMenuToggle()` - Mobile menu open/close
- `trackLanguageSwitch()` - Language changes

### 3. Forms
- `trackFormStart()` - User begins filling form
- `trackFormSubmit()` - Form submission attempt
- `trackFormSuccess()` - Successful submission
- `trackFormError()` - Validation errors

### 4. CTAs (Call-to-Actions)
- `trackGetStartedClick()` - "Get Started" buttons
- `trackLoginClick()` - Login button clicks
- `trackCtaClick()` - Generic CTA tracking

### 5. Calendly Integration
- `trackCalendlyOpen()` - Scheduling modal opened
- `trackCalendlyClose()` - Modal closed
- `trackCalendlyScheduled()` - Meeting scheduled

### 6. Pricing
- `trackPricingView()` - Pricing page view
- `trackPricingPlanClick()` - Plan selection

### 7. ROI Calculator
- `trackRoiCalculatorStart()` - Calculator interaction start
- `trackRoiPlanChange()` - Plan selection change
- `trackRoiInputChange()` - Slider/input changes
- `trackRoiResults()` - Final calculation results

### 8. Case Studies
- `trackCaseStudyClick()` - Case study card clicks
- `trackCaseStudySectionView()` - Section views

### 9. Integrations
- `trackIntegrationFilter()` - Category filter changes
- `trackIntegrationClick()` - Integration card clicks

### 10. FAQ
- `trackFaqToggle()` - FAQ accordion open/close

### 11. Media
- `trackVideoPlay()` - Video starts
- `trackVideoComplete()` - Video finishes

### 12. Engagement
- `trackScrollDepth()` - Scroll milestones (25%, 50%, 75%, 100%)
- `trackSectionView()` - Section enters viewport
- `trackTimeOnPage()` - Time spent on page

### 13. AI Widget (ElevenLabs)
- `trackAiWidgetOpen()` - Widget opened
- `trackAiWidgetClose()` - Widget closed with duration
- `trackAiConversationStart()` - Conversation started

### 14. External Links
- `trackExternalLinkClick()` - External URL clicks
- `trackSocialClick()` - Social media links

### 15. Errors
- `trackError()` - JavaScript errors
- `track404Error()` - Page not found

### 16. Conversions
- `trackLeadGeneration()` - Lead form completion
- `trackDemoRequest()` - Demo requested

### 17. User Engagement
- `trackFeatureComparisonView()` - Feature table viewed
- `trackTestimonialInteraction()` - Testimonial carousel

## Event Naming Conventions

### Event Names
- Use snake_case: `form_submit`, `cta_click`, `page_view`
- Be descriptive: `roi_calculator_start` not just `calculator`
- Use past tense for completed actions: `form_submitted`, `video_completed`

### Parameters
- Use snake_case: `form_name`, `cta_location`, `plan_price`
- Include context: location, source, type
- Keep values consistent across similar events

## Common Patterns

### Pattern 1: Button Click Tracking
```typescript
import { trackCtaClick } from '@/utils/dataLayer';

const handleClick = () => {
  trackCtaClick('button_type', 'component_name', 'Button Text');
  // Proceed with action
};
```

### Pattern 2: Form Tracking
```typescript
import { trackFormStart, trackFormSubmit, trackFormSuccess } from '@/utils/dataLayer';

// On first input focus
const handleFocus = () => {
  trackFormStart('form_name', 'page_name');
};

// On submit
const onSubmit = async (data) => {
  trackFormSubmit('form_name', {
    companySize: data.size,
    formLocation: 'contact_page'
  });

  try {
    await submitForm(data);
    trackFormSuccess('form_name', 'contact_page');
  } catch (error) {
    trackFormError('form_name', 'server', error.message);
  }
};
```

### Pattern 3: Modal Tracking
```typescript
import { trackCalendlyOpen, trackCalendlyClose } from '@/utils/dataLayer';

const [isOpen, setIsOpen] = useState(false);

const openModal = () => {
  trackCalendlyOpen('hero_section');
  setIsOpen(true);
};

const closeModal = () => {
  trackCalendlyClose('hero_section');
  setIsOpen(false);
};
```

## Component-Specific Tracking

### Header Component
Track: Navigation clicks, mobile menu toggle, language switch, Get Started, Login

### Contact Form
Track: Form start, submit, success, errors

### Pricing Page
Track: Page view, plan clicks, CTA clicks

### ROI Calculator
Track: Calculator start, plan changes, input changes, results

### Case Studies
Track: Card clicks, section views, CTA clicks

### Thank You Page
Track: Page view, Calendly interactions, lead generation

### AI Widget
Track: Widget open/close, conversation start, duration

## Testing Your Implementation

### Development Testing

1. **Console Logs**: Check browser console for "GA4 Event:" logs
   ```javascript
   // You should see:
   // GA4 Event: { event: 'cta_click', cta_type: 'demo', ... }
   ```

2. **Verify Event Structure**: Ensure all expected parameters are present
   ```typescript
   // Good:
   { event: 'form_submit', form_name: 'contact', company_size: '50-100' }

   // Bad (missing parameters):
   { event: 'form_submit' }
   ```

### Production Testing

1. **Google Tag Manager Preview Mode**:
   - Enable Preview Mode in GTM
   - Navigate to your site
   - Verify events appear in the debug panel

2. **Google Analytics Real-Time Reports**:
   - Go to GA4 Real-Time reports
   - Trigger events on your site
   - Verify they appear in the Events section

## Debugging

### Event Not Firing

**Check**:
1. Is the function imported correctly?
2. Is the event handler being called?
3. Check console for any errors
4. Verify `window.dataLayer` exists

### Wrong Data

**Check**:
1. Are all parameters being passed?
2. Are values the correct type?
3. Is the event name spelled correctly?
4. Check for typos in parameter names

### GTM Not Receiving Events

**Check**:
1. Is GTM installed correctly? (Check `index.html`)
2. Is the GTM container ID correct?
3. Are GTM triggers configured?
4. Use GTM Preview Mode to debug

## Performance Considerations

- DataLayer pushes are asynchronous and non-blocking
- Events are batched by GTM before sending to GA4
- Console logging can be removed in production if needed
- Avoid tracking in tight loops or frequent events (< 100ms)

## Privacy & Compliance

### What We Track
- User interactions (clicks, form submissions)
- Page views and navigation
- Engagement metrics (scroll depth, time on page)
- Anonymous conversion events

### What We DON'T Track
- Personal Identifiable Information (PII)
- Email addresses or phone numbers
- Full form field values (only metadata)
- Passwords or authentication tokens
- Sensitive business data

### GDPR/CCPA Compliance
- All tracking is anonymous
- No PII is collected
- Users can opt-out via cookie consent
- Data retention follows GA4 settings

## Maintenance

### Adding New Events

1. **Add to `dataLayer.ts`**:
   ```typescript
   export const trackNewEvent = (param1: string, param2: number) => {
     pushToDataLayer({
       event: 'new_event',
       param_1: param1,
       param_2: param2,
     });
   };
   ```

2. **Add to default export**:
   ```typescript
   export default {
     // ... existing exports
     trackNewEvent,
   };
   ```

3. **Document in `dataLayer.examples.md`**:
   - Add usage example
   - Explain parameters
   - Show integration code

4. **Update `CLAUDE.md`** if it's a new category of events

### Updating Existing Events

1. Update function signature in `dataLayer.ts`
2. Find all usage locations (use search)
3. Update all implementations
4. Test thoroughly
5. Update documentation

## Support & Resources

### Internal Documentation
- `dataLayer.ts` - Source code with JSDoc comments
- `dataLayer.examples.md` - Implementation examples
- `CLAUDE.md` - Project-wide guidelines

### External Resources
- [Google Analytics 4 Documentation](https://support.google.com/analytics/answer/9267735)
- [Google Tag Manager Guide](https://support.google.com/tagmanager/answer/6102821)
- [GA4 Event Parameters](https://support.google.com/analytics/answer/9234069)

## Changelog

### 2025-01-XX - Initial Implementation
- Created comprehensive dataLayer utility
- Implemented 40+ tracking functions
- Added documentation and examples
- Updated CLAUDE.md with maintenance guidelines

---

**Questions?** Check `dataLayer.examples.md` for detailed examples or review `CLAUDE.md` for project guidelines.
