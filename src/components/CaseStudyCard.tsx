// src/components/CaseStudyCard.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react'; 
import { CaseStudy } from '../data/caseStudiesData';

// Helper para resaltar texto (sin cambios)
const HighlightedTitle: React.FC<{ text: string }> = ({ text }) => {
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
  study: CaseStudy;
  slug: string;
}

const CaseStudyCard: React.FC<Props> = ({ study, slug }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const currentLang = location.pathname.split('/')[1] || 'es';
  const kpiPills = study.impact.kpis.slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      whileHover={{ 
        y: -10, 
        scale: 1.03,
        boxShadow: "0px 15px 40px rgba(71, 106, 209, 0.25)",
        transition: { type: 'spring', stiffness: 300, damping: 20 } 
      }}
      className="h-full"
    >
      <Link 
        to={`/${currentLang}/case-studies/${slug}`} 
        className="block bg-white/60 backdrop-blur-xl border border-white/70 rounded-2xl shadow-lg h-full group overflow-hidden"
      >
        <div className="p-8 flex flex-col h-full text-center">
          
          <div className="flex justify-center items-center mb-6 h-12 w-full">
            {study.client.logoUrl && (
              <img 
                src={study.client.logoUrl} 
                alt={`${study.client.name} logo`} 
                className="max-h-full max-w-[160px] object-contain" 
              />
            )}
          </div>
          
          <h3 className="text-xl font-bold text-slate-800 leading-snug">
            <HighlightedTitle text={t(`caseStudies.${slug}.hero.title`, study.hero.title)} />
          </h3>
          
          {/* --- SOLUCIÓN 1: Se añade un espaciador flexible --- */}
          {/* Este div empuja todo lo que viene después hacia el fondo de la tarjeta */}
          <div className="flex-grow"></div>

          {/* --- SOLUCIÓN 2: Contenedor de KPIs corregido --- */}
          <div className="grid grid-cols-2 gap-4 mt-6 text-center">
            {kpiPills.map((kpi, index) => (
              <div key={kpi.label}>
                <div className="flex items-center justify-center gap-x-1.5">
                  <p className="text-2xl font-bold text-blue-600">{kpi.value}</p>
                  {kpi.trend === 'positive' && <TrendingUp className="h-5 w-5 text-green-500" />}
                  {kpi.trend === 'negative' && <TrendingDown className="h-5 w-5 text-red-500" />}
                </div>
                <p className="text-xs text-slate-600 font-semibold leading-tight mt-1">
                  {t(`caseStudies.${slug}.impact.kpis.${index}.label`, kpi.label)}
                </p>
                {kpi.subLabel && (
                  <p className="text-xs text-slate-400 leading-tight">
                    {t(`caseStudies.${slug}.impact.kpis.${index}.subLabel`, kpi.subLabel)}
                  </p>
                )}
              </div>
            ))}
          </div>
          
          <div className="pt-6">
            <span className="inline-block px-6 py-3 font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg transform transition duration-200 ease-out border-b-4 border-blue-800 group-hover:border-b-2 group-active:border-b-0 group-active:translate-y-1 group-hover:translate-y-px">
              <span className="flex items-center justify-center">
                {t('case_studies_index.cta')}
                <ArrowRight className="h-5 w-5 ml-2" />
              </span>
            </span>
          </div>
        </div>
      </Link >
    </motion.div>
  );
};

export default CaseStudyCard;