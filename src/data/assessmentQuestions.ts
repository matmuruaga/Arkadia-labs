// src/data/assessmentQuestions.ts

export interface AssessmentOption {
  translationKey: string;
  points: number;
  tag?: string;
}

export interface AssessmentQuestion {
  id: string;
  translationKey: string;
  options: AssessmentOption[];
  isScored: boolean;
}

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'operation_size',
    translationKey: 'assessment.questions.q1',
    isScored: true,
    options: [
      { translationKey: 'assessment.questions.q1.options.a', points: 1 },
      { translationKey: 'assessment.questions.q1.options.b', points: 2 },
      { translationKey: 'assessment.questions.q1.options.c', points: 3 },
      { translationKey: 'assessment.questions.q1.options.d', points: 4 },
    ],
  },
  {
    id: 'quality_monitoring',
    translationKey: 'assessment.questions.q2',
    isScored: true,
    options: [
      { translationKey: 'assessment.questions.q2.options.a', points: 1 },
      { translationKey: 'assessment.questions.q2.options.b', points: 2 },
      { translationKey: 'assessment.questions.q2.options.c', points: 3 },
      { translationKey: 'assessment.questions.q2.options.d', points: 4 },
    ],
  },
  {
    id: 'volume_handling',
    translationKey: 'assessment.questions.q3',
    isScored: true,
    options: [
      { translationKey: 'assessment.questions.q3.options.a', points: 1 },
      { translationKey: 'assessment.questions.q3.options.b', points: 2 },
      { translationKey: 'assessment.questions.q3.options.c', points: 3 },
      { translationKey: 'assessment.questions.q3.options.d', points: 4 },
    ],
  },
  {
    id: 'onboarding',
    translationKey: 'assessment.questions.q4',
    isScored: true,
    options: [
      { translationKey: 'assessment.questions.q4.options.a', points: 1 },
      { translationKey: 'assessment.questions.q4.options.b', points: 2 },
      { translationKey: 'assessment.questions.q4.options.c', points: 3 },
      { translationKey: 'assessment.questions.q4.options.d', points: 4 },
    ],
  },
  {
    id: 'tech_stack',
    translationKey: 'assessment.questions.q5',
    isScored: true,
    options: [
      { translationKey: 'assessment.questions.q5.options.a', points: 1 },
      { translationKey: 'assessment.questions.q5.options.b', points: 2 },
      { translationKey: 'assessment.questions.q5.options.c', points: 3 },
      { translationKey: 'assessment.questions.q5.options.d', points: 4 },
    ],
  },
  {
    id: 'pain_point',
    translationKey: 'assessment.questions.q6',
    isScored: false,
    options: [
      { translationKey: 'assessment.questions.q6.options.a', points: 0, tag: 'rotacion' },
      { translationKey: 'assessment.questions.q6.options.b', points: 0, tag: 'calidad' },
      { translationKey: 'assessment.questions.q6.options.c', points: 0, tag: 'escalar' },
      { translationKey: 'assessment.questions.q6.options.d', points: 0, tag: 'datos' },
    ],
  },
  {
    id: 'ai_interest',
    translationKey: 'assessment.questions.q7',
    isScored: true,
    options: [
      { translationKey: 'assessment.questions.q7.options.a', points: 1 },
      { translationKey: 'assessment.questions.q7.options.b', points: 2 },
      { translationKey: 'assessment.questions.q7.options.c', points: 3 },
      { translationKey: 'assessment.questions.q7.options.d', points: 4 },
    ],
  },
];

export type MaturityLevel = 'initial' | 'developing' | 'advanced' | 'leader';

export function getMaturityLevel(score: number): MaturityLevel {
  if (score <= 11) return 'initial';
  if (score <= 18) return 'developing';
  if (score <= 24) return 'advanced';
  return 'leader';
}

export function calculateScore(answers: Record<number, number>): number {
  return assessmentQuestions.reduce((total, question, index) => {
    if (!question.isScored || answers[index] === undefined) return total;
    return total + question.options[answers[index]].points;
  }, 0);
}

export function getPainPoint(answers: Record<number, number>): string | null {
  const painQuestionIndex = 5; // q6 is index 5
  const selectedOption = answers[painQuestionIndex];
  if (selectedOption === undefined) return null;
  return assessmentQuestions[painQuestionIndex].options[selectedOption].tag || null;
}
