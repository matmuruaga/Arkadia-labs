// src/data/solutions/sales-qualifier.ts
import { Solution } from './types';

export const salesQualifierSolution: Solution = {
  id: 'sales-qualifier',
  slug: 'sales-qualifier',
  category: 'inbound',
  translationKey: 'salesQualifier',

  seo: {
    title: 'Sales Qualifier AI Agent | Conversational Lead Qualification | Elevaite Labs',
    description: 'AI voice agent that qualifies leads through natural conversation. 5+ minutes of context-aware dialogue, real-time enrichment, and automated meeting booking. Zero hallucinations.',
    keywords: [
      'AI sales qualifier',
      'conversational AI',
      'voice AI agent',
      'lead qualification',
      'AI BDR',
      'sales automation',
      'meeting booking AI',
      'B2B sales AI',
      'lead enrichment',
      'sales intelligence',
    ],
  },

  hero: {
    badge: 'AI Qualification',
    title: 'Qualify Leads While You Sleep',
    subtitle: 'Conversations That Close Themselves',
    description: 'An AI voice agent that holds natural 5+ minute conversations, qualifies with precision, and books meetings automatically.',
    primaryCta: 'See It In Action',
    secondaryCta: 'Talk to Sales',
    heroVisualType: 'conversation-flow',
    trustBadges: [
      { icon: 'message-circle', label: 'Conversation Length', value: '5+ min' },
      { icon: 'target', label: 'Qualification Accuracy', value: '94%' },
      { icon: 'calendar', label: 'Meetings Booked', value: '3x more' },
    ],
  },

  problem: {
    headline: 'Your Best Leads Are Slipping Through the Cracks',
    description: "Inbound leads expect immediate, intelligent responses. But your team can't be everywhere at once—and generic chatbots just frustrate prospects.",
    painPoints: [
      {
        title: 'Slow Response Times',
        description: "Leads wait hours (or days) for a response. By then, they've already talked to your competitor who answered in 30 seconds.",
        icon: 'clock',
      },
      {
        title: 'Generic, Robotic Interactions',
        description: 'Chatbots ask the same scripted questions regardless of context. Prospects feel like a number, not a valued customer.',
        icon: 'bot',
      },
      {
        title: 'Inconsistent Qualification',
        description: 'Different reps qualify differently. Some let unqualified leads through, others dismiss real opportunities too quickly.',
        icon: 'shuffle',
      },
      {
        title: 'Missed After-Hours Opportunities',
        description: "40% of leads come outside business hours. Without 24/7 coverage, you're leaving money on the table.",
        icon: 'moon',
      },
    ],
    statistics: [
      { value: '78%', label: 'of buyers choose the first responder', source: 'Lead Response Management Study' },
      { value: '5 min', label: 'response time increases qualification 10x', source: 'InsideSales.com' },
      { value: '35-50%', label: 'of sales go to the first vendor to respond', source: 'Drift' },
    ],
  },

  howItWorks: {
    title: 'How the Sales Qualifier Works',
    subtitle: 'From unknown caller to qualified meeting in one conversation',
    steps: [
      {
        step: 1,
        title: 'Instant Lead Enrichment',
        description: "Before the conversation starts, our AI enriches the lead with company data, tech stack, recent news, and buying signals. It knows who it's talking to.",
        icon: 'search',
      },
      {
        step: 2,
        title: 'Natural Conversation',
        description: "The AI engages in genuine dialogue—asking smart questions, handling objections, and adapting to the prospect's tone and pace. No scripts, no awkward pauses.",
        icon: 'message-circle',
      },
      {
        step: 3,
        title: 'Deep Qualification',
        description: 'Using BANT, MEDDIC, or your custom framework, the AI qualifies budget, authority, need, and timeline naturally within the conversation.',
        icon: 'check-circle',
      },
      {
        step: 4,
        title: 'Meeting Booked & CRM Updated',
        description: 'Qualified leads get a meeting scheduled instantly. All conversation data, qualification notes, and next steps sync to your CRM automatically.',
        icon: 'calendar',
      },
    ],
  },

  features: {
    title: 'Built for Real Sales Conversations',
    subtitle: 'Every capability designed to convert conversations into pipeline',
    features: [
      {
        id: 'real-time-enrichment',
        icon: 'database',
        title: 'Real-Time Lead Enrichment',
        description: 'Company data, tech stack, funding, org structure, and buying signals—all available before and during the conversation.',
      },
      {
        id: 'context-memory',
        icon: 'brain',
        title: '5+ Minute Context Memory',
        description: 'Maintains full conversation context across extended dialogues. References earlier points naturally, never loses the thread.',
      },
      {
        id: 'objection-handling',
        icon: 'shield',
        title: 'Intelligent Objection Handling',
        description: 'Trained on thousands of sales conversations to handle common objections with empathy and precision.',
      },
      {
        id: 'qualification-frameworks',
        icon: 'clipboard-check',
        title: 'Custom Qualification Frameworks',
        description: 'Configure BANT, MEDDIC, GPCTBA/C&I, or your own qualification criteria. The AI adapts its questions accordingly.',
      },
      {
        id: 'calendar-integration',
        icon: 'calendar',
        title: 'Direct Calendar Booking',
        description: 'Checks real-time availability and books meetings directly. No back-and-forth emails, no scheduling links.',
      },
      {
        id: 'zero-hallucinations',
        icon: 'target',
        title: 'Zero Hallucination System',
        description: "Self-validating prompt architecture ensures the AI never makes up information. If it doesn't know, it admits it.",
      },
    ],
  },

  metrics: {
    title: 'Results That Speak for Themselves',
    subtitle: 'Measured impact from teams using the Sales Qualifier',
    metrics: [
      { value: '94%', label: 'Qualification Accuracy', description: 'Matches human SDR performance', trend: 'up' },
      { value: '3x', label: 'More Meetings Booked', description: 'Compared to form-based qualification', trend: 'up' },
      { value: '<30s', label: 'Average Response Time', description: 'Instant engagement, 24/7', trend: 'down' },
      { value: '67%', label: 'Cost Reduction', description: 'vs. hiring additional SDRs', trend: 'down' },
    ],
    comparisonTitle: 'Before vs After Sales Qualifier',
    before: [
      'Leads wait 4+ hours for response',
      'Generic chatbot frustrates prospects',
      'Inconsistent qualification across team',
      'No coverage outside business hours',
      'Manual meeting scheduling via email',
    ],
    after: [
      'Instant response, every time',
      'Natural, context-aware conversations',
      'Consistent qualification framework',
      '24/7 intelligent coverage',
      'Automated calendar booking',
    ],
  },

  scoreAnimation: {
    enabled: false,
  },

  platform: {
    badge: 'Live Dashboard',
    title: 'See Every Conversation in Real-Time',
    subtitle: 'Monitor qualification rates, conversation quality, and meeting bookings from a single dashboard.',
    kpis: [
      { icon: 'message-circle', label: 'Active Conversations', value: '12', trend: '+3 from yesterday', trendUp: true },
      { icon: 'target', label: 'Qualification Rate', value: '94%', trend: '+8% vs last week', trendUp: true },
      { icon: 'calendar', label: 'Meetings Today', value: '7', trend: '+2 from target', trendUp: true },
      { icon: 'clock', label: 'Avg Response Time', value: '0:28', trend: '5s faster', trendUp: true },
    ],
    mainChart: {
      title: 'Qualification Performance',
      subtitle: 'Daily qualified leads and meetings booked',
    },
    scoreCard: {
      title: 'Conversation Quality',
      score: 94,
      description: 'Excellent engagement',
    },
    activityFeed: [
      { icon: 'check-circle', text: 'Meeting booked: Acme Corp → John (AE)', time: '2 min ago', status: 'success' },
      { icon: 'message-circle', text: 'Qualifying: TechStart Inc (5:23 duration)', time: 'Now', status: 'processing' },
      { icon: 'calendar', text: 'Demo scheduled: GlobalTech for tomorrow 2PM', time: '8 min ago', status: 'success' },
      { icon: 'target', text: 'High-intent lead qualified: FinanceFlow', time: '15 min ago', status: 'success' },
    ],
  },

  useCases: {
    title: 'Perfect for High-Volume Inbound Teams',
    subtitle: 'See how different industries leverage AI qualification',
    useCases: [
      {
        id: 'saas-inbound',
        industry: 'SaaS',
        title: 'SaaS Inbound Qualification',
        description: 'Qualify trial signups and demo requests instantly. Understand their tech stack, current solutions, and pain points before the sales call.',
        results: [
          '90% reduction in response time',
          '3x increase in demo attendance',
          '40% higher ACV on qualified deals',
        ],
        icon: 'code',
        image: 'https://res.cloudinary.com/dntco2fcz/image/upload/v1773320588/sq-saas_copia_lehyvw.webp',
      },
      {
        id: 'financial-services',
        industry: 'Financial Services',
        title: 'Financial Advisory Qualification',
        description: 'Pre-qualify prospects for investment minimums, risk tolerance, and timeline. Route to the right advisor based on needs.',
        results: [
          '85% first-call close rate improvement',
          'Compliance-ready conversation logs',
          '24/7 prospect engagement',
        ],
        icon: 'dollar-sign',
        image: 'https://res.cloudinary.com/dntco2fcz/image/upload/v1773320588/sq-financial_copia_psy9el.webp',
      },
      {
        id: 'real-estate',
        industry: 'Real Estate',
        title: 'Real Estate Lead Qualification',
        description: 'Understand buyer preferences, budget range, timeline, and pre-approval status before the first showing.',
        results: [
          '50% fewer unqualified showings',
          'Instant response to listing inquiries',
          'Higher conversion on hot leads',
        ],
        icon: 'home',
        image: 'https://res.cloudinary.com/dntco2fcz/image/upload/v1773320588/sq-realestate_copia_l8hnwi.webp',
      },
    ],
  },

  integrations: {
    title: 'Connects to Your Entire Sales Stack',
    subtitle: 'Native integrations with the tools your team already uses',
    integrationIds: ['salesforce', 'hubspot', 'calendly', 'google_calendar', 'zoom', 'slack', 'zapier'],
  },

  testimonial: {
    quote: "The Sales Qualifier has become our secret weapon. It handles our inbound leads with the same care our best SDR would—but it never sleeps, never has a bad day, and qualifies with perfect consistency. Our demo show rate went from 60% to 89% because prospects are already engaged before the call.",
    author: 'Calixto Carbone',
    role: 'Founder & CEO',
    company: 'Verified Client',
  },

  pricing: {
    type: 'custom',
    includes: [
      'Unlimited conversations',
      'Real-time lead enrichment',
      'Custom qualification frameworks',
      'Calendar integration',
      'CRM sync (Salesforce, HubSpot)',
      'Dedicated success manager',
    ],
  },

  faq: {
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know about the Sales Qualifier',
    faqs: [
      {
        question: 'How natural do the conversations actually sound?',
        answer: "Our AI maintains natural, human-like dialogue for 5+ minutes without losing context. It adapts to the prospect's tone, handles interruptions gracefully, and never sounds scripted. Most prospects don't realize they're talking to AI until we tell them.",
      },
      {
        question: 'How does the AI avoid making things up?',
        answer: "We use a self-validating prompt architecture that cross-references every response against your knowledge base and product information. If the AI doesn't know something, it acknowledges this honestly rather than fabricating an answer.",
      },
      {
        question: 'Can I customize the qualification criteria?',
        answer: 'Absolutely. You can configure BANT, MEDDIC, GPCTBA/C&I, or create a completely custom qualification framework. The AI will naturally weave these questions into the conversation.',
      },
      {
        question: 'How does meeting booking work?',
        answer: "The AI has real-time access to your team's calendars. When a lead is qualified and interested, it offers available slots, handles time zone conversions, and books directly—no scheduling links needed.",
      },
      {
        question: 'What happens with unqualified leads?',
        answer: "Unqualified leads aren't discarded. They're tagged with disqualification reasons and can be added to nurture campaigns. The AI can also redirect them to appropriate resources or self-service options.",
      },
      {
        question: 'How quickly can we get started?',
        answer: 'Most teams are live within 2 weeks. We handle the integration setup, train the AI on your product and qualification criteria, and run a pilot period to fine-tune performance before full deployment.',
      },
    ],
  },

  cta: {
    title: 'Ready to Qualify Leads While You Sleep?',
    subtitle: 'See how the Sales Qualifier handles a real conversation—with your product, your qualification criteria, your voice.',
    primaryCta: 'Request Live Demo',
    secondaryCta: 'Talk to Sales',
  },
};
