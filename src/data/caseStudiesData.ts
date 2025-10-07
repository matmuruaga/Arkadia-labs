// src/data/caseStudiesData.ts

export interface CaseStudy {
  client: {
    name: string;
    industry: string;
    website: string;
    logoUrl?: string; // Opcional, por si se usa en el futuro
    tagline: string; // ej: "AI Predictive Intelligence"
    description: string;
    dealSize: string;
    salesTeam: string;
    targetMarket: string;
  };
  hero: {
    title: string;
    subtitle: string;
    kpis: {
      value: string;
      label: string;
    }[];
  };
  challenge: {
    beforeTitle: string; // ej: "Before ElevateLabs"
    points: string[];
  };
 solution: {
    title: string;
    subtitle: string; // <-- Nuevo
    implementation: { // <-- Nuevo objeto para la columna izquierda
      title: string;
      description: string;
      features: {
        icon: string;
        title: string;
        description: string;
      }[];
    };
    coreFunctions: { // <-- Nuevo objeto para la columna derecha
      title: string;
      functions: string[];
    };
  };
  timeline: {
    title: string;
    subtitle: string;
    phases: {
      title: string;
      description: string;
      status: 'default' | 'success'; // Para controlar el estilo
    }[];
  };
   impact: {
    title: string;
    subtitle: string; // <-- Nuevo
    kpis: {
      icon: string;
      value: string;
      label: string;
      subLabel: string; // <-- Nuevo
      theme: 'blue' | 'green' | 'purple' | 'orange'; // <-- Nuevo
    }[];
  };
  beforeAfter: {
    title: string;
    beforeLabel: string;
    beforeValue: number;
    afterLabel: string;
    afterValue: number;
  };
  roiAnalysis: {
    title: string;
    subtitle: string;
    calculator: {
      title: string;
      items: {
        label: string;
        value: string;
        color: 'red' | 'blue' | 'default';
      }[];
      finalRoi: {
        value: number;
        label: string;
      };
    };
    benefits: {
      icon: string;
      title: string;
      description: string;
    }[];
  };
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
}

