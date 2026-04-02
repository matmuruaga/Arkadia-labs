# BPO AI Maturity Assessment - Design Spec

**Date:** 2026-04-02
**Status:** Approved
**Approach:** Single Page State Machine (Enfoque A)

---

## 1. Overview

Interactive assessment tool that evaluates BPO/Call Center AI maturity in 5-7 questions. Users receive a personalized score with recommendations. Serves as a lead magnet for the Centroamérica GTM campaign (LinkedIn + email outreach step 5).

**Target audience:** CEOs, Operations Directors, and GMs of BPOs/Call Centers in Central America (50-500 employees). Mobile-first, low technical level, Spanish-neutral language.

**URL:** `/:lang/bpo-assessment`

---

## 2. Component Architecture

### File Structure

```
src/
├── pages/
│   ├── AssessmentPage.tsx              # Main page, state machine, lazy-loaded
│   └── AssessmentThankYouPage.tsx      # Thank you with CalScheduler
├── components/
│   ├── assessment/
│   │   ├── AssessmentIntro.tsx         # Landing with headline + CTA
│   │   ├── AssessmentQuestion.tsx      # Single question per screen
│   │   ├── AssessmentProgress.tsx      # Progress bar
│   │   ├── AssessmentForm.tsx          # Lead capture form
│   │   └── AssessmentResult.tsx        # Score + recommendations + CTA
├── data/
│   └── assessmentQuestions.ts          # Question metadata (points, tags, keys)
└── utils/
    └── dataLayer.ts                    # Add new assessment tracking functions
```

### State Machine (useReducer)

```typescript
type Step = 'intro' | 'question' | 'form' | 'result';

type AssessmentState = {
  currentStep: Step;
  questionIndex: number;           // 0-6
  answers: Record<number, number>; // questionIndex -> selectedOptionIndex
  score: number;
  painPoint: string | null;        // tag from question 6
  contactData: ContactData | null;
  formSubmitted: boolean;
};

type AssessmentAction =
  | { type: 'START' }
  | { type: 'ANSWER'; questionIndex: number; optionIndex: number }
  | { type: 'GO_BACK' }
  | { type: 'SUBMIT_FORM'; data: ContactData }
  | { type: 'FORM_SUCCESS' }
  | { type: 'SHOW_RESULT' };
```

### Flow

1. `intro` -> click "Comenzar" -> `question` (index 0)
2. `question` -> select option -> auto-advance after 300ms -> next question
3. `question` (index 6 completed) -> `form`
4. `form` -> submit to Brevo + n8n webhook -> `result`
5. `result` -> CTA navigates to `/:lang/bpo-assessment/thank-you`

---

## 3. Question Data

File: `src/data/assessmentQuestions.ts`

```typescript
type AssessmentQuestionOption = {
  translationKey: string;
  points: number;
  tag?: string;
};

type AssessmentQuestion = {
  id: string;
  translationKey: string;
  options: AssessmentQuestionOption[];
  isScored: boolean;
};
```

### Questions

| # | ID | Topic | Options | Points | Scored |
|---|-----|-------|---------|--------|--------|
| 1 | operation_size | Agent count | 4 | 1-4 | Yes |
| 2 | quality_monitoring | QA process | 4 | 1-4 | Yes |
| 3 | volume_handling | Demand peaks | 4 | 1-4 | Yes |
| 4 | onboarding | Ramp-up time | 4 | 1-4 | Yes |
| 5 | tech_stack | Tool maturity | 4 | 1-4 | Yes |
| 6 | pain_point | Biggest pain | 4 | 0 | No (tag only) |
| 7 | ai_interest | AI adoption | 4 | 1-4 | Yes |

Question 6 tags: `rotacion`, `calidad`, `escalar`, `datos`

---

## 4. Scoring & Results

### Score Calculation

Sum of points from questions 1, 2, 3, 4, 5, 7 (question 6 excluded).

**Range:** 6-28 points.

### Maturity Levels

| Range | Level | Key | Color |
|-------|-------|-----|-------|
| 6-11 | Inicial | `initial` | orange-500 |
| 12-18 | En desarrollo | `developing` | yellow-500 |
| 19-24 | Avanzado | `advanced` | emerald-400 |
| 25-28 | Lider | `leader` | green-500 |

### Recommendations

3 recommendations per level (from translation files):
- `assessment.result.levels.{level}.recommendations[0-2]`

### Pain Point Personalization

1 extra paragraph based on question 6 answer:
- `assessment.result.painPoints.{tag}` where tag is `rotacion|calidad|escalar|datos`

---

## 5. Lead Capture Form

### Fields

| Field | Type | Validation | Required |
|-------|------|------------|----------|
| fullName | text input | min 3 chars | Yes |
| email | text input | valid email | Yes |
| company | text input | min 2 chars | Yes |
| country | select dropdown | must select | Yes |

**Country options:** Guatemala, Honduras, El Salvador, Costa Rica, Panama, Nicaragua, Belice, Otro

Stack: React Hook Form + Zod + zodResolver. All labels/validation via `t()`.

---

## 6. Integrations

### Brevo (existing integration)

Same endpoint as ContactPage. Payload includes:
- Form data: name, email, company, country
- Assessment metadata: score, maturity level, pain point tag
- Source: `'bpo-assessment'`
- Language

Tags added to contact:
- `assessment_level:{level}`
- `assessment_pain:{painPoint}`

