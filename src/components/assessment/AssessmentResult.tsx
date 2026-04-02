// src/components/assessment/AssessmentResult.tsx
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Share2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { trackAssessmentShare, trackCtaClick } from '@/utils/dataLayer';
import type { MaturityLevel } from '@/data/assessmentQuestions';

interface AssessmentResultProps {
  score: number;
  level: MaturityLevel;
  painPoint: string | null;
  onCtaClick: () => void;
}

const LEVEL_COLOR_CLASSES: Record<MaturityLevel, { text: string; bg: string; border: string }> = {
  initial: { text: 'text-orange-500', bg: 'bg-orange-500', border: 'border-orange-500' },
  developing: { text: 'text-yellow-500', bg: 'bg-yellow-500', border: 'border-yellow-500' },
  advanced: { text: 'text-emerald-400', bg: 'bg-emerald-400', border: 'border-emerald-400' },
  leader: { text: 'text-green-500', bg: 'bg-green-500', border: 'border-green-500' },
};

const AssessmentResult: React.FC<AssessmentResultProps> = ({
  score,
  level,
  painPoint,
  onCtaClick,
}) => {
  const { t } = useTranslation('assessment');
  const { lang } = useParams<{ lang: string }>();
  const colors = LEVEL_COLOR_CLASSES[level];
  const scorePercentage = ((score - 6) / (28 - 6)) * 100;
  const recommendations = t(`result.levels.${level}.recommendations`, { returnObjects: true }) as string[];

  const handleShare = () => {
    trackAssessmentShare('whatsapp', 'assessment_result');
    const shareUrl = `${window.location.origin}/${lang}/bpo-assessment`;
    const shareText = t('result.shareText');
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleCtaClick = () => {
    trackCtaClick('schedule_call', 'assessment_result', t('result.cta'));
    onCtaClick();
  };

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
        {t('result.title')}
      </h2>

      {/* Score display */}
      <motion.div
        className="text-center mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
      >
        <div className={cn("text-6xl font-bold mb-2", colors.text)}>
          {score}
        </div>
        <div className="text-slate-400">
          {t('result.scoreLabel')} ({t('result.of')} 28)
        </div>
      </motion.div>

      {/* Score bar */}
      <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden mb-8">
        <motion.div
          className={cn("h-full rounded-full", colors.bg)}
          initial={{ width: 0 }}
          animate={{ width: `${scorePercentage}%` }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        />
      </div>

      {/* Level */}
      <motion.div
        className={cn("border rounded-xl p-6 mb-8", colors.border, "bg-slate-800/50")}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-slate-400">{t('result.levelLabel')}</span>
        </div>
        <h3 className={cn("text-2xl font-bold mb-2", colors.text)}>
          {t(`result.levels.${level}.name`)}
        </h3>
        <p className="text-slate-300">
          {t(`result.levels.${level}.description`)}
        </p>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-xl font-bold text-white mb-4">
          {t('result.recommendationsTitle')}
        </h3>
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              className="flex gap-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <CheckCircle2 className={cn("h-5 w-5 flex-shrink-0 mt-0.5", colors.text)} />
              <p className="text-slate-300 text-sm">{rec}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Pain point personalization */}
      {painPoint && (
        <motion.div
          className="mb-8 p-6 rounded-xl bg-gradient-to-br from-sky-500/10 to-teal-500/10 border border-sky-500/20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <h3 className="text-lg font-bold text-white mb-2">
            {t('result.painPointTitle')}
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            {t(`result.painPoints.${painPoint}`)}
          </p>
        </motion.div>
      )}

      {/* Actions */}
      <motion.div
        className="flex flex-col gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <Button
          onClick={handleCtaClick}
          className="w-full bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white font-bold text-lg py-6 shadow-lg shadow-sky-500/25 transition-all duration-300"
        >
          {t('result.cta')}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>

        <Button
          onClick={handleShare}
          variant="outline"
          className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white py-5"
        >
          <Share2 className="mr-2 h-4 w-4" />
          {t('result.shareCta')}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default AssessmentResult;
