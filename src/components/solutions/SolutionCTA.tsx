// src/components/solutions/SolutionCTA.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { SolutionCTA as SolutionCTAType } from '@/data/solutions/types';
import { trackCtaClick } from '@/utils/dataLayer';

interface Props {
  data: SolutionCTAType;
  solutionId: string;
}

const SolutionCTA: React.FC<Props> = ({ data, solutionId }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handlePrimaryCta = () => {
    trackCtaClick('solution_final_cta_primary', `solution_cta_${solutionId}`, data.primaryCta);
    navigate(`/${i18n.language}/contact`);
  };

  const handleSecondaryCta = () => {
    trackCtaClick('solution_final_cta_secondary', `solution_cta_${solutionId}`, data.secondaryCta);
    navigate(`/${i18n.language}/contact`);
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-sky-600 via-cyan-600 to-teal-700 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-300/10 rounded-full blur-3xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Floating sparkles */}
        <motion.div
          animate={{ y: [-10, 10, -10], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20"
        >
          <Sparkles className="h-8 w-8 text-white/30" />
        </motion.div>
        <motion.div
          animate={{ y: [10, -10, 10], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 right-32"
        >
          <Sparkles className="h-6 w-6 text-white/30" />
        </motion.div>
        <motion.div
          animate={{ y: [-15, 15, -15], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 right-20"
        >
          <Sparkles className="h-10 w-10 text-white/20" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold">
                {t(`solutions.${solutionId}.cta.badge`, 'Get Started Today')}
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {t(`solutions.${solutionId}.cta.title`, data.title)}
            </h2>

            {/* Subtitle */}
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              {t(`solutions.${solutionId}.cta.subtitle`, data.subtitle)}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePrimaryCta}
                className="group inline-flex items-center justify-center gap-2 bg-white text-sky-600 px-8 py-4 rounded-full font-semibold text-lg shadow-xl shadow-black/10 hover:shadow-2xl hover:shadow-black/20 transition-all duration-300"
              >
                {t(`solutions.${solutionId}.cta.primaryCta`, data.primaryCta)}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSecondaryCta}
                className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 py-4 rounded-full font-semibold text-lg border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                {t(`solutions.${solutionId}.cta.secondaryCta`, data.secondaryCta)}
              </motion.button>
            </div>

            {/* Trust elements */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-6 text-white/60 text-sm"
            >
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>{t(`solutions.${solutionId}.cta.trust1`, 'No credit card required')}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>{t(`solutions.${solutionId}.cta.trust2`, 'Free pilot program')}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>{t(`solutions.${solutionId}.cta.trust3`, 'Setup in minutes')}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolutionCTA;
