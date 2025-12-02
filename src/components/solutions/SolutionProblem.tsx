// src/components/solutions/SolutionProblem.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { PhoneOff, HelpCircle, Shuffle, Clock, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SolutionProblem as SolutionProblemType } from '@/data/solutions/types';

// Map icon strings to Lucide components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'phone-off': PhoneOff,
  'help-circle': HelpCircle,
  'shuffle': Shuffle,
  'clock': Clock,
  'alert-triangle': AlertTriangle,
};

interface Props {
  data: SolutionProblemType;
  solutionId: string;
}

const SolutionProblem: React.FC<Props> = ({ data, solutionId }) => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="problem-section" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-1.5 rounded-full mb-4">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-semibold">
                {t(`solutions.${solutionId}.problem.badge`, 'The Problem')}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              {t(`solutions.${solutionId}.problem.headline`, data.headline)}
            </h2>

            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {t(`solutions.${solutionId}.problem.description`, data.description)}
            </p>
          </motion.div>

          {/* Pain Points Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {data.painPoints.map((painPoint, index) => {
              const IconComponent = iconMap[painPoint.icon || 'alert-triangle'] || AlertTriangle;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative bg-gradient-to-br from-red-50/50 to-orange-50/50 border border-red-100 rounded-2xl p-6 hover:shadow-lg hover:shadow-red-100/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-red-500/25 group-hover:scale-110 transition-transform">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        {t(`solutions.${solutionId}.problem.painPoints.${index}.title`, painPoint.title)}
                      </h3>
                      <p className="text-slate-600">
                        {t(`solutions.${solutionId}.problem.painPoints.${index}.description`, painPoint.description)}
                      </p>
                    </div>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl">
                    <div className="absolute top-0 right-0 w-8 h-8 bg-red-100/50 transform rotate-45 translate-x-4 -translate-y-4" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Statistics */}
          <motion.div variants={itemVariants} className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.statistics.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </p>
                  <p className="text-white/90 font-medium mb-1">
                    {t(`solutions.${solutionId}.problem.statistics.${index}.label`, stat.label)}
                  </p>
                  {stat.source && (
                    <p className="text-white/50 text-sm">
                      — {stat.source}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionProblem;
