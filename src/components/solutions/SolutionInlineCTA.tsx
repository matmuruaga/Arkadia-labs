// src/components/solutions/SolutionInlineCTA.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { trackCtaClick } from '@/utils/dataLayer';

interface Props {
  solutionId: string;
  variant?: 'compact' | 'featured' | 'gradient';
  translationKey?: string;
}

const SolutionInlineCTA: React.FC<Props> = ({
  solutionId,
  variant = 'compact',
  translationKey = 'inlineCta1'
}) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleCtaClick = () => {
    trackCtaClick('inline_cta', `solution_${solutionId}_${variant}`, 'Get Started');
    navigate(`/${i18n.language}/contact`);
  };

  // Compact variant - subtle banner between sections
  if (variant === 'compact') {
    return (
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 md:p-8">
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-teal-500/10 to-cyan-500/10 animate-pulse" />

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-sky-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-teal-500/20 to-transparent rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />

              <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
                <div className="flex items-center gap-4 text-center md:text-left">
                  <div className="hidden md:flex w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 items-center justify-center flex-shrink-0">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                      {t(`solutions.${solutionId}.${translationKey}.title`, 'Ready to transform your lead quality?')}
                    </h3>
                    <p className="text-sm text-slate-300">
                      {t(`solutions.${solutionId}.${translationKey}.subtitle`, 'Start validating leads in minutes, not days.')}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCtaClick}
                  className="group flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-full font-semibold hover:bg-slate-100 transition-all duration-300 shadow-lg shadow-black/20 flex-shrink-0"
                >
                  {t(`solutions.${solutionId}.${translationKey}.cta`, 'Get Started')}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // Featured variant - more prominent with stats
  if (variant === 'featured') {
    return (
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <div className="relative overflow-hidden rounded-3xl">
              {/* Background with glassmorphism */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-600 via-cyan-600 to-teal-600" />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NEgwdjJoNHY0aDJ2LTRoNHYtMkg2ek02IDRWMEI0djRIMHYyaDR2NGgyVjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

              {/* Floating orbs */}
              <motion.div
                animate={{ y: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl"
              />
              <motion.div
                animate={{ y: [0, 20, 0], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
              />

              <div className="relative p-8 md:p-12 lg:p-16">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Content */}
                  <div className="text-center md:text-left">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6"
                    >
                      <Sparkles className="h-4 w-4 text-white" />
                      <span className="text-sm font-medium text-white">
                        {t(`solutions.${solutionId}.${translationKey}.badge`, 'Limited Time Offer')}
                      </span>
                    </motion.div>

                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                      {t(`solutions.${solutionId}.${translationKey}.title`, 'Start Validating Leads Today')}
                    </h2>

                    <p className="text-lg text-white/80 mb-8">
                      {t(`solutions.${solutionId}.${translationKey}.subtitle`, 'Join 500+ companies already improving their lead quality with our AI-powered validation.')}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                      <button
                        onClick={handleCtaClick}
                        className="group inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-semibold text-lg shadow-xl shadow-black/20 hover:shadow-2xl hover:scale-105 transition-all duration-300"
                      >
                        {t(`solutions.${solutionId}.${translationKey}.primaryCta`, 'Schedule Demo')}
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* Stats cards */}
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: '98%', label: t(`solutions.${solutionId}.${translationKey}.stats.0`, 'Accuracy Rate') },
                      { value: '2min', label: t(`solutions.${solutionId}.${translationKey}.stats.1`, 'Setup Time') },
                      { value: '500+', label: t(`solutions.${solutionId}.${translationKey}.stats.2`, 'Happy Clients') },
                      { value: '24/7', label: t(`solutions.${solutionId}.${translationKey}.stats.3`, 'Support') },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20"
                      >
                        <p className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</p>
                        <p className="text-sm text-white/70">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // Gradient variant - horizontal banner with urgency
  return (
    <section className="py-6 md:py-10">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative overflow-hidden bg-gradient-to-r from-sky-50 via-cyan-50 to-teal-50 border border-sky-200/50 rounded-2xl p-6 md:p-8">
            {/* Subtle pattern */}
            <div className="absolute inset-0 opacity-50">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-sky-200/30 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-teal-200/30 to-transparent rounded-full blur-2xl" />
            </div>

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-center md:text-left">
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                  <Clock className="h-4 w-4" />
                  {t(`solutions.${solutionId}.${translationKey}.urgency`, 'Limited spots available')}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900">
                    {t(`solutions.${solutionId}.${translationKey}.title`, 'Ready to see it in action?')}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    {t(`solutions.${solutionId}.${translationKey}.subtitle`, 'Book a personalized demo with our team.')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleCtaClick}
                  className="group inline-flex items-center gap-2 bg-gradient-to-r from-sky-600 to-teal-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  {t(`solutions.${solutionId}.${translationKey}.cta`, 'Book Demo')}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionInlineCTA;
