# Landing v3 — Design Spec

## Overview

A new landing page for Arkadia Labs at route `/:lang/v3`, presenting the unified offering: AI agent teams built and deployed inside companies. The page shares Header/Footer with the existing site and lives as a separate page (`LandingV3Page.tsx`) until ready to replace the current home.

## Architecture

**Route:** `/:lang/v3`
**Page file:** `src/pages/LandingV3Page.tsx`
**New components:** `src/components/landing/`
**Translations:** `public/locales/{en,es,cs}/landingV3.json` (separate file, not touching home.json)
**Lazy loaded:** Yes, same pattern as other pages

### Section Order

| # | Section | Component | Status |
|---|---------|-----------|--------|
| S1 | Hero | `landing/HeroProduct.tsx` | NEW |
| S2 | The Shift | `landing/TheShiftSection.tsx` | NEW |
| S3 | Your Company Cloned | `agentWorkforce/AgentWorkforceSection.tsx` | KEEP |
| S4 | Product Demo | `landing/ProductDemo.tsx` | NEW |
| S5 | Virtual Office | `agentWorkforce/VirtualOfficeSection.tsx` | KEEP |
| S6 | Use Cases | `BeforeAfterSection.tsx` | ADAPT (new data) |
| S7 | How It Works | `WhyArkadia.tsx` | ADAPT (5→3 steps) |
| S8 | Differentiation | `landing/ComparisonSection.tsx` | NEW |
| S9 | Results | `KpiSection.tsx` + `TestimonialsSection.tsx` | KEEP |
| S10 | FAQ | `FaqSection.tsx` | KEEP (new questions) |
| S11 | CTA Final | `FinalCtaSection.tsx` | KEEP (new copy) |
| S12 | Train One AI | `agentWorkforce/AgentConnectionHero.tsx` | KEEP (moved to end) |

## Brand

- **Company name:** Arkadia Labs (not Elevaite Labs — repo name is legacy)
- **Primary colors:** Sky blue `#0ea5e9`, Teal `#14b8a6`
- **CTA gradient:** `linear-gradient(135deg, #0ea5e9, #14b8a6)`
- **Text dark:** `#0D1B2A`
- **Background light:** `#F1F3F5`
- **Green accent:** `#69DB7C` (for checkmarks/success)
- **Glass effect:** `rgba(241,243,245,0.55)` with `backdrop-filter: blur(20px)`
- **Visual identity:** Organic blobs (radial gradients in sky/teal), SVG contour lines, glassmorphism frames, 3D robot illustrations, floating pills with colored dots

## New Components

### S1: HeroProduct

**File:** `src/components/landing/HeroProduct.tsx`

**Layout:** Two columns (50/50). Left: copy. Right: animated chat mockup.

**Left column:**
- Badge pill: "AI-Powered Teams" (white bg, sky-500 icon, shadow)
- Headline: "Tu equipo AI." in sky blue + "Pideles lo que necesites." in dark
- Subheadline in muted text
- Two CTAs: primary (gradient sky→teal) + secondary (white bg, subtle border)
- Three checkmarks: "Listo en ~1 mes" / "Sin codigo" / "Humano en el loop"

**Right column:**
- Chat mockup with sidebar (conversations, workspace) and main chat area
- User bubble in gradient sky→teal
- Agent response bubble with task decomposition (checkmarks)
- Input bar at bottom

**Background:** Organic blobs (sky-blue and teal radial gradients with blur), SVG contour lines at low opacity, glassmorphism frame wrapping content.

**Reuse from HeroFramed.tsx:** Blob backgrounds, contour line SVG patterns, glassmorphism frame styling, motion variants, mobile/desktop dual layout structure.

**Remove from HeroFramed:** ElevenLabs voice widget, AccumulatingTypingEffect, mascot image.

**Animations:**
- Copy: fade-in + translateY(20px) on mount
- Chat mockup: fade-in + translateY(30px), delay 0.3s
- Chat bubbles: stagger 0.8s between them
- Typing indicator (3 pulsing dots) before agent response
- Checkmarks activate sequentially (0.5s intervals)
- Full loop resets every ~15 seconds

**Responsive:**
- Desktop (>1024): 2 columns as designed
- Tablet (768-1024): 2 columns narrower, chat without sidebar
- Mobile (<768): Vertical stack. Copy on top, simplified chat below (no sidebar)

### S2: TheShiftSection

**File:** `src/components/landing/TheShiftSection.tsx`

**Layout:** Full-width split screen — three columns: LEFT (45%) | CENTER DIVIDER (10%) | RIGHT (45%).

**Headline:** Centered above the split. "Tu equipo hace mucho. Pero puede hacer mas con menos."

**Left side (Before — the problem):**
- Background: soft red/rose gradient (`#fff5f5` to `#fef2f2`)
- Illustration area: placeholder for 3D chaotic desk scene
- 4 floating pills over the illustration (white bg, shadow, red/orange dots): "47 emails sin responder", "Reporte atrasado 3 dias", "Lead sin seguimiento", "Manual data entry..."
- 4 clean bullet points (red dots, no cards) below illustration

**Center divider:**
- Gradient transition from red to green
- White circle with teal arrow icon, shadow

**Right side (After — the solution):**
- Background: soft green/mint gradient (`#f0fdf4` to `#ecfdf5`)
- Illustration area: placeholder for 3D organized AI office
- 4 floating pills (green dots, one blue "processing"): "47 emails respondidos", "Reporte listo en 4 min", "12 leads calificados", "Procesando datos..."
- 4 clean bullet points (green dots)

**Illustrations needed:** 2 new 3D assets in Arkadia Labs style. Until ready, use dashed placeholder areas.

