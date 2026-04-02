# BPO AI Maturity Assessment — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an interactive 7-question AI maturity assessment for BPOs that captures leads and shows personalized results.

**Architecture:** Single-page state machine (`useReducer`) with 5 screens (intro, questions, form, result) plus a separate thank-you page. Question metadata lives in a data file; all text comes from i18n. Analytics events track the full funnel.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, React Hook Form + Zod, Framer Motion, i18next, existing Brevo integration, CalScheduler component.

**Spec:** `docs/superpowers/specs/2026-04-02-bpo-assessment-design.md`

---

## File Map

| Action | File | Responsibility |
|--------|------|---------------|
| Create | `src/data/assessmentQuestions.ts` | Question metadata: IDs, translation keys, points, tags |
| Create | `src/pages/AssessmentPage.tsx` | Main page: reducer, screen routing, analytics |
| Create | `src/pages/AssessmentThankYouPage.tsx` | Thank you: result summary + CalScheduler |
| Create | `src/components/assessment/AssessmentIntro.tsx` | Intro screen: headline, description, CTA |
| Create | `src/components/assessment/AssessmentProgress.tsx` | Progress bar with step count |
| Create | `src/components/assessment/AssessmentQuestion.tsx` | Single question: title + option cards |
| Create | `src/components/assessment/AssessmentForm.tsx` | Lead capture form: RHF + Zod + Brevo |
| Create | `src/components/assessment/AssessmentResult.tsx` | Score display, level, recommendations, CTA |
| Create | `public/locales/es/assessment.json` | Spanish translations (primary) |
| Create | `public/locales/en/assessment.json` | English translations |
| Create | `public/locales/cs/assessment.json` | Czech translations |
| Modify | `src/utils/dataLayer.ts` | Add 5 assessment tracking functions |
| Modify | `src/App.tsx` | Add 2 lazy-loaded routes |
| Create | `public/locales/es/seo.json` (update) | Add assessment SEO keys |
| Create | `public/locales/en/seo.json` (update) | Add assessment SEO keys |
| Create | `public/locales/cs/seo.json` (update) | Add assessment SEO keys |

---

## Task 1: Question Data File

**Files:**
- Create: `src/data/assessmentQuestions.ts`

- [ ] **Step 1: Create the question data file**

```typescript
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

export const MATURITY_COLORS: Record<MaturityLevel, string> = {
  initial: 'orange-500',
  developing: 'yellow-500',
  advanced: 'emerald-400',
  leader: 'green-500',
};
```

- [ ] **Step 2: Verify the file compiles**

Run: `npx tsc --noEmit src/data/assessmentQuestions.ts 2>&1 || echo "Check imports"`

If TypeScript standalone check fails, that's OK — it will be validated by the build. Just verify no syntax errors by reading the file.

- [ ] **Step 3: Commit**

```bash
git add src/data/assessmentQuestions.ts
git commit -m "feat(assessment): add question data with scoring logic"
```

---

## Task 2: Analytics — Assessment Tracking Functions

**Files:**
- Modify: `src/utils/dataLayer.ts` (add after line 570, before the default export block)

- [ ] **Step 1: Add assessment tracking functions to dataLayer.ts**

Insert the following BEFORE the `// EXPORT ALL TRACKING FUNCTIONS` section (line 574) in `src/utils/dataLayer.ts`:

```typescript
// ============================================================================
// ASSESSMENT EVENTS
// ============================================================================

/**
 * Track assessment start (user clicks "Begin")
 */
export const trackAssessmentStart = (language: string) => {
  pushToDataLayer({
    event: 'assessment_start',
    assessment_type: 'bpo_ai_maturity',
    language: language,
  });
};

/**
 * Track assessment step view
 */
export const trackAssessmentStep = (stepNumber: number, questionId: string) => {
  pushToDataLayer({
    event: 'assessment_step',
    assessment_type: 'bpo_ai_maturity',
    step_number: stepNumber,
    question_id: questionId,
  });
};

/**
 * Track assessment question answered (no PII — only question ID and option index)
 */
export const trackAssessmentAnswer = (questionId: string, optionIndex: number) => {
  pushToDataLayer({
    event: 'assessment_answer',
    assessment_type: 'bpo_ai_maturity',
    question_id: questionId,
    option_index: optionIndex,
  });
};

/**
 * Track assessment result viewed
 */
export const trackAssessmentResult = (score: number, level: string, painPoint: string | null) => {
  pushToDataLayer({
    event: 'assessment_result',
    assessment_type: 'bpo_ai_maturity',
    assessment_score: score,
    assessment_level: level,
    assessment_pain_point: painPoint || 'none',
  });
};

/**
 * Track assessment share action
 */
export const trackAssessmentShare = (method: string, location: string) => {
  pushToDataLayer({
    event: 'assessment_share',
    assessment_type: 'bpo_ai_maturity',
    share_method: method,
    share_location: location,
  });
};
```

Then add these to the default export object (inside the `export default { ... }` block, after the `trackTestimonialInteraction,` line):

```typescript
  // Assessment
  trackAssessmentStart,
  trackAssessmentStep,
  trackAssessmentAnswer,
  trackAssessmentResult,
  trackAssessmentShare,
```

