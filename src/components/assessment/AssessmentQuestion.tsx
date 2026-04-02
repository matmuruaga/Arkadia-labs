// src/components/assessment/AssessmentQuestion.tsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AssessmentQuestion as QuestionType } from '@/data/assessmentQuestions';

interface AssessmentQuestionProps {
  question: QuestionType;
  questionIndex: number;
  selectedOption: number | undefined;
  onAnswer: (optionIndex: number) => void;
  onBack: () => void;
  canGoBack: boolean;
}

const AssessmentQuestion: React.FC<AssessmentQuestionProps> = ({
  question,
  questionIndex,
  selectedOption,
  onAnswer,
  onBack,
  canGoBack,
}) => {
  const { t } = useTranslation('assessment');
  const [animatingOption, setAnimatingOption] = useState<number | null>(null);

  const handleSelect = (optionIndex: number) => {
    setAnimatingOption(optionIndex);
    setTimeout(() => {
      onAnswer(optionIndex);
      setAnimatingOption(null);
    }, 300);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={questionIndex}
        className="flex flex-col items-center px-4 py-8 max-w-2xl mx-auto w-full"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-8">
          {t(`${question.translationKey}.title`)}
        </h2>

        <div className="w-full space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedOption === index || animatingOption === index;
            return (
              <motion.button
                key={index}
                onClick={() => handleSelect(index)}
                className={cn(
                  "w-full text-left p-4 rounded-xl border-2 transition-all duration-200",
                  "hover:border-sky-400/50 hover:bg-slate-700/50",
                  isSelected
                    ? "border-sky-400 bg-sky-500/10"
                    : "border-slate-600 bg-slate-800/50"
                )}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                      isSelected
                        ? "border-sky-400 bg-sky-400"
                        : "border-slate-500"
                    )}
                  >
                    {isSelected && <Check className="h-4 w-4 text-white" />}
                  </div>
                  <span className={cn(
                    "text-base",
                    isSelected ? "text-white" : "text-slate-300"
                  )}>
                    {t(option.translationKey)}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {canGoBack && (
          <motion.button
            onClick={onBack}
            className="mt-6 flex items-center gap-1 text-sm text-slate-400 hover:text-slate-300 transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <ChevronLeft className="h-4 w-4" />
            {t('back')}
          </motion.button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default AssessmentQuestion;
