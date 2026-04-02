// src/components/assessment/AssessmentIntro.tsx
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Clock, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AssessmentIntroProps {
  onStart: () => void;
}

const AssessmentIntro: React.FC<AssessmentIntroProps> = ({ onStart }) => {
  const { t } = useTranslation('assessment');

  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center px-4 py-12 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-6"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500/20 to-teal-500/20 flex items-center justify-center mx-auto">
          <BarChart3 className="h-8 w-8 text-sky-400" />
        </div>
      </motion.div>

      <motion.h1
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {t('intro.headline')}
      </motion.h1>

      <motion.p
        className="text-lg text-slate-300 mb-8 max-w-xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {t('intro.description')}
      </motion.p>

      <motion.div
        className="flex items-center gap-2 text-sm text-slate-400 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Clock className="h-4 w-4" />
        <span>{t('intro.duration')}</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Button
          onClick={onStart}
          className="bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white font-bold text-lg px-8 py-6 rounded-xl shadow-lg shadow-sky-500/25 transition-all duration-300"
        >
          {t('intro.cta')}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default AssessmentIntro;
