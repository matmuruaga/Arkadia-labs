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
  zytlyn: {
    client: {
      name: "Zytlyn",
      tagline: "AI Predictive Intelligence",
      description: "Leading travel AI company providing predictive intelligence solutions for airlines, airports, tourism boards, OTAs, and meta-search platforms.",
      website: "zytlyn.com",
      // --- DATOS REESTRUCTURADOS ---
      details: [
        { icon: 'Briefcase', label: 'Industry', value: 'Travel & Tourism AI' },
        { icon: 'DollarSign', label: 'Deal Size', value: '~$15k/month ARR' },
        { icon: 'Users', label: 'Sales Team', value: '1 Salesperson + CEO' },
        { icon: 'Target', label: 'Target Market', value: 'Enterprise B2B' },
      ]
    },
    hero: {
      title: "How We *Tripled* Demo Appointments For With AI BDR Agents",
      subtitle: "Strategic case study: Zytlyn achieved 400% TOI in 6 months, cut sales cycles by 55%, and scaled their pipeline without expensive human hiring",
      kpis: [
        { value: "3x", label: "Demo Aplications" },
        { value: "55%", label: "Cycle Reduction" },
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
        },
        {
          icon: 'Clock',
          value: '55%',
          label: 'Cycle Reduction',
          subLabel: '8-10 -> 4.5 months',
          theme: 'green',
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
  // Futuros casos de estudio se añadirán aquí. ej: anotherClient: { ... }
};