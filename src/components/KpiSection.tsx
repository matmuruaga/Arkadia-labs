// src/components/KpiSection.tsx
import React, { useState, useEffect } from 'react'; // Se añaden useState y useEffect
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { TrendingUp, Zap, BarChart4, CheckCircle } from 'lucide-react';
import AnimatedNumber from './AnimatedNumber';

// --- Importaciones de Swiper ---
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Estilos base de Swiper

// --- Hook para detectar el tamaño de la pantalla ---
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


// La data se mantiene exactamente igual
const kpiData = [
    { Icon: TrendingUp, numericValue: 47, suffix: "%", accentColor: "#69DB7C", capsuleText: "Sales Teams", description: "Global law firm automates compiling and analysis of legal docs with our AI.", label: "Reduction In Manual Task Time", impactTitle: "Revenue Impact:", impactDescription: "Transform Your Close Rate Into Consistent Revenue Growth", capsuleKey: "kpi.cards.kpi1.capsule", descriptionKey: "kpi.cards.kpi1.description", labelKey: "kpi.cards.kpi1.label", impactTitleKey: "kpi.cards.kpi1.impactTitle", impactDescriptionKey: "kpi.cards.kpi1.impactDescription" },
    { Icon: Zap, numericValue: 67, suffix: "%", accentColor: "#1C7ED6", capsuleText: "Support Teams", description: "European fintech scales up new hire onboarding using AI agents.", label: "Faster Response & Resolution", impactTitle: "Revenue Impact:", impactDescription: "Transform Your Close Rate Into Consistent Revenue Growth", capsuleKey: "kpi.cards.kpi2.capsule", descriptionKey: "kpi.cards.kpi2.description", labelKey: "kpi.cards.kpi2.label", impactTitleKey: "kpi.cards.kpi2.impactTitle", impactDescriptionKey: "kpi.cards.kpi2.impactDescription" },
    { Icon: BarChart4, numericValue: 90, suffix: "%", accentColor: "#845EEE", capsuleText: "Marketing Teams", description: "Leading SaaS company automates L1 support queries with custom AI.", label: "Increase In Lead Qualification", impactTitle: "Revenue Impact:", impactDescription: "Transform Your Close Rate Into Consistent Revenue Growth", capsuleKey: "kpi.cards.kpi3.capsule", descriptionKey: "kpi.cards.kpi3.description", labelKey: "kpi.cards.kpi3.label", impactTitleKey: "kpi.cards.kpi3.impactTitle", impactDescriptionKey: "kpi.cards.kpi3.impactDescription" },
    { Icon: CheckCircle, numericValue: 34, suffix: "%", accentColor: "#1C7ED6", capsuleText: "Operations", description: "Industrial market leader uses AI agent to augment customer support globally.", label: "Operational Efficiency Boost", impactTitle: "Revenue Impact:", impactDescription: "Transform Your Close Rate Into Consistent Revenue Growth", capsuleKey: "kpi.cards.kpi4.capsule", descriptionKey: "kpi.cards.kpi4.description", labelKey: "kpi.cards.kpi4.label", impactTitleKey: "kpi.cards.kpi4.impactTitle", impactDescriptionKey: "kpi.cards.kpi4.impactDescription" },
];

// --- Componente reutilizable para la tarjeta, para no repetir código ---
const KpiCard = ({ kpi }: { kpi: typeof kpiData[0] }) => {
  const { t } = useTranslation();
  return (
    <div className="text-center flex flex-col items-center bg-white p-6 rounded-2xl shadow-xl border border-gray-100 h-full">
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
      <p className="text-sm text-[#0D1B2A]/80 mb-4 h-20">
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
      <div className="bg-gray-100 p-3 rounded-lg mt-6 w-full">
        <p className="text-xs font-bold text-gray-800">
          {t(kpi.impactTitleKey, kpi.impactTitle)}
        </p>
        <p className="text-xs text-gray-600">
          {t(kpi.impactDescriptionKey, kpi.impactDescription)}
        </p>
      </div>
    </div>
  );
};


const KpiSection = () => {
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const isMobile = width < 768; // El punto de quiebre para móvil es 768px (md)

  return (
    <section 
      id="kpis" 
      className="py-16 md:py-24 bg-gradient-to-br from-[#1C7ED6]/[0.15] via-[#D0BFFF]/[0.10] to-white"
    >
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-20 px-4">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0D1B2A] mb-4">
            {t('kpi.title', 'The ElevAite Impact: Measurable Results')}
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-[#0D1B2A]/75 max-w-3xl mx-auto">
            {t('kpi.subtitle', 'Discover how our crafted AI solutions translate into tangible benefits and significant growth for businesses like yours.')}
          </p>
        </div>
 
        {/* --- LÓGICA DE RENDERIZADO CONDICIONAL --- */}
        {isMobile ? (
          <Swiper
            // Muestra 1 tarjeta y un poco de la siguiente para incitar al swipe
            slidesPerView={1.25} 
            spaceBetween={16}
            className="!px-4" // Padding para que el carrusel no empiece pegado al borde
          >
            {kpiData.map((kpi, index) => (
              <SwiperSlide key={index}>
                <KpiCard kpi={kpi} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15 } }
            }}
          >
            {kpiData.map((kpi, index) => (
              <motion.div 
                key={index}
                variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 }
                }}
              >
                  <KpiCard kpi={kpi} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};
 
export default KpiSection;