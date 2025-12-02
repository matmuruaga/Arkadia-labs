// src/components/solutions/SolutionMetrics.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, BarChart3, Check, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SolutionMetrics as SolutionMetricsType } from '@/data/solutions/types';

interface Props {
  data: SolutionMetricsType;
  solutionId: string;
}

const SolutionMetrics: React.FC<Props> = ({ data, solutionId }) => {
  const { t } = useTranslation();

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-1.5 rounded-full mb-4">
              <BarChart3 className="h-4 w-4" />
              <span className="text-sm font-semibold">
                {t(`solutions.${solutionId}.metrics.badge`, 'Results')}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              {t(`solutions.${solutionId}.metrics.title`, data.title)}
            </h2>

            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              {t(`solutions.${solutionId}.metrics.subtitle`, data.subtitle)}
            </p>
          </motion.div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {data.metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors group"
              >
                {/* Trend indicator */}
                <div className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center ${
                  metric.trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {metric.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                </div>

                <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-400 to-teal-400 bg-clip-text text-transparent mb-2">
                  {metric.value}
                </p>
                <p className="text-white/90 font-medium mb-1">
                  {t(`solutions.${solutionId}.metrics.metrics.${index}.label`, metric.label)}
                </p>
                {metric.description && (
                  <p className="text-white/50 text-sm">
                    {t(`solutions.${solutionId}.metrics.metrics.${index}.description`, metric.description)}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Before/After Comparison */}
          {data.before && data.after && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12"
            >
              <h3 className="text-2xl font-bold text-center mb-8">
                {t(`solutions.${solutionId}.metrics.comparisonTitle`, data.comparisonTitle || 'Before vs After')}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Before */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                      <X className="h-5 w-5 text-red-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-red-400">Before</h4>
                  </div>
                  <ul className="space-y-3">
                    {data.before.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-start gap-3 text-white/70"
                      >
                        <X className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                        <span>{t(`solutions.${solutionId}.metrics.before.${index}`, item)}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* After */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="h-5 w-5 text-green-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-green-400">After</h4>
                  </div>
                  <ul className="space-y-3">
                    {data.after.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-start gap-3 text-white/90"
                      >
                        <Check className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>{t(`solutions.${solutionId}.metrics.after.${index}`, item)}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SolutionMetrics;
