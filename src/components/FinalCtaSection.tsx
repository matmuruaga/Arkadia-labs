// src/components/FinalCtaSection.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { trackCtaClick } from '@/utils/dataLayer';

const cyclingWordsData = [
  { textKey: "finalCta.cyclingWords.w1", colorClass: "from-[#1C7ED6] to-[#69DB7C]" },
  { textKey: "finalCta.cyclingWords.w2", colorClass: "from-[#69DB7C] to-[#D0BFFF]" },
  { textKey: "finalCta.cyclingWords.w3", colorClass: "from-[#D0BFFF] to-[#1C7ED6]" },
  { textKey: "finalCta.cyclingWords.w4", colorClass: "from-[#1C7ED6] to-[#D0BFFF]" },
  { textKey: "finalCta.cyclingWords.w5", colorClass: "from-[#69DB7C] to-[#1C7ED6]" }
];

const FinalCtaSection = () => {
  // 2. Obtener i18n para el idioma y inicializar navigate
  const { t, i18n } = useTranslation(); 
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cyclingWordsData.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // 3. Crear funciones para manejar la navegación con tracking
  const handlePrimaryCtaClick = () => {
    trackCtaClick('get_started', 'final_cta_section', t('finalCta.primaryCta'));
    navigate(`/${i18n.language}/contact`);
  };

  const handleSecondaryCtaClick = () => {
    trackCtaClick('talk_to_us', 'final_cta_section', t('finalCta.secondaryCta'));
    navigate(`/${i18n.language}/contact`);
  };

  return (
    <section id="final-cta" className="py-20 md:py-24 bg-[#F1F3F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          className="relative"
          initial="initial"
          whileHover="hover"
        >
          <motion.div
            aria-hidden="true"
            className="absolute -inset-2 sm:-inset-4 md:-inset-6 bg-gradient-to-br from-[#D0BFFF] via-[#1C7ED6] to-[#69DB7C] rounded-[3rem] blur-2xl -z-10"
            variants={{
              initial: { opacity: 0, scale: 0.95 },
              hover: { opacity: 0.7, scale: 1.05 }
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
          
          <div 
            className="relative z-10 p-8 md:p-12 lg:p-16 rounded-[2.5rem] shadow-xl 
                       bg-gradient-to-br from-violet-100 via-sky-100 to-emerald-100"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0D1B2A] leading-tight mb-10">
              <div className="flex flex-col items-center">
                <span>{t('finalCta.heading.part1')}</span>
                <div 
                  className="relative my-1"
                  style={{ height: '1.2em' }} 
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentIndex}
                      className={`inline-block bg-clip-text text-transparent bg-gradient-to-r ${cyclingWordsData[currentIndex].colorClass}`}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-100%", opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      {t(cyclingWordsData[currentIndex].textKey)}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span>{t('finalCta.heading.part2')}</span>
              </div>
            </h2>

            <p className="text-lg md:text-xl text-[#0D1B2A]/75 max-w-2xl mx-auto mb-10">
              {t('finalCta.description')}
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
              <button
                onClick={handlePrimaryCtaClick}
                className="w-full sm:w-auto bg-[#1C7ED6] hover:bg-[#155CB0] text-white px-8 py-3.5 rounded-lg text-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#1C7ED6]/30 flex items-center justify-center gap-2"
              >
                {t('finalCta.primaryCta')}
                <ArrowRight size={20} strokeWidth={2.5}/>
              </button>
              <button
                onClick={handleSecondaryCtaClick}
                className="w-full sm:w-auto border-2 border-[#0D1B2A]/30 hover:border-[#1C7ED6] text-[#0D1B2A] hover:text-[#1C7ED6] px-8 py-3.5 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-[#1C7ED6]/10 focus:outline-none focus:ring-4 focus:ring-[#1C7ED6]/20 flex items-center justify-center gap-2"
              >
                 <MessageCircle size={20} strokeWidth={2.5}/>
                 {t('finalCta.secondaryCta')}
              </button>
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default FinalCtaSection;