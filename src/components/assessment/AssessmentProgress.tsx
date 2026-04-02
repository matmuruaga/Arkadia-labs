// src/components/assessment/AssessmentProgress.tsx
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface AssessmentProgressProps {
  current: number;
  total: number;
}

const AssessmentProgress: React.FC<AssessmentProgressProps> = ({ current, total }) => {
  const { t } = useTranslation('assessment');
  const percentage = (current / total) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-slate-400">
          {t('progress', { current, total })}
        </span>
        <span className="text-sm text-slate-400">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-sky-500 to-teal-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default AssessmentProgress;
