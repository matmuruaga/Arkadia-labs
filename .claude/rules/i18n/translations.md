---
paths: src/**/*.tsx, public/locales/**/*.json
---

# Internationalization (i18n) Rules

## Core Principle

**NEVER hardcode user-facing text.** Every string shown to users must come from translation files.

## Supported Languages

| Code | Language | File |
|------|----------|------|
| `en` | English | `public/locales/en/translation.json` |
| `es` | Spanish | `public/locales/es/translation.json` |
| `cs` | Czech | `public/locales/cs/translation.json` |

## Basic Usage

### In Components

```typescript
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.subtitle')}</p>
      <span>Current: {i18n.language}</span>
    </div>
  );
};
```

### Translation Key Structure

Use dot notation for nested keys:

```json
// public/locales/en/translation.json
{
  "hero": {
    "title": "Welcome to Elevaite Labs",
    "subtitle": "AI-powered sales intelligence",
    "cta": "Get Started"
  },
  "header": {
    "features": "Features",
    "pricing": "Pricing",
    "solutions": "Solutions"
  }
}
```

```typescript
// Usage
t('hero.title')      // "Welcome to Elevaite Labs"
t('header.features') // "Features"
```

## Key Naming Conventions

### Structure

```
{section}.{subsection}.{element}
```

Examples:
- `hero.title` - Hero section title
- `hero.cta.primary` - Hero primary CTA
- `pricing.plans.starter.name` - Starter plan name
- `footer.links.privacy` - Footer privacy link
- `validation.email.required` - Email required validation message

### Guidelines

1. **Use camelCase** for key names
2. **Be descriptive** but concise
3. **Group by feature/section**, not by type
4. **Avoid abbreviations** unless universally understood

```json
// GOOD
{
  "contactForm": {
    "title": "Get in Touch",
    "fields": {
      "fullName": "Full Name",
      "email": "Email Address"
    },
    "submit": "Send Message",
    "success": "Message sent successfully!"
  }
}

// BAD
{
  "cf_ttl": "Get in Touch",
  "cf_fn": "Full Name",
  "titles": {
    "contact": "Get in Touch"
  }
}
```

## Dynamic Content

### Interpolation

```json
{
  "greeting": "Hello, {{name}}!",
  "items": "You have {{count}} items"
}
```

```typescript
t('greeting', { name: 'John' })  // "Hello, John!"
t('items', { count: 5 })         // "You have 5 items"
```

### Pluralization

```json
{
  "items_zero": "No items",
  "items_one": "1 item",
  "items_other": "{{count}} items"
}
```

```typescript
t('items', { count: 0 })  // "No items"
t('items', { count: 1 })  // "1 item"
t('items', { count: 5 })  // "5 items"
```

## Translation File Management

### Adding New Keys

1. **Add to ALL language files** simultaneously
2. Start with English, then translate
3. Keep file structure consistent across languages

```bash
# Files to update when adding new keys:
public/locales/en/translation.json
public/locales/es/translation.json
public/locales/cs/translation.json
```

### Key Organization

Group translations by page/feature:

```json
{
  "header": { ... },
  "footer": { ... },
  "hero": { ... },
  "features": { ... },
  "pricing": { ... },
  "contact": { ... },
  "solutions": {
    "leadValidator": { ... },
    "salesAgent": { ... }
  },
  "common": {
    "buttons": { ... },
    "labels": { ... },
    "errors": { ... }
  },
  "validation": { ... }
}
```

## Routing with Languages

### Language-Based Routes

All routes are prefixed with language code:

```
/:lang/           → MainPage
/:lang/pricing    → PricingPage
/:lang/contact    → ContactPage
/:lang/solutions  → SolutionsPage
```

### Getting Current Language

```typescript
import { useParams } from 'react-router-dom';

const MyComponent = () => {
  const { lang } = useParams<{ lang: string }>();
  // lang = 'en' | 'es' | 'cs'
};
```

### Language-Aware Navigation

```typescript
import { useNavigate, useParams } from 'react-router-dom';

const MyComponent = () => {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();

  const goToPricing = () => {
    navigate(`/${lang}/pricing`);
  };
};
```

### Language Switching

```typescript
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { trackLanguageSwitch } from '@/utils/dataLayer';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useParams<{ lang: string }>();

  const switchLanguage = (newLang: string) => {
    trackLanguageSwitch(lang || 'en', newLang);
    i18n.changeLanguage(newLang);

    // Update URL with new language
    const newPath = location.pathname.replace(`/${lang}`, `/${newLang}`);
    navigate(newPath);
  };

  return (
    <select
      value={lang}
      onChange={(e) => switchLanguage(e.target.value)}
    >
      <option value="en">English</option>
      <option value="es">Español</option>
      <option value="cs">Čeština</option>
    </select>
  );
};
```

## Data with Translation Keys

### Static Data Pattern

Store translation keys in data files, resolve in components:

```typescript
// src/data/solutions/lead-validator.ts
export const leadValidatorData = {
  id: 'lead-validator',
  // Store translation KEYS, not values
  translationKey: 'solutions.leadValidator',
  features: [
    { id: 'feature1', icon: Shield, translationKey: 'solutions.leadValidator.features.validation' },
    { id: 'feature2', icon: Zap, translationKey: 'solutions.leadValidator.features.enrichment' },
  ],
};

// In component
const { t } = useTranslation();
const title = t(`${solution.translationKey}.hero.title`);
```

## Special Cases

### HTML in Translations

Use `Trans` component for translations with HTML:

```json
{
  "terms": "By continuing, you agree to our <link>Terms of Service</link>"
}
```

```typescript
import { Trans } from 'react-i18next';

<Trans i18nKey="terms">
  By continuing, you agree to our <Link to="/terms">Terms of Service</Link>
</Trans>
```

### Validation Messages

Create schema with `t` function:

```typescript
const createSchema = (t: TFunction) => z.object({
  email: z.string().email({ message: t('validation.email.invalid') }),
  name: z.string().min(2, { message: t('validation.name.tooShort') }),
});
```

## Common Mistakes

### Hardcoded Text

```typescript
// WRONG
<h1>Welcome to our platform</h1>

// CORRECT
<h1>{t('hero.title')}</h1>
```

### Missing Translations

```typescript
// WRONG - Key only in English
t('newFeature.title') // Shows key string in ES/CS

// CORRECT - Add to all language files first
```

### Inconsistent Keys

```typescript
// WRONG - Different structure per language
// en: { "hero": { "title": "..." } }
// es: { "heroTitle": "..." }

// CORRECT - Same structure everywhere
// en: { "hero": { "title": "..." } }
// es: { "hero": { "title": "..." } }
```
