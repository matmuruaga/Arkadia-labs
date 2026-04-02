// src/pages/AssessmentThankYouPage.tsx
import { useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { trackPageView } from '@/utils/dataLayer';
import CalScheduler from '@/components/CalScheduler';
import SEO from '@/components/SEO';
import type { MaturityLevel } from '@/data/assessmentQuestions';
import { cn } from '@/lib/utils';

interface LocationState {
  score?: number;
  level?: MaturityLevel;
  painPoint?: string | null;
}

const LEVEL_TEXT_CLASSES: Record<MaturityLevel, string> = {
  initial: 'text-orange-500',
  developing: 'text-yellow-500',
  advanced: 'text-emerald-400',
  leader: 'text-green-500',
};

const AssessmentThankYouPage = () => {
  const { t, i18n } = useTranslation('assessment');
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const locationState = (location.state as LocationState) || {};
  const { score, level } = locationState;

  useEffect(() => {
    trackPageView(location.pathname, 'Assessment Thank You', i18n.language);
  }, [location.pathname, i18n.language]);

  const homeUrl = `/${lang || 'es'}`;

  return (
    <>
      <SEO
        titleKey="seo.assessmentThankYou.title"
        descriptionKey="seo.assessmentThankYou.description"
        path="/bpo-assessment/thank-you"
        noindex
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Hero section */}
        <div className="flex flex-col items-center justify-center text-center px-4 pt-32 pb-16">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <CheckCircle className="h-20 w-20 text-green-400 mb-6" />
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {t('thankYou.title')}
          </motion.h1>

          <motion.p
            className="text-lg text-slate-300 mb-4 max-w-xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {t('thankYou.subtitle')}
          </motion.p>

          {score !== undefined && level && (
            <motion.p
              className={cn("text-lg font-semibold", LEVEL_TEXT_CLASSES[level])}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {t('thankYou.summary', {
                level: t(`result.levels.${level}.name`),
                score,
              })}
            </motion.p>
          )}
        </div>

        {/* Scheduler section */}
        <section className="w-full bg-slate-800/50 py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {t('thankYou.schedulerTitle')}
                </h2>
                <p className="text-slate-300 leading-relaxed">
                  {t('thankYou.schedulerDescription')}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex justify-center"
              >
                <CalScheduler
                  buttonText={t('thankYou.schedulerButton')}
                  buttonClassName="bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white font-bold text-lg rounded-xl px-8 py-4 flex items-center gap-3 shadow-lg shadow-sky-500/25 transition-all duration-300"
                  namespace="30min"
                  calLink="karel-duchon-arkadialabs/30min"
                  layout="month_view"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-12">
          <Link
            to={homeUrl}
            className="text-base text-slate-400 hover:text-sky-400 hover:underline transition-colors"
          >
            {t('thankYou.backLink')}
          </Link>
        </footer>
      </div>
    </>
  );
};

export default AssessmentThankYouPage;
