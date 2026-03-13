// src/components/CloneYourBusinessHero.tsx
// Hero section for /clone-your-business page.
// Visual: org chart nodes that flip from human roles to AI agents.

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Building2,
  Users,
  Phone,
  Megaphone,
  Headphones,
  Settings,
  Zap,
  Bot,
  ArrowRight,
  CheckCircle2,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { trackCtaClick, trackSectionView } from '@/utils/dataLayer';
import { cn } from '@/lib/utils';

// ============================================================================
// Types & Data
// ============================================================================

interface OrgNode {
  id: string;
  humanIcon: React.ComponentType<{ className?: string }>;
  aiIcon: React.ComponentType<{ className?: string }>;
  tKey: string;
  color: string;
  bg: string;
  delay: number;
}

const orgNodes: OrgNode[] = [
  {
    id: 'sales',
    humanIcon: Phone,
    aiIcon: Bot,
    tKey: 'cloneYourBusiness.hero.nodes.sales',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    delay: 0,
  },
  {
    id: 'marketing',
    humanIcon: Megaphone,
    aiIcon: Bot,
    tKey: 'cloneYourBusiness.hero.nodes.marketing',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    delay: 0.15,
  },
  {
    id: 'support',
    humanIcon: Headphones,
    aiIcon: Bot,
    tKey: 'cloneYourBusiness.hero.nodes.support',
    color: 'text-green-600',
    bg: 'bg-green-50',
    delay: 0.3,
  },
  {
    id: 'operations',
    humanIcon: Settings,
    aiIcon: Bot,
    tKey: 'cloneYourBusiness.hero.nodes.operations',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    delay: 0.45,
  },
];

// ============================================================================
// Sub-components
// ============================================================================

