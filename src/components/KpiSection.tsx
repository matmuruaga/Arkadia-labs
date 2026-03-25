// src/components/KpiSection.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { TrendingUp, Zap, BarChart4, CheckCircle } from 'lucide-react';
import AnimatedNumber from './AnimatedNumber';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};

const kpiData = [
    { Icon: TrendingUp, numericValue: 75, suffix: "%", accentColor: "#69DB7C", capsuleText: "Sales Teams", description: "Global law firm automates compiling and analysis of legal docs with our AI.", label: "Reduction In Manual Task Time", capsuleKey: "kpi.cards.kpi1.capsule", descriptionKey: "kpi.cards.kpi1.description", labelKey: "kpi.cards.kpi1.label" },
    { Icon: Zap, numericValue: 3, suffix: "x", accentColor: "#1C7ED6", capsuleText: "Support Teams", description: "European fintech scales up new hire onboarding using AI agents.", label: "Faster Response & Resolution", capsuleKey: "kpi.cards.kpi2.capsule", descriptionKey: "kpi.cards.kpi2.description", labelKey: "kpi.cards.kpi2.label" },
    { Icon: BarChart4, numericValue: 40, suffix: "%", accentColor: "#845EEE", capsuleText: "Marketing Teams", description: "Leading SaaS company automates L1 support queries with custom AI.", label: "Increase In Lead Qualification", capsuleKey: "kpi.cards.kpi3.capsule", descriptionKey: "kpi.cards.kpi3.description", labelKey: "kpi.cards.kpi3.label" },
    { Icon: CheckCircle, numericValue: 90, suffix: "%", accentColor: "#1C7ED6", capsuleText: "Operations", description: "Industrial market leader uses AI agent to augment customer support globally.", label: "Operational Efficiency Boost", capsuleKey: "kpi.cards.kpi4.capsule", descriptionKey: "kpi.cards.kpi4.description", labelKey: "kpi.cards.kpi4.label" },
];

// Componente para el contenido de la tarjeta, para no repetir código
const CardContent = ({ kpi, t }: { kpi: typeof kpiData[0], t: any }) => (
  <>
    <div
      className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-5"
      style={{ backgroundColor: kpi.accentColor }}
    >
      {t(kpi.capsuleKey, kpi.capsuleText)}
    </div>
    <div 
      className="inline-block p-4 rounded-full mb-4" 
      style={{ backgroundColor: `${kpi.accentColor}20` }}
    >
      <kpi.Icon size={32} strokeWidth={2} style={{ color: kpi.accentColor }} />
    </div>
    <p className="text-sm text-[#0D1B2A]/80 mb-4 min-h-[60px]">
      {t(kpi.descriptionKey, kpi.description)}
    </p>
    <div className="flex-grow"></div>
    <AnimatedNumber
      targetValue={kpi.numericValue}
      suffix={kpi.suffix}
      className="block text-7xl sm:text-8xl font-extrabold py-1" 
      style={{ color: '#1a202c' }}
      duration={2}
    />
    <p className="text-md font-semibold text-[#0D1B2A] mt-1 capitalize">
      {t(kpi.labelKey, kpi.label)}
    </p>
  </>
);


const KpiSection = () => {
  const { t } = useTranslation('home');
  const { width } = useWindowSize();
  const isMobile = width < 768;

  return (
    <section
      id="kpis"
      className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-sky-50/30"
    >
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0D1B2A] mb-4">
            {t('kpi.title')}
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-[#0D1B2A]/75 max-w-3xl mx-auto">
            {t('kpi.subtitle', 'Discover how our crafted AI solutions translate into tangible benefits and significant growth for businesses like yours.')}
          </p>
        </div>
 
        {isMobile ? (
          <Swiper
            slidesPerView={1.25} 
            spaceBetween={24}
            className="!px-4 !py-4" // Padding para ver las sombras y rotaciones
          >
            {kpiData.map((kpi, index) => (
              <SwiperSlide key={index}>
                <div className="relative group cursor-pointer h-full">
                  {/* Tarjeta Trasera */}
                  <div className="absolute inset-0 bg-white/50 border border-gray-300 rounded-2xl transform rotate-6 transition-transform duration-300 group-hover:rotate-0"></div>
                  {/* Tarjeta Frontal */}
                  <div className="relative text-center flex flex-col items-center bg-white p-6 rounded-2xl shadow-xl border border-gray-100 h-full transform -rotate-1 transition-transform duration-300 group-hover:rotate-0">
                    <CardContent kpi={kpi} t={t} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {kpiData.map((kpi, index) => (
              <motion.div
                key={index}
                className="relative group cursor-pointer" // `group` para controlar el hover de los hijos
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                {/* --- TARJETA TRASERA DECORATIVA --- */}
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl transform rotate-3 transition-transform duration-500 ease-out group-hover:rotate-0"></div>
                
                {/* --- TARJETA FRONTAL CON CONTENIDO --- */}
                <div className="relative text-center flex flex-col items-center bg-white p-6 rounded-2xl shadow-xl border border-gray-100 h-full transform -rotate-1 transition-transform duration-500 ease-out group-hover:rotate-0">
                  <CardContent kpi={kpi} t={t} />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
 
export default KpiSection;