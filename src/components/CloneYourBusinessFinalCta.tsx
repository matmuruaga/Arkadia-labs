// src/components/CloneYourBusinessFinalCta.tsx
// Final CTA section for /clone-your-business page.
// Based on FinalCtaSection but with Cal.com scheduler embed for direct demo booking.
// Dark theme matching the page's visual identity.

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { MessageCircle, CheckCircle2, CalendarDays } from 'lucide-react';
import { trackCtaClick, trackSectionView } from '@/utils/dataLayer';
import CalScheduler from '@/components/CalScheduler';

// ============================================================================
// Animation variants
// ============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// ============================================================================
// Trust items — translation keys only
// ============================================================================

const TRUST_KEYS = [
  'cloneYourBusiness.finalCta.trustItems.t1',
  'cloneYourBusiness.finalCta.trustItems.t2',
  'cloneYourBusiness.finalCta.trustItems.t3',
] as const;

// ============================================================================
// Component
// ============================================================================

const CloneYourBusinessFinalCta: React.FC = () => {
  const { t } = useTranslation('clone-your-business');
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  useEffect(() => {
    if (isInView) {
      trackSectionView('final_cta', 'clone_your_business');
    }
  }, [isInView]);

  const handleTalkToTeam = () => {
    trackCtaClick('talk_to_team', 'clone_your_business_final_cta', t('cloneYourBusiness.cta.secondaryCta'));
    navigate(`/${lang ?? 'en'}/contact`);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-4 overflow-hidden bg-[#070B14]"
      aria-labelledby="final-cta-heading"
    >
      {/* ── Background gradients ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top-center glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-blue-600/20 blur-[120px]" />
        {/* Bottom glow */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-indigo-600/15 blur-[100px]" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="flex flex-col items-center text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-blue-500/30 bg-blue-500/10 text-blue-400 mb-6">
              <CalendarDays className="w-3.5 h-3.5" aria-hidden="true" />
              {t('cloneYourBusiness.finalCta.badge')}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            id="final-cta-heading"
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white mb-4"
          >
            {t('cloneYourBusiness.finalCta.headline')}{' '}
            <span className="crafted-gradient-text">
              {t('cloneYourBusiness.finalCta.headlineAccent')}
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12"
          >
            {t('cloneYourBusiness.finalCta.subtitle')}
          </motion.p>

          {/* ── Glass card ── */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 md:p-10 shadow-2xl"
          >
            {/* Trust items */}
            <ul className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 mb-8">
              {TRUST_KEYS.map((key) => (
                <li key={key} className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" aria-hidden="true" />
                  {t(key)}
                </li>
              ))}
            </ul>

            {/* Primary CTA — Cal.com scheduler */}
            <div className="flex flex-col items-center gap-4">
              <CalScheduler
                buttonText={t('cloneYourBusiness.finalCta.schedulerLabel')}
                namespace="30min-final-cta"
                buttonClassName="
                  inline-flex items-center justify-center gap-2.5
                  w-full sm:w-auto
                  px-8 py-4
                  text-base font-semibold text-white
                  rounded-xl
                  bg-gradient-to-r from-blue-600 to-indigo-600
                  hover:from-blue-500 hover:to-indigo-500
                  shadow-lg shadow-blue-700/30
                  transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400
                "
              />

              {/* Divider */}
              <div className="flex items-center gap-3 text-xs text-gray-600 w-full max-w-xs">
                <span className="flex-1 h-px bg-white/10" />
                <span>{t('cloneYourBusiness.finalCta.orLabel')}</span>
                <span className="flex-1 h-px bg-white/10" />
              </div>

              {/* Secondary — talk to team */}
              <button
                type="button"
                onClick={handleTalkToTeam}
                className="
                  inline-flex items-center justify-center gap-2
                  w-full sm:w-auto
                  px-7 py-3.5
                  text-sm font-semibold text-gray-300
                  rounded-xl
                  border border-white/15 bg-white/5
                  hover:bg-white/10 hover:border-white/25 hover:text-white
                  transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30
                "
                aria-label={t('cloneYourBusiness.cta.secondaryCta')}
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                {t('cloneYourBusiness.cta.secondaryCta')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CloneYourBusinessFinalCta;
