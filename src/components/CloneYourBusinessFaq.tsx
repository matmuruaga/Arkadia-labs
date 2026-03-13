// src/components/CloneYourBusinessFaq.tsx
// FAQ section for /clone-your-business page.
// Dark-themed accordion with 6 business-cloning-specific questions.
// Includes FAQPage JSON-LD structured data for rich results.

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { trackFaqToggle } from '@/utils/dataLayer';

// ============================================================================
// Data — translation keys only
// ============================================================================

const FAQ_KEYS = [
  { id: 1, questionKey: 'cloneYourBusiness.faq.questions.q1.question', answerKey: 'cloneYourBusiness.faq.questions.q1.answer' },
  { id: 2, questionKey: 'cloneYourBusiness.faq.questions.q2.question', answerKey: 'cloneYourBusiness.faq.questions.q2.answer' },
  { id: 3, questionKey: 'cloneYourBusiness.faq.questions.q3.question', answerKey: 'cloneYourBusiness.faq.questions.q3.answer' },
  { id: 4, questionKey: 'cloneYourBusiness.faq.questions.q4.question', answerKey: 'cloneYourBusiness.faq.questions.q4.answer' },
  { id: 5, questionKey: 'cloneYourBusiness.faq.questions.q5.question', answerKey: 'cloneYourBusiness.faq.questions.q5.answer' },
  { id: 6, questionKey: 'cloneYourBusiness.faq.questions.q6.question', answerKey: 'cloneYourBusiness.faq.questions.q6.answer' },
];

// ============================================================================
// Component
// ============================================================================

const CloneYourBusinessFaq: React.FC = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // FAQPage JSON-LD for rich results and AEO
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_KEYS.map((faq) => ({
      '@type': 'Question',
      name: t(faq.questionKey),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(faq.answerKey),
      },
    })),
  };

  const toggleFaq = (index: number) => {
    const isOpening = activeIndex !== index;
    if (isOpening) {
      trackFaqToggle(t(FAQ_KEYS[index].questionKey), 'open');
    }
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <section
        id="faq"
        className="relative py-20 md:py-28 px-4 overflow-hidden bg-[#F8F9FA]"
        aria-labelledby="faq-heading"
      >
        {/* Subtle background decoration */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-blue-300/40 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-blue-300/40 to-transparent" />
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-blue-200 bg-blue-50 text-blue-600 mb-5">
              <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
              {t('cloneYourBusiness.faq.badge')}
            </span>

            <h2
              id="faq-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D1B2A] mb-4 leading-tight"
            >
              {t('cloneYourBusiness.faq.title')}
            </h2>
            <p className="text-lg text-[#0D1B2A]/65 max-w-2xl mx-auto">
              {t('cloneYourBusiness.faq.subtitle')}
            </p>
          </motion.div>

          {/* Accordion */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={{ once: true }}
          >
            {FAQ_KEYS.map((faq, index) => (
              <div
                key={faq.id}
                className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 rounded-xl"
                  aria-expanded={activeIndex === index}
                  aria-controls={`clone-faq-answer-${faq.id}`}
                >
                  <span className="text-base sm:text-lg font-semibold text-[#0D1B2A] pr-4">
                    {t(faq.questionKey)}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`shrink-0 flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300 ${
                      activeIndex === index
                        ? 'bg-blue-600 text-white rotate-180'
                        : 'bg-slate-100 text-slate-500 rotate-0'
                    }`}
                  >
                    <ChevronDown size={16} strokeWidth={2.5} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {activeIndex === index && (
                    <motion.div
                      id={`clone-faq-answer-${faq.id}`}
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: 'auto' },
                        collapsed: { opacity: 0, height: 0 },
                      }}
                      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm sm:text-base text-[#0D1B2A]/70 leading-relaxed border-t border-slate-100 pt-4">
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
    </>
  );
};

export default CloneYourBusinessFaq;
