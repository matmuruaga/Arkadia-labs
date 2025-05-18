import { motion } from 'framer-motion';
import AnimatedLines from './AnimatedLines';
import { UserCircle, Settings, BarChart, Check } from 'lucide-react';

const Features2 = () => {
  return (
    <section className="bg-[#0C0F3F] relative overflow-hidden py-20 px-4">
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
  );
};

export default Features2;
