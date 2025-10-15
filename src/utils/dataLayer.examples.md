# DataLayer Implementation Examples

This document provides examples of how to implement GA4 tracking in various components using the dataLayer utility.

## Table of Contents
- [Basic Usage](#basic-usage)
- [Form Tracking](#form-tracking)
- [Navigation Tracking](#navigation-tracking)
- [CTA Button Tracking](#cta-button-tracking)
- [ROI Calculator Tracking](#roi-calculator-tracking)
- [FAQ Tracking](#faq-tracking)
- [Page View Tracking](#page-view-tracking)

---

## Basic Usage

Import the tracking functions you need:

```typescript
import { trackCtaClick, trackFormSubmit, trackPageView } from '@/utils/dataLayer';
```

---

## Form Tracking

### Contact Form Example

```typescript
// src/pages/ContactPage.tsx
import { trackFormStart, trackFormSubmit, trackFormSuccess, trackFormError } from '@/utils/dataLayer';

export const ContactPage = () => {
  const onSubmit = async (data: ContactFormValues) => {
    // Track form submission
    trackFormSubmit('contact_form', {
      companySize: data.companySize,
      role: data.role,
      formLocation: 'contact_page',
    });

    try {
      const response = await fetch(webhookUrl, { /* ... */ });

      if (!response.ok) {
        throw new Error('Server error');
      }

      // Track success
      trackFormSuccess('contact_form', 'contact_page');

      // Navigate to thank you page
      window.location.href = `/${lang}/thank-you`;
    } catch (error: any) {
      // Track error
      trackFormError('contact_form', 'server', error.message);
    }
  };

  // Track when user starts filling the form
  const handleInputFocus = () => {
    trackFormStart('contact_form', 'contact_page');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("fullName")}
        onFocus={handleInputFocus} // Track form start on first input focus
      />
      {/* Rest of form */}
    </form>
  );
};
```

---

## Navigation Tracking

### Header Navigation Example

```typescript
// src/components/Header.tsx
import { trackNavigationClick, trackMobileMenuToggle, trackLoginClick, trackGetStartedClick } from '@/utils/dataLayer';

const Header = () => {
  const handleGetStartedClick = () => {
    trackGetStartedClick('header', t('header.getStarted'));
    navigate(`/${i18n.language}/contact`);
  };

  const handleLoginClick = () => {
    trackLoginClick('header');
  };

  const handleNavLinkClick = (linkName: string, destination: string) => {
    trackNavigationClick(linkName, destination);
  };

  const handleMenuToggle = (isOpen: boolean) => {
    trackMobileMenuToggle(isOpen ? 'open' : 'close');
    setIsMenuOpen(isOpen);
  };

  return (
    <header>
      <nav>
        <Link
          to={`/${i18n.language}/#features`}
          onClick={() => handleNavLinkClick('Features', '/#features')}
        >
          Features
        </Link>

        <button onClick={handleGetStartedClick}>
          Get Started
        </button>

        <a
          href="https://app.arkadialabs.io"
          onClick={handleLoginClick}
          target="_blank"
        >
          Login
        </a>

        <button onClick={() => handleMenuToggle(!isMenuOpen)}>
          Menu
        </button>
      </nav>
    </header>
  );
};
```

---

## CTA Button Tracking

### Generic CTA Component

```typescript
// src/components/CtaSection.tsx
import { trackCtaClick } from '@/utils/dataLayer';

const CtaSection = () => {
  const handleCtaClick = () => {
    trackCtaClick('schedule_demo', 'cta_section', 'Schedule Your Demo');
    // Proceed with CTA action
  };

  return (
    <button onClick={handleCtaClick}>
      Schedule Your Demo
    </button>
  );
};
```

---

## ROI Calculator Tracking

### ROI Calculator Example

```typescript
// src/components/RoiCalculator.tsx
import {
  trackRoiCalculatorStart,
  trackRoiPlanChange,
  trackRoiInputChange,
  trackRoiResults
} from '@/utils/dataLayer';

const RoiCalculator = () => {
  const [hasInteracted, setHasInteracted] = useState(false);

  const handlePlanChange = (planId: string) => {
    // Track first interaction
    if (!hasInteracted) {
      trackRoiCalculatorStart();
      setHasInteracted(true);
    }

    trackRoiPlanChange(planId);
    setSelectedPlanId(planId);
  };

  const handleInputChange = (inputName: string, value: number) => {
    if (!hasInteracted) {
      trackRoiCalculatorStart();
      setHasInteracted(true);
    }

    trackRoiInputChange(inputName, value);
  };

  // Track results whenever calculation changes
  useEffect(() => {
    if (hasInteracted && calculation.roi > 0) {
      trackRoiResults(
        selectedPlanId,
        numReps,
        avgDealSize,
        monthlyLeads,
        calculation.revenueGain,
        calculation.hoursSaved,
        calculation.roi
      );
    }
  }, [calculation, hasInteracted]);

  return (
    <div>
      <button onClick={() => handlePlanChange('team')}>Team Plan</button>
      <input
        type="range"
        onChange={(e) => handleInputChange('num_reps', Number(e.target.value))}
      />
    </div>
  );
};
```

---

## FAQ Tracking

### FAQ Accordion Example

```typescript
// src/components/FaqSection.tsx
import { trackFaqToggle } from '@/utils/dataLayer';

const FaqSection = () => {
  const toggleFaq = (index: number, question: string) => {
    const isOpening = activeIndex !== index;

    trackFaqToggle(
      question,
      isOpening ? 'open' : 'close'
    );

    setActiveIndex(isOpening ? index : null);
  };

  return (
    <div>
      {faqData.map((faq, index) => (
        <button
          onClick={() => toggleFaq(index, t(faq.questionKey))}
        >
          {t(faq.questionKey)}
        </button>
      ))}
    </div>
  );
};
```

---

## Page View Tracking

### Page View with React Router

```typescript
// src/App.tsx or individual page components
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/utils/dataLayer';
import { useTranslation } from 'react-i18next';

const PageComponent = () => {
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    trackPageView(
      location.pathname,
      document.title,
      i18n.language
    );
  }, [location.pathname, i18n.language]);

  return (
    <div>
      {/* Page content */}
    </div>
  );
};
```

---

## Pricing Plan Tracking

### Pricing Tiers Example

```typescript
// src/components/PricingTiers.tsx
import { trackPricingPlanClick } from '@/utils/dataLayer';

const PricingTiers = () => {
  const handlePlanClick = (plan: any) => {
    trackPricingPlanClick(
      t(plan.nameKey),
      plan.price,
      plan.isRecommended
    );

    // Proceed with plan selection action
  };

  return (
    <div>
      {plansData.map((plan) => (
        <button onClick={() => handlePlanClick(plan)}>
          {t(plan.ctaTextKey)}
        </button>
      ))}
    </div>
  );
};
```

---

## Case Study Tracking

### Case Study Card Example

```typescript
// src/components/CaseStudyCard.tsx
import { trackCaseStudyClick } from '@/utils/dataLayer';

const CaseStudyCard = ({ caseStudy, location }: Props) => {
  const handleClick = () => {
    trackCaseStudyClick(
      caseStudy.title,
      caseStudy.industry,
      location // 'home_page', 'case_studies_page', etc.
    );
  };

  return (
    <Link
      to={`/${lang}/case-studies/${caseStudy.slug}`}
      onClick={handleClick}
    >
      {caseStudy.title}
    </Link>
  );
};
```

---

## Integration Filter Tracking

### Integrations Page Example

```typescript
// src/components/IntegrationsFilter.tsx
import { trackIntegrationFilter, trackIntegrationClick } from '@/utils/dataLayer';

const IntegrationsFilter = () => {
  const handleFilterChange = (category: string) => {
    trackIntegrationFilter(category);
    setSelectedCategory(category);
  };

  const handleIntegrationClick = (integration: Integration) => {
    trackIntegrationClick(
      integration.name,
      integration.category
    );
  };

  return (
    <div>
      <button onClick={() => handleFilterChange('CRM')}>CRM</button>

      {filteredIntegrations.map((integration) => (
        <div onClick={() => handleIntegrationClick(integration)}>
          {integration.name}
        </div>
      ))}
    </div>
  );
};
```

---

## ElevenLabs AI Widget Tracking

### AI Widget Example

```typescript
// src/components/CustomWidgetButton.tsx
import { trackAiWidgetOpen, trackAiWidgetClose, trackAiConversationStart } from '@/utils/dataLayer';

export const CustomWidgetButton = () => {
  const [openTime, setOpenTime] = useState<number | null>(null);
  const { toggleConversation, isReady } = useElevenLabsWidget();

  const handleToggle = () => {
    if (!isReady) return;

    if (openTime === null) {
      // Widget is opening
      trackAiWidgetOpen();
      trackAiConversationStart();
      setOpenTime(Date.now());
    } else {
      // Widget is closing
      const duration = Math.floor((Date.now() - openTime) / 1000);
      trackAiWidgetClose(duration);
      setOpenTime(null);
    }

    toggleConversation();
  };

  return (
    <button onClick={handleToggle}>
      Toggle AI Chat
    </button>
  );
};
```

---

## Calendly Tracking

### Calendly Modal Example

```typescript
// src/pages/ThankYouPage.tsx
import { trackCalendlyOpen, trackCalendlyClose, trackCalendlyScheduled } from '@/utils/dataLayer';

export const ThankYouPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    trackCalendlyOpen('thank_you_page');
    setIsOpen(true);
  };

  const handleClose = () => {
    trackCalendlyClose('thank_you_page');
    setIsOpen(false);
  };

  const handleEventScheduled = (eventData: any) => {
    trackCalendlyScheduled('thank_you_page', eventData);
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={handleOpen}>
        Schedule a Call
      </button>

      <PopupModal
        url={calendlyUrl}
        onModalClose={handleClose}
        open={isOpen}
        onEventScheduled={handleEventScheduled}
      />
    </>
  );
};
```

---

## Language Switcher Tracking

### Language Switcher Example

```typescript
// src/components/LanguageSwitcher.tsx
import { trackLanguageSwitch } from '@/utils/dataLayer';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (newLang: string) => {
    const currentLang = i18n.language;

    trackLanguageSwitch(currentLang, newLang);

    i18n.changeLanguage(newLang);
    // Update URL, etc.
  };

  return (
    <button onClick={() => handleLanguageChange('es')}>
      Español
    </button>
  );
};
```

---

## Error Tracking

### Global Error Handler Example

```typescript
// src/App.tsx or error boundary
import { trackError } from '@/utils/dataLayer';

