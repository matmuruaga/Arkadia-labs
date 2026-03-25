---
paths: src/**/*.tsx, src/**/*.ts
---

# React Development Rules

## Component Patterns

### Functional Components Only

Always use functional components with hooks. Never use class components.

```typescript
// CORRECT
const MyComponent: React.FC<Props> = ({ title, onClick }) => {
  const { t } = useTranslation();
  return <div onClick={onClick}>{t(title)}</div>;
};

// WRONG - No class components
class MyComponent extends React.Component { ... }
```

### Component File Structure

```typescript
// 1. Imports (external → internal → types → styles)
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { trackCtaClick } from '@/utils/dataLayer';
import type { ComponentProps } from './types';

// 2. Types/Interfaces (if not in separate file)
interface Props {
  title: string;
  onAction: () => void;
}

// 3. Component definition
const MyComponent: React.FC<Props> = ({ title, onAction }) => {
  // 3a. Hooks
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  // 3b. Handlers
  const handleClick = () => {
    trackCtaClick('action', 'location', t(title));
    onAction();
  };

  // 3c. Effects
  useEffect(() => {
    // Side effects
  }, []);

  // 3d. Render
  return (
    <div>
      <Button onClick={handleClick}>{t(title)}</Button>
    </div>
  );
};

// 4. Export
export default MyComponent;
```

## Hooks Usage

### Required Hooks

1. **useTranslation**: For all user-facing text
2. **useParams**: For route parameters (especially `lang`)
3. **useNavigate**: For programmatic navigation

### Custom Hooks

Extract complex logic into custom hooks:

```typescript
// In a separate file or at component top
const useScrollAnimation = (threshold: number = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};
```

## State Management

### Local State

Use `useState` for component-local state:

```typescript
const [isOpen, setIsOpen] = useState(false);
const [formData, setFormData] = useState<FormData | null>(null);
```

### Context API

Use Context for cross-component state (e.g., ElevenLabsWidgetContext):

```typescript
// Creating context
const WidgetContext = createContext<WidgetContextType | null>(null);

// Provider component
export const WidgetProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <WidgetContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </WidgetContext.Provider>
  );
};

// Custom hook for consuming
export const useWidget = () => {
  const context = useContext(WidgetContext);
  if (!context) throw new Error('useWidget must be used within WidgetProvider');
  return context;
};
```

## Lazy Loading

### Pages

All pages should be lazy loaded:

```typescript
// In App.tsx or router config
const PricingPage = lazy(() => import('./pages/PricingPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Usage with Suspense
<Suspense fallback={<LoadingScreen />}>
  <PricingPage />
</Suspense>
```

### Components (Below-the-fold)

```typescript
// Lazy load heavy components
const TestimonialsSection = lazy(() => import('./TestimonialsSection'));
const FaqSection = lazy(() => import('./FaqSection'));

// In render
<Suspense fallback={<div className="h-96 animate-pulse bg-gray-100" />}>
  <TestimonialsSection />
</Suspense>
```

## Animation Patterns

### Framer Motion

```typescript
import { motion } from 'framer-motion';

// Fade in on scroll
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>

// Stagger children
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};
```

### Mobile Performance

Disable heavy animations on mobile:

```typescript
const isMobile = window.innerWidth < 768;

<motion.div
  animate={isMobile ? {} : { y: scrollY * 0.5 }}
>
  {/* Parallax only on desktop */}
</motion.div>
```

## Error Boundaries

Wrap major sections in error boundaries:

```typescript
<ErrorBoundary fallback={<ErrorFallback />}>
  <ComplexFeature />
</ErrorBoundary>
```

## Prop Drilling Prevention

1. Use Context for deeply nested state
2. Use composition pattern over prop drilling
3. Keep component hierarchies shallow when possible

## TypeScript Requirements

1. Always type props explicitly
2. Use `React.FC<Props>` for components
3. Avoid `any` - use `unknown` if type is truly unknown
4. Use discriminated unions for complex state

```typescript
type LoadingState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: Data }
  | { status: 'error'; error: Error };
```
