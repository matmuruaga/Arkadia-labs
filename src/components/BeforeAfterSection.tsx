// src/components/BeforeAfterSection.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, SlidersHorizontal, LineChart, Bot, MessageSquare, Briefcase, Zap } from 'lucide-react';

// La estructura de datos y los segmentos permanecen igual que antes
const beforeAfterDataBySegment = {
    sales: [
      { id: 's1', beforeTitle: 'Inconsistent Follow-ups', beforeDescription: "Leads go cold and opportunities are lost due to sporadic, manual follow-up efforts.", afterTitle: 'AI-Powered Nurturing', afterDescription: "Your agent executes tireless, multi-touch follow-up sequences to ensure no lead is ever forgotten." },
      { id: 's2', beforeTitle: 'Generic Sales Pitches', beforeDescription: "Sales reps use the same script for every prospect, failing to connect with their specific pain points.", afterTitle: 'Dynamic, Personalized Pitches', afterDescription: "The AI provides reps with data-driven talking points and personalized variations for each prospect." },
      { id: 's3', beforeTitle: 'Manual CRM Data Entry', beforeDescription: "Hours are wasted each day logging calls and emails, taking valuable time away from actual selling.", afterTitle: 'Automated Activity Logging', afterDescription: "Every interaction is automatically logged in your CRM in real-time, providing a perfect, effortless record." },
      { id: 's4', beforeTitle: 'Inaccurate Sales Forecasting', beforeDescription: "Forecasts are based on guesswork and gut feelings, leading to unreliable revenue predictions.", afterTitle: 'AI-Driven Predictive Forecasting', afterDescription: "Leverage predictive analytics based on real engagement data for highly accurate, data-driven forecasts." },
      { id: 's5', beforeTitle: 'Time Spent on Lead Research', beforeDescription: "Reps spend more time researching prospects on multiple platforms than actually talking to them.", afterTitle: 'Instant Lead Enrichment', afterDescription: "Your agent instantly enriches leads with company data, social profiles, and key insights." },
    ],
    marketing: [
      { id: 'm1', beforeTitle: 'Broad Audience Targeting', beforeDescription: "Campaigns target wide segments, resulting in low conversion rates and wasted ad spend.", afterTitle: 'AI-Driven Micro-Segmentation', afterDescription: "AI identifies and targets hyper-specific micro-segments with the most relevant messaging." },
      { id: 'm2', beforeTitle: 'Difficult Campaign Attribution', beforeDescription: "It's nearly impossible to know which marketing activities are actually driving revenue.", afterTitle: 'Clear, Real-time ROI Analysis', afterDescription: "Track every touchpoint with AI-powered models that provide a clear view of your marketing ROI." },
      { id: 'm3', beforeTitle: 'Time-Consuming Content Creation', beforeDescription: "The content team is a bottleneck, struggling to produce enough copy for ads, emails, and social media.", afterTitle: 'AI-Assisted Content Generation', afterDescription: "Generate high-quality first drafts for ad copy, email campaigns, and social posts in seconds." },
      { id: 'm4', beforeTitle: 'Low Social Media Engagement', beforeDescription: "Company social media accounts feel static, with slow responses to comments and messages.", afterTitle: 'Automated Social Engagement', afterDescription: "Your AI agent can manage first-level engagement, respond to common questions, and schedule content." },
      { id: 'm5', beforeTitle: 'Static Email Campaigns', beforeDescription: "All users receive the same email drip, regardless of their behavior or engagement level.", afterTitle: 'Dynamic & Adaptive Email Journeys', afterDescription: "AI triggers email journeys that adapt in real-time based on user actions and engagement." },
    ],
    operations: [
      { id: 'o1', beforeTitle: 'Rigid, Manual Workflows', beforeDescription: "Error-prone processes are difficult to follow and scale, creating operational bottlenecks.", afterTitle: 'AI-Powered Process Orchestration', afterDescription: "Flexible automation of complex workflows that dynamically adapt to your business needs." },
      { id: 'o2', beforeTitle: 'Fragmented Data Silos', beforeDescription: "Information is scattered across different systems, making a unified view impossible.", afterTitle: 'Unified Operational Dashboard', afterDescription: "AI aggregates data from all sources into a single, real-time view for better decision-making." },
      { id: 'o3', beforeTitle: 'Reactive Problem Solving', beforeDescription: "Issues are only addressed after they've already caused a disruption to the business.", afterTitle: 'Predictive Maintenance & Alerts', afterDescription: "Your agent can predict potential issues and send alerts before they impact your operations." },
      { id: 'o4', beforeTitle: 'Manual Inventory Management', beforeDescription: "Guesswork in inventory leads to stockouts or overstocking, affecting cash flow and sales.", afterTitle: 'Predictive Inventory Optimization', afterDescription: "AI analyzes sales data and trends to recommend optimal inventory levels automatically." },
      { id: 'o5', beforeTitle: 'Inefficient Resource Allocation', beforeDescription: "Assigning tasks and resources manually often leads to unbalanced workloads and project delays.", afterTitle: 'AI-Powered Resource Scheduling', afterDescription: "Intelligently assign resources based on availability, skill, and priority for maximum efficiency." },
    ],
    support: [
      { id: 'su1', beforeTitle: 'Long Ticket Queues & Wait Times', beforeDescription: "Customers are left waiting for hours or days to get answers to simple questions.", afterTitle: 'Instant L1 Support with 24/7 AI Agents', afterDescription: "Provide immediate answers to common questions around the clock, drastically reducing wait times." },
      { id: 'su2', beforeTitle: 'Agent Burnout from Repetitive Questions', beforeDescription: "Support agents spend most of their day answering the same questions over and over again.", afterTitle: 'Automated FAQ & KB Responses', afterDescription: "Your AI frees up human agents by handling routine inquiries, allowing them to focus on complex cases." },
      { id: 'su3', beforeTitle: 'Lack of Personalization in Service', beforeDescription: "Every customer gets a generic, scripted response that fails to acknowledge their history.", afterTitle: 'Context-Aware, Personalized Support', afterDescription: "The AI agent has full context of the customer's history to provide a truly personal and effective response." },
      { id: 'su4', beforeTitle: 'No Proactive Support', beforeDescription: "You only help customers after they complain, missing opportunities to build loyalty.", afterTitle: 'Proactive Issue Detection & Outreach', afterDescription: "AI can detect signs of customer frustration or potential issues and proactively offer help." },
      { id: 'su5', beforeTitle: 'Limited Support Coverage (9-5)', beforeDescription: "Your global customers can't get help outside of your local business hours.", afterTitle: '24/7 AI-Powered Global Availability', afterDescription: "Offer consistent, high-quality support to all your customers, no matter their time zone." },
    ],
    hr: [
      { id: 'h1', beforeTitle: 'Manual CV Screening Overload', beforeDescription: "HR managers spend countless hours reading through hundreds of irrelevant resumes.", afterTitle: 'AI-Powered Candidate Matching', afterDescription: "Your AI agent automatically screens, scores, and shortlists the most qualified candidates for any role." },
      { id: 'h2', beforeTitle: 'Chaotic Interview Scheduling', beforeDescription: "The back-and-forth emails to schedule a single interview can take days.", afterTitle: 'Automated Calendar Coordination', afterDescription: "The AI coordinates with candidates and interviewers to find the perfect time and books it automatically." },
      { id: 'h3', beforeTitle: 'Generic Employee Onboarding', beforeDescription: "New hires receive a standard package that doesn't cater to their specific role or needs.", afterTitle: 'Personalized Onboarding Journeys', afterDescription: "Create unique onboarding experiences with an AI agent that guides new hires through their specific tasks." },
      { id: 'h4', beforeTitle: 'Time-Consuming FAQ Answering', beforeDescription: "HR staff are constantly interrupted with the same questions about policies, payroll, and benefits.", afterTitle: 'Instant HR & Policy AI Assistant', afterDescription: "An internal AI assistant provides instant, accurate answers to employee questions 24/7." },
      { id: 'h5', beforeTitle: 'Low Employee Engagement Insights', beforeDescription: "Annual surveys provide stale data that is difficult to act upon in a timely manner.", afterTitle: 'AI-Powered Engagement Analysis', afterDescription: "AI analyzes feedback from multiple channels in real-time to provide a constant pulse on team morale." },
    ],
  };

