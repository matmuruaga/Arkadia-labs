// src/components/CloneYourBusinessCta.tsx
// CTA section for /clone-your-business page.
// Replaces pricing with a custom-solutions pitch + dual CTAs.
// Visual: dark gradient background with glassmorphism card.

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
  const { t } = useTranslation();
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
      className="relative py-24 md:py-32 px-4 overflow-hidden bg-[#070B14]"
      aria-labelledby="cta-heading"
    >
      {/* ── Background gradients ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Radial glow — top-left */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-[120px]" />
        {/* Radial glow — bottom-right */}
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-purple-600/15 blur-[100px]" />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
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
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-blue-500/30 bg-blue-500/10 text-blue-400 mb-6">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              {t('cloneYourBusiness.cta.badge')}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            id="cta-heading"
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-white mb-4"
          >
            {t('cloneYourBusiness.cta.headline')}{' '}
            <span className="crafted-gradient-text">
              {t('cloneYourBusiness.cta.headlineAccent')}
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10"
          >
            {t('cloneYourBusiness.cta.subtitle')}
          </motion.p>

          {/* ── Glass card ── */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-3xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 md:p-12 shadow-2xl"
          >
            {/* Trust points */}
            <ul className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-10">
              {TRUST_KEYS.map((key) => (
                <li key={key} className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" aria-hidden="true" />
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
                  bg-gradient-to-r from-blue-600 to-indigo-600
                  hover:from-blue-500 hover:to-indigo-500
                  shadow-lg shadow-blue-700/30
                  transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
                "
              />

              {/* Secondary — navigate to /contact */}
              <button
                type="button"
                onClick={handleTalkToTeam}
                className="
                  inline-flex items-center justify-center gap-2
                  px-7 py-3.5
                  text-base font-semibold text-white
                  rounded-xl
                  border border-white/20 bg-white/5
                  hover:bg-white/10 hover:border-white/30
                  transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40
                "
                aria-label={t('cloneYourBusiness.cta.secondaryCta')}
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                {t('cloneYourBusiness.cta.secondaryCta')}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* No-pricing note */}
            <p className="mt-6 text-xs text-gray-500 text-center">
              {t('cloneYourBusiness.cta.noPricingNote')}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CloneYourBusinessCta;
