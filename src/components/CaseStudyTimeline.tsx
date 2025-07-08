// src/components/CaseStudyTimeline.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CaseStudy } from '../data/caseStudiesData';

interface Props {
  data: CaseStudy['timeline'];
  studyKey: string;
}

const CaseStudyTimeline: React.FC<Props> = ({ data, studyKey }) => {
  const { t } = useTranslation();

  return (
    <section className="bg-gray-50 py-24 overflow-x-hidden"> {/* Añadido overflow-x-hidden por seguridad */}
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
              className="flex justify-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 rounded-full shadow-md">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  {t(`caseStudies.${studyKey}.timeline.title`, data.title)}
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
            {t(`caseStudies.${studyKey}.timeline.subtitle`, data.subtitle)}
          </motion.p>
        </div>

        {/* --- ESTRUCTURA SIMPLIFICADA Y ROBUSTA --- */}
        <div className="relative md:max-w-2xl mx-auto">
          {/* La línea vertical central (visible solo en desktop) */}
          <div className="absolute left-1/2 top-2 h-full w-0.5 bg-gray-200 -translate-x-1/2 hidden md:block"></div>

          <div className="space-y-10 md:space-y-8">
            {data.phases.map((phase, index) => {
              // La lógica para alternar se mantiene, pero la usaremos de forma más simple
              const isLeft = index % 2 !== 0;
              const cardVariants = {
                hidden: { opacity: 0, x: isLeft ? -40 : 40 },
                visible: { opacity: 1, x: 0 },
              };

              const dotColor = phase.status === 'success' ? 'bg-green-500' : 'bg-blue-500';
              const cardStyles = phase.status === 'success' 
                ? 'bg-green-50/70 border-green-300' 
                : 'bg-white border-gray-200';

              return (
                <div key={index} className="relative">
                  {/* El punto en la línea (visible solo en desktop) */}
                  <div className={`absolute left-1/2 top-4 w-4 h-4 rounded-full ${dotColor} -translate-x-1/2 border-4 border-gray-50 hidden md:block`}></div>
                  
                  {/* Contenedor de la tarjeta. Se posiciona con margen, no con flexbox. */}
                  <motion.div
                    className={`w-full md:w-1/2 ${isLeft ? '' : 'md:ml-auto'}`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={cardVariants}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  >
                    <div className={`p-5 rounded-xl shadow-lg border ${cardStyles} ${isLeft ? 'md:text-right' : ''}`}>
                      <h3 className="font-bold text-base text-gray-900">
                        {t(`caseStudies.${studyKey}.timeline.phases.${index}.title`, phase.title)}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1 break-words">
                        {t(`caseStudies.${studyKey}.timeline.phases.${index}.description`, phase.description)}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyTimeline;