---
paths: src/**/*.tsx, src/**/*.ts, vite.config.ts
---

# Performance Rules

## Build Optimization

### Code Splitting

The project uses manual chunking in Vite for optimal loading:

```typescript
// vite.config.ts
manualChunks: {
  'react-vendor': ['react', 'react-dom', 'react-router-dom'],
  'framer-motion': ['framer-motion'],
  'ui-vendor': ['lucide-react'],
  'forms-vendor': ['react-hook-form', 'zod', '@hookform/resolvers'],
  'i18n-vendor': ['i18next', 'react-i18next', 'i18next-http-backend'],
}
```

### Lazy Loading

#### Pages (Mandatory)

All pages MUST be lazy loaded:

```typescript
// App.tsx
const PricingPage = lazy(() => import('./pages/PricingPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'));

// Usage
<Suspense fallback={<LoadingScreen />}>
  <Routes>
    <Route path="pricing" element={<PricingPage />} />
  </Routes>
</Suspense>
```

#### Components (Below-the-Fold)

Lazy load components not visible on initial viewport:

```typescript
const TestimonialsSection = lazy(() => import('./TestimonialsSection'));
const FaqSection = lazy(() => import('./FaqSection'));
const CaseStudiesSection = lazy(() => import('./CaseStudiesSection'));

// In render, with skeleton fallback
<Suspense fallback={<SectionSkeleton />}>
  <TestimonialsSection />
</Suspense>
```

## Runtime Performance

### Animation Optimization

#### Framer Motion

```typescript
// Disable animations on mobile for performance
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = window.innerWidth < 768;

<motion.div
  initial={prefersReducedMotion ? false : { opacity: 0 }}
  animate={{ opacity: 1 }}
  // Disable parallax on mobile
  style={isMobile ? {} : { y: scrollY * 0.5 }}
>
```

#### CSS Animations Over JS

Prefer CSS for simple animations:

```typescript
// PREFERRED - CSS animation
<div className="transition-transform hover:scale-105">

// AVOID for simple effects - JS animation
<motion.div whileHover={{ scale: 1.05 }}>
```

### Scroll Handling

Use passive event listeners and throttling:

```typescript
useEffect(() => {
  let ticking = false;

  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        // Update state here
        setScrollY(window.scrollY);
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### Memoization

Use for expensive computations or to prevent unnecessary re-renders:

```typescript
// Memoize expensive calculations
const filteredItems = useMemo(() =>
  items.filter(item => item.category === selectedCategory),
  [items, selectedCategory]
);

// Memoize callbacks passed to children
const handleClick = useCallback(() => {
  // handler logic
}, [dependencies]);

// Memoize entire components
const MemoizedCard = memo(({ data }) => (
  <Card>{data.title}</Card>
));
```

## CSS Performance

### Content Visibility

Use for heavy sections to defer rendering:

```css
.heavy-section {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px; /* Estimated height */
}
```

```tsx
<section className="[content-visibility:auto] [contain-intrinsic-size:0_500px]">
  {/* Heavy content */}
</section>
```

### CSS Containment

Isolate components to limit style recalculations:

```css
.isolated-component {
  contain: layout paint;
}
```

### Avoid Layout Thrashing

```typescript
// WRONG - Forces multiple reflows
elements.forEach(el => {
  const height = el.offsetHeight; // Read
  el.style.height = height + 10 + 'px'; // Write
});

// CORRECT - Batch reads, then batch writes
const heights = elements.map(el => el.offsetHeight);
elements.forEach((el, i) => {
  el.style.height = heights[i] + 10 + 'px';
});
```

## Image Optimization

### Use OptimizedImage Component

```typescript
import { OptimizedImage } from '@/components/OptimizedImage';

<OptimizedImage
  src="/images/hero.jpg"
  alt="Hero image"
  width={800}
  height={600}
  loading="lazy" // or "eager" for above-fold
/>
```

### Cloudinary URLs

Use Cloudinary transformations:

```typescript
// Apply automatic format and quality
const optimizedUrl = `https://res.cloudinary.com/your-cloud/image/upload/f_auto,q_auto/${imagePath}`;
```

### Preload Critical Images

In `index.html`:

```html
<link rel="preload" as="image" href="/images/hero.webp">
```

## Font Optimization

### Preload Fonts

```html
<!-- Already in index.html -->
<link
  rel="preload"
  href="/fonts/NotoSans-Regular.woff2"
  as="font"
  type="font/woff2"
  crossorigin
>
```

### Font Display

```css
@font-face {
  font-family: 'Noto Sans';
  font-display: swap; /* Show fallback immediately */
}
```

## Third-Party Scripts

### Defer Non-Critical Scripts

```html
<!-- GTM is already optimized in index.html -->
<script defer src="non-critical.js"></script>
```

### Lazy Load Third-Party Widgets

```typescript
// Load ElevenLabs widget only when needed
const ElevenLabsWidget = lazy(() =>
  import('@elevenlabs/react').then(module => ({
    default: module.Widget
  }))
);
```

## Bundle Size Monitoring

### Tree Shaking

Import only what you need:

```typescript
// CORRECT - Tree shakeable
import { ChevronRight, Menu, X } from 'lucide-react';

// AVOID - Imports entire library
import * as Icons from 'lucide-react';
```

### Analyze Bundle

```bash
# Build with stats
npm run build -- --stats

# Analyze
npx vite-bundle-analyzer
```

## Performance Checklist

Before deploying:

- [ ] All pages are lazy loaded
- [ ] Below-fold components are lazy loaded
- [ ] Images use lazy loading (except hero)
- [ ] No console.log in production (terser removes them)
- [ ] CSS animations preferred over JS where possible
- [ ] Scroll handlers use passive listeners
- [ ] Large lists use virtualization if needed
- [ ] Third-party widgets load on demand
- [ ] Bundle size is within budget (<500KB initial)
