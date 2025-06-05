// src/components/FaqSection.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react'; // Using Chevron for open/close indication

interface FaqItem {
  id: number;
  question: string;
  answer: string; // You can also use JSX here if answers need rich formatting
}

// --- YOU NEED TO REPLACE THIS WITH YOUR ACTUAL FAQs ---
const faqData: FaqItem[] = [
  {
    id: 1,
    question: "What kind of AI agents can you build?",
    answer: "We craft a wide range of AI agents tailored to specific business needs, including marketing agents, automation agents for operational tasks, intelligent receptionist agents, sales AI assistants to boost your pipeline, AI-powered support agents for enhanced customer experience, and data analyst agents for insightful reporting."
  },
  {
    id: 2,
    question: "How long does it take to implement a custom AI agent?",
    answer: "The timeline for implementing a custom AI agent can vary depending on the complexity and the integration requirements. Typically, a project can take anywhere from a few weeks to a couple of months. We begin with a discovery phase to fully understand your specific needs and then provide you with a more accurate project estimate."
  },
  {
    id: 3,
    question: "Do your AI agents integrate with existing business tools?",
    answer: "Absolutely. Seamless integration is a core part of our offering. Our AI agents are designed to connect with your existing CRMs (like Salesforce, HubSpot), communication platforms (Slack, email, Teams), calendar tools, databases, and even custom APIs to ensure a smooth workflow."
  },
  {
    id: 4,
    question: "How do you ensure the AI solutions are truly 'crafted' for my business?",
    answer: "Our process begins with a deep dive into your specific operational challenges, workflows, and strategic goals. We don't use one-size-fits-all templates. Each AI agent's logic, tasks, and integrations are custom-designed and developed to provide a truly personalized solution that addresses your unique requirements."
  },
  {
    id: 5,
    question: "What kind of ROI can I expect from an AI agent?",
    answer: "Clients typically see significant ROI through increased efficiency, reduced manual labor costs, improved lead conversion rates, faster response times, and enhanced customer satisfaction. We work with you to define key performance indicators (KPIs) to measure the specific impact on your business."
  }
  // Add more of your FAQs here...
];
// --- END OF PLACEHOLDER DATA ---


const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-white"> {/* Or bg-[#F1F3F5] */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6"> {/* Limiting width for better readability */}
        <motion.div
          className="text-center mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D1B2A] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-[#0D1B2A]/75">
            Find quick answers to common questions about our AI solutions.
          </p>
        </motion.div>

        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {faqData.map((faq, index) => (
            <div key={faq.id} className="border-b border-slate-200 last:border-b-0">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center py-4 sm:py-5 text-left focus:outline-none focus-visible:ring focus-visible:ring-[#1C7ED6]/30 rounded-md"
                aria-expanded={activeIndex === index}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span className="text-md sm:text-lg font-medium text-[#0D1B2A]">
                  {faq.question}
                </span>
                <ChevronDown
                  size={20}
                  className={`transform transition-transform duration-300 text-[#1C7ED6] ${
                    activeIndex === index ? 'rotate-180' : 'rotate-0'
                  }`}
                  strokeWidth={2.5}
                />
              </button>
              <AnimatePresence initial={false}>
                {activeIndex === index && (
                  <motion.div
                    id={`faq-answer-${faq.id}`}
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: 'auto', marginTop: '0px' },
                      collapsed: { opacity: 0, height: 0, marginTop: '0px' },
                    }}
                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <p className="pt-1 pb-4 text-sm sm:text-base text-[#0D1B2A]/80 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;