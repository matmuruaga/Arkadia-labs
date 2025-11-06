// src/components/CaseStudyRoiAnalysis.tsx
import React, { useEffect, useRef } from 'react';
import { motion, animate } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // <-- 1. Importar
import { CaseStudy } from '../data/caseStudiesData';
import Icon from './Icon';

function NumberAnimator({ value, suffix }: { value: number, suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isNaN(value)) return;
    const node = ref.current;
    if (!node) return;

    const controls = animate(0, value, {
      duration: 1.5,
      ease: [0.6, 0.01, 0.3, 0.95],
      onUpdate(latest) {
        node.textContent = Math.round(latest).toString();
      }
    });
    return () => controls.stop();
  }, [value]);

  return (
    <>
      <span ref={ref}>0</span>
      {suffix}
    </>
  );
}

const valueColorClasses = {
  red: 'text-red-600 bg-red-100/50',
  blue: 'text-blue-600 bg-blue-100/50',
  default: 'text-gray-800 bg-gray-100/50',
};

// 2. La interfaz ahora también necesita la clave del estudio
interface Props {
  data: CaseStudy['roiAnalysis'];
  studyKey: string;
}

const CaseStudyRoiAnalysis: React.FC<Props> = ({ data, studyKey }) => {
  const { t } = useTranslation(); // <-- 3. Inicializar
  if (!data) return null;

  return (
    <section className="bg-gray-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 rounded-full shadow-md">
            {/* 4. Usar la función t() para todos los textos */}
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              {t(`caseStudies.${studyKey}.roiAnalysis.title`, data.title)}
            </h2>
          </div>
          <p className="text-lg text-gray-600 mt-4">
            {t(`caseStudies.${studyKey}.roiAnalysis.subtitle`, data.subtitle)}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-stretch">
          <motion.div 
            className="lg:col-span-3 bg-white/60 backdrop-blur-lg p-8 rounded-2xl border border-gray-200 shadow-xl flex flex-col"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {t(`caseStudies.${studyKey}.roiAnalysis.calculator.title`, data.calculator.title)}
            </h3>
            <div className="space-y-3">
              {data.calculator.items.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="flex justify-between items-center bg-white/80 p-4 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                >
                  <span className="font-medium text-gray-600">
                    {t(`caseStudies.${studyKey}.roiAnalysis.calculator.items.${index}.label`, item.label)}
                  </span>
                  <span className={`font-bold text-lg px-3 py-1 rounded-md ${valueColorClasses[item.color]}`}>
                    {t(`caseStudies.${studyKey}.roiAnalysis.calculator.items.${index}.value`, item.value)}
                  </span>
                </motion.div>
              ))}
            </div>
            
            <div className="flex-grow"></div>

            <div className="relative mt-6 rounded-lg bg-green-200/60 overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-green-300 to-teal-400"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 2, ease: [0.6, 0.01, 0.3, 0.9] }}
                    style={{ transformOrigin: 'left' }}
                />
                <div className="relative p-8 text-center z-10">
                    <p className="text-7xl font-extrabold text-teal-900">
                      <NumberAnimator value={data.calculator.finalRoi.value} suffix={t('caseStudies.common.roiSuffix', '% ROI')} />
                    </p>
                    <p className="text-teal-800 font-semibold mt-2">
                      {t(`caseStudies.${studyKey}.roiAnalysis.calculator.finalRoi.label`, data.calculator.finalRoi.label)}
                    </p>
                </div>
            </div>
          </motion.div>

          <div className="lg:col-span-2 space-y-6">
            {data.benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Icon name={benefit.icon as any} className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">
                    {t(`caseStudies.${studyKey}.roiAnalysis.benefits.${index}.title`, benefit.title)}
                  </h4>
                </div>
                <p className="text-gray-600">
                  {t(`caseStudies.${studyKey}.roiAnalysis.benefits.${index}.description`, benefit.description)}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default CaseStudyRoiAnalysis;