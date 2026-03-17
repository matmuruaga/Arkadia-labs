// src/data/solutions/clone-your-business.ts
import { Solution } from './types';

export const cloneYourBusinessSolution: Solution = {
  id: 'clone-your-business',
  slug: 'clone-your-business',
  category: 'operations',
  translationKey: 'cloneYourBusiness',

  seo: {
    title: 'Clone Your Business with AI | Scale Without Hiring | Arkadia Labs',
    description: 'Deploy an AI-powered operational twin of your business. Your exact playbooks, scripts, and processes — running 24/7 without adding headcount. Book a demo and see it live.',
    keywords: [
      'AI business automation',
      'clone your business',
      'AI business twin',
      'scale without hiring',
      'business process automation',
      'AI workforce',
      'autonomous operations',
      'AI sales and ops',
      'AI agency automation',
      'B2B AI automation',
    ],
  },

  hero: {
    badge: 'Business Cloning',
    title: 'Your Business, Running 24/7',
    subtitle: 'Without Adding a Single Headcount',
    description: 'We take your exact playbooks, scripts, and processes — and deploy AI that runs them at scale. Same voice. Same methodology. 10x the output.',
    primaryCta: 'See My Clone in Action',
    primaryCtaAction: 'elevenlabs',
    secondaryCta: 'Book a Live Demo',
    heroVisualType: 'workflow-orchestrator',
    trustBadges: [
      { icon: 'trending-up', label: 'Average Output Increase', value: '10x' },
      { icon: 'clock', label: 'Operational Coverage', value: '24/7' },
      { icon: 'check-circle', label: 'Setup Time', value: '14 days' },
    ],
  },

  problem: {
    headline: 'Your Business Stops When Your Team Does',
    description: 'You built great processes. You trained great people. And now your growth is capped by how many hours those people can work. Every missed call, slow follow-up, and dropped task is revenue you\'re leaving on the table — not because of bad strategy, but because humans can only do so much.',
    painPoints: [
      {
        title: 'You\'re the Bottleneck',
        description: 'Your best processes live in your head or in your top performers. When they\'re out, things slow down. When demand spikes, you scramble to hire.',
        icon: 'users',
      },
      {
        title: 'Scaling Means Hiring',
        description: '2x the leads means 2x the SDRs. 2x the clients means 2x the ops team. Every growth milestone costs you another hire — with all the risk that brings.',
        icon: 'dollar-sign',
      },
      {
        title: 'Nights and Weekends Are Dead Zones',
        description: '40% of B2B buying decisions happen outside business hours. Your competitors respond. You don\'t. Those deals go somewhere else.',
        icon: 'moon',
      },
      {
        title: 'Inconsistency Kills Conversion',
        description: 'Monday morning your top rep is 40% conversion. Friday afternoon it\'s 12%. Tired teams, bad days, and turnover make your numbers unpredictable.',
        icon: 'shuffle',
      },
    ],
    statistics: [
      { value: '40%', label: 'of B2B deals are decided outside business hours', source: 'Forrester Research' },
      { value: '3-4x', label: 'cost of a new hire vs. training AI on existing processes', source: 'McKinsey' },
      { value: '67%', label: 'of sales go to the first vendor to respond', source: 'Salesforce' },
    ],
  },

  howItWorks: {
    title: 'How We Clone Your Business',
    subtitle: 'Four weeks from kickoff to a fully operational AI twin',
    steps: [
      {
        step: 1,
        title: 'Process Audit',
        description: 'We map every revenue-critical workflow: your sales scripts, follow-up sequences, qualification criteria, ops SOPs. What makes your business work.',
        icon: 'clipboard',
      },
      {
        step: 2,
        title: 'AI Training',
        description: 'We train AI agents on your exact voice, methodology, and knowledge base. Not generic AI — your AI. Tested against real scenarios before deployment.',
        icon: 'brain',
      },
      {
        step: 3,
        title: 'Integration & Deployment',
        description: 'Your AI clone connects to your existing stack: CRM, calendar, inbox, dialers. Deploys into your workflows — not alongside them.',
        icon: 'plug',
      },
      {
        step: 4,
        title: 'Run & Optimize',
        description: 'Goes live. Handles calls, follow-ups, qualification, and ops tasks 24/7. Real-time dashboard shows what\'s running, what\'s closing, what needs tuning.',
        icon: 'trending-up',
      },
    ],
  },

  features: {
    title: 'Every Layer of Your Business, Automated',
    subtitle: 'Not one agent. A full operational system trained on your business.',
    features: [
      {
        id: 'process-cloning',
        icon: 'copy',
        title: 'Process Cloning Engine',
        description: 'We extract your top-performing playbooks — sales, onboarding, support, ops — and encode them into AI agents that execute with consistency.',
      },
      {
        id: 'multi-agent',
        icon: 'users',
        title: 'Multi-Agent Workforce',
        description: 'One AI for qualifying leads. Another for follow-ups. Another for ops coordination. Each trained for its role, working as a unit.',
      },
      {
        id: 'voice-identity',
        icon: 'mic',
        title: 'Your Voice, Your Brand',
        description: 'The AI sounds and acts like your team — not like a bot. Custom persona, tone, and language trained specifically for your market and buyers.',
      },
      {
        id: 'crm-sync',
        icon: 'database',
        title: 'Automatic CRM Sync',
        description: 'Every interaction is logged, tagged, and synced. No manual data entry. Your CRM stays current with zero human effort.',
      },
      {
        id: 'real-time-dashboard',
        icon: 'activity',
        title: 'Real-Time Operations Dashboard',
        description: 'See every call, follow-up, and task your AI clone is executing — live. Intervene or adjust at any point.',
      },
      {
        id: 'continuous-learning',
        icon: 'refresh-cw',
        title: 'Continuous Learning Loop',
        description: 'The AI improves from every interaction. What\'s working gets reinforced. What\'s not gets flagged for your review. The clone gets smarter every week.',
      },
    ],
  },

  metrics: {
    title: 'What Happens When You Clone Your Business',
    subtitle: 'Real numbers from clients who made the switch',
    metrics: [
      { value: '10x', label: 'Output Without New Hires', description: 'Scale operations without scaling headcount', trend: 'up' },
      { value: '6x', label: 'Average Client ROI', description: 'Measured across Arkadia Labs deployments', trend: 'up' },
      { value: '14 days', label: 'Time to First Deployment', description: 'From kickoff call to live AI clone', trend: 'up' },
      { value: '80%', label: 'Cost Reduction vs. Hiring', description: 'Compared to equivalent human headcount', trend: 'down' },
    ],
    comparisonTitle: 'Before vs After Cloning Your Business',
    before: [
      'Growth gated by headcount',
      'Leads going cold after hours',
      'Inconsistent team performance',
      'Manual CRM data entry',
      'SOPs living in people\'s heads',
      'Every bottleneck = new hire',
    ],
    after: [
      '10x output with current team size',
      '24/7 lead engagement and follow-up',
      'Consistent execution at scale',
      'Automatic CRM sync on every touchpoint',
      'SOPs encoded and running autonomously',
      'Growth without headcount scaling',
    ],
  },

  platform: {
    badge: 'Ops Command Center',
    title: 'Your Business Clone, Live and Visible',
    subtitle: 'Monitor every agent, every conversation, every outcome in real time.',
    kpis: [
      { icon: 'activity', label: 'Active AI Agents', value: '7', trend: 'All running', trendUp: true },
      { icon: 'phone', label: 'Calls Handled Today', value: '183', trend: '+41% vs. last week', trendUp: true },
      { icon: 'check-circle', label: 'Meetings Booked', value: '24', trend: '3 in the last hour', trendUp: true },
      { icon: 'trending-up', label: 'Pipeline Generated', value: '$48,200', trend: '+22% this month', trendUp: true },
    ],
    mainChart: {
      title: 'Agent Activity',
      subtitle: 'Hourly output across all deployed agents',
    },
    scoreCard: {
      title: 'Clone Efficiency',
      score: 92,
      description: 'vs. 64% industry average',
    },
    activityFeed: [
      { icon: 'check-circle', text: 'Lead qualified → Meeting booked: Acme Corp ($15k opp)', time: '2 min ago', status: 'success' },
      { icon: 'phone', text: 'Follow-up sequence completed: 12 leads re-engaged', time: '8 min ago', status: 'success' },
      { icon: 'activity', text: 'Ops agent: onboarding workflow completed for Client #47', time: '15 min ago', status: 'success' },
      { icon: 'trending-up', text: 'Sales agent closed deal: $4,200 contract confirmed', time: '22 min ago', status: 'success' },
    ],
  },

  useCases: {
    title: 'Who Clones Their Business With Us',
    subtitle: 'Three types of teams that unlock scale without headcount',
    useCases: [
      {
        id: 'lead-gen-agencies',
        industry: 'Lead Generation Agencies',
        title: 'Deliver More Client Results Without More Staff',
        description: 'Your agency runs on playbooks. We clone them into AI agents that execute at 10x scale — so you can onboard more clients without burning out your team.',
        results: [
          '10x lead processing capacity',
          'Consistent delivery across all client accounts',
          'New client onboarding in days, not weeks',
        ],
        icon: 'trending-up',
        image: 'https://res.cloudinary.com/dntco2fcz/image/upload/v1773320586/sa-insurance_copia_sgqzrz.webp',
      },
      {
        id: 'b2b-saas',
        industry: 'B2B SaaS (50–500 employees)',
        title: 'Scale Your Sales Motion Without Scaling Your SDR Team',
        description: 'Your ICP is defined. Your pitch is sharp. The problem is coverage. AI SDRs and ops agents run your outbound and follow-up 24/7 — so your team focuses on closing, not chasing.',
        results: [
          '30% lift in meetings booked',
          'Zero leads dropped after hours',
          'Onboarding at 4x current capacity',
        ],
        icon: 'zap',
        image: 'https://res.cloudinary.com/dntco2fcz/image/upload/v1773320586/sa-telecom_copia_nvpzqe.webp',
      },
      {
        id: 'service-businesses',
        industry: 'Service Businesses',
        title: 'Your Best People\'s Playbook, Running Around the Clock',
        description: 'You can\'t clone your top performer — until now. We encode their scripts, frameworks, and instincts into an AI agent that runs 24/7 with no sick days, no bad days, no resignation.',
        results: [
          'Best performer methodology at scale',
          '24/7 client touchpoints maintained',
          '60% reduction in ops overhead',
        ],
        icon: 'users',
        image: 'https://res.cloudinary.com/dntco2fcz/image/upload/v1773320586/sa-homeservices_copia_hpah7q.webp',
      },
    ],
  },

  integrations: {
    title: 'Plugs Into Your Existing Stack',
    subtitle: 'No rip-and-replace. Your AI clone works with the tools you already use.',
    integrationIds: ['hubspot', 'salesforce', 'slack', 'zapier', 'stripe', 'calendly', 'notion'],
  },

  testimonial: {
    quote: "We had 3 SDRs handling 200 leads per week. After deploying our AI clone, the same 3 people oversee 2,000. Our cost per meeting booked dropped by 74% in 60 days. I wish we had done this two years ago.",
    author: 'Marco Donadio',
    role: 'Head of Growth',
    company: 'Goodnite Systems',
  },

  pricing: {
    type: 'custom',
    includes: [
      'Full process audit and documentation',
      'Custom AI agent training on your playbooks',
      'Multi-agent deployment (sales + ops)',
      'CRM and calendar integration',
      'Real-time operations dashboard',
      'Dedicated implementation manager',
      'Monthly optimization reviews',
    ],
  },

  faq: {
    title: 'Straight Answers',
    subtitle: 'No jargon. No hype.',
    faqs: [
      {
        question: 'How is this different from just buying ChatGPT or a generic AI tool?',
        answer: 'Generic AI tools are trained on everything and specialized on nothing. Your clone is trained exclusively on your business — your scripts, your ICP, your objection handlers, your processes. The output sounds and acts like you, not like a robot.',
      },
      {
        question: 'What does the process look like and how long does it take?',
        answer: 'We start with a 2-hour process audit call where we map your revenue-critical workflows. From there, training takes 1–2 weeks. Full deployment and go-live is typically within 14 days of kickoff. You\'re live before the month is out.',
      },
      {
        question: 'Do I need to change my CRM or any existing tools?',
        answer: 'No. We build the AI clone to integrate with what you already use. HubSpot, Salesforce, Slack, your dialer — we connect to it. You keep your stack. We make it smarter.',
      },
      {
        question: 'What if my process changes?',
        answer: 'You update us, we retrain the agents. Our monthly optimization reviews are specifically for this. Processes evolve — your AI clone evolves with them.',
      },
      {
        question: 'How do you ensure quality? What if the AI says something wrong?',
        answer: 'Every agent runs within defined guardrails based on your playbook. Before go-live, you test and sign off on the AI\'s behavior across 50+ real scenarios. You control what it can and can\'t say. And you have full visibility through the dashboard at all times.',
      },
      {
        question: 'Is this right for my business size?',
        answer: 'The sweet spot is 10–500 employees with defined processes that need to scale. If you\'re too early to have documented playbooks, we help you build them first. If you\'re enterprise-scale, we scope accordingly.',
      },
    ],
  },

  cta: {
    title: 'Your Business Doesn\'t Have to Sleep',
    subtitle: 'See what your AI clone would look like — live demo, your industry, your use case.',
    primaryCta: 'Book a 30-Min Demo',
    secondaryCta: 'See Pricing',
  },
};
