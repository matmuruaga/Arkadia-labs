---
paths: src/**/*.tsx, src/**/*.css, tailwind.config.js
---

# Styling Rules

## Tailwind CSS Conventions

### Class Order

Follow this order for Tailwind classes:

1. Layout (display, position, overflow)
2. Box model (width, height, margin, padding)
3. Typography (font, text)
4. Visual (background, border, shadow)
5. Interactivity (cursor, pointer-events)
6. Transitions/Animations

```tsx
// CORRECT order
<div className="flex items-center justify-between w-full p-4 text-lg font-medium bg-white border rounded-lg shadow-sm cursor-pointer transition-all hover:shadow-md">

// Group related utilities logically
<button className="
  flex items-center gap-2
  px-4 py-2
  text-sm font-medium text-white
  bg-blue-600 rounded-lg
  hover:bg-blue-700 focus:ring-2 focus:ring-blue-500
  transition-colors
">
```

### Use cn() Helper

Always use the `cn()` helper for conditional classes:

```typescript
import { cn } from '@/lib/utils';

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  variant === 'primary' ? "primary-classes" : "secondary-classes",
  className // Allow overrides from props
)}>
```

### Responsive Design

Mobile-first approach with breakpoints:

```tsx
// Mobile first - base styles for mobile, then add for larger screens
<div className="
  px-4 py-6
  md:px-8 md:py-12
  lg:px-16 lg:py-20
">
  <h1 className="text-2xl md:text-4xl lg:text-5xl">
    Title
  </h1>
</div>
```

Breakpoints reference:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## shadcn/ui Components

### Using Base Components

Import from `@/components/ui/`:

```typescript
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
```

### CVA Variants

Use class-variance-authority for component variants:

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input bg-background hover:bg-accent",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

## CSS Variables

### Theme Colors

Use CSS variables defined in `index.css`:

```css
/* In component CSS or Tailwind classes */
.custom-element {
  background-color: var(--site-bg-light);
  color: var(--site-text-dark);
}

/* Or via Tailwind config */
<div className="bg-background text-foreground">
```

Available CSS variables:
- `--site-bg-light`: #F1F3F5
- `--site-text-dark`: #0D1B2A
- `--site-accent-blue`: #1C7ED6
- `--site-accent-purple`: #D0BFFF
- `--site-accent-green`: #69DB7C

### Dark Mode

Dark mode uses class strategy. Apply dark variants:

```tsx
<div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
```

## Custom Classes

### Gradient Text

```tsx
// Use predefined gradient classes
<span className="gradient-text">Gradient text</span>
<span className="crafted-gradient-text">Blue to purple gradient</span>
```

### Glow Effects

```tsx
// Neon border effect
<div className="neon-border">Card with glow</div>

// Card glow
<div className="card-glow">Subtle glow card</div>

// Neon card (full effect)
<div className="neon-card">Full neon card</div>
```

### Glass Effect

```tsx
// Navigation pill glass effect
<nav className="glass-nav-pill">Navigation</nav>
```

## Animation Classes

### Built-in Tailwind Animations

```tsx
<div className="animate-pulse">Loading...</div>
<div className="animate-spin">Spinner</div>
<div className="animate-bounce">Bouncing</div>
```

### Custom Animations

```tsx
// Slow pulse (defined in tailwind.config.js)
<div className="animate-pulse-slow">Slow pulsing element</div>

// Blink animation
<div className="animate-blink">Blinking cursor</div>
```

## Performance Considerations

### CSS Containment

Use for isolated sections to improve rendering:

```tsx
<section className="contain-layout contain-paint">
  Heavy content section
</section>

// Or in CSS
.heavy-section {
  content-visibility: auto;
  contain-intrinsic-size: 500px;
}
```

### Hardware Acceleration

For animations, use transform-based properties:

```tsx
// CORRECT - GPU accelerated
<div className="transform translate-x-0 transition-transform hover:translate-x-2">

// AVOID - causes repaints
<div className="left-0 transition-[left] hover:left-2">
```

### Avoid Expensive Properties

Minimize use of:
- `box-shadow` changes on hover (use opacity transitions instead)
- `filter` animations (especially blur)
- Large `border-radius` on animated elements

## Z-Index Scale

Use consistent z-index values:

| Layer | Z-Index | Usage |
|-------|---------|-------|
| Base | 0 | Default content |
| Elevated | 10 | Cards, dropdowns |
| Sticky | 20 | Sticky headers |
| Fixed | 30 | Fixed elements |
| Modal backdrop | 40 | Modal overlays |
| Modal | 50 | Modal content |
| Tooltip | 60 | Tooltips |
| Toast | 70 | Notifications |

```tsx
<header className="fixed top-0 z-30">
<div className="modal-backdrop z-40">
<div className="modal-content z-50">
```

## Container Widths

Use consistent max-widths:

```tsx
// Standard content container
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

// Narrow content (text-heavy)
<div className="max-w-3xl mx-auto">

// Wide content (full-bleed sections)
<div className="max-w-full">
```
