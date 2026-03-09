---
paths: src/components/**/*.tsx
---

# Component Development Rules

## Component Categories

### 1. UI Primitives (`src/components/ui/`)

Base components from shadcn/ui. These are the building blocks.

```typescript
// DO NOT modify these directly for specific use cases
// Instead, compose them in feature components

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
```

### 2. Feature Components (`src/components/`)

Reusable components used across multiple pages:

- `Header.tsx` - Main navigation
- `Footer.tsx` - Site footer
- `Hero.tsx` - Homepage hero
- `FaqSection.tsx` - FAQ accordion
- `TestimonialsSection.tsx` - Customer testimonials
- `IntegrationsSection.tsx` - Integration showcase

### 3. Domain Components (`src/components/{domain}/`)

Components specific to a feature domain:

```
src/components/solutions/
├── SolutionHero.tsx
├── SolutionProblem.tsx
├── SolutionFeatures.tsx
├── SolutionMetrics.tsx
└── index.ts  # Barrel export
```

## Creating New Components

### File Structure

```typescript
// src/components/FeatureName.tsx

// 1. Imports
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { trackCtaClick } from '@/utils/dataLayer';
import { cn } from '@/lib/utils';

// 2. Types
interface FeatureNameProps {
  title: string;
  variant?: 'default' | 'compact';
  className?: string;
  onAction?: () => void;
}

// 3. Component
const FeatureName: React.FC<FeatureNameProps> = ({
  title,
  variant = 'default',
  className,
  onAction,
}) => {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    trackCtaClick('feature_action', 'feature_section', t(title));
    onAction?.();
  };

  return (
    <section className={cn(
      "py-16 px-4",
      variant === 'compact' && "py-8",
      className
    )}>
      <h2>{t(title)}</h2>
      <Button onClick={handleClick}>
        {t('common.learnMore')}
      </Button>
    </section>
  );
};

// 4. Export
export default FeatureName;
```

### Barrel Exports

For domain component folders, create an `index.ts`:

```typescript
// src/components/solutions/index.ts
export { default as SolutionHero } from './SolutionHero';
export { default as SolutionProblem } from './SolutionProblem';
export { default as SolutionFeatures } from './SolutionFeatures';
// ... etc
```

## Component Patterns

### Props with className

Always accept and merge `className` prop:

```typescript
interface Props {
  className?: string;
}

const Component: React.FC<Props> = ({ className }) => (
  <div className={cn("default-classes", className)}>
    Content
  </div>
);
```

### Children Pattern

```typescript
interface Props {
  children: React.ReactNode;
  title?: string;
}

const Card: React.FC<Props> = ({ children, title }) => (
  <div className="card">
    {title && <h3>{title}</h3>}
    {children}
  </div>
);
```

### Compound Components

For complex UI like tabs or accordions:

```typescript
// Parent component manages state
const Accordion = ({ children }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <AccordionContext.Provider value={{ openIndex, setOpenIndex }}>
      {children}
    </AccordionContext.Provider>
  );
};

// Child components consume context
const AccordionItem = ({ index, children }) => {
  const { openIndex, setOpenIndex } = useAccordionContext();
  const isOpen = openIndex === index;

  return (
    <div onClick={() => setOpenIndex(isOpen ? null : index)}>
      {children}
    </div>
  );
};

// Usage
<Accordion>
  <AccordionItem index={0}>Item 1</AccordionItem>
  <AccordionItem index={1}>Item 2</AccordionItem>
</Accordion>
```

### Data-Driven Components

Components that receive data with translation keys:

```typescript
// Data structure
interface Feature {
  id: string;
  icon: LucideIcon;
  translationKey: string;
}

// Component receives data
interface Props {
  features: Feature[];
  translationPrefix: string;
}

const FeatureGrid: React.FC<Props> = ({ features, translationPrefix }) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-3 gap-6">
      {features.map((feature) => (
        <div key={feature.id}>
          <feature.icon className="w-8 h-8" />
          <h3>{t(`${translationPrefix}.${feature.translationKey}.title`)}</h3>
          <p>{t(`${translationPrefix}.${feature.translationKey}.description`)}</p>
        </div>
      ))}
    </div>
  );
};
```

## Solution Page Components

The `solutions/` folder contains reusable components for solution detail pages:

### Usage Pattern

```typescript
// src/pages/solutions/SolutionDetailPage.tsx
import {
  SolutionHero,
  SolutionProblem,
  SolutionFeatures,
  SolutionMetrics,
  SolutionPlatform,
  SolutionUseCases,
  SolutionIntegrations,
  SolutionFAQ,
  SolutionCTA,
} from '@/components/solutions';

const SolutionDetailPage = () => {
  const solution = getSolutionBySlug(slug);

  return (
    <>
      <SolutionHero solution={solution} />
      <SolutionProblem solution={solution} />
      <SolutionFeatures solution={solution} />
      <SolutionMetrics solution={solution} />
      <SolutionPlatform solution={solution} />
      <SolutionUseCases solution={solution} />
      <SolutionIntegrations solution={solution} />
      <SolutionFAQ solution={solution} />
      <SolutionCTA solution={solution} />
    </>
  );
};
```

### Component Props Pattern

Each solution component receives the full solution object:

```typescript
interface SolutionComponentProps {
  solution: Solution;
  className?: string;
}

const SolutionHero: React.FC<SolutionComponentProps> = ({ solution, className }) => {
  const { t } = useTranslation();
  const prefix = `solutions.${solution.id}`;

  return (
    <section className={cn("py-20", className)}>
      <h1>{t(`${prefix}.hero.title`)}</h1>
      <p>{t(`${prefix}.hero.subtitle`)}</p>
    </section>
  );
};
```

## Animation Components

### With Framer Motion

```typescript
const AnimatedCard: React.FC<Props> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);
```

### Staggered Animations

```typescript
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const StaggeredList: React.FC<Props> = ({ items }) => (
  <motion.ul variants={container} initial="hidden" animate="show">
    {items.map((item) => (
      <motion.li key={item.id} variants={item}>
        {item.content}
      </motion.li>
    ))}
  </motion.ul>
);
```

## Testing Components

When creating components, ensure they:

1. Render without errors
2. Accept and apply className prop
3. Use translation keys (no hardcoded text)
4. Include analytics tracking for interactions
5. Are responsive (mobile-first)
6. Handle loading/error states if async

## Common Mistakes

### Missing Analytics

```typescript
// WRONG
<Button onClick={() => navigate('/pricing')}>View Pricing</Button>

// CORRECT
<Button onClick={() => {
  trackCtaClick('view_pricing', 'hero', t('hero.viewPricing'));
  navigate('/pricing');
}}>
  {t('hero.viewPricing')}
</Button>
```

### Hardcoded Text

```typescript
// WRONG
<h1>Welcome to Elevaite Labs</h1>

// CORRECT
<h1>{t('hero.title')}</h1>
```

### Missing className Merge

```typescript
// WRONG - Ignores passed className
const Card = ({ className }) => (
  <div className="card">Content</div>
);

// CORRECT
const Card = ({ className }) => (
  <div className={cn("card", className)}>Content</div>
);
```