useEffect(() => {
  const handleError = (event: ErrorEvent) => {
    trackError(
      event.message,
      event.filename || 'unknown',
      event.error?.stack
    );
  };

  window.addEventListener('error', handleError);

  return () => {
    window.removeEventListener('error', handleError);
  };
}, []);
```

---

## Scroll Depth Tracking

### Scroll Tracking Example

```typescript
// src/hooks/useScrollTracking.ts
import { useEffect, useRef } from 'react';
import { trackScrollDepth } from '@/utils/dataLayer';

export const useScrollTracking = (pagePath: string) => {
  const tracked25 = useRef(false);
  const tracked50 = useRef(false);
  const tracked75 = useRef(false);
  const tracked100 = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

      if (scrollPercent >= 25 && !tracked25.current) {
        trackScrollDepth(25, pagePath);
        tracked25.current = true;
      }
      if (scrollPercent >= 50 && !tracked50.current) {
        trackScrollDepth(50, pagePath);
        tracked50.current = true;
      }
      if (scrollPercent >= 75 && !tracked75.current) {
        trackScrollDepth(75, pagePath);
        tracked75.current = true;
      }
      if (scrollPercent >= 100 && !tracked100.current) {
        trackScrollDepth(100, pagePath);
        tracked100.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pagePath]);
};
```

---

## Best Practices

1. **Always track user intent, not just clicks**: Track what the user is trying to accomplish
2. **Use descriptive event names**: Make it clear what action is being tracked
3. **Include context**: Add location, source, or other relevant metadata
4. **Track the full funnel**: Track start, progress, success, and errors
5. **Don't over-track**: Only track meaningful interactions
6. **Test in development**: Check console logs to verify events are firing correctly
7. **Keep it consistent**: Use the same naming conventions across similar events

---

## Testing

To test tracking in development:

1. Open browser DevTools Console
2. Look for "GA4 Event:" logs
3. Verify event structure and data
4. Use Google Tag Manager Preview mode for production testing
