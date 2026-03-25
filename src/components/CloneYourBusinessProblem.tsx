// src/components/CloneYourBusinessProblem.tsx
// "The Problem" section for /clone-your-business landing page.
// Shows business pain points with stats, inspired by SolutionProblem pattern.

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  AlertTriangle,
  DollarSign,
  RefreshCw,
  Clock,
  Unplug,
  UserX,
} from 'lucide-react';
import { trackSectionView } from '@/utils/dataLayer';
import { cn } from '@/lib/utils';

// ============================================================================
// Types & Data
// ============================================================================

interface PainPoint {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  tKey: string;
}

interface Stat {
  tKeyValue: string;
  tKeyLabel: string;
  tKeySource: string;
}

const painPoints: PainPoint[] = [
  {
    id: 'high_costs',
    icon: DollarSign,
    tKey: 'cloneYourBusiness.problem.painPoints.highCosts',
  },
  {
    id: 'human_errors',
    icon: RefreshCw,
    tKey: 'cloneYourBusiness.problem.painPoints.humanErrors',
  },
  {
    id: 'no_247',
    icon: Clock,
    tKey: 'cloneYourBusiness.problem.painPoints.no247',
  },
  {
    id: 'disconnected',
    icon: Unplug,
    tKey: 'cloneYourBusiness.problem.painPoints.disconnected',
  },
  {
    id: 'manual_tasks',
    icon: UserX,
    tKey: 'cloneYourBusiness.problem.painPoints.manualTasks',
  },
];

const stats: Stat[] = [
  {
    tKeyValue: 'cloneYourBusiness.problem.stats.repetitive.value',
    tKeyLabel: 'cloneYourBusiness.problem.stats.repetitive.label',
    tKeySource: 'cloneYourBusiness.problem.stats.repetitive.source',
  },
  {
    tKeyValue: 'cloneYourBusiness.problem.stats.manualErrors.value',
    tKeyLabel: 'cloneYourBusiness.problem.stats.manualErrors.label',
    tKeySource: 'cloneYourBusiness.problem.stats.manualErrors.source',
  },
  {
    tKeyValue: 'cloneYourBusiness.problem.stats.lostRevenue.value',
    tKeyLabel: 'cloneYourBusiness.problem.stats.lostRevenue.label',
    tKeySource: 'cloneYourBusiness.problem.stats.lostRevenue.source',
  },
];

// ============================================================================
// Animation Variants
// ============================================================================

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

// ============================================================================
// Main Component
// ============================================================================

const CloneYourBusinessProblem: React.FC = () => {
  const { t } = useTranslation('clone-your-business');
  const sectionRef = useRef<HTMLElement>(null);
  const [tracked, setTracked] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked) {
          trackSectionView('clone_your_business_problem', 'clone_your_business');
          setTracked(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [tracked]);

  return (
    <section
      ref={sectionRef}
      id="problem-section"
      className="py-20 md:py-28 bg-white"
      aria-labelledby="problem-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-1.5 rounded-full mb-4">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-semibold">
                {t('cloneYourBusiness.problem.badge')}
              </span>
            </div>

            <h2
              id="problem-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
            >
              {t('cloneYourBusiness.problem.title')}
            </h2>

            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {t('cloneYourBusiness.problem.subtitle')}
            </p>
          </motion.div>

          {/* Pain Points Grid */}
          <motion.div
            variants={itemVariants}
            className={cn(
              'grid gap-6 mb-16',
              'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            )}
          >
            {painPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={point.id}
                  variants={itemVariants}
                  className="group relative bg-gradient-to-br from-red-50/50 to-orange-50/50 border border-red-100 rounded-2xl p-6 hover:shadow-lg hover:shadow-red-100/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-red-500/25 group-hover:scale-110 transition-transform shrink-0">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        {t(`${point.tKey}.title`)}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {t(`${point.tKey}.description`)}
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

          {/* Statistics Bar */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-2">
                    {t(stat.tKeyValue)}
                  </p>
                  <p className="text-white/90 font-medium mb-1">
                    {t(stat.tKeyLabel)}
                  </p>
                  <p className="text-white/50 text-sm">
                    — {t(stat.tKeySource)}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CloneYourBusinessProblem;
