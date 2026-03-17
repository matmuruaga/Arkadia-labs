// src/components/FaqSection.tsx
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
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
  const { t } = useTranslation('home');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // FAQPage JSON-LD for rich results and AEO
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
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
    const faq = faqData[index];

    if (isOpening) {
      // Track FAQ expansion
      trackFaqToggle(t(faq.questionKey), 'open');
    }

    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
    </Helmet>
    <section id="faq" className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-sky-50/30">
      {/* Decorative background layer */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Organic contour lines */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40 C 20 20, 40 60, 60 40 S 100 20, 120 40' stroke='%230ea5e9' stroke-width='1' fill='none'/%3E%3Cpath d='M0 60 C 30 40, 50 80, 80 60 S 110 40, 120 60' stroke='%2314b8a6' stroke-width='1' fill='none'/%3E%3Cpath d='M0 80 C 25 60, 45 100, 70 80 S 105 60, 120 80' stroke='%230ea5e9' stroke-width='1' fill='none'/%3E%3Ccircle cx='95' cy='25' r='8' stroke='%2314b8a6' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='95' cy='25' r='14' stroke='%230ea5e9' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
            backgroundSize: '240px 240px',
          }}
        />
        {/* Floating blobs */}
        <div
          className="absolute top-0 left-0 w-[500px] h-[500px] opacity-40 blur-3xl"
          style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(14, 165, 233, 0.2) 0%, transparent 55%)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-35 blur-3xl"
          style={{ background: 'radial-gradient(ellipse at 70% 80%, rgba(20, 184, 166, 0.18) 0%, transparent 55%)' }}
        />
        {/* Scattered organic shapes */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='30' cy='150' rx='25' ry='15' stroke='%230ea5e9' stroke-width='0.8' fill='none' transform='rotate(-15 30 150)'/%3E%3Cellipse cx='170' cy='40' rx='20' ry='12' stroke='%2314b8a6' stroke-width='0.8' fill='none' transform='rotate(20 170 40)'/%3E%3Cpath d='M80 100 Q 100 70, 120 100 T 160 100' stroke='%230ea5e9' stroke-width='0.6' fill='none'/%3E%3C/svg%3E")`,
            backgroundSize: '400px 400px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
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
    </>
  );
};

export default FaqSection;