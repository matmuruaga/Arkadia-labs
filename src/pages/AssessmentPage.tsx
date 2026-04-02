// src/pages/AssessmentPage.tsx
import { useReducer, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackPageView, trackAssessmentStart, trackAssessmentStep, trackAssessmentAnswer, trackAssessmentResult } from '@/utils/dataLayer';
import {
  assessmentQuestions,
  calculateScore,
  getMaturityLevel,
  getPainPoint,
} from '@/data/assessmentQuestions';
import SEO from '@/components/SEO';
import AssessmentIntro from '@/components/assessment/AssessmentIntro';
import AssessmentProgress from '@/components/assessment/AssessmentProgress';
import AssessmentQuestion from '@/components/assessment/AssessmentQuestion';
import AssessmentForm from '@/components/assessment/AssessmentForm';
import AssessmentResult from '@/components/assessment/AssessmentResult';
import type { AssessmentContactData } from '@/components/assessment/AssessmentForm';

type Step = 'intro' | 'question' | 'form' | 'result';

interface AssessmentState {
  currentStep: Step;
  questionIndex: number;
  answers: Record<number, number>;
  score: number;
  painPoint: string | null;
  contactData: AssessmentContactData | null;
}

type AssessmentAction =
  | { type: 'START' }
  | { type: 'ANSWER'; questionIndex: number; optionIndex: number }
  | { type: 'GO_BACK' }
  | { type: 'SUBMIT_FORM'; data: AssessmentContactData }
  | { type: 'SHOW_RESULT' };

const initialState: AssessmentState = {
  currentStep: 'intro',
  questionIndex: 0,
  answers: {},
  score: 0,
  painPoint: null,
  contactData: null,
};

function assessmentReducer(state: AssessmentState, action: AssessmentAction): AssessmentState {
  switch (action.type) {
    case 'START':
      return { ...state, currentStep: 'question', questionIndex: 0 };

    case 'ANSWER': {
      const newAnswers = { ...state.answers, [action.questionIndex]: action.optionIndex };
      const isLastQuestion = action.questionIndex >= assessmentQuestions.length - 1;

      if (isLastQuestion) {
        const score = calculateScore(newAnswers);
        const painPoint = getPainPoint(newAnswers);
        return {
          ...state,
          answers: newAnswers,
          score,
          painPoint,
          currentStep: 'form',
        };
      }

      return {
        ...state,
        answers: newAnswers,
        questionIndex: action.questionIndex + 1,
      };
    }

    case 'GO_BACK': {
      if (state.currentStep === 'form') {
        return { ...state, currentStep: 'question', questionIndex: assessmentQuestions.length - 1 };
      }
      if (state.questionIndex > 0) {
        return { ...state, questionIndex: state.questionIndex - 1 };
      }
      return { ...state, currentStep: 'intro' };
    }

    case 'SUBMIT_FORM':
      return { ...state, contactData: action.data, currentStep: 'result' };

    case 'SHOW_RESULT':
      return { ...state, currentStep: 'result' };

    default:
      return state;
  }
}

const AssessmentPage = () => {
  const { i18n } = useTranslation('assessment');
  const location = useLocation();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const [state, dispatch] = useReducer(assessmentReducer, initialState);
  const level = getMaturityLevel(state.score);

  useEffect(() => {
    trackPageView(location.pathname, 'BPO Assessment', i18n.language);
  }, [location.pathname, i18n.language]);

  const handleStart = () => {
    trackAssessmentStart(i18n.language);
    dispatch({ type: 'START' });
  };

  const handleAnswer = (optionIndex: number) => {
    const question = assessmentQuestions[state.questionIndex];
    trackAssessmentAnswer(question.id, optionIndex);
    dispatch({ type: 'ANSWER', questionIndex: state.questionIndex, optionIndex });
  };

  const handleBack = () => {
    dispatch({ type: 'GO_BACK' });
  };

  const handleFormSuccess = (data: AssessmentContactData) => {
    dispatch({ type: 'SUBMIT_FORM', data });
    trackAssessmentResult(state.score, level, state.painPoint);
  };

  const handleResultCta = () => {
    navigate(`/${lang}/bpo-assessment/thank-you`, {
      state: { score: state.score, level, painPoint: state.painPoint },
    });
  };

  // Track step views
  useEffect(() => {
    if (state.currentStep === 'question') {
      const question = assessmentQuestions[state.questionIndex];
      trackAssessmentStep(state.questionIndex + 1, question.id);
    }
  }, [state.currentStep, state.questionIndex]);

  return (
    <>
      <SEO
        titleKey="assessment.title"
        descriptionKey="assessment.description"
        path="/bpo-assessment"
        noindex={state.currentStep === 'result'}
      />
      <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center py-16 pt-24">
        {/* Progress bar — show during questions and form */}
        {(state.currentStep === 'question' || state.currentStep === 'form') && (
          <div className="w-full max-w-2xl px-4">
            <AssessmentProgress
              current={state.currentStep === 'form' ? assessmentQuestions.length : state.questionIndex + 1}
              total={assessmentQuestions.length}
            />
          </div>
        )}

        {state.currentStep === 'intro' && (
          <AssessmentIntro onStart={handleStart} />
        )}

        {state.currentStep === 'question' && (
          <AssessmentQuestion
            question={assessmentQuestions[state.questionIndex]}
            questionIndex={state.questionIndex}
            selectedOption={state.answers[state.questionIndex]}
            onAnswer={handleAnswer}
            onBack={handleBack}
            canGoBack={true}
          />
        )}

        {state.currentStep === 'form' && (
          <AssessmentForm
            onSubmitSuccess={handleFormSuccess}
            assessmentMeta={{ score: state.score, level, painPoint: state.painPoint }}
          />
        )}

        {state.currentStep === 'result' && (
          <AssessmentResult
            score={state.score}
            level={level}
            painPoint={state.painPoint}
            onCtaClick={handleResultCta}
          />
        )}
      </section>
    </>
  );
};

export default AssessmentPage;
