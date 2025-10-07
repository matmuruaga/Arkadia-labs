import { motion } from "framer-motion";
import AnimatedLines from "../components/AnimatedLines";
import { Timer, Brain, Rocket, UserCircle } from "lucide-react";

const Solutions = () => {
  const solutions = [
    {
      icon: Timer,
      title: "Automate What Slows You Down",
      description: "We eliminate time-wasting tasks so your team can focus on what matters — closing more deals, faster.",
    },
    {
      icon: Brain,
      title: "Capture Every Revenue Opportunity",
      description: "Our AI agents respond instantly, 24/7 — no missed leads, no slow replies, just continuous conversion.",
    },
    {
      icon: Rocket,
      title: "Accelerate Your Sales Cycle",
      description: "Remove bottlenecks, eliminate delays, and close deals faster than your competitors.",
    },
    {
      icon: UserCircle,
      title: "Ongoing Support",
      description: "We don't disappear after setup. Our team helps your AI systems evolve with your growth — every step of the way.",
    },
  ];

  return (
    <section id="solutions" className="relative px-4 py-20 overflow-hidden bg-[#0C0F3F]">
      <AnimatedLines />
      <div className="max-w-6xl mx-auto relative z-10 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold gradient-text mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          How Arkadia Labs AI Systems Solve This Problem
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {solutions.map((item, index) => (
            <motion.div
              key={index}
              className="bg-[#0B0E35] rounded-xl p-6 text-white text-center shadow-md neon-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 rounded-full bg-[var(--accent)] flex items-center justify-center mx-auto mb-6">
                <item.icon size={28} className="text-[#0C0F3F]" />
              </div>
              <h3 className="text-lg font-bold mb-3">{item.title}</h3>
              <p className="text-gray-300 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <button className="bg-[var(--accent)] hover:bg-[var(--secondary)] text-[var(--primary)] hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 neon-border">
            Boost My Revenue
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Solutions;
