// src/components/CloneYourBusinessBeforeAfter.tsx
// Before/After transformation metrics section for /clone-your-business.
// Shows quantitative business impact with AnimatedNumber counters.

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  DollarSign,
  Clock,
  Shield,
  Users,
  Zap,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import AnimatedNumber from '@/components/AnimatedNumber';
import { trackSectionView } from '@/utils/dataLayer';
import { cn } from '@/lib/utils';

// ============================================================================
// Types & Data
// ============================================================================

interface Metric {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  tKey: string;
  before: { value: number; suffix?: string; prefix?: string };
  after: { value: number; suffix?: string; prefix?: string };
  improvement: { value: number; suffix: string; prefix?: string };
  accentColor: string;
  bgGradient: string;
}

const metrics: Metric[] = [
  {
    id: 'operating_costs',
    icon: DollarSign,
    tKey: 'cloneYourBusiness.beforeAfter.metrics.operatingCosts',
    before: { value: 100, suffix: '%' },
    after: { value: 30, suffix: '%' },
    improvement: { value: 70, suffix: '%', prefix: '-' },
    accentColor: 'text-emerald-500',
    bgGradient: 'from-emerald-500/10 to-emerald-600/5',
  },
  {
    id: 'response_time',
    icon: Clock,
    tKey: 'cloneYourBusiness.beforeAfter.metrics.responseTime',
    before: { value: 24, suffix: 'h' },
    after: { value: 3, suffix: 's' },
    improvement: { value: 99, suffix: '%', prefix: '-' },
    accentColor: 'text-blue-500',
    bgGradient: 'from-blue-500/10 to-blue-600/5',
  },
  {
    id: 'availability',
    icon: Shield,
    tKey: 'cloneYourBusiness.beforeAfter.metrics.availability',
    before: { value: 8, suffix: 'h' },
    after: { value: 24, suffix: '/7' },
    improvement: { value: 3, suffix: 'x' },
    accentColor: 'text-violet-500',
    bgGradient: 'from-violet-500/10 to-violet-600/5',
  },
  {
    id: 'error_rate',
    icon: TrendingUp,
    tKey: 'cloneYourBusiness.beforeAfter.metrics.errorRate',
    before: { value: 12, suffix: '%' },
    after: { value: 0.5, suffix: '%' },
    improvement: { value: 95, suffix: '%', prefix: '-' },
    accentColor: 'text-rose-500',
    bgGradient: 'from-rose-500/10 to-rose-600/5',
  },
  {
    id: 'capacity',
    icon: Users,
    tKey: 'cloneYourBusiness.beforeAfter.metrics.capacity',
    before: { value: 1, suffix: 'x' },
    after: { value: 10, suffix: 'x' },
    improvement: { value: 10, suffix: 'x' },
    accentColor: 'text-amber-500',
    bgGradient: 'from-amber-500/10 to-amber-600/5',
  },
  {
    id: 'scaling_speed',
    icon: Zap,
    tKey: 'cloneYourBusiness.beforeAfter.metrics.scalingSpeed',
    before: { value: 12, suffix: 'w' },
    after: { value: 2, suffix: 'd' },
    improvement: { value: 40, suffix: 'x' },
    accentColor: 'text-cyan-500',
    bgGradient: 'from-cyan-500/10 to-cyan-600/5',
  },
];

// ============================================================================
// Animation Variants
// ============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ============================================================================
// Metric Card Sub-Component
// ============================================================================

const MetricCard: React.FC<{ metric: Metric; index: number }> = ({
  metric,
  index,
}) => {
  const { t } = useTranslation();
  const Icon = metric.icon;

  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        'group relative bg-white rounded-2xl border border-slate-200 p-6',
        'hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-300',
        'transition-all duration-300'
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className={cn(
            'w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center',
            metric.bgGradient
          )}
        >
          <Icon className={cn('h-5 w-5', metric.accentColor)} />
        </div>
        <h3 className="font-semibold text-slate-900 text-sm">
          {t(`${metric.tKey}.title`)}
        </h3>
      </div>

      {/* Before → After Row */}
      <div className="flex items-center justify-between gap-2 mb-4">
        {/* Before */}
        <div className="text-center flex-1">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
            {t('cloneYourBusiness.beforeAfter.before')}
          </p>
          <p className="text-2xl font-bold text-slate-400 line-through decoration-slate-300 decoration-2">
            {t(`${metric.tKey}.beforeValue`)}
          </p>
        </div>

        {/* Arrow */}
        <ArrowRight className="h-5 w-5 text-slate-300 shrink-0" />

        {/* After */}
        <div className="text-center flex-1">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
            {t('cloneYourBusiness.beforeAfter.after')}
          </p>
          <p className={cn('text-2xl font-bold', metric.accentColor)}>
            {t(`${metric.tKey}.afterValue`)}
          </p>
        </div>
      </div>

      {/* Improvement Badge */}
      <div
        className={cn(
          'flex items-center justify-center gap-1 py-2 px-3 rounded-lg',
          'bg-gradient-to-r',
          metric.bgGradient
        )}
      >
        <span className={cn('text-lg font-bold', metric.accentColor)}>
          <AnimatedNumber
            targetValue={metric.improvement.value}
            prefix={metric.improvement.prefix ?? ''}
            suffix={metric.improvement.suffix}
            duration={1.2}
            className={cn('text-lg font-bold', metric.accentColor)}
          />
        </span>
        <span className="text-xs text-slate-600 font-medium ml-1">
          {t(`${metric.tKey}.improvementLabel`)}
        </span>
      </div>
    </motion.div>
  );
};

// ============================================================================
// Main Component
// ============================================================================

const CloneYourBusinessBeforeAfter: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const [tracked, setTracked] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked) {
          trackSectionView(
            'clone_your_business_before_after',
            'clone_your_business'
          );
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
      id="before-after-section"
      className="py-20 md:py-28 bg-slate-50"
      aria-labelledby="before-after-heading"
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
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full mb-4">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-semibold">
                {t('cloneYourBusiness.beforeAfter.badge')}
              </span>
            </div>

            <h2
              id="before-after-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
            >
              {t('cloneYourBusiness.beforeAfter.title')}
            </h2>

            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {t('cloneYourBusiness.beforeAfter.subtitle')}
            </p>
          </motion.div>

          {/* Metrics Grid */}
          <motion.div
            variants={containerVariants}
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {metrics.map((metric, index) => (
              <MetricCard key={metric.id} metric={metric} index={index} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CloneYourBusinessBeforeAfter;
