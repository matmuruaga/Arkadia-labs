// src/components/CaseStudySolution.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // <-- 1. Importar
import { CaseStudy } from '../data/caseStudiesData';
import Icon from './Icon';
import { CheckCircle2 } from 'lucide-react';

// 2. La interfaz ahora también necesita la clave del estudio
interface Props {
  data: CaseStudy['solution'];
  studyKey: string;
}

const CaseStudySolution: React.FC<Props> = ({ data, studyKey }) => {
  const { t } = useTranslation(); // <-- 3. Inicializar
  const backgroundImageUrl = 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1751365219/liquid_gradient_component_IA_1_shkjpf.jpg';

  return (
    <section 
      className="relative py-24 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0.5)), url(${backgroundImageUrl})` }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
              className="flex justify-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              {/* 4. Usar la función t() para todos los textos */}
              <div className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 rounded-full shadow-lg">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  {t(`caseStudies.${studyKey}.solution.title`, data.title)}
                </h2>
              </div>
          </motion.div>
          <motion.p 
            className="text-lg text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t(`caseStudies.${studyKey}.solution.subtitle`, data.subtitle)}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-x-16 gap-y-12 items-start">
          <div>
            <div className="relative mb-8">
              <span className="absolute left-0 -top-1 bottom-1 w-1 bg-red-500 rounded-full"></span>
              <h3 className="text-3xl font-bold text-white pl-5">
                {t(`caseStudies.${studyKey}.solution.implementation.title`, data.implementation.title)}
              </h3>
            </div>
            <p className="text-lg text-gray-400 mb-12">
              {t(`caseStudies.${studyKey}.solution.implementation.description`, data.implementation.description)}
            </p>
            
            <div className="space-y-10">
              {data.implementation.features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start gap-5"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="flex-shrink-0 bg-blue-500/10 backdrop-blur-sm p-3 rounded-full border border-white/10">
                    <Icon name={feature.icon as any} className="h-6 w-6 text-blue-300" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">
                      {t(`caseStudies.${studyKey}.solution.implementation.features.${index}.title`, feature.title)}
                    </h4>
                    <p className="text-gray-400 mt-1">
                      {t(`caseStudies.${studyKey}.solution.implementation.features.${index}.description`, feature.description)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            className="bg-gray-800/20 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-white text-center mb-8">
              {t(`caseStudies.${studyKey}.solution.coreFunctions.title`, data.coreFunctions.title)}
            </h3>
            <div className="space-y-4">
              {data.coreFunctions.functions.map((func, index) => (
                <div key={index} className="bg-gray-900/50 p-4 rounded-lg flex justify-between items-center border border-white/10">
                  <span className="font-semibold text-gray-200">
                    {t(`caseStudies.${studyKey}.solution.coreFunctions.functions.${index}`, func)}
                  </span>
                  <CheckCircle2 className="h-6 w-6 text-green-400" />
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CaseStudySolution;