**Animations:**
- Title enters first (fade + translateY)
- Left side (red) appears second
- Center arrow pulses
- Right side (green) fades in with delay
- Floating pills have breathing animation (translateY +/-5px loop)

**Responsive:**
- Desktop: 3 columns (before | arrow | after)
- Tablet: same but narrower
- Mobile: vertical stack (before on top, arrow, after below)

### S4: ProductDemo

**File:** `src/components/landing/ProductDemo.tsx`

**Layout:** Centered headline + large 3-column product mockup + 3 steps below.

**Headline:** "Asi se siente tener un equipo AI." + subtitle "Tu pides. El equipo ejecuta. Tu revisas."

**Product mockup (3 columns inside one card with shadow):**

1. **Left sidebar (180px):** Arkadia Labs logo, ClientCo Inc., "New conversation" button (gradient sky→teal), conversation list, workspace items (Tasks, Deliverables, Activity)

2. **Center chat area:** User bubble (gradient sky→teal) asking about LinkedIn content plan. Agent response with task decomposition (checkmarks, some completed, some pending). Input bar at bottom.

3. **Right activity panel (280px):**
   - **Active Agents section:** Cards for each agent with:
     - Avatar icon (colored gradient bg)
     - Agent name (PM Agent, Research Agent, Content Agent, Calendar Agent)
     - Status indicator: Active (green dot), Working (blue pulsing dot), Completed (green static dot), Queued (gray dot, card at 50% opacity)
     - Description of what the agent is doing
   - **Activity Log section:** Chronological feed of agent actions with colored dots, agent name, action description, and timestamp

**3 steps below mockup:** Large numbers in sky blue + title + description. Clean text, no cards.
1. "Tu pides" — En lenguaje natural
2. "El equipo ejecuta" — Un PM descompone y asigna
3. "Tu revisas" — Apruebas, ajustas, o pides cambios

**Animations (Phase 3):**
- Typing indicator before agent response
- Bubbles with 0.8s stagger
- Checkmarks activate sequentially
- Agent cards change state as the animated conversation progresses
- "Working" dot pulses
- New activity log entries slide in from bottom
- When an agent completes, its card does a subtle green flash
- Full loop every ~15s

**Responsive:**
- Desktop: 3 columns (sidebar + chat + activity panel)
- Tablet: 2 columns (chat + activity panel, no sidebar)
- Mobile: Chat only. Activity panel hidden or becomes a drawer. 3 steps stack vertically.

### S8: ComparisonSection

**File:** `src/components/landing/ComparisonSection.tsx`

**Layout:** Centered content, max-width 800px.

**Headline:** "Construido para ti. No por ti."
**Subtitle:** "Las plataformas te dan herramientas. Nosotros te damos un equipo funcionando."

**Table:** 3 columns (criteria | DIY platforms | Arkadia Labs). 5 rows:
1. Quien construye | Tu (perfil tecnico necesario) | Nosotros. Tu solo usas.
2. Tiempo hasta resultados | Semanas/meses de prueba y error | ~1 mes, listo para operar
3. Entrenamiento | Generico, tu lo configuras | Con tus datos y criterios reales
4. Soporte | Documentacion y foros | Equipo dedicado + optimizacion
5. Resultado | Herramientas que operar | Un equipo AI que opera por ti

**Styling:** Arkadia Labs column highlighted (subtle teal/green background or left border). DIY column in muted gray. Light bottom borders between rows.

**Animation:** Rows enter staggered on scroll (0.1s delay between rows, fade + translateY).

**Responsive:** Table scrolls horizontally on mobile, or converts to stacked cards.

## Adapted Components

### S6: BeforeAfterSection (Use Cases)

Change data from before/after comparisons to department-specific use cases. Same tab pattern with 5 tabs: Ventas, Marketing, Operaciones, Soporte, RRHH. Each tab shows: title + description + capability checklist (left) + illustration placeholder (right). Data lives in landingV3.json translations.

Phase 3: Add auto-advance timer (7s per tab) with progress bar.

### S7: WhyArkadia (How It Works)

Reduce from 5 steps to 3: Entendemos → Construimos → Entregamos. Update data in translations. Keep the existing lateral navigation + crossfade pattern, or convert to horizontal 3-card layout. Update the 3 step images.

### S10: FaqSection

Update questions in translations to align with new narrative:
1. Cuanto tiempo tarda en estar listo?
2. Necesito un equipo tecnico para usarlo?
3. Puedo empezar con un solo proceso?
4. Que pasa con la seguridad de mis datos?
5. Hay un humano supervisando?

### S11: FinalCtaSection

Update copy: "Listo para conocer a tu nuevo equipo?" + cycling words aligned to new narrative.

## Translations

New file `landingV3.json` for each locale (en, es, cs) with keys:
- `hero.*` — Hero section copy
- `theShift.*` — Before/after section
- `productDemo.*` — Product demo section
- `useCases.*` — Department tabs and capabilities
- `howItWorks.*` — 3-step process
- `comparison.*` — DIY vs Arkadia table
- `faq.*` — FAQ questions and answers
- `finalCta.*` — Final CTA copy

Load via i18next namespace or merge into translation namespace on the page.

## Analytics

All new interactive elements must include dataLayer tracking per project rules:
- CTA clicks in hero (both buttons)
- Section viewport entries (for scroll depth)
- Tab switches in use cases
- FAQ accordion toggles
- Final CTA clicks
- Page view on mount with language context

## Performance

- Page lazy loaded in App.tsx
- Below-fold sections (S6 onward) lazy loaded with Suspense
- Images use OptimizedImage component with Cloudinary
- Animations respect `prefers-reduced-motion`
- Chat animation loop uses requestAnimationFrame, pauses when not in viewport
