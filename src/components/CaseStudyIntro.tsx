// src/components/CaseStudyIntro.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CaseStudy } from '../data/caseStudiesData';
import Icon from './Icon';
import { X } from 'lucide-react'; // <-- 1. Importar el nuevo icono

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: [0.6, 0.01, 0.05, 0.95],
      staggerChildren: 0.1
    } 
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

interface Props {
  client: CaseStudy['client'];
  challenge: CaseStudy['challenge'];
  studyKey: string;
}

const CaseStudyIntro: React.FC<Props> = ({ client, challenge, studyKey }) => {
  const { t } = useTranslation();

  if (!client || !challenge) return null;

  return (
    <section className="bg-gray-100 py-24">
      <div className="container mx-auto px-4">
        
        <motion.div 
          className="p-10 sm:p-12 md:p-16 rounded-3xl shadow-2xl bg-gradient-to-br from-slate-50 via-white to-blue-50 border border-gray-200"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
         <div className="max-w-4xl">
                <motion.div variants={itemVariants}>
                  <div className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 rounded-full shadow-md">
                    <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                      {/*
                        * Se construye la clave dinámicamente usando `studyKey`.
                        * El texto 'Client Overview' se queda como un fallback por si la traducción no se encuentra.
                      */}
                      {t(`caseStudies.${studyKey}.client.client_overview_title`, 'Client Overview')}
                    </h2>
                  </div>
                </motion.div>

            
            <motion.div variants={itemVariants}>
              <div className="mt-8">
                {client.logoUrl && (
                  <a href={`https://${client.website}`} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${client.name} website`} className="inline-block transition-opacity hover:opacity-80">
                    <img src={client.logoUrl} alt={`${client.name} logo`} className="h-9" />
                  </a>
                )}
                <h3 className="text-2xl md:text-3xl font-semibold text-slate-800 mt-4">
                  {t(`caseStudies.${studyKey}.client.name`, client.name)} - {t(`caseStudies.${studyKey}.client.tagline`, client.tagline)}
                </h3>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <p className="text-lg text-slate-600 mt-5 leading-relaxed">
                {t(`caseStudies.${studyKey}.client.description`, client.description)}
              </p>
            </motion.div>
          </div>

          <motion.hr 
            className="my-12 border-t border-gray-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, delay: 0.6 }}
          >
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              {client.details.map((detail, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <div className="flex items-center gap-3 mb-2">
                    <Icon name={detail.icon as any} className="h-6 w-6 text-slate-400" />
                    <h4 className="text-sm font-semibold text-slate-500 tracking-wider uppercase">
                      {t(`caseStudies.${studyKey}.client.details.${index}.label`, detail.label)}
                    </h4>
                  </div>
                  <p className="text-lg font-semibold text-slate-800">
                    {t(`caseStudies.${studyKey}.client.details.${index}.value`, detail.value)}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* --- SECCIÓN DE BULLETS MEJORADA --- */}
            <motion.div className="md:col-span-1" variants={itemVariants}>
              <h3 className="text-xl font-bold text-slate-800 mb-4">
                {t(`caseStudies.${studyKey}.challenge.beforeTitle`, challenge.beforeTitle)}
              </h3>
              <ul className="space-y-4">
                {challenge.points.map((point, index) => (
                  // 2. Se reemplaza el <span> con un icono y se ajusta el espaciado
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X size={12} className="text-red-500" strokeWidth={3} />
                    </div>
                    <span className="text-slate-600">
                      {t(`caseStudies.${studyKey}.challenge.points.${index}`, point)}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudyIntro;