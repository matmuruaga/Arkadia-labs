// src/components/solutions/SolutionFAQ.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SolutionFAQ as SolutionFAQType } from '@/data/solutions/types';
import { trackFaqToggle } from '@/utils/dataLayer';

interface Props {
  data: SolutionFAQType;
  solutionId: string;
}

const SolutionFAQ: React.FC<Props> = ({ data, solutionId }) => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    const isOpening = openIndex !== index;
    setOpenIndex(isOpening ? index : null);
    trackFaqToggle(data.faqs[index].question, isOpening ? 'open' : 'close');
  };

  return (
    <section className="py-12 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6 md:mb-12"
          >
            <div className="inline-flex items-center gap-1.5 md:gap-2 bg-amber-50 text-amber-600 px-3 md:px-4 py-1 md:py-1.5 rounded-full mb-3 md:mb-4">
              <HelpCircle className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="text-xs md:text-sm font-semibold">
                {t(`solutions.${solutionId}.faq.badge`, 'FAQ')}
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 mb-2 md:mb-4">
              {t(`solutions.${solutionId}.faq.title`, data.title)}
            </h2>

            <p className="text-sm md:text-lg text-slate-600 max-w-2xl mx-auto hidden md:block">
              {t(`solutions.${solutionId}.faq.subtitle`, data.subtitle)}
            </p>
          </motion.div>

          {/* FAQ Accordion */}
          <div className="space-y-2 md:space-y-4">
            {data.faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`border rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? 'border-sky-200 shadow-md md:shadow-lg shadow-sky-100/50 bg-gradient-to-br from-sky-50/50 to-cyan-50/50'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => handleToggle(index)}
                    className="w-full flex items-center justify-between p-3 md:p-6 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-content-${solutionId}-${index}`}
                    id={`faq-button-${solutionId}-${index}`}
                  >
                    <div className="flex items-center gap-2.5 md:gap-4">
                      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center transition-colors flex-shrink-0 ${
                        isOpen
                          ? 'bg-gradient-to-br from-sky-500 to-teal-600 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
                      </div>
                      <h3 className={`text-sm md:text-lg font-semibold transition-colors leading-tight ${
                        isOpen ? 'text-blue-600' : 'text-slate-900'
                      }`}>
                        {t(`solutions.${solutionId}.faq.faqs.${index}.question`, faq.question)}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 md:h-5 md:w-5 flex-shrink-0 ml-2 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        id={`faq-content-${solutionId}-${index}`}
                        role="region"
                        aria-labelledby={`faq-button-${solutionId}-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-3 pb-3 pl-[52px] md:px-6 md:pb-6 md:pl-20">
                          <p className="text-xs md:text-base text-slate-600 leading-relaxed">
                            {t(`solutions.${solutionId}.faq.faqs.${index}.answer`, faq.answer)}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-6 md:mt-12 text-center"
          >
            <p className="text-xs md:text-base text-slate-600 mb-2 md:mb-4">
              {t(`solutions.${solutionId}.faq.moreQuestions`, 'Still have questions?')}
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 md:gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors text-sm md:text-base"
            >
              <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
              {t(`solutions.${solutionId}.faq.contactUs`, 'Contact our team')}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolutionFAQ;