const segments = [
  { id: 'sales', label: 'Sales', icon: LineChart },
  { id: 'marketing', label: 'Marketing', icon: SlidersHorizontal },
  { id: 'operations', label: 'Operations', icon: Bot },
  { id: 'support', label: 'Support', icon: MessageSquare },
  { id: 'hr', label: 'HR & Recruitment', icon: Briefcase },
];

const BeforeAfterSection = () => {
  const [activeSegment, setActiveSegment] = useState('sales');

  const handleCtaClick = () => {
    console.log('CTA Button Clicked');
    // Example action: window.location.href = '/get-started';
  };

  return (
    <section 
      id="before-after" 
      // --- NUEVO FONDO DE SECCIÓN CON IMAGEN DE GRADIENTE ---
      className="py-16 md:py-24 bg-cover bg-center"
      style={{ backgroundImage: `url('https://res.cloudinary.com/dwhidn4z1/image/upload/v1749465078/background_gradient_egn6ba.png')` }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D1B2A] mb-4">
            The ElevAIte Transformation: Before & After
          </h2>
          <p className="text-lg text-[#0D1B2A]/75 max-w-3xl mx-auto">
            Select a department to see how our custom AI agents outperform traditional tools.
          </p>
        </motion.div>

        {/* --- Filtros de Segmento con Estilo Corregido --- */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {segments.map(segment => (
            <motion.button
              key={segment.id}
              onClick={() => setActiveSegment(segment.id)}
              className={`px-4 py-2 text-sm sm:text-base font-semibold rounded-full transition-all duration-300
                ${activeSegment === segment.id 
                  ? 'bg-[#1C7ED6] text-white shadow-lg' // Estilo activo
                  : 'bg-white/70 backdrop-blur-sm text-[#0D1B2A]/70 hover:bg-white' // Estilo inactivo
                }`}
              whileTap={{ scale: 0.95 }}
            >
              {segment.label}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch">
          {/* Columna "Antes" */}
          <motion.div 
            className="bg-white/50 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-md border border-white/20 h-full"
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}
          >
            <h3 className="text-xl md:text-2xl font-semibold text-[#0D1B2A]/80 mb-6 text-center">The Manual Challenge</h3>
            <ul className="space-y-6">
              <AnimatePresence mode="wait">
                {beforeAfterDataBySegment[activeSegment].map((item, index) => (
                  <motion.li key={`${activeSegment}-${item.id}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2, delay: index * 0.05 }} className="flex items-start gap-3" >
                    <XCircle className="text-red-500/80 mt-1 flex-shrink-0" size={20} strokeWidth={2} /> 
                    <div><h4 className="font-semibold text-[#0D1B2A]">{item.beforeTitle}</h4><p className="mt-1 text-sm text-[#0D1B2A]/70">{item.beforeDescription}</p></div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </motion.div>

          {/* Columna "Después" con Borde de Gradiente */}
          <motion.div className="p-1 bg-gradient-to-br from-[#D0BFFF] via-[#1C7ED6] to-[#69DB7C] rounded-2xl shadow-xl h-full"
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }} >
            <div className="bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-xl h-full">
              <h3 className="text-xl md:text-2xl font-semibold text-[#1C7ED6] mb-6 text-center">The ElevAIte Solution</h3>
              <ul className="space-y-6">
                <AnimatePresence mode="wait">
                  {beforeAfterDataBySegment[activeSegment].map((item, index) => (
                    <motion.li key={`${activeSegment}-${item.id}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2, delay: index * 0.05 }} className="flex items-start gap-3" >
                      <CheckCircle2 className="text-[#69DB7C] mt-1 flex-shrink-0" size={20} strokeWidth={2.5} /> 
                      <div><h4 className="font-semibold text-[#0D1B2A]">{item.afterTitle}</h4><p className="mt-1 text-sm text-[#0D1B2A]/70">{item.afterDescription}</p></div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* --- NUEVO BOTÓN DE CALL TO ACTION --- */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <button
            onClick={handleCtaClick}
            className="bg-[#0D1B2A] hover:bg-black text-white px-8 py-3.5 rounded-lg text-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-slate-400/50 flex items-center justify-center gap-2"
          >
            <Zap size={20} strokeWidth={2.5}/>
            Start Automating Now
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default BeforeAfterSection;