/** Single org chart node that flips from human → AI */
const OrgChartNode: React.FC<{
  node: OrgNode;
  isTransformed: boolean;
}> = ({ node, isTransformed }) => {
  const { t } = useTranslation();
  const HumanIcon = node.humanIcon;
  const AiIcon = node.aiIcon;

  return (
    <motion.div
      className="relative flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 + node.delay }}
    >
      {/* Connector line to hub */}
      <div className="hidden md:block w-px h-6 bg-gradient-to-b from-slate-300 to-slate-200 mb-2" />

      {/* Node card */}
      <div
        className={cn(
          'relative w-[130px] sm:w-[140px] rounded-2xl border bg-white/95 backdrop-blur-sm p-3 shadow-md transition-all duration-700',
          isTransformed
            ? 'shadow-lg border-emerald-200 ring-1 ring-emerald-100'
            : 'border-slate-200'
        )}
      >
        {/* Icon + Label */}
        <div className="flex flex-col items-center gap-2">
          <div
            className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-700',
              isTransformed
                ? 'bg-gradient-to-br from-emerald-50 to-teal-50'
                : node.bg
            )}
          >
            <AnimatePresence mode="wait">
              {isTransformed ? (
                <motion.div
                  key="ai"
                  initial={{ rotateY: 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: -90, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <AiIcon className="w-5 h-5 text-emerald-600" />
                </motion.div>
              ) : (
                <motion.div
                  key="human"
                  initial={{ rotateY: -90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: 90, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <HumanIcon className={cn('w-5 h-5', node.color)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="text-xs font-semibold text-slate-800 text-center leading-tight">
            {t(node.tKey)}
          </p>

          {/* Status badge */}
          <AnimatePresence>
            {isTransformed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200"
              >
                <Zap className="w-2.5 h-2.5 text-emerald-500" />
                <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider">
                  AI
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pulsing glow when transformed */}
        {isTransformed && (
          <div className="absolute -inset-1 rounded-2xl bg-emerald-400/10 blur-md -z-10 animate-pulse" />
        )}
      </div>
    </motion.div>
  );
};

/** Trust badge */
const TrustBadge: React.FC<{
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  delay: number;
}> = ({ icon: Icon, value, label, delay }) => (
  <motion.div
    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200/60 shadow-sm"
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <Icon className="w-4 h-4 text-blue-500 shrink-0" />
    <div>
      <p className="text-sm font-bold text-slate-900 leading-none">{value}</p>
      <p className="text-[10px] text-slate-500 font-medium mt-0.5">{label}</p>
    </div>
  </motion.div>
);

// ============================================================================
// Main Component
// ============================================================================

const CloneYourBusinessHero: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [isTransformed, setIsTransformed] = useState(false);
  const [tracked, setTracked] = useState(false);

  // Trigger transformation after the section is in view
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setIsTransformed(true), 1800);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  // Track section view
  useEffect(() => {
    if (isInView && !tracked) {
      trackSectionView('clone_your_business_hero', 'clone_your_business');
      setTracked(true);
    }
  }, [isInView, tracked]);

  const handleCtaClick = () => {
    trackCtaClick('schedule_demo', 'clone_your_business_hero', t('cloneYourBusiness.hero.cta'));
    navigate(`/${lang || 'en'}/get-started`);
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-16 sm:pt-32 sm:pb-20"
      aria-label={t('cloneYourBusiness.hero.title')}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[5%] left-[10%] w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] bg-teal-100/25 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[300px] h-[300px] bg-violet-50/20 rounded-full blur-[90px]" />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center">
        {/* Headline */}
        <motion.div
          className="text-center mb-10 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Zap className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-xs font-semibold text-blue-600">
              {t('cloneYourBusiness.hero.badge')}
            </span>
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-4 max-w-3xl mx-auto">
            {t('cloneYourBusiness.hero.headline')}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
              {' '}{t('cloneYourBusiness.hero.headlineAccent')}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {t('cloneYourBusiness.hero.subtitle')}
          </p>
        </motion.div>

        {/* Org Chart Visual */}
        <div className="w-full flex flex-col items-center mb-10 md:mb-12">
          {/* Central hub node */}
          <motion.div
            className="flex flex-col items-center mb-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              {/* Pulsing rings */}
              {isTransformed && (
                <>
                  <div
                    className="absolute w-20 h-20 rounded-2xl border border-emerald-200/40 -top-1.5 -left-1.5 animate-ping"
                    style={{ animationDuration: '3s' }}
                  />
                </>
              )}
              <div
                className={cn(
                  'w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-700 border',
                  isTransformed
                    ? 'bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 border-emerald-500/30 shadow-emerald-600/20'
                    : 'bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 border-slate-700/50 shadow-slate-900/20'
                )}
              >
                {isTransformed ? (
                  <Zap className="w-7 h-7 text-white" />
                ) : (
                  <Building2 className="w-7 h-7 text-white" />
                )}
              </div>
            </div>
            <p className="mt-2 text-xs font-bold text-slate-700">
              {isTransformed
                ? t('cloneYourBusiness.hero.hubTransformed')
                : t('cloneYourBusiness.hero.hubOriginal')}
            </p>
          </motion.div>

          {/* Connector line hub → departments */}
          <div className="hidden md:flex items-center justify-center w-full max-w-lg">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-slate-300" />
            <div className="w-2 h-2 rounded-full bg-slate-300 mx-1" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-slate-300 to-slate-300" />
          </div>

          {/* Department nodes grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-2">
            {orgNodes.map((node) => (
              <OrgChartNode
                key={node.id}
                node={node}
                isTransformed={isTransformed}
              />
            ))}
          </div>

          {/* Transformation status label */}
          <AnimatePresence>
            {isTransformed && (
              <motion.div
                className="mt-5 flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-semibold text-emerald-700">
                  {t('cloneYourBusiness.hero.transformedLabel')}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div
          className="flex flex-col items-center gap-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <button
            onClick={handleCtaClick}
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-base shadow-xl shadow-blue-600/20 hover:shadow-blue-600/40 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label={t('cloneYourBusiness.hero.cta')}
          >
            {t('cloneYourBusiness.hero.cta')}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <TrustBadge
              icon={TrendingUp}
              value={t('cloneYourBusiness.hero.trust.companies.value')}
              label={t('cloneYourBusiness.hero.trust.companies.label')}
              delay={0.7}
            />
            <TrustBadge
              icon={Zap}
              value={t('cloneYourBusiness.hero.trust.automation.value')}
              label={t('cloneYourBusiness.hero.trust.automation.label')}
              delay={0.8}
            />
            <TrustBadge
              icon={Clock}
              value={t('cloneYourBusiness.hero.trust.availability.value')}
              label={t('cloneYourBusiness.hero.trust.availability.label')}
              delay={0.9}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CloneYourBusinessHero;