- [ ] **Step 2: Verify build succeeds**

Run: `npm run build 2>&1 | tail -5`

Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/utils/dataLayer.ts
git commit -m "feat(analytics): add assessment tracking events to dataLayer"
```

---

## Task 3: Translation Files

**Files:**
- Create: `public/locales/es/assessment.json`
- Create: `public/locales/en/assessment.json`
- Create: `public/locales/cs/assessment.json`
- Modify: `public/locales/es/seo.json` (add assessment keys)
- Modify: `public/locales/en/seo.json` (add assessment keys)
- Modify: `public/locales/cs/seo.json` (add assessment keys)

- [ ] **Step 1: Create Spanish translations (primary language from the brief)**

Create `public/locales/es/assessment.json`:

```json
{
  "intro": {
    "headline": "¿Está tu BPO listo para automatizar con AI?",
    "description": "Descubrilo en 2 minutos con esta evaluación gratuita. Respondé 7 preguntas simples y recibí un diagnóstico personalizado con recomendaciones para tu operación.",
    "duration": "2 minutos",
    "cta": "Comenzar evaluación"
  },
  "progress": "Pregunta {{current}} de {{total}}",
  "back": "Atrás",
  "questions": {
    "q1": {
      "title": "¿Cuántos agentes tiene tu operación actualmente?",
      "options": {
        "a": "Menos de 50",
        "b": "50-150",
        "c": "150-300",
        "d": "Más de 300"
      }
    },
    "q2": {
      "title": "¿Cómo monitorean la calidad de las interacciones con clientes?",
      "options": {
        "a": "No tenemos un proceso formal de QA",
        "b": "Escucha manual de llamadas por supervisores (muestra aleatoria)",
        "c": "Tenemos un equipo de QA dedicado con scorecards",
        "d": "Usamos herramientas de speech analytics o grabación automatizada"
      }
    },
    "q3": {
      "title": "¿Cómo manejan los picos de demanda o los turnos nocturnos?",
      "options": {
        "a": "Contratamos agentes temporales cuando hay picos",
        "b": "Tenemos turnos rotativos pero nos cuesta cubrir noches/fines de semana",
        "c": "Usamos IVR o menús automatizados para desviar llamadas simples",
        "d": "Tenemos chatbots o voicebots para atender consultas básicas 24/7"
      }
    },
    "q4": {
      "title": "¿Cuánto tiempo tarda un nuevo agente en estar 100% productivo?",
      "options": {
        "a": "Más de 4 semanas",
        "b": "2-4 semanas",
        "c": "1-2 semanas",
        "d": "Menos de 1 semana (tenemos un proceso optimizado)"
      }
    },
    "q5": {
      "title": "¿Qué herramientas usan para gestionar la operación?",
      "options": {
        "a": "Principalmente Excel/Google Sheets y herramientas básicas",
        "b": "CRM básico (HubSpot free, Zoho, etc.) + telefonía",
        "c": "CRM avanzado + telefonía + herramientas de workforce management",
        "d": "Suite integrada con analytics, AI, y automatización de procesos"
      }
    },
    "q6": {
      "title": "¿Cuál es el mayor desafío operativo que enfrentan hoy?",
      "options": {
        "a": "Alta rotación de personal y costos de contratación",
        "b": "Mantener la calidad constante con el volumen actual",
        "c": "Escalar la operación sin aumentar costos proporcionalmente",
        "d": "Falta de visibilidad y datos para tomar decisiones"
      }
    },
    "q7": {
      "title": "¿Han explorado el uso de inteligencia artificial en su operación?",
      "options": {
        "a": "No, no hemos considerado AI todavía",
        "b": "Lo hemos discutido pero no hemos implementado nada",
        "c": "Estamos evaluando herramientas o proveedores de AI",
        "d": "Ya usamos AI en al menos un proceso"
      }
    }
  },
  "form": {
    "title": "Casi listo: recibí tu resultado personalizado",
    "subtitle": "Completá tus datos para ver tu diagnóstico de madurez AI.",
    "labels": {
      "fullName": "Nombre completo",
      "email": "Email corporativo",
      "company": "Empresa",
      "country": "País"
    },
    "placeholders": {
      "fullName": "Tu nombre completo",
      "email": "nombre@empresa.com",
      "company": "Nombre de tu empresa"
    },
    "validation": {
      "fullName": "Ingresá tu nombre completo (mínimo 3 caracteres)",
      "email": "Ingresá un email válido",
      "company": "Ingresá el nombre de tu empresa",
      "country": "Seleccioná tu país"
    },
    "countries": {
      "guatemala": "Guatemala",
      "honduras": "Honduras",
      "el_salvador": "El Salvador",
      "costa_rica": "Costa Rica",
      "panama": "Panamá",
      "nicaragua": "Nicaragua",
      "belice": "Belice",
      "other": "Otro"
    },
    "submit": "Ver mi resultado",
    "submitting": "Enviando...",
    "error": "Hubo un error al enviar. Por favor intentá de nuevo."
  },
  "result": {
    "title": "Tu resultado",
    "scoreLabel": "Tu puntaje",
    "of": "de",
    "levelLabel": "Nivel de madurez",
    "recommendationsTitle": "Recomendaciones para tu operación",
    "painPointTitle": "Recomendación personalizada",
    "shareCta": "Compartir por WhatsApp",
    "shareText": "Acabo de evaluar la madurez AI de mi BPO. ¿Querés saber cómo está el tuyo?",
    "cta": "Agendá una llamada gratuita para profundizar",
    "levels": {
      "initial": {
        "name": "Inicial",
        "description": "Tu operación tiene oportunidades significativas de automatización. Hay mucho potencial para mejorar eficiencia y reducir costos con AI.",
        "recommendations": [
          "Empezar por automatizar el monitoreo de calidad — AI puede evaluar el 100% de las interacciones sin agregar personal",
          "Implementar un chatbot para consultas frecuentes de tier-1 y reducir volumen de llamadas",
          "Digitalizar la programación de turnos con herramientas de workforce management"
        ]
      },
      "developing": {
        "name": "En desarrollo",
        "description": "Tienen bases sólidas, pero hay procesos clave que se pueden optimizar con AI para dar el siguiente salto en eficiencia.",
        "recommendations": [
          "Implementar speech analytics con AI para detectar patrones de mejora en tiempo real",
          "Automatizar el onboarding de agentes con simulaciones AI que reducen el tiempo de ramp-up",
          "Crear dashboards automáticos que eliminen la reportería manual"
        ]
      },
      "advanced": {
        "name": "Avanzado",
        "description": "Buena madurez operativa. AI puede llevarlos al siguiente nivel de competitividad y diferenciación en el mercado.",
        "recommendations": [
          "Integrar AI predictiva para anticipar picos de demanda y optimizar scheduling",
          "Implementar coaching automatizado de agentes basado en análisis de conversaciones",
          "Explorar voicebots con AI para atención completa en horarios de baja demanda"
        ]
      },
      "leader": {
        "name": "Líder",
        "description": "Operación madura y bien equipada. AI los ayudaría a diferenciarse competitivamente y liderar la transformación en la industria.",
        "recommendations": [
          "Desarrollar modelos propietarios de AI entrenados con los datos de tu operación",
          "Crear flujos de automatización end-to-end que conecten CRM, telefonía, y QA",
          "Implementar AI para detección proactiva de churn y upselling"
        ]
      }
    },
    "painPoints": {
      "rotacion": "Dado que la rotación es tu mayor dolor, te recomendamos priorizar la automatización del onboarding. Hemos visto BPOs reducir el tiempo de ramp-up de 4 semanas a 5 días usando AI para simulaciones y feedback en tiempo real.",
      "calidad": "Si mantener la calidad es tu prioridad, el monitoreo AI de interacciones es el primer paso. Pasar de revisar el 5% al 100% de las llamadas transforma la consistencia del servicio.",
      "escalar": "Para escalar sin aumentar costos, la clave es automatizar las interacciones repetitivas de tier-1. Un voicebot AI puede manejar hasta el 40% del volumen sin intervención humana.",
      "datos": "Si te falta visibilidad, empezá por dashboards automáticos con AI. Hemos ayudado a BPOs a pasar de reportes manuales semanales a insights en tiempo real."
    }
  },
  "thankYou": {
    "title": "¡Gracias por completar la evaluación!",
    "subtitle": "Te enviamos tu resultado detallado por email.",
    "summary": "Tu nivel: {{level}} ({{score}} puntos de 28)",
    "schedulerTitle": "¿Querés profundizar en tus resultados?",
    "schedulerDescription": "Agendá una llamada gratuita de 30 minutos con nuestro equipo para revisar tu diagnóstico y explorar cómo AI puede transformar tu operación.",
    "schedulerButton": "Agendar llamada gratuita",
    "backLink": "Volver al inicio"
  }
}
```

- [ ] **Step 2: Create English translations**

Create `public/locales/en/assessment.json`:

```json
{
  "intro": {
    "headline": "Is your BPO ready to automate with AI?",
    "description": "Find out in 2 minutes with this free assessment. Answer 7 simple questions and get a personalized diagnosis with recommendations for your operation.",
    "duration": "2 minutes",
    "cta": "Start assessment"
  },
  "progress": "Question {{current}} of {{total}}",
  "back": "Back",
  "questions": {
    "q1": {
      "title": "How many agents does your operation currently have?",
      "options": {
        "a": "Less than 50",
        "b": "50-150",
        "c": "150-300",
        "d": "More than 300"
      }
    },
    "q2": {
      "title": "How do you monitor the quality of customer interactions?",
      "options": {
        "a": "We don't have a formal QA process",
        "b": "Manual call listening by supervisors (random sample)",
        "c": "We have a dedicated QA team with scorecards",
        "d": "We use speech analytics or automated recording tools"
      }
    },
    "q3": {
      "title": "How do you handle demand peaks or night shifts?",
      "options": {
        "a": "We hire temporary agents when there are peaks",
        "b": "We have rotating shifts but struggle to cover nights/weekends",
        "c": "We use IVR or automated menus to deflect simple calls",
        "d": "We have chatbots or voicebots for basic 24/7 queries"
      }
    },
    "q4": {
      "title": "How long does it take a new agent to be 100% productive?",
      "options": {
        "a": "More than 4 weeks",
        "b": "2-4 weeks",
        "c": "1-2 weeks",
        "d": "Less than 1 week (we have an optimized process)"
      }
    },
    "q5": {
      "title": "What tools do you use to manage your operation?",
      "options": {
        "a": "Mainly Excel/Google Sheets and basic tools",
        "b": "Basic CRM (HubSpot free, Zoho, etc.) + telephony",
        "c": "Advanced CRM + telephony + workforce management tools",
        "d": "Integrated suite with analytics, AI, and process automation"
      }
    },
    "q6": {
      "title": "What is your biggest operational challenge today?",
      "options": {
        "a": "High staff turnover and hiring costs",
        "b": "Maintaining consistent quality with current volume",
        "c": "Scaling operations without proportionally increasing costs",
        "d": "Lack of visibility and data for decision-making"
      }
    },
    "q7": {
      "title": "Have you explored using artificial intelligence in your operation?",
      "options": {
        "a": "No, we haven't considered AI yet",
        "b": "We've discussed it but haven't implemented anything",
        "c": "We're evaluating AI tools or providers",
        "d": "We already use AI in at least one process"
      }
    }
  },
  "form": {
    "title": "Almost there — get your personalized result",
    "subtitle": "Fill in your details to see your AI maturity diagnosis.",
    "labels": {
      "fullName": "Full name",
      "email": "Corporate email",
      "company": "Company",
      "country": "Country"
    },
    "placeholders": {
      "fullName": "Your full name",
      "email": "name@company.com",
      "company": "Your company name"
    },
    "validation": {
      "fullName": "Enter your full name (minimum 3 characters)",
      "email": "Enter a valid email address",
      "company": "Enter your company name",
      "country": "Select your country"
    },
    "countries": {
      "guatemala": "Guatemala",
      "honduras": "Honduras",
      "el_salvador": "El Salvador",
      "costa_rica": "Costa Rica",
      "panama": "Panama",
      "nicaragua": "Nicaragua",
      "belice": "Belize",
      "other": "Other"
    },
    "submit": "See my result",
    "submitting": "Submitting...",
    "error": "There was an error submitting. Please try again."
  },
  "result": {
    "title": "Your result",
    "scoreLabel": "Your score",
    "of": "of",
    "levelLabel": "Maturity level",
    "recommendationsTitle": "Recommendations for your operation",
    "painPointTitle": "Personalized recommendation",
    "shareCta": "Share on WhatsApp",
    "shareText": "I just assessed my BPO's AI maturity. Want to find out how yours is doing?",
    "cta": "Schedule a free call to dive deeper",
    "levels": {
      "initial": {
        "name": "Initial",
        "description": "Your operation has significant automation opportunities. There's great potential to improve efficiency and reduce costs with AI.",
        "recommendations": [
          "Start by automating quality monitoring — AI can evaluate 100% of interactions without adding staff",
          "Implement a chatbot for frequent tier-1 queries to reduce call volume",
          "Digitize shift scheduling with workforce management tools"
        ]
      },
      "developing": {
        "name": "Developing",
        "description": "You have solid foundations, but there are key processes that can be optimized with AI to make the next leap in efficiency.",
        "recommendations": [
          "Implement AI speech analytics to detect improvement patterns in real time",
          "Automate agent onboarding with AI simulations that reduce ramp-up time",
          "Create automated dashboards to eliminate manual reporting"
        ]
      },
      "advanced": {
        "name": "Advanced",
        "description": "Good operational maturity. AI can take you to the next level of competitiveness and market differentiation.",
        "recommendations": [
          "Integrate predictive AI to anticipate demand peaks and optimize scheduling",
          "Implement automated agent coaching based on conversation analysis",
          "Explore AI voicebots for full-service coverage during low-demand hours"
        ]
      },
      "leader": {
        "name": "Leader",
        "description": "Mature and well-equipped operation. AI would help you differentiate competitively and lead the transformation in the industry.",
        "recommendations": [
          "Develop proprietary AI models trained on your operation's data",
          "Create end-to-end automation flows connecting CRM, telephony, and QA",
          "Implement AI for proactive churn detection and upselling"
        ]
      }
    },
    "painPoints": {
      "rotacion": "Since turnover is your biggest pain point, we recommend prioritizing onboarding automation. We've seen BPOs reduce ramp-up time from 4 weeks to 5 days using AI simulations and real-time feedback.",
      "calidad": "If maintaining quality is your priority, AI interaction monitoring is the first step. Going from reviewing 5% to 100% of calls transforms service consistency.",
      "escalar": "To scale without increasing costs, the key is automating repetitive tier-1 interactions. An AI voicebot can handle up to 40% of volume without human intervention.",
      "datos": "If you lack visibility, start with AI-powered automated dashboards. We've helped BPOs go from weekly manual reports to real-time insights."
    }
  },
  "thankYou": {
    "title": "Thank you for completing the assessment!",
    "subtitle": "We'll send your detailed results to your email.",
    "summary": "Your level: {{level}} ({{score}} points out of 28)",
    "schedulerTitle": "Want to dive deeper into your results?",
    "schedulerDescription": "Schedule a free 30-minute call with our team to review your diagnosis and explore how AI can transform your operation.",
    "schedulerButton": "Schedule a free call",
    "backLink": "Back to home"
  }
}
```

- [ ] **Step 3: Create Czech translations**

Create `public/locales/cs/assessment.json`:

```json
{
  "intro": {
    "headline": "Je vaše BPO připraveno na automatizaci s AI?",
    "description": "Zjistěte to za 2 minuty s tímto bezplatným hodnocením. Odpovězte na 7 jednoduchých otázek a získejte personalizovanou diagnózu s doporučeními pro vaši operaci.",
    "duration": "2 minuty",
    "cta": "Zahájit hodnocení"
  },
  "progress": "Otázka {{current}} z {{total}}",
  "back": "Zpět",
  "questions": {
    "q1": {
      "title": "Kolik agentů má vaše operace aktuálně?",
      "options": {
        "a": "Méně než 50",
        "b": "50-150",
        "c": "150-300",
        "d": "Více než 300"
      }
    },
    "q2": {
      "title": "Jak monitorujete kvalitu interakcí se zákazníky?",
      "options": {
        "a": "Nemáme formální proces QA",
        "b": "Manuální odposlech hovorů supervizory (náhodný vzorek)",
        "c": "Máme dedikovaný QA tým se scorecards",
        "d": "Používáme nástroje speech analytics nebo automatizované nahrávání"
      }
    },
    "q3": {
      "title": "Jak zvládáte špičky poptávky nebo noční směny?",
      "options": {
        "a": "Najímáme dočasné agenty při špičkách",
        "b": "Máme rotační směny, ale obtížně pokrýváme noci/víkendy",
        "c": "Používáme IVR nebo automatizované menu pro přesměrování jednoduchých hovorů",
        "d": "Máme chatboty nebo voiceboty pro základní dotazy 24/7"
      }
    },
    "q4": {
      "title": "Jak dlouho trvá, než je nový agent 100% produktivní?",
      "options": {
        "a": "Více než 4 týdny",
        "b": "2-4 týdny",
        "c": "1-2 týdny",
        "d": "Méně než 1 týden (máme optimalizovaný proces)"
      }
    },
    "q5": {
      "title": "Jaké nástroje používáte k řízení operace?",
      "options": {
        "a": "Především Excel/Google Sheets a základní nástroje",
        "b": "Základní CRM (HubSpot free, Zoho, atd.) + telefonie",
        "c": "Pokročilé CRM + telefonie + nástroje workforce managementu",
        "d": "Integrovaná suite s analytikou, AI a automatizací procesů"
      }
    },
    "q6": {
      "title": "Jaká je vaše největší provozní výzva dnes?",
      "options": {
        "a": "Vysoká fluktuace zaměstnanců a náklady na nábor",
        "b": "Udržení konzistentní kvality při současném objemu",
        "c": "Škálování operace bez proporcionálního zvyšování nákladů",
        "d": "Nedostatek viditelnosti a dat pro rozhodování"
      }
    },
    "q7": {
      "title": "Zkoumali jste využití umělé inteligence ve vaší operaci?",
      "options": {
        "a": "Ne, zatím jsme AI nezvažovali",
        "b": "Diskutovali jsme o tom, ale nic jsme neimplementovali",
        "c": "Vyhodnocujeme nástroje nebo poskytovatele AI",
        "d": "Již používáme AI alespoň v jednom procesu"
      }
    }
  },
  "form": {
    "title": "Téměř hotovo — získejte svůj personalizovaný výsledek",
    "subtitle": "Vyplňte své údaje pro zobrazení diagnózy AI vyspělosti.",
    "labels": {
      "fullName": "Celé jméno",
      "email": "Firemní email",
      "company": "Společnost",
      "country": "Země"
    },
    "placeholders": {
      "fullName": "Vaše celé jméno",
      "email": "jmeno@firma.cz",
      "company": "Název vaší společnosti"
    },
    "validation": {
      "fullName": "Zadejte celé jméno (minimálně 3 znaky)",
      "email": "Zadejte platnou emailovou adresu",
      "company": "Zadejte název společnosti",
      "country": "Vyberte svou zemi"
    },
    "countries": {
      "guatemala": "Guatemala",
      "honduras": "Honduras",
      "el_salvador": "El Salvador",
      "costa_rica": "Kostarika",
      "panama": "Panama",
      "nicaragua": "Nikaragua",
      "belice": "Belize",
      "other": "Jiná"
    },
    "submit": "Zobrazit výsledek",
    "submitting": "Odesílání...",
    "error": "Při odesílání došlo k chybě. Zkuste to prosím znovu."
  },
  "result": {
    "title": "Váš výsledek",
    "scoreLabel": "Vaše skóre",
    "of": "z",
    "levelLabel": "Úroveň vyspělosti",
    "recommendationsTitle": "Doporučení pro vaši operaci",
    "painPointTitle": "Personalizované doporučení",
    "shareCta": "Sdílet přes WhatsApp",
    "shareText": "Právě jsem ohodnotil AI vyspělost mého BPO. Chcete zjistit, jak je na tom to vaše?",
    "cta": "Naplánovat bezplatný hovor pro hlubší analýzu",
    "levels": {
      "initial": {
        "name": "Počáteční",
        "description": "Vaše operace má významné příležitosti k automatizaci. Je zde velký potenciál pro zlepšení efektivity a snížení nákladů pomocí AI.",
        "recommendations": [
          "Začněte automatizací monitorování kvality — AI dokáže vyhodnotit 100% interakcí bez přidávání personálu",
          "Implementujte chatbota pro časté dotazy tier-1 ke snížení objemu hovorů",
          "Digitalizujte plánování směn pomocí nástrojů workforce managementu"
        ]
      },
      "developing": {
        "name": "Ve vývoji",
        "description": "Máte solidní základy, ale existují klíčové procesy, které lze optimalizovat pomocí AI pro další skok v efektivitě.",
        "recommendations": [
          "Implementujte AI speech analytics pro detekci vzorců zlepšení v reálném čase",
          "Automatizujte onboarding agentů pomocí AI simulací, které zkracují dobu zapracování",
          "Vytvořte automatizované dashboardy, které eliminují manuální reportování"
        ]
      },
      "advanced": {
        "name": "Pokročilý",
        "description": "Dobrá provozní vyspělost. AI vás může posunout na další úroveň konkurenceschopnosti a diferenciace na trhu.",
        "recommendations": [
          "Integrujte prediktivní AI pro předvídání špiček poptávky a optimalizaci plánování",
          "Implementujte automatizovaný coaching agentů založený na analýze konverzací",
          "Prozkoumejte AI voiceboty pro kompletní obsluhu v hodinách nízké poptávky"
        ]
      },
      "leader": {
        "name": "Lídr",
        "description": "Vyspělá a dobře vybavená operace. AI by vám pomohlo se konkurenčně odlišit a vést transformaci v odvětví.",
        "recommendations": [
          "Vyviňte proprietární AI modely trénované na datech vaší operace",
          "Vytvořte end-to-end automatizační toky propojující CRM, telefonii a QA",
          "Implementujte AI pro proaktivní detekci odchodu zákazníků a upselling"
        ]
      }
    },
    "painPoints": {
      "rotacion": "Vzhledem k tomu, že fluktuace je vaším největším problémem, doporučujeme prioritizovat automatizaci onboardingu. Viděli jsme BPO, které zkrátily dobu zapracování ze 4 týdnů na 5 dní pomocí AI simulací a zpětné vazby v reálném čase.",
      "calidad": "Pokud je udržení kvality vaší prioritou, AI monitoring interakcí je prvním krokem. Přechod z kontroly 5% na 100% hovorů transformuje konzistenci služeb.",
      "escalar": "Pro škálování bez zvyšování nákladů je klíčem automatizace opakujících se interakcí tier-1. AI voicebot zvládne až 40% objemu bez lidského zásahu.",
      "datos": "Pokud vám chybí viditelnost, začněte s automatizovanými AI dashboardy. Pomohli jsme BPO přejít od týdenních manuálních reportů k insightům v reálném čase."
    }
  },
  "thankYou": {
    "title": "Děkujeme za dokončení hodnocení!",
    "subtitle": "Podrobné výsledky vám zašleme na email.",
    "summary": "Vaše úroveň: {{level}} ({{score}} bodů z 28)",
    "schedulerTitle": "Chcete se ponořit hlouběji do výsledků?",
    "schedulerDescription": "Naplánujte si bezplatný 30minutový hovor s naším týmem pro revizi vaší diagnózy a prozkoumání, jak AI může transformovat vaši operaci.",
    "schedulerButton": "Naplánovat bezplatný hovor",
    "backLink": "Zpět na úvod"
  }
}
```

- [ ] **Step 4: Add SEO keys for assessment pages**

Read each `seo.json` file first, then append the assessment keys. Add the following keys to each:

**`public/locales/es/seo.json`** — add:
```json
"assessment": {
  "title": "Evaluación de Madurez AI para BPOs",
  "description": "Evaluá qué tan preparado está tu BPO para automatizar con inteligencia artificial. Test gratuito de 2 minutos con recomendaciones personalizadas."
},
"assessmentThankYou": {
  "title": "Resultado de tu Evaluación AI",
  "description": "Gracias por completar la evaluación de madurez AI. Revisá tu resultado y agendá una llamada gratuita."
}
```

**`public/locales/en/seo.json`** — add:
```json
"assessment": {
  "title": "AI Maturity Assessment for BPOs",
  "description": "Assess how ready your BPO is to automate with artificial intelligence. Free 2-minute test with personalized recommendations."
},
"assessmentThankYou": {
  "title": "Your AI Assessment Result",
  "description": "Thank you for completing the AI maturity assessment. Review your result and schedule a free call."
}
```

**`public/locales/cs/seo.json`** — add:
```json
"assessment": {
  "title": "Hodnocení AI vyspělosti pro BPO",
  "description": "Ohodnoťte, jak připravené je vaše BPO na automatizaci s umělou inteligencí. Bezplatný 2minutový test s personalizovanými doporučeními."
},
"assessmentThankYou": {
  "title": "Výsledek vašeho AI hodnocení",
  "description": "Děkujeme za dokončení hodnocení AI vyspělosti. Prohlédněte si výsledek a naplánujte bezplatný hovor."
}
```

- [ ] **Step 5: Commit**

```bash
git add public/locales/*/assessment.json public/locales/*/seo.json
git commit -m "feat(i18n): add assessment translations for en/es/cs"
```

---

## Task 4: AssessmentProgress Component

**Files:**
- Create: `src/components/assessment/AssessmentProgress.tsx`

- [ ] **Step 1: Create the progress bar component**

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/assessment/AssessmentProgress.tsx
git commit -m "feat(assessment): add progress bar component"
```

