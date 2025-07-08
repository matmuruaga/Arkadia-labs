// src/components/CaseStudyImpact.tsx
import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // <-- 1. Importar
import { CaseStudy } from '../data/caseStudiesData';
import Icon from './Icon';

function AnimatedNumber({ value, suffix }: { value: number, suffix: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
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

// 2. La interfaz ahora también necesita la clave del estudio
interface Props {
  data: CaseStudy['impact'];
  studyKey: string;
}
const backgroundImageUrl = 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1750796289/Gradient__42_klhn8c.jpg';

const CaseStudyImpact: React.FC<Props> = ({ data, studyKey }) => {
  const { t } = useTranslation(); // <-- 3. Inicializar

  return (
    <section 
      className="relative py-24 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${backgroundImageUrl})` }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* 4. Usar la función t() para todos los textos */}
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            {t(`caseStudies.${studyKey}.impact.title`, data.title)}
          </h2>
          <p className="text-lg text-gray-400 mt-4">
            {t(`caseStudies.${studyKey}.impact.subtitle`, data.subtitle)}
          </p>
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
            const numericValue = parseFloat(String(kpi.value).replace(/[^0-9.]/g, ''));
            const suffix = String(kpi.value).includes('%') ? '%' : String(kpi.value).includes('x') ? 'x' : '';
            
            return (
              <motion.div
                key={kpi.label} 
                className={`relative p-8 rounded-2xl text-center shadow-2xl bg-gradient-to-br ${styles.gradient} border border-white/10`}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.03, transition: { type: 'spring', stiffness: 300 } }}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <div className={`mb-5 flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${styles.iconBg} shadow-lg`}>
                    <Icon name={kpi.icon as any} className="h-8 w-8 text-white" />
                  </div>

                  <div className={`text-6xl font-extrabold tracking-tight ${styles.textColor} [text-shadow:0_0_15px_var(--tw-shadow-color)] shadow-black/30`}>
                    <AnimatedNumber value={numericValue} suffix={suffix} />
                  </div>
                  
                  <p className="mt-2 text-lg font-bold text-white">
                    {t(`caseStudies.${studyKey}.impact.kpis.${index}.label`, kpi.label)}
                  </p>
                  <p className="mt-1 text-sm text-gray-400">
                    {t(`caseStudies.${studyKey}.impact.kpis.${index}.subLabel`, kpi.subLabel)}
                  </p>
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