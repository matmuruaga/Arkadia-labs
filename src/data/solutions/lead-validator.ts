// src/data/solutions/lead-validator.ts
import { Solution } from './types';

export const leadValidatorSolution: Solution = {
  id: 'lead-validator',
  slug: 'lead-validator',
  category: 'outbound',
  translationKey: 'leadValidator',

  seo: {
    title: 'Lead Validator AI Agent | Arkadia Labs',
    description: 'Automatically verify, enrich, and score your leads with AI. Reduce wasted calls by 80% and focus on prospects that actually convert.',
    keywords: ['lead validation', 'lead verification', 'AI lead scoring', 'lead enrichment', 'sales automation', 'B2B sales'],
  },

  hero: {
    badge: 'Sales & Outbound',
    title: 'Stop Wasting Time on Dead Leads',
    subtitle: 'AI-Powered Lead Validation',
    description: 'Automatically verify contact information, enrich data, and score every lead before your team picks up the phone. Know exactly who to call and why.',
    primaryCta: 'Start Validating Leads',
    secondaryCta: 'See Demo',
    trustBadges: [
      { icon: 'check-circle', label: 'Accuracy', value: '95%+' },
      { icon: 'clock', label: 'Time Saved', value: '80%' },
      { icon: 'trending-up', label: 'Conversion Lift', value: '3.5x' },
    ],
  },

  problem: {
    headline: 'Your Sales Team Is Burning Money on Bad Data',
    description: 'Every wasted call costs time, energy, and opportunity. Most B2B sales teams spend 70% of their time chasing leads that will never convert.',
    painPoints: [
      {
        title: 'Invalid Contact Information',
        description: 'Wrong phone numbers, outdated company data, and disconnected lines waste hours of your team\'s productive time every single day.',
        icon: 'phone-off',
      },
      {
        title: 'No Lead Intelligence',
        description: 'Your team calls without context—no idea if the lead is ready to buy, the right decision-maker, or even still at the company.',
        icon: 'help-circle',
      },
      {
        title: 'Inconsistent Qualification',
        description: 'Manual lead scoring is subjective and inconsistent. High-value leads slip through while your team chases dead ends.',
        icon: 'shuffle',
      },
      {
        title: 'Wasted Sales Capacity',
        description: 'Your expensive sales reps are doing data entry and research instead of having conversations that close deals.',
        icon: 'clock',
      },
    ],
    statistics: [
      { value: '40%', label: 'of B2B data decays annually', source: 'Dun & Bradstreet' },
      { value: '67%', label: 'of sales time is non-selling activities', source: 'Salesforce' },
      { value: '79%', label: 'of leads never convert to sales', source: 'MarketingSherpa' },
    ],
  },

  howItWorks: {
    title: 'How Lead Validator Works',
    subtitle: 'From raw lead to qualified opportunity in minutes',
    steps: [
      {
        step: 1,
        title: 'Connect Your Lead Sources',
        description: 'Import leads from your CRM, marketing automation, or CSV files. Our AI connects to all your data sources seamlessly.',
        icon: 'upload',
      },
      {
        step: 2,
        title: 'AI Validates & Enriches',
        description: 'Our AI verifies contact info, appends company data, identifies decision-makers, and detects buying signals in real-time.',
        icon: 'cpu',
      },
      {
        step: 3,
        title: 'Smart Scoring & Prioritization',
        description: 'Each lead receives a 0-100 score based on validity, intent, and fit. Your team knows exactly who to call first.',
        icon: 'bar-chart',
      },
      {
        step: 4,
        title: 'Sync to Your CRM',
        description: 'Validated leads automatically sync back to Salesforce, HubSpot, or your CRM with all enrichment data attached.',
        icon: 'refresh-cw',
      },
    ],
  },

  features: {
    title: 'Everything You Need for Clean, Actionable Leads',
    subtitle: 'Comprehensive validation and enrichment in one platform',
    features: [
      {
        id: 'phone-validation',
        icon: 'phone-check',
        title: 'Phone Validation',
        description: 'Verify phone numbers, detect line type (mobile/landline), and identify disconnected numbers automatically.',
      },
      {
        id: 'data-enrichment',
        icon: 'database',
        title: 'Data Enrichment',
        description: 'Append 50+ data points including company size, industry, revenue, tech stack, and social profiles.',
      },
      {
        id: 'intent-signals',
        icon: 'target',
        title: 'Intent Signal Detection',
        description: 'Identify leads actively researching solutions like yours based on web behavior and content consumption.',
      },
      {
        id: 'duplicate-detection',
        icon: 'copy',
        title: 'Duplicate Detection',
        description: 'Automatically identify and merge duplicate records to keep your CRM clean and accurate.',
      },
      {
        id: 'lead-scoring',
        icon: 'star',
        title: 'AI Lead Scoring',
        description: 'Machine learning scores leads based on your historical conversion data. The model improves with every deal.',
      },
      {
        id: 'company-insights',
        icon: 'building',
        title: 'Company Insights',
        description: 'Get comprehensive company profiles including org structure, tech stack, funding history, and key decision-makers.',
      },
    ],
  },

  metrics: {
    title: 'Measurable Impact on Your Sales Pipeline',
    subtitle: 'Real results from teams using Lead Validator',
    metrics: [
      { value: '80%', label: 'Reduction in Wasted Calls', description: 'Less time dialing wrong numbers', trend: 'down' },
      { value: '3.5x', label: 'Higher Connection Rate', description: 'Reach more decision-makers', trend: 'up' },
      { value: '45%', label: 'Faster Lead-to-Opportunity', description: 'Accelerate your sales cycle', trend: 'up' },
      { value: '60%', label: 'Less Time on Data Entry', description: 'Auto-enrichment does the work', trend: 'down' },
    ],
    comparisonTitle: 'Before vs After Lead Validator',
    before: [
      'Calling invalid numbers 40% of the time',
      'Manual research: 20 minutes per lead',
      'Inconsistent lead qualification',
      'No visibility into lead intent',
      'CRM full of duplicate records',
    ],
    after: [
      '95%+ valid contact rate',
      'Instant enrichment: 0 manual research',
      'AI-powered consistent scoring',
      'Real-time buying intent signals',
      'Clean, deduplicated database',
    ],
  },

  scoreAnimation: {
    enabled: true,
  },

  platform: {
    badge: 'Platform Preview',
    title: 'Your Command Center for Lead Intelligence',
    subtitle: 'See exactly how Lead Validator works with a real-time dashboard that gives you complete visibility into your lead quality and validation pipeline.',
    kpis: [
      { icon: 'check-circle', label: 'Quality Score Avg', value: '94.2', trend: '+12.3% vs last month', trendUp: true },
      { icon: 'target', label: 'Lead Score Avg', value: '8.7', trend: '+0.8 vs previous', trendUp: true },
      { icon: 'clock', label: 'Avg Validation Time', value: '0:03', trend: '-45% faster', trendUp: true },
      { icon: 'dollar-sign', label: 'Cost per Lead', value: '$0.12', trend: '-23% savings', trendUp: true },
    ],
    mainChart: {
      title: 'Validation Performance',
      subtitle: 'Daily validated leads over time',
    },
    scoreCard: {
      title: 'Lead Quality Score',
      score: 87,
      description: 'Above target threshold',
    },
    activityFeed: [
      { icon: 'check-circle', text: 'Batch #4521 validated: 156 leads', time: '2 min ago', status: 'success' },
      { icon: 'refresh', text: 'CRM sync in progress...', time: 'Now', status: 'processing' },
      { icon: 'target', text: 'High-intent lead detected: Acme Corp', time: '5 min ago', status: 'success' },
      { icon: 'zap', text: 'Auto-enrichment completed: 89 leads', time: '12 min ago', status: 'success' },
    ],
  },

  useCases: {
    title: 'Built for Teams That Need Results',
    subtitle: 'See how different industries use Lead Validator',
    useCases: [
      {
        id: 'saas-sales',
        industry: 'SaaS',
        title: 'B2B SaaS Sales Teams',
        description: 'Validate inbound leads from marketing, enrich with tech stack data, and prioritize by intent signals.',
        results: [
          '3x faster lead response time',
          '40% increase in demo bookings',
          '25% higher close rates',
        ],
        icon: 'code',
      },
      {
        id: 'agencies',
        industry: 'Agencies',
        title: 'Marketing & Sales Agencies',
        description: 'Clean client lead lists before outreach campaigns. Validate contacts and maximize campaign ROI.',
        results: [
          '90% reduction in wasted outreach',
          '2x campaign response rates',
          'Happier clients with better results',
        ],
        icon: 'megaphone',
      },
      {
        id: 'real-estate',
        industry: 'Real Estate',
        title: 'Real Estate Professionals',
        description: 'Verify property owner information, identify motivated sellers, and focus on leads ready to transact.',
        results: [
          '60% fewer dead-end calls',
          'Accurate owner contact info',
          'Faster time to close deals',
        ],
        icon: 'home',
      },
    ],
  },

  integrations: {
    title: 'Works With Your Existing Stack',
    subtitle: 'Native integrations with the tools you already use',
    integrationIds: ['salesforce', 'hubspot', 'pipedrive', 'twilio', 'google_sheets', 'zapier', 'webhooks'],
  },

  testimonial: {
    quote: 'Lead Validator transformed how our BDR team operates. Instead of burning through hundreds of dead-end calls every day, they\'re now having real conversations with qualified prospects. The 3.5x response rate improvement speaks for itself.',
    author: 'Calixto Carbone',
    role: 'Founder & CEO',
    company: 'ELSA Consulting',
  },

  pricing: {
    type: 'from',
    startingPrice: 299,
    currency: '$',
    period: 'month',
    includes: [
      'Up to 5,000 lead validations/month',
      'Phone verification',
      'Basic data enrichment',
      'CRM integration (1)',
      'Lead scoring',
      'Email support',
    ],
  },

  faq: {
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know about Lead Validator',
    faqs: [
      {
        question: 'How accurate is the lead validation?',
        answer: 'Our AI achieves 95%+ accuracy on phone verification and data enrichment. We use multiple data sources and real-time verification to ensure the highest accuracy possible.',
      },
      {
        question: 'How long does validation take?',
        answer: 'Most leads are validated and enriched within seconds. Batch processing of 10,000+ leads typically completes in under 30 minutes.',
      },
      {
        question: 'Which CRMs do you integrate with?',
        answer: 'We have native integrations with Salesforce, HubSpot, Pipedrive, Zoho CRM, and more. We also support webhooks and Zapier for custom workflows.',
      },
      {
        question: 'Is my data secure?',
        answer: 'Absolutely. We\'re SOC 2 compliant, use bank-level encryption, and never share or sell your data. Your leads remain yours.',
      },
      {
        question: 'Can I try it before committing?',
        answer: 'Yes! We offer a free pilot program where you can validate 500 leads at no cost. See the results before you decide.',
      },
      {
        question: 'How does lead scoring work?',
        answer: 'Our AI analyzes 50+ signals including contact validity, company fit, intent data, and engagement history. The model learns from your specific conversion patterns to improve over time.',
      },
    ],
  },

  cta: {
    title: 'Ready to Stop Wasting Time on Bad Leads?',
    subtitle: 'Join hundreds of sales teams who validate before they dial.',
    primaryCta: 'Start Free Pilot',
    secondaryCta: 'Talk to Sales',
  },
};
