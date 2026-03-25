// src/data/solutions/content-creator.ts
import { Solution } from './types';

export const contentCreatorSolution: Solution = {
  id: 'content-creator',
  slug: 'content-creator',
  category: 'marketing',
  translationKey: 'contentCreator',

  seo: {
    title: 'AI Content Creator | Automated Social Media Content & Publishing | Elevaite Labs',
    description: 'AI-powered content creator that generates images, videos, and posts. Analyzes competitors, finds optimal posting times, and publishes automatically across all platforms.',
    keywords: [
      'AI content creator',
      'social media automation',
      'AI image generation',
      'AI video creation',
      'automated posting',
      'content scheduling',
      'social media AI',
      'competitor analysis',
      'engagement optimization',
      'content marketing AI',
    ],
  },

  hero: {
    badge: 'Marketing & Content',
    title: 'Your AI Content Team That Never Stops Creating',
    subtitle: 'Research. Create. Publish. Optimize. Repeat.',
    description: 'An AI agent that scrapes competitor content, generates stunning images and videos, identifies the best posting times, publishes automatically, and tracks performance—all while you focus on strategy.',
    primaryCta: 'See It Create',
    secondaryCta: 'Talk to Sales',
    trustBadges: [
      { icon: 'trending-up', label: 'Engagement Increase', value: '+156%' },
      { icon: 'clock', label: 'Time Saved', value: '20hrs/week' },
      { icon: 'image', label: 'Content Created', value: '10x More' },
    ],
  },

  problem: {
    headline: 'Content Creation Is Killing Your Marketing Team',
    description: 'The social media beast is never satisfied. You need fresh content daily across multiple platforms, but your team is drowning in production while competitors outpace you.',
    painPoints: [
      {
        title: 'Content Treadmill',
        description: 'Social algorithms demand 3-5 posts per platform daily. Your team spends 60% of their time creating content instead of strategy.',
        icon: 'refresh-cw',
      },
      {
        title: 'Inconsistent Posting',
        description: 'Missed posting windows tank engagement. Optimal times vary by platform and audience, and your team can\'t be online 24/7.',
        icon: 'clock',
      },
      {
        title: 'Creative Burnout',
        description: 'Producing fresh, engaging content daily leads to burnout and declining quality. Great ideas become recycled mediocrity.',
        icon: 'battery-low',
      },
      {
        title: 'Blind Competition',
        description: 'Competitors\' winning strategies remain a mystery. Manual monitoring is time-consuming and insights come too late.',
        icon: 'eye-off',
      },
    ],
    statistics: [
      { value: '60%', label: 'of marketers spend on content creation vs strategy', source: 'Content Marketing Institute' },
      { value: '73%', label: 'of brands struggle with consistent posting', source: 'Sprout Social Report' },
      { value: '47%', label: 'of content teams report creative burnout', source: 'HubSpot State of Marketing' },
    ],
  },

  howItWorks: {
    title: 'How the Content Creator Works',
    subtitle: 'From competitor insight to viral content in minutes',
    steps: [
      {
        step: 1,
        title: 'Analyze & Research',
        description: 'Scrapes competitor content, identifies trending topics, and analyzes what\'s working in your niche. Finds content gaps and opportunities.',
        icon: 'search',
      },
      {
        step: 2,
        title: 'Generate Content',
        description: 'Creates stunning images, engaging videos, and compelling copy using AI. Matches your brand voice and visual style perfectly.',
        icon: 'sparkles',
      },
      {
        step: 3,
        title: 'Optimize & Schedule',
        description: 'Identifies the optimal posting time for each platform based on your audience data. Queues content for maximum engagement.',
        icon: 'calendar',
      },
      {
        step: 4,
        title: 'Publish & Track',
        description: 'Publishes automatically across all platforms. Monitors performance and learns what works to improve future content.',
        icon: 'bar-chart',
      },
    ],
  },

  features: {
    title: 'Your Complete Content Engine',
    subtitle: 'Every feature designed to outperform your competition',
    features: [
      {
        id: 'competitor-scraping',
        icon: 'search',
        title: 'Competitor Intelligence',
        description: 'Automatically scrapes and analyzes competitor content. Identifies their best performers and reverse-engineers winning strategies.',
      },
      {
        id: 'ai-image-gen',
        icon: 'image',
        title: 'AI Image Generation',
        description: 'Creates scroll-stopping visuals in your brand style. Product shots, lifestyle imagery, infographics—all on-brand, all automatic.',
      },
      {
        id: 'ai-video-gen',
        icon: 'video',
        title: 'AI Video Creation',
        description: 'Produces short-form videos for TikTok, Reels, and Shorts. Trending formats, captions, and music—ready to post.',
      },
      {
        id: 'optimal-timing',
        icon: 'clock',
        title: 'Smart Posting Times',
        description: 'Analyzes your audience engagement patterns to find the perfect posting window for each platform and content type.',
      },
      {
        id: 'auto-publish',
        icon: 'send',
        title: 'Auto-Publish Everywhere',
        description: 'Posts to Instagram, TikTok, Facebook, X, LinkedIn, and more—all from one place, all automatically scheduled.',
      },
      {
        id: 'performance-tracking',
        icon: 'bar-chart',
        title: 'Performance Analytics',
        description: 'Tracks engagement, reach, and conversions. AI learns what works and continuously improves your content strategy.',
      },
    ],
  },

  metrics: {
    title: 'Content That Converts',
    subtitle: 'Measured results from teams using the Content Creator',
    metrics: [
      { value: '+156%', label: 'Engagement Rate', description: 'Average increase in likes, comments, shares', trend: 'up' },
      { value: '20hrs', label: 'Time Saved Weekly', description: 'Reclaimed for strategy and creativity', trend: 'up' },
      { value: '10x', label: 'Content Volume', description: 'More posts without more headcount', trend: 'up' },
      { value: '+89%', label: 'Follower Growth', description: 'Consistent posting drives audience growth', trend: 'up' },
    ],
    comparisonTitle: 'Before vs After Content Creator',
    before: [
      'Manual content creation daily',
      'Missed optimal posting times',
      'No competitor intelligence',
      'Inconsistent brand visuals',
      'Reactive content strategy',
    ],
    after: [
      'AI generates content on autopilot',
      'Perfect timing every post',
      'Real-time competitor insights',
      'On-brand visuals automatically',
      'Data-driven content strategy',
    ],
  },

  scoreAnimation: {
    enabled: false,
  },

  platform: {
    badge: 'Content Dashboard',
    title: 'Command Your Content Empire',
    subtitle: 'Monitor creation, scheduling, and performance from a single dashboard.',
    kpis: [
      { icon: 'image', label: 'Content Created', value: '47', trend: 'This week', trendUp: true },
      { icon: 'send', label: 'Posts Published', value: '23', trend: '+8 from last week', trendUp: true },
      { icon: 'trending-up', label: 'Avg Engagement', value: '8.4%', trend: '+2.1% vs average', trendUp: true },
      { icon: 'users', label: 'Follower Growth', value: '+1,240', trend: 'This month', trendUp: true },
    ],
    mainChart: {
      title: 'Content Performance',
      subtitle: 'Engagement and reach across platforms',
    },
    scoreCard: {
      title: 'Engagement Rate',
      score: 84,
      description: 'Above industry benchmark',
    },
    activityFeed: [
      { icon: 'check-circle', text: 'TikTok video published: 12K views in 2 hours', time: '2 min ago', status: 'success' },
      { icon: 'image', text: 'Instagram carousel created: 5 slides ready', time: '15 min ago', status: 'success' },
      { icon: 'search', text: 'Competitor analysis: 3 trending topics identified', time: '1 hr ago', status: 'success' },
      { icon: 'calendar', text: 'Content scheduled: 12 posts for next week', time: '2 hr ago', status: 'success' },
    ],
  },

  useCases: {
    title: 'Content That Works for Every Industry',
    subtitle: 'See how different businesses scale their social presence with AI',
    useCases: [
      {
        id: 'ecommerce',
        industry: 'E-commerce',
        title: 'Product & Lifestyle Content',
        description: 'Generate endless product shots, lifestyle imagery, and promotional content. Scale your social presence without scaling your team.',
        results: [
          '156% increase in engagement',
          '10x more content produced',
          '45% reduction in content costs',
        ],
        icon: 'shopping-cart',
      },
      {
        id: 'agencies',
        industry: 'Agencies',
        title: 'Multi-Client Content Management',
        description: 'Manage content for dozens of clients simultaneously. Each brand gets unique, on-brand content without the overhead.',
        results: [
          'Handle 5x more clients',
          '80% reduction in production time',
          'Consistent quality across accounts',
        ],
        icon: 'briefcase',
      },
      {
        id: 'hospitality',
        industry: 'Hospitality',
        title: 'Restaurants & Hotels',
        description: 'Showcase your venue, menu, and experiences with stunning visual content. Keep social feeds fresh without pulling staff.',
        results: [
          '89% follower growth in 6 months',
          'Daily fresh content automatically',
          '3x more user-generated content',
        ],
        icon: 'utensils',
      },
    ],
  },

  integrations: {
    title: 'Publishes Everywhere You Need',
    subtitle: 'Native integrations with all major social platforms and tools',
    integrationIds: ['instagram', 'tiktok', 'facebook', 'hootsuite', 'buffer', 'canva', 'youtube'],
  },

  testimonial: {
    quote: "The Content Creator has completely transformed our social media operation. We went from struggling to post 3 times a week to publishing daily across 5 platforms—all with better quality and engagement. Our team now focuses on strategy while AI handles the heavy lifting. 156% engagement increase in the first quarter.",
    author: 'Calixto Carbone',
    role: 'Founder & CEO',
    company: 'ELSA Consulting',
  },

  pricing: {
    type: 'custom',
    includes: [
      'Unlimited content generation',
      'All social platforms supported',
      'Competitor intelligence',
      'AI image & video creation',
      'Smart scheduling & publishing',
      'Dedicated success manager',
    ],
  },

  faq: {
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know about the Content Creator',
    faqs: [
      {
        question: 'What types of content can it create?',
        answer: 'The Content Creator generates images (product shots, lifestyle, infographics), short-form videos (TikTok, Reels, Shorts), carousels, stories, and written posts. All content is generated in your brand style with your voice.',
      },
      {
        question: 'How does competitor scraping work?',
        answer: 'The AI monitors your specified competitors\' public social profiles, analyzing their top-performing content, posting patterns, hashtag strategies, and engagement trends. It identifies what works and adapts insights for your brand.',
      },
      {
        question: 'Can I review content before it\'s published?',
        answer: 'Absolutely. You can set up approval workflows for any or all content. Review in batches, make edits, or let approved content types publish automatically while reviewing others.',
      },
      {
        question: 'How does it determine optimal posting times?',
        answer: 'The AI analyzes your historical engagement data, audience online patterns, and platform-specific algorithms to identify when your content will get maximum visibility and engagement. It continuously learns and adapts.',
      },
      {
        question: 'Does it maintain my brand voice and style?',
        answer: 'Yes. During setup, the AI learns your brand guidelines, visual style, tone of voice, and content preferences. It generates content that\'s indistinguishable from what your team would create.',
      },
      {
        question: 'Which social platforms are supported?',
        answer: 'Instagram, TikTok, Facebook, X (Twitter), LinkedIn, Pinterest, YouTube Shorts, and more. We also integrate with management tools like Hootsuite, Buffer, and Sprout Social.',
      },
    ],
  },

  cta: {
    title: 'Ready to 10x Your Content Output?',
    subtitle: 'See how the Content Creator generates engaging content for your brand—automatically, consistently, on-brand.',
    primaryCta: 'Request Live Demo',
    secondaryCta: 'Talk to Sales',
  },
};
