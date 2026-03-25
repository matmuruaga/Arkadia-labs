// src/components/CloneYourBusinessHowItWorks.tsx
// "How It Works" section for /clone-your-business landing page.
// 3 numbered steps with connecting line and scroll animations.

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Search, Bot, Rocket } from 'lucide-react';
import { trackSectionView } from '@/utils/dataLayer';
import { cn } from '@/lib/utils';

// ============================================================================
// Types & Data
// ============================================================================

interface Step {
  id: string;
  number: number;
  icon: React.ComponentType<{ className?: string }>;
  tKey: string;
  color: string;
  bgGradient: string;
  iconBg: string;
  glowColor: string;
}

const steps: Step[] = [
  {
    id: 'analysis',
    number: 1,
    icon: Search,
    tKey: 'cloneYourBusiness.howItWorks.steps.analysis',
    color: 'text-blue-600',
    bgGradient: 'from-blue-50 to-indigo-50',
    iconBg: 'from-blue-500 to-indigo-600',
    glowColor: 'shadow-blue-500/25',
  },
  {
    id: 'cloning',
    number: 2,
    icon: Bot,
    tKey: 'cloneYourBusiness.howItWorks.steps.cloning',
    color: 'text-teal-600',
    bgGradient: 'from-teal-50 to-emerald-50',
    iconBg: 'from-teal-500 to-emerald-600',
    glowColor: 'shadow-teal-500/25',
  },
  {
    id: 'deployment',
    number: 3,
    icon: Rocket,
    tKey: 'cloneYourBusiness.howItWorks.steps.deployment',
    color: 'text-violet-600',
    bgGradient: 'from-violet-50 to-purple-50',
    iconBg: 'from-violet-500 to-purple-600',
    glowColor: 'shadow-violet-500/25',
  },
];

// ============================================================================
// Animation Variants
// ============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// ============================================================================
// Sub-components
// ============================================================================

const StepCard: React.FC<{ step: Step; isLast: boolean }> = ({ step, isLast }) => {
  const { t } = useTranslation('clone-your-business');
  const Icon = step.icon;

  return (
    <motion.div variants={itemVariants} className="relative flex flex-col items-center">
      {/* Step card */}
      <div
        className={cn(
          'relative w-full rounded-2xl border border-white/60 bg-gradient-to-br p-6 md:p-8 shadow-md hover:shadow-xl transition-shadow duration-300',
          step.bgGradient
        )}
      >
        {/* Step number badge */}
        <div className="absolute -top-4 left-6 md:left-8">
          <div
            className={cn(
              'w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-sm font-bold shadow-lg',
              step.iconBg,
              step.glowColor
            )}
          >
            {step.number}
          </div>
        </div>

        {/* Icon */}
        <div className="flex items-center gap-4 mb-4 mt-2">
          <div
            className={cn(
              'w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shadow-lg shrink-0',
              step.iconBg,
              step.glowColor
            )}
          >
            <Icon className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            {t(`${step.tKey}.title`)}
          </h3>
        </div>

        {/* Description */}
        <p className="text-slate-600 leading-relaxed">
          {t(`${step.tKey}.description`)}
        </p>
      </div>

      {/* Connecting line (hidden on last step and on mobile) */}
      {!isLast && (
        <div className="hidden lg:flex flex-col items-center py-2">
          <div className="w-px h-8 bg-gradient-to-b from-slate-300 to-slate-200" />
          <div className="w-2 h-2 rounded-full bg-slate-300" />
        </div>
      )}
    </motion.div>
  );
};

// ============================================================================
// Main Component
// ============================================================================

const CloneYourBusinessHowItWorks: React.FC = () => {
  const { t } = useTranslation('clone-your-business');
  const sectionRef = useRef<HTMLElement>(null);
  const [tracked, setTracked] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked) {
          trackSectionView('clone_your_business_how_it_works', 'clone_your_business');
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
      id="how-it-works-section"
      className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white"
      aria-labelledby="how-it-works-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full mb-4">
              <Rocket className="h-4 w-4" />
              <span className="text-sm font-semibold">
                {t('cloneYourBusiness.howItWorks.badge')}
              </span>
            </div>

            <h2
              id="how-it-works-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
            >
              {t('cloneYourBusiness.howItWorks.title')}
            </h2>

            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {t('cloneYourBusiness.howItWorks.subtitle')}
            </p>
          </motion.div>

          {/* Steps — vertical on mobile, horizontal on lg */}
          <div className="relative">
            {/* Horizontal connecting line (lg only) */}
            <div className="hidden lg:block absolute top-[72px] left-[10%] right-[10%] h-px bg-gradient-to-r from-blue-200 via-teal-200 to-violet-200 z-0" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 relative z-10">
              {steps.map((step, index) => (
                <StepCard
                  key={step.id}
                  step={step}
                  isLast={index === steps.length - 1}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CloneYourBusinessHowItWorks;
