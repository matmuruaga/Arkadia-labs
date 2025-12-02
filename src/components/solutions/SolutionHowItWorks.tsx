// src/components/solutions/SolutionHowItWorks.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Cpu, BarChart, RefreshCw, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SolutionHowItWorks as SolutionHowItWorksType } from '@/data/solutions/types';

// Map icon strings to Lucide components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'upload': Upload,
  'cpu': Cpu,
  'bar-chart': BarChart,
  'refresh-cw': RefreshCw,
  'zap': Zap,
};

interface Props {
  data: SolutionHowItWorksType;
  solutionId: string;
}

const SolutionHowItWorks: React.FC<Props> = ({ data, solutionId }) => {
  const { t } = useTranslation();

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full mb-4">
              <Zap className="h-4 w-4" />
              <span className="text-sm font-semibold">
                {t(`solutions.${solutionId}.howItWorks.badge`, 'How It Works')}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              {t(`solutions.${solutionId}.howItWorks.title`, data.title)}
            </h2>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {t(`solutions.${solutionId}.howItWorks.subtitle`, data.subtitle)}
            </p>
          </motion.div>

          {/* Steps */}
          <div className="relative">
            {/* Connection line (desktop only) */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-200 via-cyan-200 to-teal-200" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.steps.map((step, index) => {
                const IconComponent = iconMap[step.icon || 'zap'] || Zap;
                const isLast = index === data.steps.length - 1;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="relative"
                  >
                    {/* Step card */}
                    <div className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 h-full">
                      {/* Step number badge */}
                      <div className="absolute -top-4 left-6 w-8 h-8 bg-gradient-to-br from-sky-500 to-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-sky-500/25">
                        {step.step}
                      </div>

                      {/* Icon */}
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-50 to-cyan-50 flex items-center justify-center mb-4 mt-4 group-hover:scale-110 transition-transform">
                        <IconComponent className="h-7 w-7 text-blue-600" />
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-slate-900 mb-3">
                        {t(`solutions.${solutionId}.howItWorks.steps.${index}.title`, step.title)}
                      </h3>

                      <p className="text-slate-600">
                        {t(`solutions.${solutionId}.howItWorks.steps.${index}.description`, step.description)}
                      </p>

                      {/* Arrow connector (mobile and tablet) */}
                      {!isLast && (
                        <div className="lg:hidden absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm z-10">
                          <svg className="w-4 h-4 text-blue-500 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Arrow connector (desktop) */}
                    {!isLast && (
                      <div className="hidden lg:block absolute top-24 -right-4 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm z-10">
                        <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionHowItWorks;
