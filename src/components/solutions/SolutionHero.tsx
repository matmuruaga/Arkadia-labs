// src/components/solutions/SolutionHero.tsx
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle, Clock, TrendingUp, ArrowDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SolutionHero as SolutionHeroType } from '@/data/solutions/types';
import { trackCtaClick } from '@/utils/dataLayer';

// Map icon strings to Lucide components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'check-circle': CheckCircle,
  'clock': Clock,
  'trending-up': TrendingUp,
};

interface Props {
  data: SolutionHeroType;
  solutionId: string;
}

const SolutionHero: React.FC<Props> = ({ data, solutionId }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const targetRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive parallax - disable on mobile for better performance
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

  const handlePrimaryCta = () => {
    trackCtaClick('solution_primary_cta', `solution_hero_${solutionId}`, data.primaryCta);
    navigate(`/${i18n.language}/contact`);
  };

  const handleSecondaryCta = () => {
    trackCtaClick('solution_secondary_cta', `solution_hero_${solutionId}`, data.secondaryCta);
    // Scroll to how it works section
    const howItWorksSection = document.getElementById('how-it-works');
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={targetRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-sky-50/30 to-cyan-50/40"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-sky-200/20 to-cyan-200/20 rounded-full blur-3xl" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <motion.div
        style={{ y: isMobile ? 0 : yContent, opacity: opacityContent }}
        className="relative z-10 container mx-auto px-4 sm:px-6 pt-28 pb-20 md:pt-28 md:pb-28"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500/10 to-cyan-500/10 border border-sky-200/50 px-4 py-1.5 rounded-full mb-6"
          >
            <span className="w-2 h-2 bg-gradient-to-r from-sky-500 to-teal-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-slate-700">
              {t(`solutions.${solutionId}.hero.badge`, data.badge)}
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6"
          >
            {t(`solutions.${solutionId}.hero.title`, data.title)}
          </motion.h1>

          {/* Subtitle with gradient */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent mb-4"
          >
            {t(`solutions.${solutionId}.hero.subtitle`, data.subtitle)}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto mb-10"
          >
            {t(`solutions.${solutionId}.hero.description`, data.description)}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <button
              onClick={handlePrimaryCta}
              className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sky-600 to-teal-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              {t(`solutions.${solutionId}.hero.primaryCta`, data.primaryCta)}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleSecondaryCta}
              className="inline-flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm text-slate-700 px-8 py-4 rounded-full font-semibold text-lg border border-slate-200 hover:bg-white hover:border-slate-300 transition-all duration-300"
            >
              {t(`solutions.${solutionId}.hero.secondaryCta`, data.secondaryCta)}
            </button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
          >
            {data.trustBadges.map((badge, index) => {
              const IconComponent = iconMap[badge.icon] || CheckCircle;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="bg-white/60 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-teal-600 flex items-center justify-center text-white">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-2xl font-bold text-slate-900">{badge.value}</p>
                    <p className="text-xs text-slate-500">{t(`solutions.${solutionId}.hero.trustBadges.${index}.label`, badge.label)}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
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
