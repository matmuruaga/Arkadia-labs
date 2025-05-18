import { motion } from 'framer-motion';
import AnimatedLines from '../components/AnimatedLines';
import { Timer, Brain, Rocket } from 'lucide-react';

const Features = () => {
  return (
    <section id="features" className="relative px-4 py-20 overflow-hidden">
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
  );
};

export default Features;
