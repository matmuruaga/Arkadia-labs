// src/data/solutions/virtual-receptionist.ts
import { Solution } from './types';

export const virtualReceptionistSolution: Solution = {
  id: 'virtual-receptionist',
  slug: 'virtual-receptionist',
  category: 'inbound',
  translationKey: 'virtualReceptionist',

  seo: {
    title: 'AI Virtual Receptionist | 24/7 Call Handling & Guest Experience | Elevaite Labs',
    description: 'AI-powered virtual receptionist that handles calls, manages inquiries, and delivers exceptional guest experiences 24/7. Never miss a call, never lose a customer.',
    keywords: [
      'AI virtual receptionist',
      'automated receptionist',
      '24/7 call answering',
      'AI phone answering',
      'virtual front desk',
      'hospitality AI',
      'call handling automation',
      'guest experience AI',
      'after hours answering',
      'intelligent call routing',
    ],
  },

  hero: {
    badge: 'Customer Service',
    title: 'Your 24/7 AI Receptionist That Never Misses a Call',
    subtitle: 'Always Available, Always Professional',
    description: 'An AI voice agent that answers calls, handles inquiries, takes messages, and routes conversations—with the warmth and professionalism of your best front desk staff. Available around the clock.',
    primaryCta: 'Hear It Live',
    primaryCtaAction: 'elevenlabs',
    secondaryCta: 'Talk to Sales',
    trustBadges: [
      { icon: 'phone', label: 'Calls Handled', value: '99.9%' },
      { icon: 'clock', label: 'Availability', value: '24/7' },
      { icon: 'star', label: 'Guest Satisfaction', value: '+11%' },
    ],
  },

  problem: {
    headline: 'Every Missed Call Is a Missed Opportunity',
    description: 'Your phone rings at 2 AM. A potential customer calls during lunch rush. Weekend inquiries go to voicemail. Without 24/7 coverage, you\'re losing business to competitors who answer.',
    painPoints: [
      {
        title: 'After-Hours Gaps',
        description: '62% of calls happen outside business hours. Voicemail kills conversions—customers hang up and call your competitor instead.',
        icon: 'moon',
      },
      {
        title: 'Overwhelmed Front Desk',
        description: 'Your receptionist juggles walk-ins, emails, and phone calls. Peak hours mean long hold times and frustrated callers.',
        icon: 'phone-missed',
      },
      {
        title: 'Inconsistent Experience',
        description: 'Different staff, different service levels. New hires take months to learn your processes. Sick days mean dropped balls.',
        icon: 'shuffle',
      },
      {
        title: 'High Staffing Costs',
        description: 'Full-time receptionists cost $35,000-$50,000/year. 24/7 coverage requires multiple hires or expensive answering services.',
        icon: 'dollar-sign',
      },
    ],
    statistics: [
      { value: '62%', label: 'of calls occur outside business hours', source: 'RingCentral Research' },
      { value: '85%', label: 'of callers won\'t call back after voicemail', source: 'Forbes Business' },
      { value: '67%', label: 'of customers hang up when they can\'t reach a person', source: 'Zendesk Report' },
    ],
  },

  howItWorks: {
    title: 'How the Virtual Receptionist Works',
    subtitle: 'From incoming call to resolved inquiry in seconds',
    steps: [
      {
        step: 1,
        title: 'Answer Every Call Instantly',
        description: 'No rings, no hold music. The AI answers immediately with a warm, professional greeting customized to your brand.',
        icon: 'phone',
      },
      {
        step: 2,
        title: 'Understand & Respond Naturally',
        description: 'Handles common questions, provides information, and engages in natural conversation—just like your best receptionist would.',
        icon: 'message-circle',
      },
      {
        step: 3,
        title: 'Route or Resolve',
        description: 'Either resolves the inquiry directly or intelligently routes to the right person with full context. No cold transfers.',
        icon: 'git-branch',
      },
      {
        step: 4,
        title: 'Log & Follow Up',
        description: 'Every interaction is logged, transcribed, and synced to your systems. Automated follow-ups ensure nothing falls through the cracks.',
        icon: 'check-circle',
      },
    ],
  },

  features: {
    title: 'Built for Exceptional Guest Experience',
    subtitle: 'Every feature designed to make callers feel valued',
    features: [
      {
        id: 'instant-answer',
        icon: 'phone',
        title: 'Instant Call Answering',
        description: 'Zero wait time. Every call answered on the first ring with a consistent, professional greeting 24/7/365.',
      },
      {
        id: 'natural-conversation',
        icon: 'message-circle',
        title: 'Natural Conversation Flow',
        description: 'No robotic scripts. The AI maintains natural dialogue, handles interruptions, and adapts to caller emotions.',
      },
      {
        id: 'smart-routing',
        icon: 'git-branch',
        title: 'Intelligent Call Routing',
        description: 'Routes calls to the right department or person based on inquiry type, urgency, and availability.',
      },
      {
        id: 'multilingual',
        icon: 'globe',
        title: 'Multilingual Support',
        description: 'Speaks multiple languages fluently. Automatically detects caller language and responds accordingly.',
      },
      {
        id: 'appointment-booking',
        icon: 'calendar',
        title: 'Appointment Scheduling',
        description: 'Books appointments, manages reservations, and syncs with your calendar systems in real-time.',
      },
      {
        id: 'crm-integration',
        icon: 'database',
        title: 'CRM & System Integration',
        description: 'Connects with your existing tools. Logs calls, updates records, and triggers workflows automatically.',
      },
    ],
  },

  metrics: {
    title: 'Real Results, Real Impact',
    subtitle: 'Measured outcomes from businesses using the Virtual Receptionist',
    metrics: [
      { value: '99.9%', label: 'Calls Answered', description: 'Never miss another opportunity', trend: 'up' },
      { value: '+11%', label: 'Guest Satisfaction', description: 'Higher CSAT scores across the board', trend: 'up' },
      { value: '78%', label: 'More Reviews', description: 'Increased positive review generation', trend: 'up' },
      { value: '6x', label: 'ROI in 12 Months', description: 'Proven return on investment', trend: 'up' },
    ],
    comparisonTitle: 'Before vs After Virtual Receptionist',
    before: [
      'Missed after-hours calls',
      'Long hold times during peak hours',
      'Inconsistent caller experience',
      'Limited language support',
      'Manual message taking and routing',
    ],
    after: [
      '24/7 instant call answering',
      'Zero wait time, every call',
      'Consistent, professional service',
      'Multilingual conversations',
      'Automated logging and follow-up',
    ],
  },

  scoreAnimation: {
    enabled: false,
  },

  platform: {
    badge: 'Reception Dashboard',
    title: 'See Every Interaction in Real-Time',
    subtitle: 'Monitor call volumes, resolution rates, and guest satisfaction from a single dashboard.',
    kpis: [
      { icon: 'phone', label: 'Calls Today', value: '47', trend: '+12 from yesterday', trendUp: true },
      { icon: 'check-circle', label: 'Resolved First Call', value: '89%', trend: '+5% vs last week', trendUp: true },
      { icon: 'clock', label: 'Avg Handle Time', value: '2:34', trend: '18s faster', trendUp: true },
      { icon: 'star', label: 'Satisfaction Score', value: '4.8', trend: '+0.3 points', trendUp: true },
    ],
    mainChart: {
      title: 'Call Volume & Resolution',
      subtitle: 'Hourly breakdown of incoming calls and outcomes',
    },
    scoreCard: {
      title: 'First Call Resolution',
      score: 89,
      description: 'Industry-leading performance',
    },
    activityFeed: [
      { icon: 'check-circle', text: 'Reservation confirmed: Room 204, Dec 28-31', time: '2 min ago', status: 'success' },
      { icon: 'phone', text: 'Call handled: Check-in inquiry resolved', time: '5 min ago', status: 'success' },
      { icon: 'message-circle', text: 'Message taken for maintenance team', time: '8 min ago', status: 'processing' },
      { icon: 'calendar', text: 'Appointment booked: Property viewing tomorrow 3PM', time: '12 min ago', status: 'success' },
    ],
    floatingBadge1: { title: 'Call Resolved ✓', subtitle: 'Guest inquiry handled' },
    floatingBadge2: { title: '+12 calls today', subtitle: '100% answered' },
  },

  useCases: {
    title: 'Perfect for Guest-Centric Businesses',
    subtitle: 'See how different industries deliver exceptional experiences with AI reception',
    useCases: [
      {
        id: 'hospitality',
        industry: 'Hospitality',
        title: 'Hotels & Vacation Rentals',
        description: 'Handle guest inquiries, manage reservations, and provide 24/7 concierge-level service without expanding staff.',
        results: [
          '11% increase in guest satisfaction',
          '78% more positive reviews',
          '24/7 guest support coverage',
        ],
        icon: 'building',
        caseStudySlug: 'goodnite',
      },
      {
        id: 'healthcare',
        industry: 'Healthcare',
        title: 'Medical & Dental Practices',
        description: 'Schedule appointments, handle prescription refill requests, and triage urgent calls—HIPAA compliant.',
        results: [
          '40% reduction in no-shows',
          '90% of calls resolved without staff',
          'After-hours urgent care routing',
        ],
        icon: 'heart-pulse',
      },
      {
        id: 'professional-services',
        industry: 'Professional Services',
        title: 'Law Firms & Consultancies',
        description: 'Screen potential clients, schedule consultations, and ensure every inquiry receives a professional response.',
        results: [
          '35% more qualified consultations',
          'Zero missed client calls',
          'Improved client intake process',
        ],
        icon: 'briefcase',
      },
    ],
  },

  integrations: {
    title: 'Connects to Your Business Systems',
    subtitle: 'Native integrations with the tools you already use',
    integrationIds: ['google_calendar', 'microsoft_outlook', 'salesforce', 'hubspot', 'slack', 'twilio', 'zapier'],
  },

  testimonial: {
    quote: "The AI receptionist from Elevaite Labs has completely transformed our guest experience. We went from missing after-hours calls to providing 24/7 concierge-level service. Our guest satisfaction increased 11% and we're generating 78% more positive reviews. The 6x ROI in the first year made this an easy decision.",
    author: 'Calixto Carbone',
    role: 'Founder & CEO',
    company: 'ELSA Consulting',
  },

  pricing: {
    type: 'custom',
    includes: [
      'Unlimited call handling',
      '24/7/365 availability',
      'Multilingual support',
      'CRM & calendar integration',
      'Custom voice & scripting',
      'Dedicated success manager',
    ],
  },

  faq: {
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know about the Virtual Receptionist',
    faqs: [
      {
        question: 'Does it sound like a real person?',
        answer: 'Yes. Our AI uses advanced voice synthesis to deliver natural, warm conversations. Most callers don\'t realize they\'re speaking with AI. You can customize the voice, tone, and personality to match your brand.',
      },
      {
        question: 'Can it handle complex inquiries?',
        answer: 'The AI handles most common inquiries independently. For complex situations, it seamlessly transfers to a human with full context—the caller never has to repeat themselves.',
      },
      {
        question: 'How does it learn my business?',
        answer: 'We train the AI on your specific business: services, policies, FAQs, and processes. It can answer questions about your business as accurately as a trained employee.',
      },
      {
        question: 'What languages does it support?',
        answer: 'The Virtual Receptionist supports 20+ languages including English, Spanish, French, German, and Mandarin. It automatically detects the caller\'s language and responds accordingly.',
      },
      {
        question: 'Can it book appointments?',
        answer: 'Yes. The AI integrates with Google Calendar, Outlook, Calendly, and other scheduling systems to book appointments in real-time, checking availability and sending confirmations.',
      },
      {
        question: 'What happens during an outage?',
        answer: 'Our infrastructure runs on redundant systems with 99.99% uptime. In the rare event of an issue, calls can be configured to fail over to your backup number or voicemail.',
      },
    ],
  },

  cta: {
    title: 'Ready to Never Miss a Call Again?',
    subtitle: 'See how the Virtual Receptionist handles your calls—with your business info, your brand voice, your processes.',
    primaryCta: 'Request Live Demo',
    secondaryCta: 'Talk to Sales',
  },
};
