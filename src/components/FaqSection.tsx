// src/components/FaqSection.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { trackFaqToggle } from '@/utils/dataLayer';

// 2. La data ahora solo contiene los IDs y las claves de traducción
const faqData = [
  { id: 1, questionKey: 'faq.questions.q1.question', answerKey: 'faq.questions.q1.answer' },
  { id: 2, questionKey: 'faq.questions.q2.question', answerKey: 'faq.questions.q2.answer' },
  { id: 3, questionKey: 'faq.questions.q3.question', answerKey: 'faq.questions.q3.answer' },
  { id: 4, questionKey: 'faq.questions.q4.question', answerKey: 'faq.questions.q4.answer' },
  { id: 5, questionKey: 'faq.questions.q5.question', answerKey: 'faq.questions.q5.answer' },
];

const FaqSection = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    const isOpening = activeIndex !== index;
    const faq = faqData[index];

    if (isOpening) {
      // Track FAQ expansion
      trackFaqToggle(t(faq.questionKey), 'open');
    }

    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* 4. Usar la función t() para traducir */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D1B2A] mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-lg text-[#0D1B2A]/75">
            {t('faq.subtitle')}
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
                  {t(faq.questionKey)}
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
                      {t(faq.answerKey)}
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