### n8n Webhook

POST to `VITE_N8N_WEBHOOK_URL` env var. Skips silently if not defined.

Payload:
```json
{
  "name": "...",
  "email": "...",
  "company": "...",
  "country": "...",
  "score": 18,
  "level": "developing",
  "painPoint": "rotacion",
  "answers": { "0": 2, "1": 1, ... },
  "language": "es",
  "timestamp": "2026-04-02T..."
}
```

Fire-and-forget (no-await, no error blocking).

### Cal.com

AssessmentThankYouPage uses existing `CalScheduler` component.

---

## 7. Routing

Two new lazy-loaded routes inside PublicLayout in `App.tsx`:

```
/:lang/bpo-assessment           -> AssessmentPage
/:lang/bpo-assessment/thank-you -> AssessmentThankYouPage
```

### Thank You Page

Receives `{ score, level, painPoint }` via `useNavigate` state.

Content:
- Thank you message
- Brief result summary (level + score)
- CalScheduler embed
- Link back to main site

---

## 8. Internationalization

New namespace: `assessment`

Files:
- `public/locales/en/assessment.json`
- `public/locales/es/assessment.json`
- `public/locales/cs/assessment.json`

### Translation Key Structure

```
assessment.
├── seo.title
├── seo.description
├── intro.headline
├── intro.description
├── intro.cta
├── intro.duration          # "2 minutes"
├── progress                # "Question {{current}} of {{total}}"
├── questions.q1.title
├── questions.q1.options.a / .b / .c / .d
├── questions.q2 ... q7     # Same structure
├── form.title
├── form.subtitle
├── form.labels.fullName / .email / .company / .country
├── form.validation.fullName / .email / .company / .country
├── form.countries.guatemala / .honduras / .el_salvador / .costa_rica / .panama / .nicaragua / .belice / .other
├── form.submit             # "Ver mi resultado"
├── result.title
├── result.scoreLabel       # "Tu score"
├── result.levels.initial.name / .description / .recommendations[]
├── result.levels.developing.name / .description / .recommendations[]
├── result.levels.advanced.name / .description / .recommendations[]
├── result.levels.leader.name / .description / .recommendations[]
├── result.painPoints.rotacion / .calidad / .escalar / .datos
├── result.cta              # "Agenda una llamada gratuita"
├── result.share            # "Compartir por WhatsApp"
├── thankYou.title
├── thankYou.subtitle
├── thankYou.summary        # "Tu nivel: {{level}} ({{score}} puntos)"
├── thankYou.scheduler.title
└── thankYou.backLink
```

---

## 9. Analytics

### New Functions (add to dataLayer.ts)

```typescript
trackAssessmentStart(language: string)
trackAssessmentStep(stepNumber: number, questionId: string)
trackAssessmentAnswer(questionId: string, optionIndex: number)
trackAssessmentResult(score: number, level: string, painPoint: string)
trackAssessmentShare(method: string, location: string)
```

### Existing Functions to Reuse

- `trackPageView` - on mount
- `trackFormStart` - first form focus
- `trackFormSubmit` - form submission
- `trackFormSuccess` - Brevo success
- `trackFormError` - Brevo error
- `trackCtaClick` - CTA to thank you / CalScheduler

### Event Timeline

1. Page load -> `trackPageView`
2. Click "Comenzar" -> `trackAssessmentStart`
3. Each question shown -> `trackAssessmentStep`
4. Each option selected -> `trackAssessmentAnswer`
5. Form first focus -> `trackFormStart`
6. Form submit -> `trackFormSubmit`
7. Brevo success -> `trackFormSuccess`
8. Result shown -> `trackAssessmentResult`
9. WhatsApp share -> `trackAssessmentShare`
10. CTA click -> `trackCtaClick`

---

## 10. UX & Visual Design

### Principles

- Mobile-first (design for phone, adapt to desktop)
- One question per screen
- Large touch-friendly option cards (not radio buttons)
- No horizontal scroll
- Fast load (<2s)
- Follow existing design system (dark background, gradients, Noto Sans)

### Screens

**Intro:**
- Dark background consistent with site
- Headline + 1 paragraph + duration badge ("2 min")
- Large CTA "Comenzar evaluacion"

**Questions (1-7):**
- Linear progress bar at top
- Question text centered
- 3-4 options as stacked vertical cards
- Selected card: primary border + check icon
- Auto-advance after 300ms selection
- Discrete "Back" button

**Form:**
- 4 fields stacked vertically
- Country as dropdown
- Submit button "Ver mi resultado"
- Same visual style as ContactPage

**Result:**
- Large numeric score with level color
- Horizontal bar showing position in 6-28 range
- Level name + description
- 3 recommendation cards/list
- Personalized pain point paragraph
- WhatsApp share button (shares assessment URL, not result)
- CTA "Agenda una llamada gratuita" -> Thank You page

**Thank You:**
- Thank you message + result summary
- CalScheduler embed
- Back to site link

### Animations (Framer Motion)

- Slide horizontal transitions between steps
- Fade-in for options and result
- Animated progress bar
- Card selection feedback

---

## 11. Environment Variables

```env
VITE_N8N_WEBHOOK_URL=        # Optional, n8n webhook endpoint
```

---

## 12. Out of Scope

- PDF generation of results
- Email with detailed results (future, via n8n)
- A/B testing of questions
- Result persistence / URL-shareable results
- Admin dashboard for viewing submissions
