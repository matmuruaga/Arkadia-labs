// src/components/CaseStudyChallenge.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // <-- 1. Importar
import { CaseStudy } from '../data/caseStudiesData';
import Icon from './Icon';
import { Quote } from 'lucide-react';

// 2. La interfaz ahora también necesita la clave del estudio
interface Props {
  data: CaseStudy['challengeSection'];
  studyKey: string;
}

const CaseStudyChallenge: React.FC<Props> = ({ data, studyKey }) => {
  const { t } = useTranslation(); // <-- 3. Inicializar

  return (
    <section className="bg-gray-50 py-24">
      <div className="container mx-auto px-4">

        {/* --- Parte 1: The Challenge --- */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
          >
            {/* 4. Usar la función t() para todos los textos */}
            <div className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 rounded-full shadow-md">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                {t(`caseStudies.${studyKey}.challengeSection.title`, data.title)}
              </h2>
            </div>
          </motion.div>
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t(`caseStudies.${studyKey}.challengeSection.subtitle`, data.subtitle)}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {data.challenges.map((challenge, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="flex items-center mb-4">
                <div className="inline-block bg-red-100 p-3 rounded-full">
                  <Icon name={challenge.icon as any} className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t(`caseStudies.${studyKey}.challengeSection.challenges.${index}.title`, challenge.title)}
              </h3>
              <p className="text-gray-600 mb-4">
                {t(`caseStudies.${studyKey}.challengeSection.challenges.${index}.description`, challenge.description)}
              </p>
              <p className="font-semibold text-red-700">
                <span className="font-bold">{t('caseStudies.common.impactLabel', 'Impacto')}:</span> {t(`caseStudies.${studyKey}.challengeSection.challenges.${index}.impact`, challenge.impact)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* --- SECCIÓN "THE CORE PROBLEM" --- */}
        <div className="mt-20 max-w-4xl mx-auto">
          <motion.div 
            className="relative bg-white p-10 sm:p-12 rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Quote className="absolute top-4 left-4 h-24 w-24 text-gray-100/80 -translate-x-4 -translate-y-4" />
            
            <div className="relative text-center z-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {t(`caseStudies.${studyKey}.challengeSection.coreProblem.title`, data.coreProblem.title)}
              </h3>
              <blockquote className="text-xl md:text-2xl italic text-slate-700 leading-relaxed">
                "{t(`caseStudies.${studyKey}.challengeSection.coreProblem.quote`, data.coreProblem.quote)}"
              </blockquote>
              <cite className="block mt-8 text-slate-500 font-semibold not-italic">
                — {t(`caseStudies.${studyKey}.challengeSection.coreProblem.author`, data.coreProblem.author)}
              </cite>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default CaseStudyChallenge;