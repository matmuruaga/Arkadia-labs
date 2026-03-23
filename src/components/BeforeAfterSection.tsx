// src/components/BeforeAfterSection.tsx
import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Check, X, Zap } from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Optimized hook with debouncing to prevent excessive re-renders
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
  });

  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      // Cancel previous RAF if it exists
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      // Schedule update for next frame
      rafRef.current = requestAnimationFrame(() => {
        setWindowSize({ width: window.innerWidth });
      });
    };

    window.addEventListener("resize", handleResize, { passive: true });
    handleResize(); // Initial call

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return windowSize;
};

const segments = [
    { id: 'sales', labelKey: 'beforeAfter.tabs.sales' },
    { id: 'marketing', labelKey: 'beforeAfter.tabs.marketing' },
    { id: 'operations', labelKey: 'beforeAfter.tabs.operations' },
    { id: 'support', labelKey: 'beforeAfter.tabs.support' },
];
const contentKeysBySegment = {
    sales: ['s1', 's2', 's3', 's4'],
    marketing: ['m1', 'm2', 'm3', 'm4'],
    operations: ['o1', 'o2', 'o3', 'o4'],
    support: ['su1', 'su2', 'su3', 'su4'],
    hr: ['h1', 'h2', 'h3', 'h4'],
};

// --- SUB-COMPONENTE PARA LA TARJETA "ANTES" ---
// Memoized to prevent unnecessary re-renders when parent re-renders
const BeforeCard = memo(({ t, activeSegment }: { t: any; activeSegment: string }) => (
  // SOLUCIÓN 1: Se añade 'flex flex-col' para que el contenido se estire
  <motion.div
    className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200 h-full flex flex-col"
    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
  >
    <h3 className="text-xl md:text-2xl font-semibold text-[#0D1B2A]/80 mb-8 text-center">{t('beforeAfter.challengeTitle')}</h3>
    {/* SOLUCIÓN 1: La lista crece para llenar el espacio */}
    <ul className="space-y-5 flex flex-col flex-grow">
      <AnimatePresence mode="wait">
        {contentKeysBySegment[activeSegment].map((itemKey, index) => (
          <motion.li
            key={`${activeSegment}-${itemKey}`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
            // SOLUCIÓN 1: Cada elemento de la lista crece para alinearse
            className="flex items-start gap-4 flex-grow"
          >
            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <X size={14} className="text-slate-500" strokeWidth={2.5}/>
            </div>
            <div>
              {/* SOLUCIÓN 2: Se reduce el tamaño del texto */}
              <h4 className="font-semibold text-sm text-[#0D1B2A]">{t(`beforeAfter.content.${activeSegment}.${itemKey}.beforeTitle`)}</h4>
              <p className="mt-1 text-sm text-[#0D1B2A]/70">{t(`beforeAfter.content.${activeSegment}.${itemKey}.beforeDescription`)}</p>
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  </motion.div>
));
BeforeCard.displayName = 'BeforeCard';

// --- SUB-COMPONENTE PARA LA TARJETA "DESPUÉS" ---
// Memoized to prevent unnecessary re-renders when parent re-renders
const AfterCard = memo(({ t, activeSegment }: { t: any; activeSegment: string }) => (
  // SOLUCIÓN 1: Se añade 'flex flex-col'
  <motion.div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border-2 border-[#1C7ED6] h-full flex flex-col"
    initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} >
    <h3 className="text-xl md:text-2xl font-semibold text-[#1C7ED6] mb-8 text-center">{t('beforeAfter.solutionTitle')}</h3>
    {/* SOLUCIÓN 1: La lista crece para llenar el espacio */}
    <ul className="space-y-5 flex flex-col flex-grow">
      <AnimatePresence mode="wait">
        {contentKeysBySegment[activeSegment].map((itemKey, index) => (
          <motion.li
            key={`${activeSegment}-${itemKey}`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
            // SOLUCIÓN 1: Cada elemento de la lista crece para alinearse
            className="flex items-start gap-4 flex-grow"
          >
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check size={14} className="text-green-600" strokeWidth={3}/>
              </div>
            <div>
              {/* SOLUCIÓN 2: Se reduce el tamaño del texto */}
              <h4 className="font-semibold text-sm text-[#0D1B2A]">{t(`beforeAfter.content.${activeSegment}.${itemKey}.afterTitle`)}</h4>
              <p className="mt-1 text-sm text-[#0D1B2A]/70">{t(`beforeAfter.content.${activeSegment}.${itemKey}.afterDescription`)}</p>
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  </motion.div>
));
AfterCard.displayName = 'AfterCard';


const BeforeAfterSection = () => {
  const { t, i18n } = useTranslation('home');
  const navigate = useNavigate();
  const [activeSegment, setActiveSegment] = useState('sales');
  const { width } = useWindowSize();
  const isMobile = width < 1024;

  const handleCtaClick = () => {
    navigate(`/${i18n.language}/contact`);
  };

  return (
    <section
      id="before-after"
      className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-sky-50 via-cyan-50 to-teal-50"
    >
      {/* ── Decorative background layer ─────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Ambient orb — top-left sky */}
        <div className="absolute -top-24 -left-24 w-[480px] h-[480px] bg-sky-400/20 rounded-full blur-3xl" />

        {/* Ambient orb — bottom-right teal */}
        <div className="absolute -bottom-24 -right-24 w-[520px] h-[520px] bg-teal-400/20 rounded-full blur-3xl" />

        {/* Centre radial glow — draws the eye to the cards */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-sky-200/25 to-cyan-200/25 rounded-full blur-3xl" />

        {/* Secondary accent orb — upper-right */}
        <div className="absolute top-8 right-1/4 w-64 h-64 bg-cyan-300/15 rounded-full blur-2xl" />

        {/* Subtle dot-grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Título y Filtros */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D1B2A] mb-4">{t('beforeAfter.title')}</h2>
          <p className="text-lg text-[#0D1B2A]/75 max-w-3xl mx-auto">{t('beforeAfter.subtitle')}</p>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12">
          {segments.map(segment => (
            <button key={segment.id} onClick={() => setActiveSegment(segment.id)}
              className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 border ${
                activeSegment === segment.id 
                  ? 'bg-[#1C7ED6] text-white border-[#1C7ED6] shadow-md' 
                  : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50 hover:border-slate-400'
              }`}
            >{t(segment.labelKey)}</button>
          ))}
        </div>

        {/* Renderizado Condicional */}
        {isMobile ? (
          <Swiper
            modules={[Pagination]}
            slidesPerView={1.15}
            spaceBetween={16}
            centeredSlides={true}
            pagination={{ clickable: true }}
            className="!pb-12"
          >
            <SwiperSlide><BeforeCard t={t} activeSegment={activeSegment} /></SwiperSlide>
            <SwiperSlide><AfterCard t={t} activeSegment={activeSegment} /></SwiperSlide>
          </Swiper>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch">
            <BeforeCard t={t} activeSegment={activeSegment} />
            <AfterCard t={t} activeSegment={activeSegment} />
          </div>
        )}

        {/* Botón CTA */}
        <motion.div className="text-center mt-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }} >
          <button onClick={handleCtaClick}
            className="bg-[#0D1B2A] hover:bg-black text-white px-8 py-3.5 rounded-full text-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-slate-400/50 flex items-center justify-center gap-2 mx-auto"
          >
            <Zap size={20} strokeWidth={2.5}/>
            {t('beforeAfter.cta')}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;