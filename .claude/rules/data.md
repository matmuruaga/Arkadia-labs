---
paths: src/data/**/*.ts
---

# Data Management Rules

## Data Files Location

All static data files live in `src/data/`:

```
src/data/
├── integrations.ts          # Integration definitions
├── integrations.data.ts     # Integration data
├── caseStudiesData.ts       # Case studies content
└── solutions/
    ├── types.ts             # TypeScript types
    ├── lead-validator.ts    # Lead Validator solution
    ├── sales-agent.ts       # Sales Agent solution (example)
    └── index.ts             # Barrel export
```

## Data Structure Pattern

### Translation Key Pattern

Store translation keys, NOT translated values:

```typescript
// CORRECT - Store keys
export const solutionData = {
  id: 'lead-validator',
  translationKey: 'solutions.leadValidator',
  features: [
    { id: 'validation', icon: Shield, key: 'features.validation' },
    { id: 'enrichment', icon: Zap, key: 'features.enrichment' },
  ],
};

// WRONG - Don't store translated text
export const solutionData = {
  id: 'lead-validator',
  title: 'Lead Validator',  // Hardcoded!
  description: 'Validate your leads...',  // Hardcoded!
};
```

### Full Type Safety

```typescript
// src/data/solutions/types.ts
import type { LucideIcon } from 'lucide-react';

export interface Solution {
  id: string;
  slug: string;
  translationKey: string;
  icon: LucideIcon;
  color: string;
  gradient: string;
  features: SolutionFeature[];
  metrics: SolutionMetric[];
  useCases: SolutionUseCase[];
  integrations: string[];
  faqs: SolutionFAQ[];
}

export interface SolutionFeature {
  id: string;
  icon: LucideIcon;
  translationKey: string;
}

export interface SolutionMetric {
  id: string;
  icon: LucideIcon;
  beforeValue: string;
  afterValue: string;
  translationKey: string;
}

// ... etc
```

## Solutions Data

### Creating a New Solution

1. Create data file in `src/data/solutions/`:

```typescript
// src/data/solutions/new-solution.ts
import { Solution } from './types';
import { Zap, Shield, Clock } from 'lucide-react';

export const newSolutionData: Solution = {
  id: 'new-solution',
  slug: 'new-solution',
  translationKey: 'solutions.newSolution',
  icon: Zap,
  color: '#1C7ED6',
  gradient: 'from-blue-500 to-purple-500',

  features: [
    {
      id: 'feature1',
      icon: Shield,
      translationKey: 'features.feature1',
    },
    // ... more features
  ],

  metrics: [
    {
      id: 'metric1',
      icon: Clock,
      beforeValue: '24h',
      afterValue: '1h',
      translationKey: 'metrics.timeReduction',
    },
    // ... more metrics
  ],

  useCases: [
    {
      id: 'useCase1',
      industries: ['fintech', 'saas'],
      translationKey: 'useCases.useCase1',
    },
  ],

  integrations: ['salesforce', 'hubspot', 'zapier'],

  faqs: [
    { id: 'faq1', translationKey: 'faqs.faq1' },
    { id: 'faq2', translationKey: 'faqs.faq2' },
  ],
};
```

2. Export from index:

```typescript
// src/data/solutions/index.ts
export * from './types';
export { leadValidatorData } from './lead-validator';
export { newSolutionData } from './new-solution';

// Solution registry
export const solutions: Solution[] = [
  leadValidatorData,
  newSolutionData,
];

// Helper functions
export const getSolutionBySlug = (slug: string): Solution | undefined =>
  solutions.find(s => s.slug === slug);

export const getSolutionById = (id: string): Solution | undefined =>
  solutions.find(s => s.id === id);
```

3. Add translations to ALL language files:

```json
// public/locales/en/translation.json
{
  "solutions": {
    "newSolution": {
      "hero": {
        "badge": "New Feature",
        "title": "Your New Solution",
        "subtitle": "Description of what it does"
      },
      "features": {
        "feature1": {
          "title": "Feature Title",
          "description": "Feature description"
        }
      },
      "metrics": {
        "timeReduction": {
          "label": "Time Reduction",
          "description": "From 24 hours to 1 hour"
        }
      }
      // ... etc
    }
  }
}
```

## Integrations Data

### Structure

```typescript
// src/data/integrations.data.ts
export interface Integration {
  id: string;
  name: string;
  logo: string;  // Cloudinary URL
  category: IntegrationCategory;
  description: string;  // Translation key
  featured?: boolean;
}

export type IntegrationCategory =
  | 'crm'
  | 'marketing'
  | 'communication'
  | 'analytics'
  | 'automation';

export const integrations: Integration[] = [
  {
    id: 'salesforce',
    name: 'Salesforce',
    logo: 'https://res.cloudinary.com/.../salesforce-logo.svg',
    category: 'crm',
    description: 'integrations.salesforce.description',
    featured: true,
  },
  // ... more integrations
];
```

### Using Integration Data

```typescript
// In component
import { integrations, IntegrationCategory } from '@/data/integrations.data';

const IntegrationsPage = () => {
  const [category, setCategory] = useState<IntegrationCategory | 'all'>('all');

  const filtered = category === 'all'
    ? integrations
    : integrations.filter(i => i.category === category);

  return (
    <div>
      {filtered.map(integration => (
        <IntegrationCard key={integration.id} integration={integration} />
      ))}
    </div>
  );
};
```

## Case Studies Data

### Structure

```typescript
// src/data/caseStudiesData.ts
export interface CaseStudy {
  id: string;
  slug: string;
  translationKey: string;
  client: {
    name: string;
    logo: string;
    industry: string;
  };
  metrics: {
    id: string;
    value: string;
    label: string;  // Translation key
  }[];
  solutions: string[];  // Solution IDs used
  featured: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'company-a',
    slug: 'company-a-success-story',
    translationKey: 'caseStudies.companyA',
    client: {
      name: 'Company A',
      logo: 'https://...',
      industry: 'fintech',
    },
    metrics: [
      { id: 'roi', value: '340%', label: 'metrics.roi' },
      { id: 'time', value: '-60%', label: 'metrics.timeSaved' },
    ],
    solutions: ['lead-validator'],
    featured: true,
  },
];
```

## Data Validation

### Runtime Validation (Optional)

Use Zod for runtime validation if needed:

```typescript
import { z } from 'zod';

const solutionSchema = z.object({
  id: z.string(),
  slug: z.string(),
  translationKey: z.string(),
  features: z.array(z.object({
    id: z.string(),
    translationKey: z.string(),
  })),
});

// Validate at build time or runtime
const validateSolutions = () => {
  solutions.forEach(solution => {
    const result = solutionSchema.safeParse(solution);
    if (!result.success) {
      console.error(`Invalid solution: ${solution.id}`, result.error);
    }
  });
};
```

## Best Practices

### DO

- Use TypeScript interfaces for all data
- Store translation keys, resolve in components
- Export helper functions for common lookups
- Keep related data together (solution data + types)
- Use Cloudinary for all images

### DON'T

- Hardcode user-facing text in data files
- Mix data definition with component logic
- Create circular dependencies
- Store sensitive data in frontend files
- Duplicate data across files
