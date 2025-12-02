// src/data/solutions/types.ts

export type SolutionCategory = 'outbound' | 'inbound' | 'marketing' | 'operations';

export interface TrustBadge {
  icon: string;
  label: string;
  value: string;
}

export interface Statistic {
  value: string;
  label: string;
  source?: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon?: string;
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Metric {
  value: string;
  label: string;
  description?: string;
  trend?: 'up' | 'down';
}

export interface UseCase {
  id: string;
  industry: string;
  title: string;
  description: string;
  results: string[];
  icon?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  image?: string;
  logo?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface PricingTeaser {
  type: 'from' | 'custom' | 'free-trial';
  startingPrice?: number;
  currency?: string;
  period?: string;
  includes: string[];
}

export interface SolutionHero {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  heroImage?: string;
  heroVideo?: string;
  trustBadges: TrustBadge[];
}

export interface SolutionProblem {
  headline: string;
  description: string;
  painPoints: {
    title: string;
    description: string;
    icon?: string;
  }[];
  statistics: Statistic[];
}

export interface SolutionHowItWorks {
  title: string;
  subtitle: string;
  steps: ProcessStep[];
}

export interface SolutionFeatures {
  title: string;
  subtitle: string;
  features: Feature[];
}

export interface SolutionMetrics {
  title: string;
  subtitle: string;
  metrics: Metric[];
  comparisonTitle?: string;
  before?: string[];
  after?: string[];
}

export interface SolutionUseCases {
  title: string;
  subtitle: string;
  useCases: UseCase[];
}

export interface SolutionIntegrations {
  title: string;
  subtitle: string;
  integrationIds: string[];
}

export interface SolutionFAQ {
  title: string;
  subtitle: string;
  faqs: FAQ[];
}

export interface SolutionCTA {
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
}

export interface PlatformKPI {
  icon: string;
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
}

export interface PlatformActivityItem {
  icon: string;
  text: string;
  time: string;
  status: 'success' | 'pending' | 'processing';
}

export interface SolutionPlatformPreview {
  badge?: string;
  title: string;
  subtitle: string;
  kpis: PlatformKPI[];
  mainChart?: {
    title: string;
    subtitle: string;
  };
  scoreCard?: {
    title?: string;
    score: number;
    description?: string;
  };
  activityFeed?: PlatformActivityItem[];
}

export interface SolutionScoreAnimation {
  enabled: boolean;
}

export interface Solution {
  id: string;
  slug: string;
  category: SolutionCategory;
  translationKey: string;

  // SEO
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };

  // Page Sections
  hero: SolutionHero;
  problem: SolutionProblem;
  howItWorks: SolutionHowItWorks;
  features: SolutionFeatures;
  metrics: SolutionMetrics;
  platform?: SolutionPlatformPreview;
  scoreAnimation?: SolutionScoreAnimation;
  useCases: SolutionUseCases;
  integrations: SolutionIntegrations;
  testimonial?: Testimonial;
  pricing: PricingTeaser;
  faq: SolutionFAQ;
  cta: SolutionCTA;
}

// Map of all solutions by slug
export type SolutionsMap = Record<string, Solution>;
