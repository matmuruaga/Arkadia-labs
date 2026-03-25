// src/data/solutions/booking-agent.ts
import { Solution } from './types';

export const bookingAgentSolution: Solution = {
  id: 'booking-agent',
  slug: 'booking-agent',
  category: 'inbound',
  translationKey: 'bookingAgent',

  seo: {
    title: 'AI Booking Agent | Automated Reservations for Restaurants & Hotels | Elevaite Labs',
    description: 'AI-powered booking agent that handles reservations 24/7 for restaurants, hotels, and hospitality businesses. Maximize occupancy, reduce no-shows, and deliver seamless guest experiences.',
    keywords: [
      'AI booking agent',
      'restaurant reservation AI',
      'hotel booking automation',
      'automated reservations',
      'hospitality AI',
      'table booking AI',
      'room reservation AI',
      'no-show reduction',
      'occupancy optimization',
      'revenue management AI',
    ],
  },

  hero: {
    badge: 'AI Reservations',
    title: 'Every Seat Filled. Automatically.',
    subtitle: 'AI That Books While You Serve',
    description: 'Handles reservations, manages availability, and reduces no-shows for restaurants, hotels, and any business where every booking counts.',
    primaryCta: 'Hear It in Action',
    secondaryCta: 'Talk to Sales',
    heroVisualType: 'calendar-grid',
    trustBadges: [
      { icon: 'calendar', label: 'Booking Rate', value: '+32%' },
      { icon: 'user-check', label: 'No-Show Reduction', value: '-67%' },
      { icon: 'clock', label: 'Availability', value: '24/7' },
    ],
  },

  problem: {
    headline: 'Empty Tables and Vacant Rooms Cost You Thousands',
    description: 'Every unanswered call is a lost reservation. Every no-show is wasted inventory. Your staff is overwhelmed during peak hours while off-hours calls go to voicemail. The result? Lost revenue and frustrated guests.',
    painPoints: [
      {
        title: 'Missed Reservation Calls',
        description: '35% of restaurant calls go unanswered during peak hours. Each missed call is a potential $150+ table walking out the door.',
        icon: 'phone-missed',
      },
      {
        title: 'Costly No-Shows',
        description: 'The average restaurant loses $75,000/year to no-shows. Hotels see 10-15% no-show rates, costing millions in lost revenue.',
        icon: 'user-x',
      },
      {
        title: 'Staff Overwhelmed',
        description: 'Your team juggles walk-ins, phone calls, and online requests. Peak hours mean long hold times and booking errors.',
        icon: 'users',
      },
      {
        title: 'After-Hours Void',
        description: '40% of reservations are requested outside business hours. Voicemail means lost bookings to competitors who answer.',
        icon: 'moon',
      },
    ],
    statistics: [
      { value: '35%', label: 'of restaurant calls go unanswered during rush', source: 'Restaurant Business Magazine' },
      { value: '$75K', label: 'average annual revenue lost to no-shows', source: 'National Restaurant Association' },
      { value: '40%', label: 'of booking requests happen after hours', source: 'OpenTable Industry Report' },
    ],
  },

  howItWorks: {
    title: 'How the Booking Agent Works',
    subtitle: 'From incoming call to confirmed reservation in seconds',
    steps: [
      {
        step: 1,
        title: 'Answer Every Booking Call',
        description: 'Instant pickup, no hold music. The AI greets callers warmly and understands they want to make, modify, or cancel a reservation.',
        icon: 'phone',
      },
      {
        step: 2,
        title: 'Check Real-Time Availability',
        description: 'Connects to your PMS or reservation system to check live availability. Offers alternatives if the requested time is full.',
        icon: 'calendar',
      },
      {
        step: 3,
        title: 'Confirm & Capture Details',
        description: 'Books the reservation, captures special requests, dietary needs, and occasion details. Sends instant confirmation via SMS or email.',
        icon: 'check-circle',
      },
      {
        step: 4,
        title: 'Reduce No-Shows Automatically',
        description: 'Sends smart reminders at optimal times. Handles confirmations, modifications, and waitlist management automatically.',
        icon: 'bell',
      },
    ],
  },

  features: {
    title: 'Built for Hospitality Excellence',
    subtitle: 'Every feature designed to maximize occupancy and guest satisfaction',
    features: [
      {
        id: 'instant-booking',
        icon: 'calendar',
        title: 'Instant Reservation Booking',
        description: 'Books tables and rooms in real-time. Syncs with your PMS, OpenTable, Resy, or any reservation system instantly.',
      },
      {
        id: 'smart-waitlist',
        icon: 'list',
        title: 'Intelligent Waitlist Management',
        description: 'Automatically manages waitlists, notifies guests when tables open, and fills cancellations within minutes.',
      },
      {
        id: 'no-show-prevention',
        icon: 'bell',
        title: 'No-Show Prevention System',
        description: 'Smart confirmation reminders at optimal times. Detects at-risk reservations and proactively reconfirms.',
      },
      {
        id: 'special-requests',
        icon: 'sparkles',
        title: 'Special Request Handling',
        description: 'Captures dietary restrictions, allergies, celebrations, and preferences. Passes details to your team automatically.',
      },
      {
        id: 'multilingual-booking',
        icon: 'globe',
        title: 'Multilingual Reservations',
        description: 'Takes bookings in 20+ languages. Perfect for international guests and tourist destinations.',
      },
      {
        id: 'revenue-optimization',
        icon: 'trending-up',
        title: 'Revenue Optimization',
        description: 'Suggests optimal booking times, upsells premium options, and maximizes covers per service.',
      },
    ],
  },

  metrics: {
    title: 'Real Results for Hospitality',
    subtitle: 'Measured outcomes from restaurants and hotels using the Booking Agent',
    metrics: [
      { value: '+32%', label: 'More Reservations', description: 'By capturing every call 24/7', trend: 'up' },
      { value: '-67%', label: 'No-Show Rate', description: 'Through smart confirmation system', trend: 'down' },
      { value: '94%', label: 'Table Utilization', description: 'Optimized seating and turnover', trend: 'up' },
      { value: '8x', label: 'ROI in First Year', description: 'Revenue recovered from no-shows alone', trend: 'up' },
    ],
    comparisonTitle: 'Before vs After Booking Agent',
    before: [
      'Missed calls during rush hours',
      '15-20% no-show rate',
      'Manual confirmation calls',
      'Empty tables from late cancellations',
      'Language barriers with international guests',
    ],
    after: [
      '100% of calls answered instantly',
      'Under 5% no-show rate',
      'Automated smart reminders',
      'Waitlist fills cancellations in minutes',
      'Seamless multilingual service',
    ],
  },

  scoreAnimation: {
    enabled: false,
  },

  platform: {
    badge: 'Reservation Dashboard',
    title: 'See Every Booking in Real-Time',
    subtitle: 'Monitor reservations, no-show rates, and occupancy from a single dashboard.',
    kpis: [
      { icon: 'calendar', label: 'Reservations Today', value: '67', trend: '+23 from last week', trendUp: true },
      { icon: 'check-circle', label: 'Confirmation Rate', value: '96%', trend: '+12% vs last month', trendUp: true },
      { icon: 'users', label: 'Covers Booked', value: '234', trend: '+45 from yesterday', trendUp: true },
      { icon: 'trending-up', label: 'Occupancy Rate', value: '94%', trend: '+8% vs average', trendUp: true },
    ],
    mainChart: {
      title: 'Reservations & Occupancy',
      subtitle: 'Daily booking trends and table utilization',
    },
    scoreCard: {
      title: 'No-Show Rate',
      score: 5,
      description: 'Down from 18% before AI',
    },
    activityFeed: [
      { icon: 'check-circle', text: 'Reservation confirmed: 4 guests, Dec 28, 8:00 PM', time: '2 min ago', status: 'success' },
      { icon: 'bell', text: 'Reminder sent: Tomorrow 7 PM booking for Martinez', time: '5 min ago', status: 'success' },
      { icon: 'user-check', text: 'Waitlist converted: Table for 2 at 9:00 PM', time: '8 min ago', status: 'success' },
      { icon: 'calendar', text: 'New booking: Private dining room, 12 guests, Jan 3', time: '12 min ago', status: 'success' },
    ],
  },

  useCases: {
    title: 'Built for Every Hospitality Business',
    subtitle: 'See how different industries maximize bookings with AI',
    useCases: [
      {
        id: 'restaurants',
        industry: 'Restaurants',
        title: 'Fine Dining & Casual Restaurants',
        description: 'Handle reservation calls 24/7, manage waitlists, reduce no-shows, and capture special occasion details automatically.',
        results: [
          '32% increase in reservations',
          '67% reduction in no-shows',
          '94% table utilization achieved',
        ],
        icon: 'utensils',
        image: 'https://res.cloudinary.com/dntco2fcz/image/upload/v1773320584/ba-restaurants_copia_xcperv.webp',
      },
      {
        id: 'hotels',
        industry: 'Hotels',
        title: 'Hotels & Vacation Rentals',
        description: 'Book rooms, manage availability across channels, handle modifications, and maximize occupancy with AI-powered calls.',
        results: [
          '+18% direct bookings',
          '45% reduction in OTA dependency',
          '24/7 reservation coverage',
        ],
        icon: 'building',
        image: 'https://res.cloudinary.com/dntco2fcz/image/upload/v1773320584/ba-hotels_copia_ahhwzb.webp',
        caseStudySlug: 'goodnite',
      },
      {
        id: 'spas-wellness',
        industry: 'Spas & Wellness',
        title: 'Spas, Salons & Wellness Centers',
        description: 'Schedule appointments, manage therapist availability, handle package bookings, and send automated reminders.',
        results: [
          '40% more appointments booked',
          '55% fewer last-minute cancellations',
          'Seamless package upselling',
        ],
        icon: 'heart',
        image: 'https://res.cloudinary.com/dntco2fcz/image/upload/v1773320584/ba-spa_copia_fgln9m.webp',
      },
    ],
  },

  integrations: {
    title: 'Connects to Your Hospitality Stack',
    subtitle: 'Native integrations with leading PMS and reservation platforms',
    integrationIds: ['opentable', 'resy', 'sevenrooms', 'cloudbeds', 'mews', 'oracle_opera', 'google_calendar'],
  },

  testimonial: {
    quote: "The Booking Agent transformed our reservation process. We went from missing 35% of calls during dinner rush to capturing every single booking request. Our no-show rate dropped from 18% to under 5%, and we're seeing 32% more covers per month. The ROI was immediate.",
    author: 'Calixto Carbone',
    role: 'Founder & CEO',
    company: 'Verified Client',
  },

  pricing: {
    type: 'custom',
    includes: [
      'Unlimited reservation calls',
      '24/7/365 availability',
      'PMS & reservation system integration',
      'Smart no-show prevention',
      'Multilingual support',
      'Dedicated success manager',
    ],
  },

  faq: {
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know about the Booking Agent',
    faqs: [
      {
        question: 'Which reservation systems does it integrate with?',
        answer: 'The Booking Agent integrates with OpenTable, Resy, SevenRooms, Yelp Reservations, and custom POS/PMS systems. For hotels, we support Cloudbeds, Mews, Oracle Opera, and major channel managers.',
      },
      {
        question: 'How does it reduce no-shows?',
        answer: 'The AI sends smart confirmation reminders at optimal times based on booking patterns. It detects at-risk reservations and proactively reconfirms. For high-value bookings, it can require credit card holds or deposits.',
      },
      {
        question: 'Can it handle complex booking requests?',
        answer: 'Yes. The AI handles party size changes, special seating requests, dietary requirements, celebration details, and multi-day hotel stays. For edge cases, it seamlessly transfers to your staff with full context.',
      },
      {
        question: 'What about walk-ins and phone bookings together?',
        answer: 'The system maintains real-time availability sync. When a walk-in is seated, availability updates instantly. The AI only offers times that are genuinely available.',
      },
      {
        question: 'Does it work for multiple locations?',
        answer: 'Absolutely. The Booking Agent can manage reservations across multiple restaurant or hotel locations from a single system, routing callers to the right property automatically.',
      },
      {
        question: 'How does waitlist management work?',
        answer: 'When fully booked, the AI offers to add guests to the waitlist. When cancellations occur, it automatically contacts waitlisted guests in order and books the first to confirm—usually filling the slot within minutes.',
      },
    ],
  },

  cta: {
    title: 'Ready to Fill Every Table, Every Night?',
    subtitle: 'See how the Booking Agent handles your reservations—with your availability, your policies, your guest experience.',
    primaryCta: 'Request Live Demo',
    secondaryCta: 'Talk to Sales',
  },
};