---

## Task 5: AssessmentIntro Component

**Files:**
- Create: `src/components/assessment/AssessmentIntro.tsx`

- [ ] **Step 1: Create the intro screen component**

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/assessment/AssessmentIntro.tsx
git commit -m "feat(assessment): add intro screen component"
```

---

## Task 6: AssessmentQuestion Component

**Files:**
- Create: `src/components/assessment/AssessmentQuestion.tsx`

- [ ] **Step 1: Create the question screen component**

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/assessment/AssessmentQuestion.tsx
git commit -m "feat(assessment): add question screen component"
```

---

## Task 7: AssessmentForm Component

**Files:**
- Create: `src/components/assessment/AssessmentForm.tsx`

- [ ] **Step 1: Create the lead capture form component**

```typescript
// src/components/assessment/AssessmentForm.tsx
import { useState, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { trackFormStart, trackFormSubmit, trackFormSuccess, trackFormError } from '@/utils/dataLayer';

export interface AssessmentContactData {
  fullName: string;
  email: string;
  company: string;
  country: string;
}

interface AssessmentFormProps {
  onSubmitSuccess: (data: AssessmentContactData) => void;
  assessmentMeta: {
    score: number;
    level: string;
    painPoint: string | null;
  };
}

const COUNTRY_KEYS = [
  'guatemala', 'honduras', 'el_salvador', 'costa_rica',
  'panama', 'nicaragua', 'belice', 'other',
] as const;

const AssessmentForm: React.FC<AssessmentFormProps> = ({ onSubmitSuccess, assessmentMeta }) => {
  const { t, i18n } = useTranslation('assessment');
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [formStarted, setFormStarted] = useState(false);

  const formSchema = useMemo(() => z.object({
    fullName: z.string().min(3, { message: t('form.validation.fullName') }),
    email: z.string().email({ message: t('form.validation.email') }),
    company: z.string().min(2, { message: t('form.validation.company') }),
    country: z.string({ required_error: t('form.validation.country') }).min(1, { message: t('form.validation.country') }),
  }), [t]);

  const { register, handleSubmit, formState: { errors }, control } = useForm<AssessmentContactData>({
    resolver: zodResolver(formSchema),
  });

  const handleFormInteraction = () => {
    if (!formStarted) {
      trackFormStart('bpo_assessment', 'assessment_form');
      setFormStarted(true);
    }
  };

  const onSubmit = async (data: AssessmentContactData) => {
    setLoading(true);
    setServerError(null);

    trackFormSubmit('bpo_assessment', {
      formLocation: 'assessment_form',
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          formulario: 'bpo-assessment',
          language: i18n.language,
          source: window.location.href,
          assessmentScore: assessmentMeta.score,
          assessmentLevel: assessmentMeta.level,
          assessmentPainPoint: assessmentMeta.painPoint,
        }),
      });

      if (!response.ok) {
        throw new Error(t('form.error'));
      }

      // Fire n8n webhook (fire-and-forget)
      const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
      if (webhookUrl) {
        fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.fullName,
            email: data.email,
            company: data.company,
            country: data.country,
            score: assessmentMeta.score,
            level: assessmentMeta.level,
            painPoint: assessmentMeta.painPoint,
            language: i18n.language,
            timestamp: new Date().toISOString(),
          }),
        }).catch(() => { /* silently ignore webhook errors */ });
      }

      trackFormSuccess('bpo_assessment', 'assessment_form');
      onSubmitSuccess(data);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : t('form.error');
      setServerError(errorMessage);
      trackFormError('bpo_assessment', 'submission', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="w-full max-w-lg mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-2">
        {t('form.title')}
      </h2>
      <p className="text-slate-400 text-center mb-8">
        {t('form.subtitle')}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Label htmlFor="fullName" className="text-slate-300">{t('form.labels.fullName')}</Label>
          <Input
            id="fullName"
            {...register('fullName')}
            onFocus={handleFormInteraction}
            placeholder={t('form.placeholders.fullName')}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 mt-2 focus:border-sky-400 focus:ring-sky-400"
          />
          {errors.fullName && <p id="fullName-error" role="alert" className="text-red-400 text-sm mt-1">{errors.fullName.message}</p>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Label htmlFor="email" className="text-slate-300">{t('form.labels.email')}</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            onFocus={handleFormInteraction}
            placeholder={t('form.placeholders.email')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 mt-2 focus:border-sky-400 focus:ring-sky-400"
          />
          {errors.email && <p id="email-error" role="alert" className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Label htmlFor="company" className="text-slate-300">{t('form.labels.company')}</Label>
          <Input
            id="company"
            {...register('company')}
            onFocus={handleFormInteraction}
            placeholder={t('form.placeholders.company')}
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? 'company-error' : undefined}
            className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 mt-2 focus:border-sky-400 focus:ring-sky-400"
          />
          {errors.company && <p id="company-error" role="alert" className="text-red-400 text-sm mt-1">{errors.company.message}</p>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Label className="text-slate-300">{t('form.labels.country')}</Label>
          <Controller
            control={control}
            name="country"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger
                  className="bg-slate-800 border-slate-600 text-white mt-2 focus:border-sky-400 focus:ring-sky-400"
                  onFocus={handleFormInteraction}
                >
                  <SelectValue placeholder={t('form.labels.country')} className="text-slate-500" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 text-white border-slate-600">
                  {COUNTRY_KEYS.map((key) => (
                    <SelectItem key={key} value={key}>
                      {t(`form.countries.${key}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.country && <p role="alert" className="text-red-400 text-sm mt-1">{errors.country.message}</p>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white font-bold text-lg py-6 shadow-lg shadow-sky-500/25 transition-all duration-300"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                {t('form.submitting')}
              </>
            ) : t('form.submit')}
          </Button>
        </motion.div>

        {serverError && (
          <p role="alert" aria-live="assertive" className="text-red-400 text-center text-sm">
            {serverError}
          </p>
        )}
      </form>
    </motion.div>
  );
};

