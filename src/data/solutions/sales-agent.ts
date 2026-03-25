// src/data/solutions/sales-agent.ts
import { Solution } from './types';

export const salesAgentSolution: Solution = {
  id: 'sales-agent',
  slug: 'sales-agent',
  category: 'outbound',
  translationKey: 'salesAgent',

  seo: {
    title: 'AI Sales Agent | Autonomous Selling & Upselling | Elevaite Labs',
    description: 'AI voice agent that sells your products and services autonomously. Handles inbound and outbound calls, closes deals, and drives upsells. 24/7 revenue generation on autopilot.',
    keywords: [
      'AI sales agent',
      'autonomous selling',
      'AI upselling',
      'voice commerce',
      'AI closer',
      'sales automation',
      'outbound sales AI',
      'inbound sales AI',
      'revenue automation',
      'conversational commerce',
    ],
  },

  hero: {
    badge: 'Sales & Revenue',
    title: 'Your AI Sales Rep That Actually Closes Deals',
    subtitle: 'Autonomous Revenue Generation',
    description: 'An AI voice agent loaded with your product catalog that sells, upsells, and closes deals—inbound or outbound. Works 24/7, never takes a break, and gets better with every conversation.',
    primaryCta: 'See It Sell',
    secondaryCta: 'Talk to Sales',
    trustBadges: [
      { icon: 'trending-up', label: 'Revenue Increase', value: '+35%' },
      { icon: 'shopping-cart', label: 'Upsell Rate', value: '28%' },
      { icon: 'clock', label: 'Availability', value: '24/7' },
    ],
  },

  problem: {
    headline: 'Your Sales Team Can\'t Scale—But Your Competitors Are',
    description: 'Every missed call is a missed sale. Every slow follow-up is revenue walking out the door. Your team can only handle so many conversations, but demand doesn\'t wait.',
    painPoints: [
      {
        title: 'Limited Sales Capacity',
        description: 'Your team can only take so many calls per day. Peak hours mean missed opportunities, and scaling means expensive hiring.',
        icon: 'users',
      },
      {
        title: 'Inconsistent Sales Performance',
        description: 'Some reps close at 30%, others at 10%. Bad days, low energy, and turnover mean unpredictable revenue.',
        icon: 'shuffle',
      },
      {
        title: 'Missed Upsell Opportunities',
        description: 'Reps focus on closing the main sale and forget to offer add-ons, upgrades, or complementary products that boost AOV.',
        icon: 'dollar-sign',
      },
      {
        title: 'No After-Hours Revenue',
        description: '60% of purchase decisions happen outside business hours. No coverage means no sales when customers are ready to buy.',
        icon: 'moon',
      },
    ],
    statistics: [
      { value: '67%', label: 'of sales go to the first vendor to engage', source: 'Salesforce Research' },
      { value: '35-50%', label: 'of revenue goes to responsive sellers', source: 'InsideSales.com' },
      { value: '80%', label: 'of sales require 5+ follow-ups', source: 'Marketing Donut' },
    ],
  },

  howItWorks: {
    title: 'How the Sales Agent Works',
    subtitle: 'From product catalog to closed deal in one conversation',
    steps: [
      {
        step: 1,
        title: 'Load Your Product Catalog',
        description: 'Upload your products, services, pricing, and sales scripts. The AI learns your offerings, objection handlers, and closing techniques.',
        icon: 'database',
      },
      {
        step: 2,
        title: 'Engage Inbound or Outbound',
        description: 'Handle incoming sales calls or proactively reach out to leads. The AI adapts its approach based on context and customer signals.',
        icon: 'phone',
      },
      {
        step: 3,
        title: 'Sell & Upsell Naturally',
        description: 'Present products, handle objections, and identify upsell opportunities. The AI knows when to push and when to listen.',
        icon: 'trending-up',
      },
      {
        step: 4,
        title: 'Close & Process',
        description: 'Secure commitment, process orders, and sync everything to your CRM and commerce platform automatically.',
        icon: 'check-circle',
      },
    ],
  },

  features: {
    title: 'Built to Sell, Not Just Talk',
    subtitle: 'Every feature designed to drive revenue and close deals',
    features: [
      {
        id: 'product-knowledge',
        icon: 'database',
        title: 'Deep Product Knowledge',
        description: 'Loaded with your entire catalog, pricing tiers, promotions, and competitive positioning. Answers any product question instantly.',
      },
      {
        id: 'dynamic-upselling',
        icon: 'trending-up',
        title: 'Dynamic Upselling Engine',
        description: 'Identifies upsell and cross-sell opportunities based on customer needs, purchase history, and conversation context.',
      },
      {
        id: 'objection-mastery',
        icon: 'shield',
        title: 'Objection Mastery',
        description: 'Trained on thousands of sales conversations to handle price objections, competitor comparisons, and buying hesitation.',
      },
      {
        id: 'multi-channel',
        icon: 'phone',
        title: 'Inbound & Outbound Ready',
        description: 'Handles incoming sales inquiries and proactively calls leads from your pipeline. Same AI, two revenue streams.',
      },
      {
        id: 'order-processing',
        icon: 'shopping-cart',
        title: 'Integrated Order Processing',
        description: 'Takes orders, processes payments, and confirms purchases directly on the call. No friction, no dropped sales.',
      },
      {
        id: 'performance-learning',
        icon: 'brain',
        title: 'Continuous Performance Learning',
        description: 'Analyzes every conversation to improve close rates. Learns what works for your specific products and customers.',
      },
    ],
  },

  metrics: {
    title: 'Revenue Results That Matter',
    subtitle: 'Measured impact from teams using the Sales Agent',
    metrics: [
      { value: '+35%', label: 'Revenue Increase', description: 'Average lift in monthly sales', trend: 'up' },
      { value: '28%', label: 'Upsell Conversion', description: 'Customers accepting additional offers', trend: 'up' },
      { value: '24/7', label: 'Sales Coverage', description: 'Never miss a buying moment', trend: 'up' },
      { value: '60%', label: 'Cost Reduction', description: 'vs. equivalent human headcount', trend: 'down' },
    ],
    comparisonTitle: 'Before vs After Sales Agent',
    before: [
      'Limited to business hours sales',
      'Inconsistent rep performance',
      'Missed upsell opportunities',
      'Manual order processing',
      'Slow lead follow-up',
    ],
    after: [
      '24/7 revenue generation',
      'Consistent closing methodology',
      '28% upsell rate on every call',
      'Automated order capture',
      'Instant lead engagement',
    ],
  },

  scoreAnimation: {
    enabled: false,
  },

  platform: {
    badge: 'Revenue Dashboard',
    title: 'Track Every Dollar in Real-Time',
    subtitle: 'Monitor sales performance, conversion rates, and revenue from a single dashboard.',
    kpis: [
      { icon: 'dollar-sign', label: 'Revenue Today', value: '$12,450', trend: '+18% vs yesterday', trendUp: true },
      { icon: 'shopping-cart', label: 'Orders Closed', value: '47', trend: '+12 from target', trendUp: true },
      { icon: 'trending-up', label: 'Upsell Revenue', value: '$3,200', trend: '+28% conversion', trendUp: true },
      { icon: 'phone', label: 'Active Calls', value: '8', trend: '3 closing now', trendUp: true },
    ],
    mainChart: {
      title: 'Sales Performance',
      subtitle: 'Daily revenue and orders closed',
    },
    scoreCard: {
      title: 'Close Rate',
      score: 34,
      description: 'Above industry average',
    },
    activityFeed: [
      { icon: 'check-circle', text: 'Order closed: $890 - Premium Package', time: '2 min ago', status: 'success' },
      { icon: 'trending-up', text: 'Upsell accepted: +$150 warranty', time: '5 min ago', status: 'success' },
      { icon: 'phone', text: 'Outbound campaign: 23 calls completed', time: '12 min ago', status: 'success' },
      { icon: 'shopping-cart', text: 'New order: Enterprise Plan - $2,400/mo', time: '18 min ago', status: 'success' },
    ],
  },

  useCases: {
    title: 'Proven Across Industries',
    subtitle: 'See how different sectors drive revenue with AI selling',
    useCases: [
      {
        id: 'insurance',
        industry: 'Insurance',
        title: 'Insurance Policy Sales & Renewals',
        description: 'Sell new policies, handle renewals, and upsell coverage upgrades. Compliance-ready conversations with full audit trails.',
        results: [
          '42% increase in policy renewals',
          '3.2x more upsells per call',
          'Full regulatory compliance',
        ],
        icon: 'shield',
      },
      {
        id: 'telecom',
        industry: 'Telecommunications',
        title: 'Telecom Plan Upgrades & Add-ons',
        description: 'Upgrade plans, sell device protection, and bundle services. Handle technical questions and billing inquiries while selling.',
        results: [
          '+$8.50 ARPU increase',
          '35% device protection attach rate',
          '60% reduction in churn calls',
        ],
        icon: 'phone',
      },
      {
        id: 'home-services',
        industry: 'Home Services',
        title: 'Home Services Booking & Upselling',
        description: 'Book appointments, sell maintenance plans, and upsell premium services. Convert inquiries to booked revenue.',
        results: [
          '89% booking completion rate',
          '45% maintenance plan attachment',
          '24/7 appointment booking',
        ],
        icon: 'home',
      },
    ],
  },

  integrations: {
    title: 'Connects to Your Revenue Stack',
    subtitle: 'Native integrations with commerce and CRM platforms',
    integrationIds: ['shopify', 'stripe', 'salesforce', 'hubspot', 'woocommerce', 'slack', 'zapier'],
  },

  testimonial: {
    quote: "The Sales Agent transformed our after-hours revenue. We went from zero sales outside business hours to 40% of our monthly revenue coming in nights and weekends. The upsell engine alone paid for the entire implementation in the first month.",
    author: 'Calixto Carbone',
    role: 'Founder & CEO',
    company: 'ELSA Consulting',
  },

  pricing: {
    type: 'custom',
    includes: [
      'Unlimited sales conversations',
      'Product catalog integration',
      'Inbound & outbound capability',
      'Order processing & payments',
      'CRM & commerce sync',
      'Dedicated success manager',
    ],
  },

  faq: {
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know about the Sales Agent',
    faqs: [
      {
        question: 'Can the AI actually close sales, not just qualify?',
        answer: 'Yes. The Sales Agent is trained to close deals, not just gather information. It handles objections, creates urgency, presents offers, and secures commitments. For complex sales, it can also warm up leads and book meetings with your team.',
      },
      {
        question: 'How does it know my products and pricing?',
        answer: 'You upload your product catalog, pricing tiers, promotions, and sales scripts. The AI learns your offerings and can answer any product question, make recommendations, and apply the right pricing automatically.',
      },
      {
        question: 'Can it handle both inbound calls and outbound campaigns?',
        answer: 'Absolutely. The same AI handles incoming sales inquiries and can proactively call leads from your pipeline. You control the outbound cadence, scripts, and targeting criteria.',
      },
      {
        question: 'How does upselling work?',
        answer: 'The AI identifies upsell opportunities based on what the customer is buying, their history, and conversation signals. It presents relevant add-ons naturally—warranties, upgrades, bundles, complementary products—without being pushy.',
      },
      {
        question: 'Can it process payments on the call?',
        answer: 'Yes. The Sales Agent integrates with payment processors like Stripe to capture payment details securely and process orders in real-time. Customers can complete their purchase without leaving the call.',
      },
      {
        question: 'What happens with complex sales that need human touch?',
        answer: 'For high-value or complex deals, the AI can warm up the opportunity and seamlessly transfer to your sales team with full context. You set the rules for when to escalate.',
      },
    ],
  },

  cta: {
    title: 'Ready to Put Sales on Autopilot?',
    subtitle: 'See how the Sales Agent closes deals with your products, your pricing, your sales methodology.',
    primaryCta: 'Request Live Demo',
    secondaryCta: 'Talk to Sales',
  },
};