export const caseStudies: { [key: string]: CaseStudy } = {
  /* HIDDEN - Zytlyn case study
  zytlyn: {
    client: {
      name: "Zytlyn",
      tagline: "AI Predictive Intelligence",
      logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751619752/zytlyn_logo_wotmqi.svg', // <-- URL del logo
      website: "zytlyn.com", // <-- Web del cliente
      description: "Leading travel AI company providing predictive intelligence solutions for airlines, airports, tourism boards, OTAs, and meta-search platforms.",
      // --- DATOS REESTRUCTURADOS ---
      details: [
        { icon: 'Briefcase', label: 'Industry', value: 'Travel & Tourism AI' },
        { icon: 'DollarSign', label: 'Deal Size', value: '~$15k/month ARR' },
        { icon: 'Users', label: 'Sales Team', value: '1 Salesperson + CEO' },
        { icon: 'Target', label: 'Target Market', value: 'Enterprise B2B' },
      ]
    },
    hero: {
      title: "How We *Tripled Demo Appointments* For With AI BDR Agents",
      subtitle: "Strategic case study: Zytlyn achieved 400% ROI in 6 months, cut sales cycles by 55%, and scaled their pipeline without expensive human hiring",
      kpis: [
        { value: "3x", label: "Demo Aplications" },
        { value: "55%", label: "Cycle Reduction", },
        { value: "400%", label: "ROI in 6 Months" },
      ],
    },
    challenge: {
      beforeTitle: "Before ElevaiteLabs",
      points: [
        "Time-consuming lead follow-up",
        "High volume of unfiltered leads",
        "Inconsistent qualification process",
      ],
    },
    challengeSection: {
      title: "The Challenge",
      subtitle: "Zytlyn faced critical scaling challenges that limited their growth potential in the competitive travel AI market.",
      challenges: [
        {
          icon: 'Clock',
          title: 'Extended Sales Cycles',
          description: 'Average sales cycles of 8-10 months, with some extending to 18 months, creating unpredictable revenue flow.',
          impact: 'Slow revenue growth'
        },
        {
          icon: 'UserX',
          title: 'Capacity Limitations',
          description: 'Only one salesperson managing entire pipeline, limiting number of qualified demos and follow-ups.',
          impact: 'Missed opportunities'
        },
        {
          icon: 'Search',
          title: 'Manual Qualification',
          description: 'Time-intensive manual lead qualification process preventing focus on high-value activities.',
          impact: 'Inefficient resource allocation'
        }
      ],
      coreProblem: {
        title: "The Core Problem",
        quote: "We needed AI employees to substitute jobs that would typically be done by expensive human BDRs, allowing our team to focus on what matters most - nurturing and closing qualified prospects.",
        author: "Head of Sales, Zytlyn"
      }
    },
   solution: {
      title: "The ElevaiteLabs Solution",
      subtitle: "Custom AI BDR agents designed with Swiss precision to automate qualification, scheduling, and lead nurturing.",
      implementation: {
        title: "Strategic AI Implementation",
        description: "Leveraging 12 years of sales expertise and proven methodologies from scaling 3 startups from pre-seed to Series A, we developed a tailored AI BDR system.",
        features: [
          {
            icon: 'Lightbulb',
            title: 'Intelligent Lead Qualification',
            description: 'AI-powered qualification system that identifies high-value prospects from hundreds of thousands of leads.'
          },
          {
            icon: 'Calendar',
            title: 'Automated Demo Scheduling',
            description: 'Seamless appointment booking system that integrates with existing calendars and CRM workflows.'
          },
          {
            icon: 'Users',
            title: '24/7 Prospect Engagement',
            description: 'Round-the-clock availability for prospect inquiries and follow-up management.'
          }
        ]
      },
      coreFunctions: {
        title: "AI BDR Core Functions",
        functions: [
          'Lead Qualification',
          'Demo Scheduling',
          'Follow-up Management',
          'CRM Integration'
        ]
      }
    },
    timeline: {
      title: "Implementation Timeline",
      subtitle: "Swift deployment with continuous optimization",
      phases: [
        {
          title: 'Months 1-2: Development',
          description: 'Custom AI agent development, integration setup, and personalization for Zytlyn’s specific use cases.',
          status: 'default'
        },
        {
          title: 'Months 3-4: Fine-tuning',
          description: 'System optimization, performance monitoring, and adjustment based on initial results and feedback.',
          status: 'default'
        },
        {
          title: 'Month 4+: Results Delivery',
          description: 'Full system performance achieved with measurable impact on demo appointments and sales cycles.',
          status: 'success'
        }
      ]
    },
    impact: {
      title: "Measurable Impact",
      subtitle: "Transformational results delivered within 4 months",
      kpis: [
        {
          icon: 'Calendar',
          value: '3x',
          label: 'Demo Appointments',
          subLabel: 'Per Month',
          theme: 'blue',
          trend: 'positive',
        },
        {
          icon: 'Clock',
          value: '55%',
          label: 'Cycle Reduction',
          subLabel: '8-10 → 4.5 months',
          theme: 'green',
          trend: 'negative'
        },
        {
          icon: 'TrendingUp',
          value: '400%',
          label: 'ROI Achieved',
          subLabel: 'Within 6 months',
          theme: 'purple',
        },
        {
          icon: 'DollarSign',
          value: '25%',
          label: 'Cost vs Human BDR',
          subLabel: 'For 3x results',
          theme: 'orange',
        },
      ],
    },
    beforeAfter: {
        title: "Before vs After Performance",
        beforeLabel: "Leads Before",
        beforeValue: 80,
        afterLabel: "Demo Appointments Increase",
        afterValue: 320,
    },
    roiAnalysis: {
      title: "ROI Analysis",
      subtitle: "Comprehensive financial impact assessment",
      calculator: {
        title: "Investment vs Human BDR Cost",
        items: [
          { label: 'Traditional Human BDR Cost', value: 'CHF 150k+/year', color: 'red' },
          { label: 'AI Investment Cost', value: '25% of human cost', color: 'default' },
          { label: 'Output Multiplier', value: '3x performance', color: 'blue' },
        ],
        finalRoi: {
          value: 400,
          label: 'Achieved within 6 months'
        }
      },
      benefits: [
        {
          icon: 'ShieldCheck',
          title: 'Cost Efficiency',
          description: 'AI investment represents only 25% of traditional human BDR hiring costs, while delivering 3x the performance in demo scheduling and qualification.'
        },
        {
          icon: 'Rocket',
          title: 'Revenue Acceleration',
          description: '55% reduction in sales cycles combined with 3x demo capacity directly translates to faster revenue recognition and improved cash flow.'
        },
        {
          icon: 'Infinity',
          title: 'Scalability Factor',
          description: 'AI agents scale infinitely without additional hiring costs, providing sustainable competitive advantage as Zytlyn grows.'
        }
      ]
    },
    testimonial: {
      quote:
        "The AI agent from ElevaitLabs is more than a tool; it's a core part of our sales team now. It has completely cleared our pipeline's bottleneck, allowing our human team to focus on what they do best: closing deals. The 400% ROI speaks for itself.",
      author: "Jane Doe",
      role: "Head of Growth",
      company: "Zytlyn",
    },
  },
  */ // END HIDDEN - Zytlyn case study
  goodnite: {
    // --- HERO SECTION ---
    hero: {
      title: "How We Transformed Goodnite's *Guest Experience* with Complete AI Ecosystem",
      subtitle: "Strategic case study: Goodnite achieved 6x ROI in 12 months, increased guest satisfaction by 11%, and transformed their operations with 24/7 AI guest experience ecosystem.",
      kpis: [
        { value: '6x', label: 'ROI in 12 Months' },
        { value: '11%', label: 'Guest Satisfaction Increase' },
        { value: '78%', label: 'More Reviews Generated' },
      ],
    },
    
    // --- CLIENT OVERVIEW ---
    client: {
      name: "Goodnite",
      tagline: "Boutique Vacation Rentals",
      logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1752340332/Captura_de_pantalla_2025-07-12_a_la_s_19.11.55_m3fdrp.png', // <-- DEBES AÑADIR LA URL DEL LOGO
      description: "Premium vacation rental company in Brno, Czech Republic, offering 68 original rooms and suites across 12 buildings with contactless reception and maximum comfort focus.",
      website: "goodnite.cz", // Asumido, puedes cambiarlo
      details: [
        { icon: 'Briefcase', label: 'Industry', value: 'Vacation Rentals & Hospitality' },
        { icon: 'Users', label: 'Team Size', value: 'Small Operations Team' },
        { icon: 'Home', label: 'Properties', value: '68 Rooms & Suites' },
        { icon: 'Target', label: 'Target Market', value: 'Business & Leisure Travelers' },
      ]
    },

    // --- CHALLENGE (Before ElevateLabs) ---
    challenge: {
      beforeTitle: "Before Arkadia Labs",
      points: [
        "Limited after-hours guest support",
        "Inconsistent guest communication",
        "Low review generation rate",
      ],
    },

    // --- CHALLENGE SECTION (The 3 cards) ---
    challengeSection: {
      title: "The Challenge",
      subtitle: "Goodnite faced critical operational challenges that limited their guest experience and growth potential in the competitive vacation rental market.",
      challenges: [
        {
          icon: 'Clock',
          title: 'Limited Guest Support Hours',
          description: 'No availability for guest inquiries and support from 10 PM to 10 AM, leaving guests stranded during critical hours.',
          impact: 'Poor guest experience'
        },
        {
          icon: 'MessageSquareWarning',
          title: 'Inconsistent Communication',
          description: 'No standardized pre-arrival or post-stay communication process, leading to confusion and missed opportunities.',
          impact: 'Guest confusion and lost bookings'
        },
        {
          icon: 'Star',
          title: 'Low Review Generation',
          description: 'Only 40% of guests were leaving reviews, significantly impacting online visibility and booking conversions.',
          impact: 'Reduced online presence'
        }
      ],
      coreProblem: {
        title: "The Core Problem",
        quote: "We needed a complete AI guest experience ecosystem that could provide 24/7 support, guide guests through their journey, and actively collect feedback to improve our ratings and bookings.",
        author: "Tomáš Ustohal, Team Manager at Goodnite"
      }
    },

    // --- SOLUTION SECTION ---
    solution: {
      title: "The Elevaitelabs Solution",
      subtitle: "Complete AI Guest Experience Ecosystem designed with Swiss precision to transform hospitality operations.",
      implementation: {
        title: "Strategic AI Implementation",
        description: "Leveraging 12 years of sales expertise and proven methodologies from scaling 3 startups from pre-seed to Series A, we developed a comprehensive AI ecosystem covering the complete guest journey.",
        features: [
          { icon: 'Moon', title: '24/7 Night Shift Receptionist', description: 'AI-powered receptionist handling all guest inquiries from 10 PM to 10 AM with immediate response capability.' },
          { icon: 'Send', title: 'Pre-Arrival & Arrival Support', description: 'Automated calling system that explains everything before arrival and provides arrival day support.' },
          { icon: 'MessageCircle', title: 'Post-Stay Feedback Collection', description: 'AI agent that calls 2-3 days after stay to collect feedback and encourage positive reviews.' }
        ]
      },
      coreFunctions: {
        title: "AI Ecosystem Core Functions",
        functions: ['Night Shift Support', 'Pre-Arrival Guidance', 'Arrival Day Support', 'Feedback Collection', 'Review Generation']
      }
    },

    // --- TIMELINE SECTION ---
    timeline: {
      title: "Implementation Timeline",
      subtitle: "Swift deployment with continuous optimization",
      phases: [
        { title: 'Month 1: Development', description: 'Custom AI ecosystem development, integration setup, and personalization for Goodnite’s specific hospitality requirements.', status: 'default' },
        { title: 'Month 2: Integration & Testing', description: 'System integration with existing booking systems, comprehensive testing, and staff training on the new AI ecosystem.', status: 'default' },
        { title: 'Month 3: Go-Live & Results', description: 'Full system launch with immediate impact on guest satisfaction, review generation, and operational efficiency.', status: 'success' }
      ]
    },

    // --- MEASURABLE IMPACT SECTION ---
    impact: {
      title: "Measurable Impact",
      subtitle: "Transformational results delivered within 3 months",
      kpis: [
        { icon: 'Smile', value: '9.3', label: 'Guest Satisfaction', subLabel: 'Up from 8.4 (11% increase)', theme: 'purple', trend: 'positive' },
        { icon: 'Star', value: '78%', label: 'More Reviews', subLabel: '40% → 71% review generation', theme: 'blue', trend: 'positive' },
        { icon: 'TrendingUp', value: '6x', label: 'ROI Achieved', subLabel: 'Within 12 months', theme: 'green' },
        { icon: 'Zap', value: '24 / 7', label: 'Immediate Response', subLabel: 'Replaces 2-3 employees', theme: 'orange' },
      ],
    },

    // --- ROI ANALYSIS SECTION ---
    roiAnalysis: {
      title: "ROI Analysis",
      subtitle: "Comprehensive financial impact assessment",
      calculator: {
        title: "Investment vs Human Staff Cost",
        items: [
          { label: 'Traditional Staff Cost (2-3 employees)', value: '€120k+/year', color: 'red' },
          { label: 'AI Ecosystem Investment', value: '15% of staff cost', color: 'default' },
          { label: 'Performance Multiplier', value: '3x efficiency', color: 'blue' },
        ],
        finalRoi: { value: 600, label: 'Achieved within 12 months' }
      },
      benefits: [
        { icon: 'ShieldCheck', title: 'Cost Efficiency', description: 'AI investment represents only 15% of traditional staffing costs, while delivering 3x the performance in guest satisfaction and review generation.' },
        { icon: 'Rocket', title: 'Revenue Acceleration', description: '78% increase in review generation combined with 11% guest satisfaction improvement directly translates to higher booking rates and revenue growth.' },
        { icon: 'Infinity', title: 'Scalability Factor', description: 'AI ecosystem scales infinitely without additional hiring costs, providing sustainable competitive advantage as Goodnite expands.' }
      ]
    }
  },
   'domus-labs': {
    // --- HERO SECTION ---
    hero: {
      title: "How We *Accelerated Project Delivery* With AI Intelligence System",
      subtitle: "Strategic case study: Domus Labs achieved 160% ROI in 3 months, increased project completion by 77%, and saved 8 hours weekly executive time with automated project intelligence.",
      kpis: [
        { value: '92%', label: 'Meeting Efficiency' },
        { value: '77%', label: 'Project Completion' },
        { value: '160%', label: 'ROI in 3 Months' },
      ],
    },
    
    // --- CLIENT OVERVIEW ---
    client: {
      name: "Domus Labs",
      tagline: "Boutique Architecture Studio",
      logoUrl: 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1752340022/Captura_de_pantalla_2025-07-12_a_la_s_19.05.47_ymuenu.png', // <-- DEBES AÑADIR LA URL DEL LOGO
      website: "domuslabs.net",
      description: "Innovative architecture and interior design studio creating meaningful spaces with humanist perspective, expanding internationally across Barcelona, Germany, and France.",
      details: [
        { icon: 'Palette', label: 'Industry', value: 'Architecture & Interior Design' },
        { icon: 'Euro', label: 'Project Size', value: '€500k-2M per project' },
        { icon: 'Users', label: 'Team Size', value: '17 Employees' },
        { icon: 'Target', label: 'Target Market', value: 'International B2B' },
      ]
    },

    // --- CHALLENGE (Before ElevateLabs) ---
    challenge: {
      beforeTitle: "Before Arkadia Labs",
      points: [
        "Manual meeting documentation consuming 2+ hours weekly",
        "Poor project visibility across multiple initiatives",
        "Inconsistent task tracking and accountability",
      ],
    },

    // --- CHALLENGE SECTION (The 3 cards) ---
    challengeSection: {
      title: "The Challenge",
      subtitle: "Domus Labs faced critical project management challenges limiting their international expansion potential.",
      challenges: [
        { icon: 'Clock', title: 'Manual Meeting Processing', description: 'Executives spending 2+ hours weekly manually documenting meetings, updating project status, and tracking tasks.', impact: 'Executive time waste' },
        { icon: 'EyeOff', title: 'Project Visibility Gaps', description: 'Multiple projects running simultaneously with poor visibility into status, risks, and accountability across teams.', impact: 'Missed deadlines' },
        { icon: 'ClipboardX', title: 'Accountability Challenges', description: 'Inconsistent task tracking and follow-up system preventing efficient project delivery and team coordination.', impact: 'Project delays' }
      ],
      coreProblem: {
        title: "The Core Problem",
        quote: "We needed an AI system that could automatically capture meeting insights, update project status, and maintain accountability as we expand internationally. Manual processes were limiting our growth potential.",
        author: "Cosma Musacchio, General Manager & Creative Director, Domus Labs"
      }
    },

    // --- SOLUTION SECTION ---
    solution: {
      title: "The Elevaitelabs Solution",
      subtitle: "Custom AI Project Intelligence System designed with Swiss precision to automate project management, meeting processing, and accountability tracking.",
      implementation: {
        title: "Strategic AI Implementation",
        description: "Leveraging 12 years of sales expertise and proven methodologies from scaling 3 startups from pre-seed to Series A, we developed a tailored AI Project Intelligence system.",
        features: [
          { icon: 'FileText', title: 'Automated Meeting Analysis', description: 'AI-powered system that processes meetings, generates summaries, and automatically updates project status in Notion.' },
          { icon: 'KanbanSquare', title: 'Intelligent Project Tracking', description: 'Real-time project visibility with automated task assignment and progress monitoring across all initiatives.' },
          { icon: 'Bot', title: '24/7 Project Intelligence', description: 'Telegram-based AI assistant providing instant answers about project status, meeting summaries, and task updates.' },
          { icon: 'CheckSquare', title: 'Automated Accountability', description: 'Weekly automated reports for team members and executives with project status, risks, and required actions.' }
        ]
      },
      coreFunctions: {
        title: "AI Project Intelligence Core Functions",
        functions: ['Meeting Analysis & Summary', 'Automated Task Assignment', 'Project Status Updates', 'Telegram AI Assistant']
      }
    },

    // --- TIMELINE SECTION ---
    timeline: {
      title: "Implementation Timeline",
      subtitle: "Swift deployment with continuous optimization",
      phases: [
        { title: 'Month 1: Development', description: 'Custom AI system development, Notion integration setup, and Telegram bot creation tailored for Domus Labs’ architecture workflows.', status: 'default' },
        { title: 'Month 2: Fine-tuning', description: 'System optimization, meeting processing refinement, and project management workflow customization based on initial feedback.', status: 'default' },
        { title: 'Month 3+: Results Delivery', description: 'Full system performance achieved with measurable impact on project completion rates, executive time savings, and team accountability.', status: 'success' }
      ]
    },

    // --- MEASURABLE IMPACT SECTION ---
    impact: {
      title: "Measurable Impact",
      subtitle: "Transformational results delivered within 3 months",
      kpis: [
        { icon: 'Users', value: '92%', label: 'Meeting Efficiency', subLabel: '2 hours → 10 minutes', theme: 'blue', trend: 'negative' },
        { icon: 'CheckCircle2', value: '77%', label: 'Project Completion', subLabel: '47% → 83% success rate', theme: 'green', trend: 'positive' },
        { icon: 'TrendingUp', value: '160%', label: 'ROI Achieved', subLabel: 'Within 3 months', theme: 'purple' },
        { icon: 'Clock', value: '8H', label: 'Weekly Time Saved', subLabel: 'Per executive', theme: 'orange' },
      ],
    },

    // --- ROI ANALYSIS SECTION ---
    roiAnalysis: {
      title: "ROI Analysis",
      subtitle: "Comprehensive financial impact assessment",
      calculator: {
        title: "Investment vs Executive Time Cost",
        items: [
          { label: 'Traditional Executive Time Cost', value: '€2,000+/month', color: 'red' },
          { label: 'AI Investment Cost', value: '€990/month', color: 'default' },
          { label: 'Efficiency Multiplier', value: '10x faster processing', color: 'blue' },
        ],
        finalRoi: { value: 160, label: 'Achieved within 3 months' }
      },
      benefits: [
        { icon: 'ShieldCheck', title: 'Cost Efficiency', description: 'AI investment represents 50% of traditional executive time costs, while delivering 10x the processing efficiency.' },
        { icon: 'Rocket', title: 'Project Acceleration', description: '77% improvement in project completion rates directly translates to faster delivery and improved client satisfaction.' },
        { icon: 'Infinity', title: 'Scalability Factor', description: 'AI system scales infinitely across international locations without additional management overhead.' }
      ]
    }
  },
  // Futuros casos de estudio se añadirán aquí. ej: anotherClient: { ... }
};