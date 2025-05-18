import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import AnimatedLines from "../components/AnimatedLines";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
      answer: "AOur commitment doesn't end after implementation. Every client receives a dedicated customer success manager, regular performance reviews, ongoing optimization, technical support access, system updates, training for new team members, and strategic consultations as your business evolves."
    },
    {
      question: "How long does the setup process take?",
      answer: "Typically 2-4 weeks, depending on complexity. We work efficiently to get your AI agents operational while ensuring proper integration and optimization."
    },
    {
      question: "Can I integrate with my existing tools?",
      answer: "YYes! Our AI agents integrate with most popular business tools and platforms. During our consultation, we'll review your tech stack and ensure seamless integration."
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
    },
  ];

  return (
    <section id="faq" className="relative px-4 py-20 overflow-hidden bg-[#0C0F3F]">
      <AnimatedLines />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-[var(--accent)]/20 rounded-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[var(--accent)]/5 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-white">{faq.question}</span>
                {openIndex === index ? (
                  <Minus size={20} className="text-[var(--accent)]" />
                ) : (
                  <Plus size={20} className="text-[var(--accent)]" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 text-gray-300 bg-black/20">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
