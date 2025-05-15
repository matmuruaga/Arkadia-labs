import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { 
  BrainCircuit,
  Menu,
  X,
  Rocket,
  Zap,
  TrendingUp,
  Check,
  Plus,
  Minus,
  Timer,
  Brain,
  Clock,
  Brain as BrainIcon,
  Rocket as RocketIcon,
  Users,
  User,
  Clock as ClockIcon,
  Trophy,
  Briefcase,
  LineChart,
  Wrench,
  Map,
  RefreshCw,
  UserCircle,
  Settings,
  BarChart,
  Linkedin,
  Twitter,
  Youtube,
  Instagram,
  Send
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  const AnimatedLines = () => (
    <div className="absolute inset-0 opacity-10">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="flow-line"
          style={{
            top: `${20 * i}%`,
            animationDelay: `${i * 0.5}s`
          }}
        />
      ))}
    </div>
  );

  const faqs = [
    {
      question: "What is an AI sales system?",
      answer: "Our AI sales systems work 24/7 to handle your sales processes autonomously. Unlike basic automation, they analyze your data to perform intelligent tasks like lead qualification and follow-up, integrating with your existing CRM to immediately boost revenue without increasing headcount."
    },
    {
      question: "Do AI sales systems replace human sales teams?",
      answer: "No, they complement your existing team. Our AI systems handle repetitive tasks like prospecting, follow-ups, and data entry, allowing your human sales professionals to focus on building relationships and closing high-value deals. This hybrid approach maximizes both efficiency and revenue."
    },
    {
      question: "What results can I expect from implementing your AI sales systems?",
      answer: "Most clients experience 3-5x more qualified leads, 60% faster sales cycles, 2-3x more deals closed, and 25-40% revenue growth. The AI systems streamline your sales process by automating routine tasks and ensuring consistent follow-up, leading to significant improvements in overall sales performance."
    },
    {
      question: "What communication channels do your AI systems support?",
      answer: "Our AI systems operate across multiple channels including email, SMS, website chat, LinkedIn messaging, phone calls, and CRM notifications. This omnichannel approach ensures you connect with prospects wherever they're most responsive, maximizing engagement opportunities."
    },
    {
      question: "How do your AI systems handle lead qualification?",
      answer: "Our AI systems qualify leads based on your specific criteria and ideal customer profile. They engage prospects through natural conversations to gather key qualification data, determine fit and timing, then score leads based on your parameters and route the most promising opportunities to your sales team."
    },
    {
      question: "How human-like are your AI systems in communication?",
      answer: "Our AI systems use advanced language processing to create natural, conversational communications. They understand context, adapt to different conversation styles, demonstrate empathy, and respond appropriately to objections. While they identify as AI when appropriate, their communication quality is sophisticated enough for effective prospect engagement."
    },
    {
      question: "Will the AI system learn and improve over time?",
      answer: "Yes, our AI systems continuously learn from every interaction, analyzing which messages resonate best and which techniques are most effective. This machine learning capability means your AI system gets smarter over time, constantly adapting to changing market conditions and prospect behaviors."
    },
    {
      question: "How do you ensure data security and privacy?",
      answer: "Data security is our priority. Our AI systems operate with enterprise-grade security including end-to-end encryption, compliance with standards like SOC 2, GDPR and CCPA, secure API integrations, and regular security audits. Your customer data never leaves your secure environment, and we adhere to all industry regulations."
    },
    {
      question: "What kind of ongoing support do you provide?",
      answer: "Our commitment doesn't end after implementation. Every client receives a dedicated customer success manager, regular performance reviews, ongoing optimization, technical support access, system updates, training for new team members, and strategic consultations as your business evolves."
    },
    {
      question: "How long does the setup process take?",
      answer: "Typically 2-4 weeks, depending on complexity. We work efficiently to get your AI agents operational while ensuring proper integration and optimization."
    },
    {
      question: "Can I integrate with my existing tools?",
      answer: "Yes! Our AI agents integrate with most popular business tools and platforms. During our consultation, we'll review your tech stack and ensure seamless integration."
    },
    {
      question: "What's included in the setup fee?",
      answer: "The setup fee covers initial consultation, custom AI development, integration with your systems, team training, and a 30-day optimization period to ensure peak performance."
    },
    {
      question: "How do you measure performance for pricing?",
      answer: "We establish clear KPIs based on your goals - whether that's lead generation, support ticket reduction, or revenue growth. Pricing is then aligned with these metrics."
    },
    {
      question: "Can I upgrade or change plans later?",
      answer: "Absolutely! Our flexible pricing structure allows you to adjust your plan as your needs evolve. We'll work with you to scale your AI solutions effectively."
    }
  ];

  const testimonials = [
    {
      name: "Eugene Mann",
      role: "Product Lead, Stripe",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
      text: "Partnering with AIAgents has been transformative for our team. Their clear and timely communication, along with tailor-made AI solutions, keeps us at the cutting edge."
    },
    {
      name: "Sarah Chen",
      role: "Sales Director, TechCorp",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300",
      text: "The AI sales team integration doubled our pipeline within months. Their system works 24/7, never misses a lead, and consistently delivers quality conversations."
    },
    {
      name: "Marcus Rodriguez",
      role: "CEO, GrowthX",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300",
      text: "We've seen a 300% increase in qualified meetings since implementing AIAgents. The ROI is clear, and the ongoing optimization keeps improving results."
    },
    {
      name: "Lisa Thompson",
      role: "VP Sales, CloudTech",
      image: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=300",
      text: "The automation of our sales processes has freed up our team to focus on strategic relationships. Our conversion rates have never been better."
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--primary)]">
      <nav className="fixed w-full z-50 bg-[var(--primary)]/80 backdrop-blur-md border-b border-[var(--accent)]/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center cursor-pointer">
              <BrainCircuit size={32} className="text-[var(--accent)]" />
              <span className="ml-2 text-xl font-bold gradient-text">ElevAIte Labs</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">       
              <button className="bg-[var(--accent)] text-[var(--primary)] px-4 py-2 rounded-full font-semibold hover:bg-[var(--secondary)] hover:text-white transition-all duration-300">
                Get Started
              </button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-[var(--accent)] transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-[var(--primary)] border-b border-[var(--accent)]/10"
          >
            <div className="px-4 py-4 space-y-4">
              <a
                href="#pricing"
                className="block text-gray-300 hover:text-[var(--accent)] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </a>
              <button className="w-full bg-[var(--accent)] text-[var(--primary)] px-4 py-2 rounded-full font-semibold hover:bg-[var(--secondary)] hover:text-white transition-all duration-300">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden pt-16">
        <AnimatedLines />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Skyrocket Your Revenue with Adaptive AI Systems
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Close more deals, scale faster, and dominate your market with custom-built AI sales employees.
          </motion.p>
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button className="bg-[var(--accent)] hover:bg-[var(--secondary)] text-[var(--primary)] hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 neon-border">
              Book a Call
            </button>
            <p className="text-gray-400">See Our AI Systems in Action.</p>
          </motion.div>
        </div>
      </section>

      <section className="relative px-4 py-20 overflow-hidden">
        <AnimatedLines />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Why Human-Only Sales Teams Struggle to Scale Revenue
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Timer,
                title: "Wasted Time Means Lost Revenue",
                text: "Sales reps burn valuable hours on manual tasks that AI could automate — draining your revenue growth potential."
              },
              {
                icon: Brain,
                title: "Missed Deals from Human Limits",
                text: "Even top-performing sales teams miss leads. AI-powered systems work 24/7 without fatigue or mistakes, capturing every opportunity."
              },
              {
                icon: Rocket,
                title: "Slow Sales Cycles Kill Growth",
                text: "Outdated processes delay deals and let faster competitors win — costing you revenue every single day."
              }
            ].map((card, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] neon-border flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 rounded-full bg-[var(--accent)] flex items-center justify-center mb-6">
                  <card.icon size={24} className="text-[var(--primary)]" />
                </div>
                <h3 className="text-xl font-bold mb-4">{card.title}</h3>
                <p className="text-gray-300">{card.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 py-20 overflow-hidden">
        <AnimatedLines />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            How ElevAIte Labs AI Systems Solve This Problem
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Clock,
                title: "Automate What Slows You Down",
                text: "We eliminate time-wasting tasks so your team can focus on what matters — closing more deals, faster."
              },
              {
                icon: BrainIcon,
                title: "Capture Every Revenue Opportunity",
                text: "Our AI agents respond instantly, 24/7 — no missed leads, no slow replies, just continuous conversion."
              },
              {
                icon: RocketIcon,
                title: "Accelerate Your Sales Cycle",
                text: "Remove bottlenecks, eliminate delays, and close deals faster than your competitors."
              },
              {
                icon: Users,
                title: "Ongoing Support",
                text: "We don't disappear after setup. Our team helps your AI systems evolve with your growth — every step of the way."
              }
            ].map((card, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] neon-border flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 rounded-full bg-[var(--accent)] flex items-center justify-center mb-6">
                  <card.icon size={24} className="text-[var(--primary)]" />
                </div>
                <h3 className="text-xl font-bold mb-4">{card.title}</h3>
                <p className="text-gray-300">{card.text}</p>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <button className="bg-[var(--accent)] hover:bg-[var(--secondary)] text-[var(--primary)] hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 neon-border">
              Boost My Revenue
            </button>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-20 overflow-hidden bg-[#0C0F3F]">
        <AnimatedLines />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2 
            className="text-4xl font-bold text-center mb-12 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            What Our AI Employees Handle for You
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: UserCircle,
                title: "Lead Generation",
                goal: "Fill your pipeline with qualified, ready-to-buy leads — automatically, consistently, and faster than ever.",
                tasks: [
                  "ICP & Persona Building",
                  "ICP List Scraping",
                  "Lead Research",
                  "Lead Enrichment",
                  "Intent Signal Monitoring",
                  "Outbound",
                  "Inbound",
                  "Pre-Qualification",
                  "Meeting Scheduling",
                  "Auto Following-up",
                ],
                whyItMatters: "Your AI employees doesn't just find leads — it filters, qualifies, and follows up so your calendar fills itself. No wasted hours, no missed buyers — just a flood of warm conversations and predictable pipeline growth."
              },
              {
                icon: Settings,
                title: "Sales Enablement",
                goal: "Eliminate sales friction and give your reps the tools to close deals faster, smarter, and with less manual effort.",
                tasks: [
                  "Omni-Channel Communicator (Email, LinkedIn, WhatsApp, SMS, etc.)",
                  "Call Assistant (Real-Time Objection Handling & Buyer Signal Detection)",
                  "Buy Signal Monitoring",
                  "CRM Sync, Nudges & Reminders",
                  "Proposal & Quote Generation",
                  "Contract Prep & eSignature",
                  "Deal & Churn Risk Detection",
                  "Lead Scoring",
                ],
                whyItMatters: "Your AI co-pilot handles everything that slows closers down — from real-time objection handling to instant reminders, updates, and quoting. Reps stay in motion, deals move forward, and revenue lands faster."
              },
              {
                icon: BarChart,
                title: "Analytics & Intelligence",
                goal: "Give sales leaders live visibility into what's working, what's not, and how to scale what drives revenue.",
                tasks: [
                  "AI-Powered Sales Dashboards (KPI Tracking, Pipeline Forecasting, Performance Alerts)",
                  "Meeting & Call Notetaking",
                  "Meeting & Call Analysis",
                  "Market Trend Analysis",
                  "Competitor Intelligence",
                  "Sales Cycle Performance Analysis",
                  "Rep Performance Scoring",
                  "Revenue Attribution Modeling",
                  "Customizable Reporting Engine",
                ],
                whyItMatters: "Your AI doesn't just execute — it reveals exactly what's driving conversions. With dashboards, alerts, and real-time analysis, you get a command center for revenue — no more guessing, just informed growth."
              }
            ].map((card, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] neon-border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 rounded-full bg-[var(--accent)] flex items-center justify-center mb-6">
                  <card.icon size={24} className="text-[var(--primary)]" />
                </div>
                
                <h3 className="text-2xl font-bold mb-6">{card.title}</h3>
                
                <div className="mb-6">
                  <h4 className="text-[var(--accent)] mb-2">Goal</h4>
                  <p className="text-gray-300">{card.goal}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-[var(--accent)] mb-2">Tasks</h4>
                  <ul className="space-y-2">
                    {card.tasks.map((task, i) => (
                      <li key={i} className="flex items-start">
                        <Check size={16} className="text-[var(--accent)] mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-300">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-[var(--accent)] mb-2">Why It Matters</h4>
                  <p className="text-gray-300">{card.whyItMatters}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-4 py-20 overflow-hidden bg-[#0C0F3F]">
        <AnimatedLines />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2 
            className="text-4xl font-bold text-center mb-12 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Why Hire Our AI Sales Team?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Traditional Sales Employees",
                items: [
                  "Manual hiring requires time, then 3.2 months to hit KPIs",
                  "Requires training, management, HR & Benefits (payroll taxes, etc)",
                  "Clocks in/out, goes on vacation, works 8 hours a day",
                  "72% of their shifts are spent doing \"busy\" work and not revenue producing activities",
                  "Inconsistency in performance, burns out, lacks motivation, etc.",
                  "Average rep stays in a company for 18 months",
                  "High salary cost, low ROI on junior roles"
                ],
                icon: X,
                iconColor: "text-red-400"
              },
              {
                title: "AI Sales Employees",
                items: [
                  "1 time build out, and it can hit KPIs within the first 30 days",
                  "Training is done instantly, it learns and memorizes immediately",
                  "Works 24/7, never takes a day off",
                  "99.9% of their shift is spent doing revenue generating activities",
                  "Never burns out, always has a great attitude; consistent performance",
                  "Zero churn; eliminates need to focus on retention",
                  "Delivers high ROI without growing your headcount" 
                ],
                icon: Check,
                iconColor: "text-[var(--accent)]"
              }
            ].map((column, index) => (
              <motion.div
                key={index}
                className="p-8 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] neon-border"
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-8 text-center">{column.title}</h3>
                <ul className="space-y-6">
                  {column.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <column.icon size={20} className={`${column.iconColor} mt-1 flex-shrink-0`} />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 px-4 bg-[#0C0F3F] relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative">
          <h2 className="text-4xl font-bold text-center mb-6 gradient-text">
            How Implementation Works
          </h2>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
            A Streamlined Process to Get AI Systems Delivering Results — Without Disrupting Your Team
          </p>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[var(--accent)]/20">
              <div className="timeline-line">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="timeline-dot"
                    style={{
                      top: `${20 * i}%`,
                      animationDelay: `${i * 0.4}s`
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-8">
              {[
                {
                  step: "STEP 1",
                  title: "Strategy Call & Process Discovery",
                  duration: "1-4 Hours",
                  icon: Map,
                  color: "bg-yellow-500",
                  description: "We start with a collaborative call to map your sales process, tools, and growth goals. This ensures your AI system is designed for maximum impact from day one."
                },
                {
                  step: "STEP 2",
                  title: "AI System Design & Buildout",
                  duration: "1-4 Weeks",
                  icon: Wrench,
                  color: "bg-purple-500",
                  description: "Our team handles the heavy lifting: we analyze workflows, design your AI logic, and prep integrations. Minimal input required — you stay focused on running your business."
                },
                {
                  step: "STEP 3",
                  title: "Seamless Integration & Live Launch",
                  duration: "1 Week",
                  icon: RefreshCw,
                  color: "bg-orange-500",
                  description: "Your AI system is embedded directly into your existing stack (CRM, email, calls, etc.). No disruption. No workflow changes. Just an invisible upgrade that starts working immediately."
                },
                {
                  step: "STEP 4",
                  title: "Onboarding, Training & Performance Dashboard",
                  duration: "1 Week",
                  icon: LineChart,
                  color: "bg-green-500",
                  description: "We onboard your team (if needed), train you on how to review results, and provide a live dashboard to track performance. You'll see exactly how AI is moving your pipeline — in real-time."
                },
                {
                  step: "STEP 5",
                  title: "Optional: Continuous Optimization & Scale",
                  duration: "Ongoing",
                  icon: Rocket,
                  color: "bg-purple-500",
                  description: "As you grow, we optimize your AI systems, layer on new capabilities, and ensure your revenue engine scales — without extra headcount.",
                  optional: true
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } gap-8`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="hidden md:flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[var(--accent)] flex items-center justify-center shadow-[0_0_15px_rgba(92,225,230,0.5)]">
                      <step.icon size={24} className="text-[#0C0F3F]" />
                    </div>
                  </div>

                  <div className={`
                    flex-1 p-6 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] neon-border
                    ${step.optional 
                      ? 'border border-dashed border-[var(--accent)]/30'
                      : ''
                    }
                  `}>
                    <div className="md:hidden mb-4">
                      <div className="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center shadow-[0_0_15px_rgba(92,225,230,0.5)]">
                        <step.icon size={20} className="text-[#0C0F3F]" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-[var(--accent)] font-semibold">{step.step}</span>
                        <span className="text-gray-400 text-sm">({step.duration})</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white">{step.title}</h3>
                      <p className="text-gray-300">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-[#0C0F3F] relative overflow-hidden">
        <AnimatedLines />
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-center mb-6 gradient-text">
            Subscription Plans
          </h2>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
            Choose the Perfect AI Sales Team for Your Business
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "AI Employee",
                price: "$1,997",
                setupFee: "$1,500 one-time setup fee",
                features: [
                  "1 AI Sales System built & trained",
                  "2× Monthly Strategy Calls (30 min)",
                  "Standard Email & Chat Support",
                  "CRM Integration",
                  "Monthly Optimizing Session",
                  "Standard Response (24–48h)"
                ],
                excluded: ["External Tools (Twilio, APIs, CRMs)","Dedicated Slack Channel"],
                description: "Small businesses automating lead qualification & follow-ups.",
                className: "pricing-card-basic"
              },
              {
                name: "AI Sales Team",
                price: "$3,997",
                setupFee: "$2,500 one-time setup fee",
                features: [
                  "3 AI Sales Systems built & trained",
                  "4× Monthly Strategy Calls (30 min)",
                  "Priority Email & Chat Support",
                  "Dedicated Slack Channel",
                  "CRM Integration",
                  "Bi-Weekly Optimization Session",
                  "Priority Response (12–24h)"
                ],
                excluded: ["External Tools (Twilio, APIs, CRMs)"],
                description: "Designed for scaling teams automating multiple sales functions.",
                className: "pricing-card-pro"
              },
              {
                name: "AI Growth Partner",
                price: "$7,997",
                setupFee: "$5,000 one-time setup fee",
                features: [
                  "10 AI Sales System built & trained",
                  "Weekly Strategy Calls (60 min)",
                  "Exclusive Email & Chat Support",
                  "Dedicated Slack Channel",
                  "CRM Integrations",
                  "Weekly Optimization Sessions",
                  "4-Hour Response Time"
                ],
                excluded: ["External Tools (Twilio, APIs, CRMs)",],
                description: "For companies automating their entire sales funnel.",
                className: "pricing-card-enterprise"
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                className={`pricing-card ${plan.className} p-8 rounded-xl neon-border flex flex-col items-center`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-2 text-center">{plan.name}</h3>
                <div className="flex items-baseline justify-center mb-1">
                  <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                  <span className="text-gray-400 ml-1">/mo</span>
                </div>
                <p className="text-sm text-gray-400 mb-6">{plan.setupFee}</p>
                
                <hr className="glow-divider" />
                
                <ul className="space-y-3 mb-6 text-left w-full">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <hr className="glow-divider" />

                <ul className="space-y-3 mb-6 text-left w-full">
                  {plan.excluded.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-red-400 mr-2">✗</span>
                      <span className="text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-sm text-gray-400 mb-6">{plan.description}</p>

                <button className="w-full bg-[var(--accent)] hover:bg-[var(--secondary)] text-[var(--primary)] hover:text-white px-6 py-3 rounded-full font-semibold transition-all duration-300">
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="mb-6">
              <p className="text-[var(--accent)]">💰 Save 20% with annual billing</p>
              <p className="text-gray-400">Payment options: Invoice, Bank Transfer, Stripe (Credit Card)</p>
            </div>
            
            <div className="inline-block text-left">
              <h4 className="text-[var(--accent)] mb-2">✳️ Add-ons:</h4>
              <ul className="text-gray-300">
                <li>Additional Strategy Call – $250</li>
                <li>Sales Training for Human Team – $750</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-20 overflow-hidden">
        <AnimatedLines />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-center mb-12 gradient-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Testimonials
            </motion.h2>
          </div>

          <motion.div
            className="max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Swiper
              modules={[Navigation, Pagination, A11y, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              className="testimonials-slider"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <div className="text-center px-4 py-12">
                    <div className="max-w-3xl mx-auto">
                      <p className="text-2xl md:text-3xl text-gray-200 mb-8 leading-relaxed">
                        "{testimonial.text}"
                      </p>
                      <div className="flex items-center justify-center">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-[var(--accent)]"
                        />
                        <div className="ml-4 text-left">
                          <h4 className="text-xl font-semibold text-white">
                            {testimonial.name}
                          </h4>
                          <p className="text-[var(--accent)]">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12 gradient-text">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-[var(--accent)]/20 rounded-lg overflow-hidden"
                >
                  <button
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[var(--accent)]/5 transition-colors"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="font-semibold text-white">{faq.question}</span>
                    {openFaq === index ? (
                      <Minus size={20} className="text-[var(--accent)]" />
                    ) : (
                      <Plus size={20} className="text-[var(--accent)]" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 py-4 text-gray-300 bg-black/20">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-20 overflow-hidden bg-[#0C0F3F]">
        <AnimatedLines />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-8 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to Skyrocket Your Revenue?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <button className="bg-[var(--accent)] hover:bg-[var(--secondary)] text-[var(--primary)] hover:text-white px-8 py-4 rounded-full text-xl font-semibold transition-all duration-300 neon-border">
              Book a Demo
            </button>
          </motion.div>
        </div>
      </section>

      <footer className="bg-[#070922] pt-20 pb-8 px-4 relative">
        <AnimatedLines />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center mb-4 cursor-pointer">
                <BrainCircuit size={32} className="text-[var(--accent)]" />
                <span className="ml-2 text-xl font-bold gradient-text">ElevAIte Labs</span>
              </div>
              <p className="text-gray-400 mb-4">
                Transforming businesses with intelligent AI automation solutions.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-[var(--accent)] transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-[var(--accent)] transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-[var(--accent)] transition-colors">
                  <Youtube size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-[var(--accent)] transition-colors">
                  <Instagram size={20} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-[var(--accent)] transition-colors">AI Solutions</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[var(--accent)] transition-colors">Pricing</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[var(--accent)] transition-colors">Case Studies</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[var(--accent)] transition-colors">About Us</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-[var(--accent)] transition-colors">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[var(--accent)] transition-colors">Terms & Conditions</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[var(--accent)] transition-colors">Cookie Policy</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-[var(--accent)] transition-colors">Legal Notice</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
              <div className="relative mb-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-[#0C0F3F] text-white rounded-full py-2 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] border border-[var(--accent)]/20"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--accent)] hover:text-white transition-colors">
                  <Send size={20} />
                </button>
              </div>
              <p className="text-gray-400 text-sm">
                🚀 Stay ahead with AI automation – Subscribe to our newsletter!
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 ElevAIte Labs. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">
              ElevAIte Labs AG | Bahnhofstrasse 1, 8001 Zürich, Switzerland
              <br />
              VAT: CHE-123.456.789
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;