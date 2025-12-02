// src/components/solutions/SolutionUseCases.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Megaphone, Home, Building2, ShoppingCart, Briefcase, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SolutionUseCases as SolutionUseCasesType } from '@/data/solutions/types';
import { trackCtaClick } from '@/utils/dataLayer';

// Map icon strings to Lucide components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'code': Code,
  'megaphone': Megaphone,
  'home': Home,
  'building': Building2,
  'shopping-cart': ShoppingCart,
  'briefcase': Briefcase,
};

interface Props {
  data: SolutionUseCasesType;
  solutionId: string;
}

const SolutionUseCases: React.FC<Props> = ({ data, solutionId }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    trackCtaClick('use_case_tab', `solution_use_cases_${solutionId}`, data.useCases[index].industry);
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-1.5 rounded-full mb-4">
              <Briefcase className="h-4 w-4" />
              <span className="text-sm font-semibold">
                {t(`solutions.${solutionId}.useCases.badge`, 'Use Cases')}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              {t(`solutions.${solutionId}.useCases.title`, data.title)}
            </h2>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t(`solutions.${solutionId}.useCases.subtitle`, data.subtitle)}
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {data.useCases.map((useCase, index) => {
              const IconComponent = iconMap[useCase.icon || 'briefcase'] || Briefcase;
              const isActive = activeTab === index;

              return (
                <button
                  key={useCase.id}
                  onClick={() => handleTabChange(index)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-sky-600 to-teal-600 text-white shadow-lg shadow-sky-500/25'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-sky-300 hover:text-sky-600'
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span>{t(`solutions.${solutionId}.useCases.useCases.${index}.industry`, useCase.industry)}</span>
                </button>
              );
            })}
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Content */}
                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-4">
                    {(() => {
                      const useCase = data.useCases[activeTab];
                      const IconComponent = iconMap[useCase.icon || 'briefcase'] || Briefcase;
                      return (
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-teal-600 flex items-center justify-center text-white shadow-lg">
                          <IconComponent className="h-6 w-6" />
                        </div>
                      );
                    })()}
                    <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                      {t(`solutions.${solutionId}.useCases.useCases.${activeTab}.industry`, data.useCases[activeTab].industry)}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                    {t(`solutions.${solutionId}.useCases.useCases.${activeTab}.title`, data.useCases[activeTab].title)}
                  </h3>

                  <p className="text-lg text-slate-600 mb-8">
                    {t(`solutions.${solutionId}.useCases.useCases.${activeTab}.description`, data.useCases[activeTab].description)}
                  </p>

                  {/* Results */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
                      {t(`solutions.${solutionId}.useCases.resultsTitle`, 'Key Results')}
                    </h4>
                    <ul className="space-y-3">
                      {data.useCases[activeTab].results.map((result, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                          <span className="text-slate-700 font-medium">
                            {t(`solutions.${solutionId}.useCases.useCases.${activeTab}.results.${index}`, result)}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Visual */}
                <div className="relative bg-gradient-to-br from-sky-50 to-cyan-50 p-8 md:p-12 flex items-center justify-center">
                  {/* Decorative elements */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-10 right-10 w-32 h-32 bg-sky-200/50 rounded-full blur-2xl" />
                    <div className="absolute bottom-10 left-10 w-32 h-32 bg-teal-200/50 rounded-full blur-2xl" />
                  </div>

                  <div className="relative z-10 text-center">
                    {(() => {
                      const useCase = data.useCases[activeTab];
                      const IconComponent = iconMap[useCase.icon || 'briefcase'] || Briefcase;
                      return (
                        <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-3xl shadow-xl flex items-center justify-center">
                          <IconComponent className="h-16 w-16 text-blue-600" />
                        </div>
                      );
                    })()}
                    <p className="text-xl font-bold text-slate-900">
                      {data.useCases[activeTab].industry}
                    </p>
                    <p className="text-slate-500">
                      Industry Solution
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SolutionUseCases;
