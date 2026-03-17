// src/components/CloneYourBusinessCta.tsx
// CTA section for /clone-your-business page.
// Replaces pricing with a custom-solutions pitch + dual CTAs.
// Visual: light background with sky/teal accents matching Solutions palette.

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { trackCtaClick, trackSectionView } from '@/utils/dataLayer';
import CalScheduler from '@/components/CalScheduler';

// ============================================================================
// Animation variants
// ============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

// ============================================================================
// Trust points — translation keys only, no hardcoded copy
// ============================================================================

const TRUST_KEYS = [
  'cloneYourBusiness.cta.trustPoints.dedicated',
  'cloneYourBusiness.cta.trustPoints.noLongContracts',
  'cloneYourBusiness.cta.trustPoints.measurableRoi',
];

// ============================================================================
// Component
// ============================================================================

const CloneYourBusinessCta: React.FC = () => {
  const { t } = useTranslation('clone-your-business');
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  useEffect(() => {
    if (isInView) {
      trackSectionView('cta_custom_solutions', 'clone_your_business');
    }
  }, [isInView]);

  const handleTalkToTeam = () => {
    trackCtaClick('talk_to_team', 'clone_your_business_cta', t('cloneYourBusiness.cta.secondaryCta'));
    navigate(`/${lang ?? 'en'}/contact`);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-4 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50"
      aria-labelledby="cta-heading"
    >
      {/* ── Background decoration ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Radial glow — top-left (sky) */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-sky-200/40 blur-[120px]" />
        {/* Radial glow — bottom-right (teal) */}
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-teal-200/30 blur-[100px]" />
        {/* Accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-300/50 to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="relative max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="flex flex-col items-center text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-sky-200 bg-sky-50 text-sky-600 mb-6">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              {t('cloneYourBusiness.cta.badge')}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            id="cta-heading"
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-slate-900 mb-4"
          >
            {t('cloneYourBusiness.cta.headline')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-teal-500">
              {t('cloneYourBusiness.cta.headlineAccent')}
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-slate-500 text-lg md:text-xl max-w-2xl mb-10"
          >
            {t('cloneYourBusiness.cta.subtitle')}
          </motion.p>

          {/* ── Card ── */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-3xl rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-sm p-8 md:p-12 shadow-xl shadow-sky-500/5"
          >
            {/* Trust points */}
            <ul className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-10">
              {TRUST_KEYS.map((key) => (
                <li key={key} className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" aria-hidden="true" />
                  {t(key)}
                </li>
              ))}
            </ul>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Primary — opens Cal.com scheduler */}
              <CalScheduler
                buttonText={t('cloneYourBusiness.cta.primaryCta')}
                namespace="30min-clone-cta"
                buttonClassName="
                  inline-flex items-center justify-center gap-2
                  px-7 py-3.5
                  text-base font-semibold text-white
                  rounded-xl
                  bg-gradient-to-r from-sky-500 to-teal-500
                  hover:from-sky-400 hover:to-teal-400
                  shadow-lg shadow-sky-500/20
                  hover:shadow-xl hover:-translate-y-0.5
                  transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400
                "
              />

              {/* Secondary — navigate to /contact */}
              <button
                type="button"
                onClick={handleTalkToTeam}
                className="
                  inline-flex items-center justify-center gap-2
                  px-7 py-3.5
                  text-base font-semibold text-slate-700
                  rounded-xl
                  border border-slate-200 bg-white
                  hover:bg-slate-50 hover:border-slate-300
                  shadow-sm
                  transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400
                "
                aria-label={t('cloneYourBusiness.cta.secondaryCta')}
              >
                <MessageCircle className="w-5 h-5 text-sky-500" aria-hidden="true" />
                {t('cloneYourBusiness.cta.secondaryCta')}
                <ArrowRight className="w-4 h-4 text-slate-400" aria-hidden="true" />
              </button>
            </div>

            {/* No-pricing note */}
            <p className="mt-6 text-xs text-slate-400 text-center">
              {t('cloneYourBusiness.cta.noPricingNote')}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CloneYourBusinessCta;
