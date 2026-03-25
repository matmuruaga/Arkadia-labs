// src/data/solutions/social-manager.ts
import { Solution } from './types';

export const socialManagerSolution: Solution = {
  id: 'social-manager',
  slug: 'social-manager',
  category: 'marketing',
  translationKey: 'socialManager',

  seo: {
    title: 'AI Social Media Manager | Monitor, Engage & Grow',
    description: 'AI-powered social media manager that auto-responds to comments and DMs, monitors brand mentions, analyzes performance, and manages community engagement 24/7.',
    keywords: [
      'AI social media manager',
      'social media automation',
      'community management AI',
      'brand monitoring',
      'social listening',
      'reputation management AI',
      'social media analytics',
      'competitor benchmarking',
      'influencer identification',
      'crisis detection social media',
      'social media management tool',
      'automated social media responses',
      'brand mention tracking',
    ],
  },

  hero: {
    badge: 'AI Social',
    title: 'Own Every Conversation Online',
    subtitle: 'Monitor. Engage. Protect. Grow.',
    description: 'Responds to comments and DMs in seconds, monitors mentions, and alerts you to reputation risks—24/7.',
    primaryCta: 'See It in Action',
    secondaryCta: 'Talk to Sales',
    heroVisualType: 'social-radar',
    trustBadges: [
      { icon: 'message-circle', label: 'Response Time', value: '<2 min' },
      { icon: 'eye', label: 'Mentions Monitored', value: '24/7' },
      { icon: 'trending-up', label: 'Engagement Rate', value: '+73%' },
    ],
  },

  problem: {
    headline: 'Your Social Media Is a Full-Time Job Your Team Can\'t Keep Up With',
    description: 'Social media never stops. Comments pile up, DMs go unanswered, brand mentions go unnoticed, and your team is too stretched to keep pace—while your reputation and engagement quietly suffer.',
    painPoints: [
      {
        title: 'Unanswered Conversations',
        description: '71% of consumers who get a quick brand response on social media are more likely to recommend that brand. Yet most businesses respond to less than 25% of comments within 24 hours.',
        icon: 'message-circle',
      },
      {
        title: 'Brand Mentions Slip Through',
        description: 'Customers tag, mention, and review your brand across dozens of platforms. Without systematic monitoring, negative sentiment spreads unaddressed and positive moments go unacknowledged.',
        icon: 'bell',
      },
      {
        title: 'No Performance Visibility',
        description: 'Platform-native analytics are siloed and superficial. You have no unified view of what\'s working, which content resonates, or how you stack up against competitors.',
        icon: 'bar-chart',
      },
      {
        title: 'Crisis Escalation Risk',
        description: 'A single viral complaint or negative post can snowball into a PR crisis within hours. Manual monitoring means you\'re always reacting too late, when the damage is already done.',
        icon: 'alert-triangle',
      },
    ],
    statistics: [
      { value: '71%', label: 'of consumers recommend brands that respond quickly on social media', source: 'Sprout Social Index' },
      { value: '79%', label: 'of social media complaints go unanswered within 24 hours', source: 'HubSpot Research' },
      { value: '3hrs', label: 'average time to detect a social media crisis manually', source: 'Brandwatch Report' },
    ],
  },

  howItWorks: {
    title: 'How the Social Manager Works',
    subtitle: 'From brand monitoring to community growth—fully automated',
    steps: [
      {
        step: 1,
        title: 'Listen Across All Channels',
        description: 'Continuously monitors mentions, comments, DMs, hashtags, and reviews across every social platform and the broader web. Nothing about your brand escapes notice.',
        icon: 'eye',
      },
      {
        step: 2,
        title: 'Engage With Context',
        description: 'Auto-responds to comments and DMs using brand-aligned tone, conversation history, and product knowledge. Escalates sensitive inquiries to your human team instantly.',
        icon: 'message-circle',
      },
      {
        step: 3,
        title: 'Analyze & Benchmark',
        description: 'Tracks performance metrics across all platforms, benchmarks against competitors, identifies top-performing content patterns, and surfaces actionable insights weekly.',
        icon: 'bar-chart',
      },
      {
        step: 4,
        title: 'Alert & Strategize',
        description: 'Sends real-time crisis alerts, trending topic notifications, and influencer opportunity flags. Delivers strategic recommendations to grow your audience and protect your brand.',
        icon: 'bell',
      },
    ],
  },

  features: {
    title: 'Your Complete Social Media Command Center',
    subtitle: 'Every tool needed to manage, protect, and grow your social presence',
    features: [
      {
        id: 'comment-dm-automation',
        icon: 'message-circle',
        title: 'Smart Comment & DM Automation',
        description: 'Responds to comments and DMs within minutes using context-aware replies. Understands sentiment, conversation history, and brand guidelines to reply like a seasoned community manager.',
      },
      {
        id: 'brand-mention-monitoring',
        icon: 'eye',
        title: 'Brand Mention Monitoring',
        description: 'Tracks every mention of your brand, products, and key terms across social platforms, news sites, forums, and review sites. Categorizes by sentiment and urgency automatically.',
      },
      {
        id: 'performance-analytics',
        icon: 'bar-chart',
        title: 'Unified Performance Analytics',
        description: 'Aggregates metrics from all platforms into a single dashboard. Track follower growth, engagement rates, reach, share of voice, and ROI trends across channels.',
      },
      {
        id: 'competitor-benchmarking',
        icon: 'target',
        title: 'Competitor Social Benchmarking',
        description: 'Monitors competitor posting frequency, engagement rates, top content, hashtag strategies, and audience growth. Know exactly where you stand and where to attack.',
      },
      {
        id: 'crisis-detection',
        icon: 'shield',
        title: 'Crisis Detection & Alerts',
        description: 'Detects unusual spikes in negative sentiment, viral complaints, or coordinated attacks within minutes. Sends immediate alerts with context so you can respond before it escalates.',
      },
      {
        id: 'influencer-tracking',
        icon: 'star',
        title: 'Influencer Identification & Tracking',
        description: 'Identifies relevant influencers who mention your brand or operate in your niche. Tracks engagement quality, audience alignment, and outreach history in one place.',
      },
    ],
  },

  metrics: {
    title: 'Social Media Results That Move the Needle',
    subtitle: 'Measured outcomes from brands using the Social Manager',
    metrics: [
      { value: '+73%', label: 'Engagement Rate', description: 'Average increase across managed accounts', trend: 'up' },
      { value: '<2 min', label: 'Response Time', description: 'Average comment and DM response time', trend: 'up' },
      { value: '98%', label: 'Mention Coverage', description: 'Brand mentions caught and categorized', trend: 'up' },
      { value: '15hrs', label: 'Time Saved Weekly', description: 'Per community manager per week', trend: 'up' },
    ],
    comparisonTitle: 'Before vs After Social Manager',
    before: [
      'DMs and comments left unanswered for hours',
      'Brand crises detected too late',
      'No clear picture of social ROI',
      'Competitor strategies unknown',
      'Reactive community management',
    ],
    after: [
      'Every conversation answered in minutes',
      'Crises flagged before they escalate',
      'Real-time unified performance dashboard',
      'Full competitor social intelligence',
      'Proactive community growth strategy',
    ],
  },

  scoreAnimation: {
    enabled: false,
  },

  platform: {
    badge: 'Social Command Center',
    title: 'Total Control of Your Social Presence',
    subtitle: 'Monitor conversations, track brand health, and measure growth from a single dashboard.',
    kpis: [
      { icon: 'message-circle', label: 'Replies Sent', value: '284', trend: 'This week', trendUp: true },
      { icon: 'eye', label: 'Mentions Tracked', value: '1,847', trend: '+23% vs last week', trendUp: true },
      { icon: 'trending-up', label: 'Avg Response Time', value: '1.8 min', trend: 'Down from 4.2 hrs', trendUp: true },
      { icon: 'heart', label: 'Sentiment Score', value: '87%', trend: '+12% this month', trendUp: true },
    ],
    mainChart: {
      title: 'Brand Sentiment & Engagement',
      subtitle: 'Mentions, sentiment, and response performance over time',
    },
    scoreCard: {
      title: 'Community Health Score',
      score: 87,
      description: 'Above industry average',
    },
    activityFeed: [
      { icon: 'check-circle', text: 'DM replied: Customer inquiry resolved in 90 seconds', time: '3 min ago', status: 'success' },
      { icon: 'alert-triangle', text: 'Crisis alert: Negative sentiment spike detected on X — review flagged', time: '18 min ago', status: 'pending' },
      { icon: 'star', text: 'Influencer identified: 45K followers, 6.2% engagement — match score 94%', time: '1 hr ago', status: 'success' },
      { icon: 'bar-chart', text: 'Weekly report ready: Engagement up 18% vs competitors', time: '3 hr ago', status: 'success' },
    ],
    floatingBadge1: { title: 'Comment Replied', subtitle: 'Response in 2 min' },
    floatingBadge2: { title: '+73% Engagement', subtitle: 'vs last month' },
    secondaryTable: {
      title: 'Platform Performance',
      subtitle: 'Last 7 days',
      rows: [
        { id: '1', name: 'Instagram', detail: '12.4K followers · 8.1% eng.', value: '+18%', status: 'success' },
        { id: '2', name: 'TikTok', detail: '28K followers · 11.3% eng.', value: '+34%', status: 'success' },
        { id: '3', name: 'LinkedIn', detail: '5.2K followers · 4.7% eng.', value: '+9%', status: 'info' },
        { id: '4', name: 'X / Twitter', detail: '8.9K followers · 2.1% eng.', value: '-3%', status: 'warning' },
      ],
    },
    secondaryChartTitle: 'Engagement Trend',
  },

  useCases: {
    title: 'Social Management Built for Every Business',
    subtitle: 'See how different brands protect and grow their social presence with AI',
    useCases: [
      {
        id: 'retail-ecommerce',
        industry: 'Retail & E-commerce',
        title: 'Community Engagement at Scale',
        description: 'Handle thousands of daily comments, product questions, and order complaints across Instagram, TikTok, and Facebook without adding headcount. Every customer feels heard.',
        results: [
          '73% increase in community engagement',
          '4x faster response to product inquiries',
          '91% reduction in unanswered comments',
        ],
        icon: 'shopping-cart',
        image: 'https://res.cloudinary.com/dntco2fcz/image/upload/v1773320587/sm-retail_copia_halxdv.webp',
      },
      {
        id: 'brands-agencies',
        industry: 'Marketing Agencies',
        title: 'Multi-Brand Social Management',
        description: 'Manage social presence and reputation for multiple clients simultaneously. Each brand gets dedicated monitoring, tailored response templates, and individual performance reports.',
        results: [
          'Manage 8x more client accounts',
          'Unified reporting across all brands',
          '60% reduction in community management costs',
        ],
        icon: 'briefcase',
        image: 'https://res.cloudinary.com/dntco2fcz/image/upload/v1773320587/sm-agencies_copia_tu9ecs.webp',
      },
      {
        id: 'hospitality-restaurants',
        industry: 'Hospitality & F&B',
        title: 'Reputation Protection & Guest Relations',
        description: 'Respond to reviews and mentions across Google, TripAdvisor, Instagram, and Facebook in real time. Convert unhappy guests into brand advocates with fast, empathetic responses.',
        results: [
          'Crisis contained within 15 minutes on average',
          '40% improvement in review sentiment scores',
          '2.3x more positive word-of-mouth mentions',
        ],
        icon: 'utensils',
        image: 'https://res.cloudinary.com/dntco2fcz/image/upload/v1773320587/sm-hospitality_copia_rfjwik.webp',
      },
    ],
  },

  integrations: {
    title: 'Connects to Every Platform You Manage',
    subtitle: 'Native integrations with all major social platforms and management tools',
    integrationIds: ['instagram', 'tiktok', 'facebook', 'x_twitter', 'linkedin', 'hootsuite', 'slack'],
  },

  testimonial: {
    quote: "The Social Manager transformed how we handle our community. We used to respond to maybe 30% of comments—now every single message gets a thoughtful reply within two minutes. Our engagement rate went up 73% in the first three months, and we caught a potential PR issue before it became a crisis. It pays for itself every week.",
    author: 'Calixto Carbone',
    role: 'Founder & CEO',
    company: 'ELSA Consulting',
  },

  pricing: {
    type: 'custom',
    includes: [
      'All social platforms monitored',
      'Unlimited comment and DM automation',
      'Real-time brand mention tracking',
      'Competitor benchmarking reports',
      'Crisis detection and instant alerts',
      'Dedicated success manager',
    ],
  },

  faq: {
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know about the Social Manager',
    faqs: [
      {
        question: 'How does the AI know what to say in replies?',
        answer: 'During onboarding, we train the AI on your brand voice, tone guidelines, product knowledge, FAQs, and past conversations. It generates contextually appropriate replies and flags anything outside its confidence threshold for human review. You maintain full approval control.',
      },
      {
        question: 'Which platforms does it monitor?',
        answer: 'Instagram, TikTok, Facebook, X (Twitter), LinkedIn, YouTube, Pinterest, Reddit, Google Reviews, and Trustpilot. It also monitors news sites and industry forums for broader brand mentions.',
      },
      {
        question: 'What happens when a crisis is detected?',
        answer: 'The AI sends an immediate alert to your designated team members via Slack, email, or SMS. The alert includes the content, sentiment analysis, current reach, and suggested response options so you can act within minutes rather than hours.',
      },
      {
        question: 'Can I review and edit AI responses before they send?',
        answer: 'Yes. You can run in full-auto mode, review-before-send mode, or a hybrid where certain message types (complaints, sensitive topics) always require approval while routine inquiries auto-respond. The workflow is completely customizable.',
      },
      {
        question: 'How does competitor benchmarking work?',
        answer: 'You specify up to 10 competitors. The AI tracks their posting frequency, engagement rates, follower growth, top-performing content formats, hashtag strategies, and response rates. Weekly benchmark reports show exactly how you compare and where to capitalize.',
      },
      {
        question: 'Does it handle multiple languages?',
        answer: 'Yes. The Social Manager supports multilingual communities. It detects the language of incoming messages and responds in the same language. Currently supports English, Spanish, Portuguese, French, German, Italian, and more.',
      },
    ],
  },

  cta: {
    title: 'Ready to Never Miss a Conversation Again?',
    subtitle: 'See how the Social Manager protects your brand reputation and grows your community—automatically, 24/7.',
    primaryCta: 'Request Live Demo',
    secondaryCta: 'Talk to Sales',
  },
};
