// src/components/CaseStudyImpact.tsx
import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { CaseStudy } from '../data/caseStudiesData';
import Icon from './Icon';
import { useTranslation } from 'react-i18next';

// El componente de animación se mantiene igual
function AnimatedNumber({ value, suffix }: { value: number, suffix: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const animation = animate(count, value, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => animation.stop();
  }, [value, count]);

  return (
    <>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </>
  );
}

const themeStyles = {
    blue: { gradient: 'from-blue-500/20 to-indigo-600/10', iconBg: 'bg-blue-500', textColor: 'text-blue-300' },
    green: { gradient: 'from-green-500/20 to-teal-600/10', iconBg: 'bg-green-500', textColor: 'text-green-300' },
    purple: { gradient: 'from-purple-500/20 to-violet-600/10', iconBg: 'bg-purple-500', textColor: 'text-purple-300' },
    orange: { gradient: 'from-amber-500/20 to-orange-600/10', iconBg: 'bg-orange-500', textColor: 'text-orange-300' },
};
const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };
const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

interface Props {
  data: CaseStudy['impact'];
  studyKey: string;
}

const CaseStudyImpact: React.FC<Props> = ({ data, studyKey }) => {
  const { t } = useTranslation();

  if (!data) return null;

  return (
    <section className="bg-gray-900 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white">{t(`caseStudies.${studyKey}.impact.title`)}</h2>
          <p className="text-lg text-gray-400 mt-4">{t(`caseStudies.${studyKey}.impact.subtitle`)}</p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {data.kpis.map((kpi, index) => {
            const styles = themeStyles[kpi.theme];
            const originalValue = String(kpi.value);
            const numericValue = parseFloat(originalValue.replace(/[^0-9.]/g, ''));
            const suffix = originalValue.includes('%') ? '%' : originalValue.includes('x') ? 'x' : '';

            // --- LÓGICA DE DECISIÓN AÑADIDA ---
            // Comprobamos si el valor original contiene caracteres que no queremos animar (como '/')
            const isStaticText = originalValue.includes('/') || isNaN(numericValue);

            return (
              <motion.div
                key={index}
                className={`relative p-8 rounded-2xl text-center shadow-2xl bg-gradient-to-br ${styles.gradient} border border-white/10`}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.03, transition: { type: 'spring', stiffness: 300 } }}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <div className={`mb-5 flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${styles.iconBg} shadow-lg`}>
                    <Icon name={kpi.icon as any} className="h-8 w-8 text-white" />
                  </div>

                  <div className={`text-6xl font-extrabold tracking-tight ${styles.textColor} [text-shadow:0_0_15px_var(--tw-shadow-color)] shadow-black/30`}>
                    {/* Renderizado condicional: o el texto estático o el número animado */}
                    {isStaticText ? (
                      <span>{originalValue}</span>
                    ) : (
                      <AnimatedNumber value={numericValue} suffix={suffix} />
                    )}
                  </div>

                  <p className="mt-2 text-lg font-bold text-white">{t(`caseStudies.${studyKey}.impact.kpis.${index}.label`)}</p>
                  <p className="mt-1 text-sm text-gray-400">{t(`caseStudies.${studyKey}.impact.kpis.${index}.subLabel`)}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudyImpact;