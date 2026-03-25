// src/components/solutions/SolutionHero.tsx
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle, Clock, TrendingUp, ArrowDown, Phone, Star, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useConversation } from '@elevenlabs/react';
import { SolutionHero as SolutionHeroType } from '@/data/solutions/types';
import { trackCtaClick, trackAiWidgetOpen, trackAiWidgetClose } from '@/utils/dataLayer';
import HeroVisual from './HeroVisual';

// ---------------------------------------------------------------------------
// Icon map – identical to the previous implementation
// ---------------------------------------------------------------------------
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'check-circle': CheckCircle,
  'clock': Clock,
  'trending-up': TrendingUp,
  'phone': Phone,
  'star': Star,
};

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface Props {
  data: SolutionHeroType;
  solutionId: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
const SolutionHero: React.FC<Props> = ({ data, solutionId }) => {
  const { t, i18n } = useTranslation('solutions');
  const navigate = useNavigate();
  const { startSession, endSession, status } = useConversation();
  const [isVoiceLoading, setIsVoiceLoading] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // ------------------------------------------------------------------
  // Responsive parallax – disabled on mobile for performance
  // ------------------------------------------------------------------
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });

  const yContent = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  const opacityContent = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  // ------------------------------------------------------------------
  // ElevenLabs voice session toggle – preserved exactly
  // ------------------------------------------------------------------
  const handleToggleVoice = useCallback(async () => {
    setIsVoiceLoading(true);
    try {
      if (status === 'disconnected') {
        trackAiWidgetOpen(`solution_hero_${solutionId}`, 'elevenlabs_voice_agent');
        const permissionStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        permissionStream.getTracks().forEach(track => track.stop());
        await startSession({
          agentId: 'agent_01jynm32kjf7rvq5857ggj51ew',
          connectionType: 'webrtc',
        });
      } else if (status === 'connected') {
        trackAiWidgetClose(`solution_hero_${solutionId}`, 'elevenlabs_voice_agent');
        await endSession();
      }
    } catch (error) {
      console.error('Error managing voice session:', error);
    } finally {
      setIsVoiceLoading(false);
    }
  }, [status, startSession, endSession, solutionId]);

  // ------------------------------------------------------------------
  // CTA handlers – preserved exactly
  // ------------------------------------------------------------------
  const handlePrimaryCta = () => {
    trackCtaClick('solution_primary_cta', `solution_hero_${solutionId}`, data.primaryCta);
    if (data.primaryCtaAction === 'elevenlabs') {
      handleToggleVoice();
    } else {
      navigate(`/${i18n.language}/contact`);
    }
  };

  const handleSecondaryCta = () => {
    trackCtaClick('solution_secondary_cta', `solution_hero_${solutionId}`, data.secondaryCta);
    const howItWorksSection = document.getElementById('how-it-works');
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------
  return (
    <section
      ref={targetRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-sky-50/30 to-cyan-50/40"
    >
      {/* ----------------------------------------------------------------
          Animated background elements – unchanged
      ---------------------------------------------------------------- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-sky-200/20 to-cyan-200/20 rounded-full blur-3xl" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* ----------------------------------------------------------------
          Main content wrapper – parallax preserved
      ---------------------------------------------------------------- */}
      <motion.div
        style={{ y: isMobile ? 0 : yContent, opacity: opacityContent }}
        className="relative z-10 container mx-auto px-4 sm:px-6 pt-28 pb-20 md:pt-28 md:pb-28"
      >
        {/* ----------------------------------------------------------------
            2-Column Grid
            - Mobile: stacked (visual capped at 350px)
            - Desktop: equal columns side-by-side
        ---------------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* ── LEFT COLUMN ─────────────────────────────────────────── */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex lg:justify-start justify-center mb-6"
            >
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500/10 to-cyan-500/10 border border-sky-200/50 px-4 py-1.5 rounded-full">
                <span className="w-2 h-2 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-slate-700">
                  {t(`solutions.${solutionId}.hero.badge`, data.badge)}
                </span>
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6 text-center lg:text-left"
            >
              {t(`solutions.${solutionId}.hero.title`, data.title)}
            </motion.h1>

            {/* Subtitle with gradient */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent mb-4 text-center lg:text-left"
            >
              {t(`solutions.${solutionId}.hero.subtitle`, data.subtitle)}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-slate-600 mb-10 text-center lg:text-left"
            >
              {t(`solutions.${solutionId}.hero.description`, data.description)}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <button
                onClick={handlePrimaryCta}
                disabled={isVoiceLoading}
                className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sky-600 to-teal-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/30 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-wait"
              >
                {isVoiceLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : data.primaryCtaAction === 'elevenlabs' && status === 'connected' ? (
                  <>
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    {t(`solutions.${solutionId}.hero.primaryCtaActive`, 'End Call')}
                  </>
                ) : (
                  <>
                    {t(`solutions.${solutionId}.hero.primaryCta`, data.primaryCta)}
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <button
                onClick={handleSecondaryCta}
                className="inline-flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm text-slate-700 px-8 py-4 rounded-full font-semibold text-lg border border-slate-200 hover:bg-white hover:border-slate-300 transition-all duration-300"
              >
                {t(`solutions.${solutionId}.hero.secondaryCta`, data.secondaryCta)}
              </button>
            </motion.div>

          </div>

          {/* ── RIGHT COLUMN ────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-h-[350px] lg:max-h-none overflow-visible"
          >
            <HeroVisual
              solutionId={solutionId}
              heroImage={data.heroImage}
              primaryCtaAction={data.primaryCtaAction}
              heroVisualType={data.heroVisualType}
              voiceStatus={status}
              trustBadges={data.trustBadges}
            />
          </motion.div>
        </div>

        {/* ----------------------------------------------------------------
            Scroll indicator – preserved exactly
        ---------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-10 h-10 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-400 hover:border-slate-400 hover:text-slate-500 transition-colors cursor-pointer"
            role="button"
            aria-label="Scroll to next section"
            tabIndex={0}
            onClick={() => {
              trackCtaClick('scroll_indicator', `solution_hero_${solutionId}`, 'Scroll to Problem');
              const problemSection = document.getElementById('problem-section');
              if (problemSection) {
                problemSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                trackCtaClick('scroll_indicator', `solution_hero_${solutionId}`, 'Scroll to Problem');
                const problemSection = document.getElementById('problem-section');
                if (problemSection) {
                  problemSection.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
          >
            <ArrowDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SolutionHero;
