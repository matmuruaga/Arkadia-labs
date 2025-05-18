import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import AnimatedLines from "../components/AnimatedLines";

const SalesTeam = () => {
  const traditional = [
    "Manual hiring requires time, then 3.2 months to hit KPIs",
    "Requires training, management, HR & Benefits (payroll, taxes, etc)",
    "Clocks in/out, goes on vacation, works 8 hours a day",
    "72% of their shifts are spent doing 'busy' work and not revenue producing activities",
    "Inconsistency in performance, burns out, lacks motivation, etc.",
    "Average rep stays in a company for 18 months",
    "High salary cost, low ROI on junior roles",
  ];

  const ai = [
    "1 time build out, and it can hit KPIs within the first 30 days",
    "Training is done instantly, it learns and memorizes immediately",
    "Works 24/7, never takes a day off",
    "99.9% of their shift is spent doing revenue generating activities",
    "Never burns out, always has a great attitude; consistent performance",
    "Zero churn; eliminates need to focus on retention",
    "Delivers high ROI without growing your headcount",
  ];

  return (
    <section className="relative px-4 py-20 overflow-hidden bg-[#0C0F3F]">
      <AnimatedLines />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Why Hire Our AI Sales Team?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Traditional Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-[#0B0E35] p-6 rounded-xl neon-border"
          >
            <h3 className="text-xl font-bold text-white mb-6 text-center">
              Traditional Sales Employees
            </h3>
            <ul className="space-y-4">
              {traditional.map((point, i) => (
                <li key={i} className="flex items-start text-red-400">
                  <X size={18} className="mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* AI Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-[#0B0E35] p-6 rounded-xl neon-border"
          >
            <h3 className="text-xl font-bold text-white mb-6 text-center">
              AI Sales Employees
            </h3>
            <ul className="space-y-4">
              {ai.map((point, i) => (
                <li key={i} className="flex items-start text-green-400">
                  <Check size={18} className="mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-300">{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SalesTeam;
