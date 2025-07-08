// src/components/CaseStudyHero.tsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CaseStudy } from '../data/caseStudiesData';

// --- CORRECCIÓN: Restauramos el componente auxiliar original ---
const HighlightedTitle: React.FC<{ text: string }> = ({ text }) => {
  // Esta lógica divide el texto por los asteriscos y aplica el estilo de gradiente
  const parts = text.split(/(\*.*?\*)/g).filter(part => part);
  return (
    <>
      {parts.map((part, index) => 
        part.startsWith('*') && part.endsWith('*') ? (
          <span key={index} className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            {part.slice(1, -1)}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
};

interface Props {
  data: CaseStudy['hero'];
  studyKey: string;
}

const CaseStudyHero: React.FC<Props> = ({ data, studyKey }) => {
  const { t } = useTranslation();
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacityBg = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const yContent = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  
  return (
    <section ref={targetRef} className="relative min-h-screen bg-gradient-to-br from-orange-100 via-purple-100 to-blue-200 overflow-hidden">
      
      <motion.div
        className="absolute inset-0 z-0 hidden md:block"
        style={{ y: yBg, opacity: opacityBg }}
      />
      
      <motion.div 
        style={{ y: window.innerWidth >= 768 ? yContent : 0 }}
        className="relative z-10 flex flex-col items-center justify-center container mx-auto px-4 text-center h-full pt-28 pb-20"
      >
        <motion.div 
          className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-1.5 rounded-full shadow-md mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-white">
            {t('caseStudies.common.clientSuccessStory', 'Client Success Story')}
          </p>
        </motion.div>

        <motion.h1 
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight text-slate-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {/* El componente ahora recibe el texto traducido y aplica el gradiente correctamente */}
          <HighlightedTitle text={t(`caseStudies.${studyKey}.hero.title`, data.title)} />
        </motion.h1>

        <motion.p 
          className="text-base md:text-lg text-slate-700 mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          {t(`caseStudies.${studyKey}.hero.subtitle`, data.subtitle)}
        </motion.p>
        
        <motion.div 
          className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-6 max-w-5xl mx-auto w-full"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2, delayChildren: 0.8 } }
          }}
        >
          {data.kpis.map((kpi, index) => (
            <motion.div 
              key={index}
              className="bg-white/50 backdrop-blur-md p-3 md:p-6 rounded-2xl md:rounded-xl border border-white/50 shadow-lg flex flex-row items-center justify-between md:flex-col md:justify-center"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 300 } }}
            >
              <div className="text-left md:text-center">
                <p className="text-sm md:text-base text-slate-800 font-medium">
                  {t(`caseStudies.${studyKey}.hero.kpis.${index}.label`, kpi.label)}
                </p>
              </div>
              <div className="text-right md:text-center">
                <div className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 md:mb-2">
                  {kpi.value}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.a 
            href="#CaseStudyIntro"
            className="absolute bottom-1 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            aria-label="Scroll to next section"
        >
          <div className="w-12 h-12 rounded-full border-2 border-slate-900/30 flex items-center justify-center text-slate-900 hover:bg-black/5 transition-colors cursor-pointer">
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                  <ArrowDown className="h-6 w-6"/>
              </motion.div>
          </div>
        </motion.a>
      </motion.div>
    </section>
  );
};

export default CaseStudyHero;