export default AssessmentForm;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/assessment/AssessmentForm.tsx
git commit -m "feat(assessment): add lead capture form component"
```

---

## Task 8: AssessmentResult Component

**Files:**
- Create: `src/components/assessment/AssessmentResult.tsx`

- [ ] **Step 1: Create the result screen component**

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/assessment/AssessmentResult.tsx
git commit -m "feat(assessment): add result screen component"
```

---

## Task 9: AssessmentPage (Main Page with State Machine)

**Files:**
- Create: `src/pages/AssessmentPage.tsx`

- [ ] **Step 1: Create the main assessment page with reducer**

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/AssessmentPage.tsx
git commit -m "feat(assessment): add main assessment page with state machine"
```

---

## Task 10: AssessmentThankYouPage

**Files:**
- Create: `src/pages/AssessmentThankYouPage.tsx`

- [ ] **Step 1: Create the thank you page**

```typescript
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
  const { score, level, painPoint } = locationState;

  useEffect(() => {
    trackPageView(location.pathname, 'Assessment Thank You', i18n.language);
  }, [location.pathname, i18n.language]);

  const homeUrl = `/${lang || 'es'}`;

  return (
    <>
      <SEO
        titleKey="assessmentThankYou.title"
        descriptionKey="assessmentThankYou.description"
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
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/AssessmentThankYouPage.tsx
git commit -m "feat(assessment): add thank you page with CalScheduler"
```

---

## Task 11: Register Routes in App.tsx

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Add lazy imports and routes**

In `src/App.tsx`, add the two lazy imports after line 31 (after the `DDScopingPage` import):

```typescript
const AssessmentPage = lazy(() => import('./pages/AssessmentPage'));
const AssessmentThankYouPage = lazy(() => import('./pages/AssessmentThankYouPage'));
```

Add the two routes inside the `<Route element={<PublicLayout />}>` block, after the `klonujte-firmu` route (line 71). Insert before the closing `</Route>` tag of PublicLayout:

```typescript
                <Route path="bpo-assessment" element={<AssessmentPage />} />
                <Route path="bpo-assessment/thank-you" element={<AssessmentThankYouPage />} />
```

- [ ] **Step 2: Verify build succeeds**

Run: `npm run build 2>&1 | tail -10`

Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat(assessment): register assessment routes in App.tsx"
```

---

## Task 12: Dev Server Smoke Test

**Files:** None (testing only)

- [ ] **Step 1: Start dev server and verify pages load**

Run: `npm run dev`

Then check these URLs in the browser:
1. `http://localhost:5173/es/bpo-assessment` — Should show the intro screen with Spanish text
2. `http://localhost:5173/en/bpo-assessment` — Should show English version
3. Click "Comenzar evaluación" — should show question 1 with progress bar
4. Answer all 7 questions — should show the form
5. Submit the form (may fail if no backend, that's OK) — verify form validation works
6. After form submit, verify result screen shows score, level, recommendations
7. Click CTA — should navigate to `/es/bpo-assessment/thank-you`
8. Check browser console for `GA4 Event:` logs at each step

- [ ] **Step 2: Check for console errors**

Open DevTools Console. There should be no React errors, no missing translation warnings, no TypeScript errors.

- [ ] **Step 3: Test mobile viewport**

In Chrome DevTools, toggle device toolbar (Ctrl+Shift+M). Set to iPhone 12/13 (390x844). Navigate through the full flow. Verify:
- All content fits within viewport
- Buttons are large enough to tap
- No horizontal scrolling
- Progress bar displays correctly

- [ ] **Step 4: Verify build still passes**

Run: `npm run build 2>&1 | tail -5`

Expected: Build succeeds.

- [ ] **Step 5: Final commit (if any fixes were needed)**

```bash
git add -A
git commit -m "fix(assessment): address issues found during smoke test"
```

Only commit if changes were made. If everything passed clean, skip this step.
