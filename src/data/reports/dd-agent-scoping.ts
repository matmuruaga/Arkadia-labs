// ─────────────────────────────────────────────────────────────────────────────
// DD Dataroom AI Agent — Project Scoping Report Data
// Czech-language internal document. No i18n keys — direct Czech strings.
// Source: DD-Agent-Scoping-Report-Able.html (Able + Arkadia Labs, 30. 3. 2026)
// Client: Skupina Progresus | Project: Nový Zeleneč DD | INTERNÍ — NESDÍLET S KLIENTEM
// ─────────────────────────────────────────────────────────────────────────────

// ─── TYPES ───────────────────────────────────────────────────────────────────

export type BadgeVariant = 'red' | 'green' | 'blue' | 'yellow' | 'gray' | 'purple';
export type FlagVariant = 'red' | 'yellow' | 'green';
export type PriorityLevel = 'P0' | 'P1' | 'P2' | 'P3';
export type RiskStatus =
  | 'OPEN — CRITICAL'
  | 'ACTIVE'
  | 'MITIGATED BY DESIGN'
  | 'WARNING SENT'
  | 'OPEN'
  | 'ACCEPTED'
  | 'MITIGATED BY T&M'
  | 'PLANNED'
  | 'MONITOR'
  | 'MITIGATED';

export interface ReportMeta {
  title: string;
  subtitle: string;
  confidentialBadge: string;
  footer: string;
}

export interface NavSection {
  id: string;
  label: string;
}

export interface MetricCard {
  value: string;
  label: string;
}

export interface Badge {
  text: string;
  variant: BadgeVariant;
}

export interface Flag {
  text: string;
  variant: FlagVariant;
}

// ─── REPORT META ─────────────────────────────────────────────────────────────

export const reportMeta: ReportMeta = {
  title: 'DD Dataroom AI Agent — Scoping Report',
  subtitle: 'Able + Arkadia Labs | 30. 3. 2026 | Klient: Skupina Progresus | Projekt: Nový Zeleneč DD | INTERNÍ — NESDÍLET S KLIENTEM',
  confidentialBadge: 'INTERNÍ',
  footer: 'Able + Arkadia Labs | 30. 3. 2026 | INTERNÍ — Nesdílet s klientem\nComposite Score: 7.15/10 | Recommendation: GO',
};

// ─── NAV SECTIONS ────────────────────────────────────────────────────────────

export const navSections: NavSection[] = [
  { id: 'executive-summary', label: 'Executive Summary' },
  { id: 'prospect-context', label: 'Prospect Context' },
  { id: 'scope', label: 'Scope' },
  { id: 'feasibility', label: 'Feasibility' },
  { id: 'technical', label: 'Technical Architecture' },
  { id: 'effort', label: 'Effort & Timeline' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'roi', label: 'ROI Projection' },
  { id: 'risk', label: 'Risk Assessment' },
  { id: 'deliverables', label: 'Deliverables' },
  { id: 'go-nogo', label: 'GO/NO-GO' },
  { id: 'next-steps', label: 'Next Steps' },
];

// ─── SECTION 1: EXECUTIVE SUMMARY ────────────────────────────────────────────

export interface ExecutiveSummaryMetrics {
  compositeScore: MetricCard;
  effortRange: MetricCard;
  budgetRange: MetricCard;
  daysToDeadline: MetricCard;
}

export const executiveSummaryIntro =
  'Skupina Progresus potřebuje AI-powered dataroom pro sell-side due diligence projektu Nový Zeleneč (42 ha, RE development u Prahy). Kupující je PPF, transakce v řádu vyšších miliard CZK. Progresus chce ukázat PFF, že mají „pořádek v datech" — a AI sumarizace jsou hlavní diferenciátor.';

export const executiveSummaryMetrics: ExecutiveSummaryMetrics = {
  compositeScore: { value: '7.0', label: 'Composite Score' },
  effortRange: { value: '150–220h', label: 'Realistický rozsah (s bufferem)' },
  budgetRange: { value: '300–440K', label: 'CZK celkem' },
  daysToDeadline: { value: '8 dní', label: 'Do Phase 1 deadline (7. 4.)' },
};

export const executiveSummaryFlag: Flag = {
  text: 'YELLOW — Proceed with caution',
  variant: 'yellow',
};

export const executiveSummaryRecommendation =
  'GO — projekt je realizovatelný, ale vyžaduje disciplínu na scope (práce pouze s existujícími dokumenty), okamžité řešení NDA/DPA, a jasnou komunikaci s klientem o tom, co AI zvládne a co ne. Strategicky klíčový projekt — úspěch zde otevírá cestu k plné AI transformaci Progresu.';

// ─── SECTION 2: PROSPECT CONTEXT ─────────────────────────────────────────────

export interface CompanyProfileRow {
  label: string;
  value: string;
}

export const companyProfile: CompanyProfileRow[] = [
  { label: 'Název', value: 'Skupina Progresus (Progresus Invest Holding)' },
  { label: 'Zakladatelé', value: 'JUDr. Lukáš Zrůst, Ph.D. + Lukáš Foral' },
  { label: 'Založeno', value: 'Únor 2021' },
  { label: 'Sídlo', value: 'Praha, Česká republika' },
  { label: 'Obor', value: 'Real estate development + dřevostavby + investice' },
  { label: 'Klíčová aktiva', value: 'RD Rýmařov (1B+ CZK revenue/rok), Haas Fertigbau, Nový Zeleneč (42 ha)' },
  { label: 'Zaměstnanci', value: '~400+ (RD Rýmařov alone); group total neznámý' },
  { label: 'Financování', value: 'Dluhopisový program (max 2B CZK, est. 2026)' },
];

export interface MaTrackRecord {
  deal: string;
  rok: string;
  poznamka: string;
}

export const maTrackRecord: MaTrackRecord[] = [
  {
    deal: 'Vitrablok / Seves Glass Block',
    rok: '07/2024 (nákup), 09/2025 (prodej SEDIVER/Blackstone)',
    poznamka: 'Holding ~1.2 roku, exit do Blackstone portfolio',
  },
  {
    deal: 'Haas Fertigbau CZ',
    rok: '2024',
    poznamka: 'Rozšíření kapacit dřevostaveb',
  },
  {
    deal: 'Dobřichovice',
    rok: '2025',
    poznamka: 'Rezidenční development, konsolidace pozemků → exit',
  },
  {
    deal: 'Nový Zeleneč (probíhá)',
    rok: '2026',
    poznamka: 'Sell-side DD s PPF, miliardová transakce',
  },
];

export const maTrackRecordNote =
  'Progresus je aktivní deal-maker s prokázanou schopností akvizice i exitu. Zrůst je ex-insolvenční správce — ví, co DD obnáší.';

export interface DecisionMaker {
  name: string;
  role: string;
  relevance: string;
}

export const decisionMakers: DecisionMaker[] = [
  {
    name: 'JUDr. Lukáš Zrůst, Ph.D.',
    role: 'CEO & zakladatel',
    relevance: 'Rozhodovatel. Dává plný mandát. Osobně používá Claude pro DD. BUDGET HOLDER.',
  },
  {
    name: 'Michal Dvořák',
    role: 'Co-owner, Progresus Invest',
    relevance: 'DD Project Lead (klientská strana). Nahradil Ševčíka.',
  },
  {
    name: 'Tomáš Johanna',
    role: 'Externí advokát',
    relevance: 'Právní rámec DD. Skeptický k AI halucinacím. Gatekeeper na kvalitu.',
  },
  {
    name: 'Jan Ševčík',
    role: 'CTO',
    relevance: 'SIDELINED pro DD. Aktivní pouze v Discovery workshopech.',
  },
];

export const decisionMakersNote =
  'Pozor: Michal Dvořák nemá veřejně dohledatelnou roli v Progresus. Buď jde o neveřejného investora/board člena, nebo o interní roli bez veřejné stopy. Ověřit.';

export const digitalMaturityText =
  'Nízká až střední. Google ecosystem primárně (email, Drive), Microsoft licence pasivně. ERP je QI (Melzer) — legacy systém s šifrovanou DB. Power BI existuje (ETL pipeline funkční). SharePoint nepoužívají. Teams nefunguje kulturně v RD Rýmařov. Poslední DD (sklárna, 2025) byl „totální old school" — to je motivace pro AI přístup.';

// ─── SECTION 3: SCOPE ────────────────────────────────────────────────────────

export interface ProjectPhaseRow {
  phase: string;
  description: string;
  priority: Badge;
  deadline: string;
  highlighted: boolean;
}

export const projectPhases: ProjectPhaseRow[] = [
  {
    phase: 'Phase 1: Sumarizace složek',
    description: 'Google Drive dataroom + extraktivní AI sumarizace per folder/document',
    priority: { text: 'P0 — Must have', variant: 'red' },
    deadline: '7. dubna 2026',
    highlighted: true,
  },
  {
    phase: 'Phase 2: Q&A Agent',
    description: 'RAG pipeline, vektorová DB, odpovědi na DD dotazy kupujícího',
    priority: { text: 'P1 — High', variant: 'yellow' },
    deadline: 'Duben–květen 2026',
    highlighted: false,
  },
  {
    phase: 'Phase 3: Monitoring & Analytika',
    description: 'Tracking přístupů, gap analysis, dashboard',
    priority: { text: 'P2 — Medium', variant: 'blue' },
    deadline: 'Květen–červen 2026',
    highlighted: false,
  },
  {
    phase: 'Phase 4: EU migrace',
    description: 'Vertex AI (Frankfurt), DPA, security hardening',
    priority: { text: 'P3 — Low', variant: 'gray' },
    deadline: 'Dle potřeby',
    highlighted: false,
  },
];

export interface FunctionalRequirement {
  kategorie: string;
  requirement: string;
  faze: number;
}

export const functionalRequirements: FunctionalRequirement[] = [
  {
    kategorie: 'Data & Analytics',
    requirement: 'Document ingestion — upload, OCR, text extraction z 52+ souborů (454+ stran, 42+ MB)',
    faze: 1,
  },
  {
    kategorie: 'Data & Analytics',
    requirement: 'OCR pipeline pro skenované PDF (163stránková rámcová smlouva = klíčový dokument, sken)',
    faze: 1,
  },
  {
    kategorie: 'Automation & Workflows',
    requirement: 'Extraktivní sumarizace per-folder + per-document s citacemi (strana, odstavec)',
    faze: 1,
  },
  {
    kategorie: 'Automation & Workflows',
    requirement: 'Q&A Agent — odpovědi na DD dotazy z nalezených dokumentů, s groundingem',
    faze: 2,
  },
  {
    kategorie: 'Search & Discovery',
    requirement: 'RAG pipeline — vektorová DB, embeddingy, chunking, retrieval s re-rankingem',
    faze: 2,
  },
  {
    kategorie: 'Data & Analytics',
    requirement: 'Activity monitoring — kdo přistupoval, jak dlouho, co nečetl',
    faze: 3,
  },
  {
    kategorie: 'Data & Analytics',
    requirement: 'Gap analysis — automatická identifikace chybějících dokumentů',
    faze: 3,
  },
  {
    kategorie: 'Compliance & Security',
    requirement: 'EU data residency (Vertex AI, Frankfurt)',
    faze: 4,
  },
  {
    kategorie: 'Compliance & Security',
    requirement: 'DPA s Google Cloud + Anthropic',
    faze: 4,
  },
];

export interface NonFunctionalRequirement {
  requirement: string;
  specifikace: string;
  dopad: string;
}

export const nonFunctionalRequirements: NonFunctionalRequirement[] = [
  {
    requirement: 'Anti-hallucination',
    specifikace: '3vrstvá architektura: extraktivní sumarizace → RAG s groundingem → human-in-the-loop. Nulová tolerance pro vymyšlená fakta.',
    dopad: 'Existenční — jeden halucinovaný fakt = zničená důvěryhodnost celého DD',
  },
  {
    requirement: 'Kvalita češtiny',
    specifikace: 'Právní terminologie, přesné překlady klausulí, správná citace zákonů',
    dopad: 'Vysoký — kupující čte česky, advokáti kontrolují',
  },
  {
    requirement: 'Rychlost',
    specifikace: '8 dní do Phase 1 (z toho Velikonoční víkend)',
    dopad: 'Kritický — deadline je hard, kupující čeká',
  },
  {
    requirement: 'Škálovatelnost',
    specifikace: 'Dokumenty budou přibývat průběžně po celou dobu DD (3–6 měsíců)',
    dopad: 'Střední — pipeline musí zvládat inkrementální ingest',
  },
];

export const outOfScope: string[] = [
  'Právní revize dokumentů (to dělá Johanna / BB)',
  'Vytváření chybějících dokumentů (Business Plan, Financials — musí dodat klient)',
  'Komunikace s kupujícím (PFF) — vše jde přes Progresus',
  'Discovery workshopy (paralelní track, oddělená fakturace)',
  'QI ERP integrace, Power BI, Document Processing agent (jiné projekty)',
];

export interface AssumptionDependency {
  id: string;
  type: 'DEP' | 'ASM';
  text: string;
}

export const assumptionsDependencies: AssumptionDependency[] = [
  { id: 'DEP-1', type: 'DEP', text: 'Klient potvrdí platformu (Google Drive) do 31. března' },
  { id: 'DEP-2', type: 'DEP', text: 'Dokumenty přijdou kompletní pro existující sekce do 31. března' },
  { id: 'DEP-3', type: 'DEP', text: 'Zrůst/Dvořák budou k dispozici pro review sumarizací (min. 2h/den ve dnech 4–6)' },
  { id: 'ASM-1', type: 'ASM', text: 'Pracujeme BEZ NDA/DPA — Zrůst to odsouhlasil ústně' },
  { id: 'ASM-2', type: 'ASM', text: 'API náklady (Claude) hradí Arkadia/Able a přeúčtuje klientovi' },
  { id: 'ASM-3', type: 'ASM', text: 'Karel je jediný technický resource na straně Arkadia pro Phase 1' },
];

// ─── SECTION 4: FEASIBILITY ASSESSMENT ───────────────────────────────────────

export interface FeasibilityDimension {
  title: string;
  score: number;
  badge: Badge;
  scoreBarColor: string;
  description: string;
  note?: string;
}

export const feasibilityDimensions: FeasibilityDimension[] = [
  {
    title: 'Technical Fit',
    score: 7,
    badge: { text: '7/10', variant: 'blue' },
    scoreBarColor: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
    description:
      'LLM orchestrace, RAG pipeline, document processing — to je Arkadia core. Claude API je naše preferovaná platforma. Ale: český právní jazyk je specializace, OCR pipeline pro 163stránkové skeny je nový ground, a anti-halucinační guardrails pro legal DD jsou výrazně přísnější než pro běžné use-cases.',
    note: 'Stack mismatch: Framework předpokládá React/Node/AWS. Realita: Python/FastAPI + Claude API + Google Drive API + LangGraph. Validní, ale mimo standardní Arkadia playbook.',
  },
  {
    title: 'Business Value',
    score: 9,
    badge: { text: '9/10', variant: 'green' },
    scoreBarColor: 'linear-gradient(90deg, #22c55e, #86efac)',
    description:
      'Multi-miliardový deal context. Zrůst dal plný mandát. Budget nebyl ani diskutován — rychlost je priorita. PFF team je AI-enthusiastic → náš work přímo impresuje kupujícího. A hlavně: toto je proof-of-concept pro celou Progresus transformaci (5–8.4M CZK). Zrůst explicitně řekl: „Uděláme s Abelem a s vámi ještě mnohem větší věci."',
  },
  {
    title: 'Implementation Risk',
    score: 6,
    badge: { text: '6/10', variant: 'yellow' },
    scoreBarColor: 'linear-gradient(90deg, #f59e0b, #fde68a)',
    description:
      'Timeline je brutální (8 dní Phase 1 včetně Velikonoc). 62% DD sekcí nemá žádné dokumenty. Žádné NDA/DPA = právní expozice. 163stránkový sken vyžaduje OCR. Halucinace v právním DD kontextu = katastrofa. Karel = single point of failure. Scope creep přes 3–6 měsíců je téměř jistý.',
  },
  {
    title: 'Strategický Fit',
    score: 8,
    badge: { text: '8/10', variant: 'purple' },
    scoreBarColor: 'linear-gradient(90deg, #a855f7, #d8b4fe)',
    description:
      'DD Agent je gateway projekt k plné AI transformaci Progresu (5–8.4M CZK pipeline). Úspěch zde = referenční projekt (AI DD pro miliardový RE deal) + důkaz schopnosti pro další fáze. Strategicky vysoce hodnotný i přes relativně menší deal size samotného DD agenta.',
  },
];

export const compositeFeasibility = {
  score: 7.0,
  formula: 'Composite = (7 × 0.35) + (9 × 0.30) + ((10−6) × 0.20) + (8 × 0.15) = 2.45 + 2.70 + 0.80 + 1.20 = 7.15',
  flag: { text: 'YELLOW — Realizovatelné, vyžaduje disciplínu na scope a timeline', variant: 'yellow' } as Flag,
  interpretation:
    'Projekt je technicky zvládnutelný a strategicky velmi hodnotný. Hlavní rizika: agresivní timeline (8 dní Phase 1), neúplné dokumenty (62% chybí), absence NDA/DPA. Se správným scope managementem = GO.',
};

// ─── SECTION 5: TECHNICAL ARCHITECTURE ───────────────────────────────────────

export interface StackRow {
  layer: string;
  technologie: string;
  poznamka: string;
}

export const stackMapping: StackRow[] = [
  {
    layer: 'DMS / Storage',
    technologie: 'Google Drive',
    poznamka: 'Klient je Google-native. Sdílení přes Workspace.',
  },
  {
    layer: 'LLM',
    technologie: 'Claude API (přímé) → Claude přes Vertex AI (EU, Phase 4)',
    poznamka: 'Nejlepší kvalita na českém právním textu. API data se nepoužívají k tréninku.',
  },
  {
    layer: 'OCR',
    technologie: 'Google Document AI (batch) + Claude Vision (fallback per-page)',
    poznamka: '163stránkový sken = batch OCR priorita.',
  },
  {
    layer: 'Backend / Orchestrace',
    technologie: 'Python (FastAPI) + LangGraph',
    poznamka: 'Multi-agent orchestrace, pipeline management.',
  },
  {
    layer: 'RAG (Phase 2)',
    technologie: 'Chroma/Pinecone (vector DB) + sentence-transformers (embeddings) + re-ranking',
    poznamka: 'Optimalizováno pro české právní texty, chunk size ~500 tokens.',
  },
  {
    layer: 'Frontend',
    technologie: 'HTML reports (Phase 1) → React dashboard (Phase 3)',
    poznamka: 'Phase 1 nepotřebuje UI — stačí dokumenty v Drive + PDF/HTML sumarizace.',
  },
  {
    layer: 'Auth',
    technologie: 'Google Workspace (inherited sharing)',
    poznamka: 'Přístupová práva řešená přes Google Drive permissions.',
  },
  {
    layer: 'Monitoring',
    technologie: 'Google Drive Activity API + custom logging',
    poznamka: 'Phase 3 — tracking přístupů kupujícího.',
  },
];

export interface ArchitectureDecisionRecord {
  id: string;
  title: string;
  body: string;
}

export const architectureDecisionRecords: ArchitectureDecisionRecord[] = [
  {
    id: 'ADR-1',
    title: 'Proč ne standardní Arkadia stack (React/Node/AWS)?',
    body: 'Tento projekt je AI pipeline, ne webová aplikace. Nepotřebujeme frontend framework, relační DB, ani AWS infra. Google Drive JE úložiště, Claude API JE processing engine. Přidáním React/Express bychom přidali komplexitu bez hodnoty. Phase 3 dashboard je jediné místo, kde React dává smysl.',
  },
  {
    id: 'ADR-2',
    title: 'Proč extraktivní sumarizace místo generativní (Phase 1)?',
    body: 'Generativní sumarizace = model „píše vlastními slovy" = prostor pro halucinace. Extraktivní = model identifikuje a cituje klíčové pasáže přímo z textu. Pro Phase 1 (folder summaries) stačí extraktivní přístup. Generativní syntéza až v Phase 2 Q&A, kde je RAG grounding.',
  },
  {
    id: 'ADR-3',
    title: 'Proč Google Document AI pro OCR místo Claude Vision?',
    body: 'Claude Vision umí číst skeny nativně, ale 163 stran po jedné = pomalé a per-page processing. Cena ~$2–3 (Sonnet) za celý dokument — levnější než původně odhadováno, ale latence je problém. Google Document AI udělá batch OCR za sekundy (~$0.70–2.70 za 454 stran) s lepší kvalitou češtiny. Claude Vision jako fallback pro problematické stránky.',
  },
];

// ─── SECTION 6: EFFORT & TIMELINE ────────────────────────────────────────────

export interface TShirtSizingCard {
  value: string;
  label: string;
  note: string;
  color: string;
}

export const tShirtSizing: TShirtSizingCard[] = [
  {
    value: 'S–M',
    label: 'T-Shirt Size',
    note: '120–240h standard range',
    color: '#f59e0b',
  },
  {
    value: '1.21x',
    label: 'Complexity Multiplier',
    note: 'Legal domain (1.2x) × OCR (1.05x) × Timeline pressure (1.1x) × Anti-hallucination (1.15x) ÷ simplified scope (0.85x)',
    color: '#ef4444',
  },
  {
    value: '150–220h',
    label: 'Adjusted Estimate (s bufferem)',
    note: 'Base 130–180h + 15% buffer for unknowns',
    color: '#22c55e',
  },
];

export interface EffortRow {
  phase: string;
  phaseLabel: string;
  activity: string;
  hoursRange: string;
  cenaRange: string;
  isSubtotal?: boolean;
  isTotal?: boolean;
  isBuffer?: boolean;
  phaseColor?: string;
}

export const effortBreakdown: EffortRow[] = [
  // Phase 1
  {
    phase: 'Phase 1',
    phaseLabel: 'Phase 1\nSumarizace',
    activity: 'Google Drive setup + folder structure',
    hoursRange: '4–6',
    cenaRange: '8–12K',
    phaseColor: 'rgba(34, 197, 94, 0.08)',
  },
  {
    phase: 'Phase 1',
    phaseLabel: '',
    activity: 'OCR pipeline (Document AI + 163p sken + další skeny)',
    hoursRange: '8–14',
    cenaRange: '16–28K',
    phaseColor: 'rgba(34, 197, 94, 0.08)',
  },
  {
    phase: 'Phase 1',
    phaseLabel: '',
    activity: 'Prompt engineering — extraktivní sumarizace s citacemi',
    hoursRange: '8–12',
    cenaRange: '16–24K',
    phaseColor: 'rgba(34, 197, 94, 0.08)',
  },
  {
    phase: 'Phase 1',
    phaseLabel: '',
    activity: 'Batch generování sumarizací (all folders + documents)',
    hoursRange: '4–6',
    cenaRange: '8–12K',
    phaseColor: 'rgba(34, 197, 94, 0.08)',
  },
  {
    phase: 'Phase 1',
    phaseLabel: '',
    activity: 'Output formatting + quality check',
    hoursRange: '4–6',
    cenaRange: '8–12K',
    phaseColor: 'rgba(34, 197, 94, 0.08)',
  },
  {
    phase: 'Phase 1',
    phaseLabel: '',
    activity: 'Review s klientem + iterace + buffer',
    hoursRange: '7–12',
    cenaRange: '14–24K',
    phaseColor: 'rgba(34, 197, 94, 0.08)',
  },
  {
    phase: 'Phase 1',
    phaseLabel: 'Phase 1 Subtotal',
    activity: 'Phase 1 Subtotal',
    hoursRange: '35–56h',
    cenaRange: '70–112K CZK',
    isSubtotal: true,
    phaseColor: undefined,
  },
  // Phase 2
  {
    phase: 'Phase 2',
    phaseLabel: 'Phase 2\nQ&A RAG',
    activity: 'Vector DB setup + embedding pipeline',
    hoursRange: '10–14',
    cenaRange: '20–28K',
    phaseColor: 'rgba(59, 130, 246, 0.08)',
  },
  {
    phase: 'Phase 2',
    phaseLabel: '',
    activity: 'Chunking strategy (legal text optimization)',
    hoursRange: '6–8',
    cenaRange: '12–16K',
    phaseColor: 'rgba(59, 130, 246, 0.08)',
  },
  {
    phase: 'Phase 2',
    phaseLabel: '',
    activity: 'Retrieval + re-ranking + grounded generation',
    hoursRange: '12–16',
    cenaRange: '24–32K',
    phaseColor: 'rgba(59, 130, 246, 0.08)',
  },
  {
    phase: 'Phase 2',
    phaseLabel: '',
    activity: 'Anti-hallucination guardrails + confidence scoring',
    hoursRange: '8–12',
    cenaRange: '16–24K',
    phaseColor: 'rgba(59, 130, 246, 0.08)',
  },
  {
    phase: 'Phase 2',
    phaseLabel: '',
    activity: 'Testing + iteration + client review',
    hoursRange: '10–14',
    cenaRange: '20–28K',
    phaseColor: 'rgba(59, 130, 246, 0.08)',
  },
  {
    phase: 'Phase 2',
    phaseLabel: 'Phase 2 Subtotal',
    activity: 'Phase 2 Subtotal',
    hoursRange: '46–64h',
    cenaRange: '92–128K CZK',
    isSubtotal: true,
  },
  // Phase 3
  {
    phase: 'Phase 3',
    phaseLabel: 'Phase 3\nMonitoring',
    activity: 'Activity tracking + Google Drive audit log integration',
    hoursRange: '10–14',
    cenaRange: '20–28K',
    phaseColor: 'rgba(168, 85, 247, 0.08)',
  },
  {
    phase: 'Phase 3',
    phaseLabel: '',
    activity: 'Gap analysis automation',
    hoursRange: '8–12',
    cenaRange: '16–24K',
    phaseColor: 'rgba(168, 85, 247, 0.08)',
  },
  {
    phase: 'Phase 3',
    phaseLabel: '',
    activity: 'Analytics dashboard (React)',
    hoursRange: '12–16',
    cenaRange: '24–32K',
    phaseColor: 'rgba(168, 85, 247, 0.08)',
  },
  {
    phase: 'Phase 3',
    phaseLabel: 'Phase 3 Subtotal',
    activity: 'Phase 3 Subtotal',
    hoursRange: '30–42h',
    cenaRange: '60–84K CZK',
    isSubtotal: true,
  },
  // Phase 4
  {
    phase: 'Phase 4',
    phaseLabel: 'Phase 4\nEU Migrace',
    activity: 'Vertex AI setup (GCP eu-west3)',
    hoursRange: '6–8',
    cenaRange: '12–16K',
    phaseColor: 'rgba(100, 116, 139, 0.08)',
  },
  {
    phase: 'Phase 4',
    phaseLabel: '',
    activity: 'Migration testing + regression',
    hoursRange: '4–6',
    cenaRange: '8–12K',
    phaseColor: 'rgba(100, 116, 139, 0.08)',
  },
  {
    phase: 'Phase 4',
    phaseLabel: '',
    activity: 'DPA + security audit documentation',
    hoursRange: '4–6',
    cenaRange: '8–12K',
    phaseColor: 'rgba(100, 116, 139, 0.08)',
  },
  {
    phase: 'Phase 4',
    phaseLabel: 'Phase 4 Subtotal',
    activity: 'Phase 4 Subtotal',
    hoursRange: '14–20h',
    cenaRange: '28–40K CZK',
    isSubtotal: true,
  },
  // Buffer
  {
    phase: 'Buffer',
    phaseLabel: '15% Unknown Buffer',
    activity: '15% Unknown Buffer',
    hoursRange: '19–27h',
    cenaRange: '38–54K CZK',
    isBuffer: true,
  },
  // Total
  {
    phase: 'Total',
    phaseLabel: 'TOTAL (s bufferem)',
    activity: 'TOTAL (s bufferem)',
    hoursRange: '144–209h',
    cenaRange: '288–418K CZK',
    isTotal: true,
  },
];

export const effortNote =
  'Zaokrouhleno: 150–220h / 300–440K CZK. V1 analýza uváděla 130–180h / 260–360K CZK — to bylo BEZ bufferu a s optimistickými Phase 1 odhady.';

export const effortStressTest = {
  title: 'Stress-test: Co když přibydou dokumenty?',
  html: '<p>Aktuální dataset: 52 souborů, 454 stran, 42 MB. Ale 8/13 DD sekcí je prázdných. Pokud klient dodá Financials, Permitting, Business Plan a další — objem se může <strong>zdvojnásobit až ztrojnásobit</strong> (100–150 souborů, 1000+ stran).</p><p style="margin-top: 8px;">Impact na Phase 1: +15–25h extra (sumarizace nových sekcí). Impact na Phase 2: +10–20h (větší vector DB, více chunkování). <strong>Worst case total: 180–270h / 360–540K CZK.</strong></p><p style="margin-top: 8px;">Mitigace: T&M model — fakturujeme skutečně odpracované hodiny. Klient ví, že víc dokumentů = víc práce.</p>',
};

// ─── SECTION 7: PRICING STRATEGY ─────────────────────────────────────────────

export interface BudgetContextRow {
  parametr: string;
  hodnota: string;
  flag: Flag;
}

export const budgetContext: BudgetContextRow[] = [
  {
    parametr: 'Deal size (base)',
    hodnota: '260–360K CZK',
    flag: { text: 'Menší projekt', variant: 'yellow' },
  },
  {
    parametr: 'Deal size (s bufferem)',
    hodnota: '300–440K CZK',
    flag: { text: 'Realistický rozsah', variant: 'green' },
  },
  {
    parametr: 'Deal size (worst case — víc dokumentů)',
    hodnota: '360–540K CZK',
    flag: { text: 'Pokud objem dokumentů naroste 2–3x', variant: 'yellow' },
  },
  {
    parametr: 'Pipeline value (plná transformace)',
    hodnota: '5–8.4M CZK',
    flag: { text: 'Strategicky klíčové', variant: 'green' },
  },
  {
    parametr: 'Budget disclosed?',
    hodnota: 'Ne — „rychlost > cena"',
    flag: { text: 'Budget nediskutován, ale mandát dán', variant: 'yellow' },
  },
  {
    parametr: 'Budget approved?',
    hodnota: 'Ano — Zrůst mandát',
    flag: { text: 'Strong green', variant: 'green' },
  },
];

export const budgetContextNote =
  'DD Agent je strategický gateway projekt. Úspěch otevírá cestu k plné transformaci (5–8.4M CZK). Samotný DD Agent je menší deal, ale s vysokým strategickým dopadem.';

export interface TmModelRow {
  parametr: string;
  hodnota: string;
}

export const tmModel: TmModelRow[] = [
  { parametr: 'Rate', hodnota: '2 000 CZK/h (dle rate card)' },
  { parametr: 'Estimated range', hodnota: '150–220h / 300–440K CZK (celý DD Agent, 4 fáze)' },
  { parametr: 'Phase 1 estimate', hodnota: '~50h / 100K CZK (sumarizace do 7. dubna)' },
  { parametr: 'Billing cadence', hodnota: 'Měsíční fakturace dle skutečných hodin v Jira' },
  { parametr: 'Záloha', hodnota: '50% odhadu Phase 1 = 50K CZK upfront' },
  { parametr: 'Change order process', hodnota: 'Nové fáze/scope = nový odhad + schválení Dvořákem' },
];

export const tmModelReasoning: string[] = [
  'Dokumenty jsou neúplné (62% sekcí prázdných) — scope se BUDE měnit',
  'DD trvá 3–6 měsíců — průběžný ingest nových dokumentů',
  'Fixed price by vyžadoval 30–40% risk padding → klient platí víc za naše risk aversion',
  'Zrůst explicitně preferuje rychlost over budget predictability',
];

export interface HybridPricingRow {
  segment: string;
  model: string;
  cena: string;
  isBold?: boolean;
}

export const hybridPricing: HybridPricingRow[] = [
  {
    segment: 'Phase 1: Sumarizace',
    model: 'Fixed price (scope jasný, deadline jasný)',
    cena: '100 000 CZK (50h)',
  },
  {
    segment: 'Phase 2: Q&A RAG',
    model: 'T&M s odhadem',
    cena: '~92–128K CZK (46–64h)',
  },
  {
    segment: 'Phase 3: Monitoring',
    model: 'T&M s odhadem',
    cena: '~60–84K CZK (30–42h)',
  },
  {
    segment: 'Phase 4: EU migrace',
    model: 'T&M s odhadem',
    cena: '~28–40K CZK (14–20h)',
  },
  {
    segment: 'Total',
    model: '',
    cena: '280–352K CZK',
    isBold: true,
  },
];

export const hybridPricingNote =
  'Hybrid dává klientovi budget certainty na Phase 1. Důležité: scope Phase 1 striktně ohraničit na existující dokumenty (52 souborů). Nové dokumenty po 3. dubnu = Phase 1.5, nový odhad.';

// ─── SECTION 8: ROI PROJECTION ────────────────────────────────────────────────

export interface RoiRow {
  label: string;
  value: string;
}

export const clientRoi: RoiRow[] = [
  { label: 'Investice (Arkadia/Able)', value: '300–440K CZK' },
  { label: 'Srovnání: Manuální DD prep', value: '200–400h právníků × 3 000–5 000 CZK/h = 600K–2M CZK (industry standard)' },
  { label: 'AI-assisted reduction', value: '40–60% úspory na manuální práci (konzervativní — NE 60–70% z v1)' },
  { label: 'Odhadovaná úspora', value: '240K–1.2M CZK v průběhu 3–6M DD procesu' },
  { label: 'Net benefit (conservative)', value: '-60K až +760K CZK' },
  { label: 'Payback period', value: 'Okamžitý (pokud AI reálně nahradí 40%+ právní analýzy) až 3 měsíce' },
];

export const clientRoiComment =
  'Tato čísla jsou soft. Nemáme skutečný benchmark kolik Progresus platí právníkům za DD práci. „40–60% reduction" je industry estimate, ne měření. V1 uváděla 60–70% — to je příliš optimistické pro první nasazení bez fine-tuningu. Pro interní účely počítejme s 40% jako base case.';

export interface RoiDimension {
  type: string;
  label: string;
  description: string;
}

export const roiDimensions: RoiDimension[] = [
  {
    type: 'Kvantifikovatelná',
    label: 'Kvantifikovatelná',
    description: 'Úspora právních hodin — ale závisí na tom, kolik hodin by bez AI stálo (neznáme)',
  },
  {
    type: 'Strategická',
    label: 'Strategická (nekvatifikovatelná)',
    description: 'Dojem na PFF. Zrůst: „Chci ukázat, že máme pořádek v datech." V miliardové transakci je signaling sofistikovanosti potenciálně hodnotnější než úspora 500K na právnících.',
  },
  {
    type: 'Platformová',
    label: 'Platformová',
    description: 'Reusability pro budoucí transakce. Zrůst: „Příští rok něco prodávat… stavíme produkt." Pokud se agent použije 2–3x, ROI se násobí.',
  },
];

export const strategicValueArkadia: RoiRow[] = [
  { label: 'DD Agent revenue', value: '300–440K CZK' },
  { label: 'Pipeline value (plná transformace)', value: '5–8.4M CZK' },
  { label: 'Reference value', value: 'Multi-miliardový RE developer + AI DD showcase' },
  { label: 'Reusability', value: 'DD Agent template pro budoucí M&A klienty' },
];

export const strategicValueNote =
  'Bottom line: DD Agent je proof of concept pro celou Progresus transformaci. Zrůst na callu explicitně řekl: „Uděláme s Abelem a s vámi ještě mnohem větší věci." Úspěch zde = otevřené dveře k 5–8.4M CZK pipeline.';

// ─── SECTION 9: RISK ASSESSMENT ──────────────────────────────────────────────

export interface RiskRow {
  id: string;
  riziko: string;
  likelihood: number;
  impact: number;
  priority: number;
  priorityFlag: Flag;
  mitigace: string;
  owner: string;
  status: Badge;
  isHighlight?: 'loser' | 'winner';
}

export const riskRegister: RiskRow[] = [
  {
    id: 'R1',
    riziko: 'Dokumenty neúplné — 62% DD sekcí prázdných',
    likelihood: 5,
    impact: 4,
    priority: 20,
    priorityFlag: { text: '20', variant: 'red' },
    mitigace: 'Komunikovat klientovi: „AI nesoumarizuje něco, co neexistuje." Gap analýza jako deliverable.',
    owner: 'Zrůst / Johanna',
    status: { text: 'OPEN — CRITICAL', variant: 'red' },
    isHighlight: 'loser',
  },
  {
    id: 'R2',
    riziko: 'Timeline impossibility — 8 dní na Phase 1 včetně Velikonoc',
    likelihood: 4,
    impact: 5,
    priority: 20,
    priorityFlag: { text: '20', variant: 'red' },
    mitigace: 'Scope Phase 1 striktně na existující dokumenty. Prázdné sekce = prázdné. Buffer na víkend.',
    owner: 'Karel',
    status: { text: 'ACTIVE', variant: 'yellow' },
    isHighlight: 'loser',
  },
  {
    id: 'R3',
    riziko: 'Halucinace v právním DD — jeden vymyšlený fakt = zničená důvěryhodnost',
    likelihood: 3,
    impact: 5,
    priority: 15,
    priorityFlag: { text: '15', variant: 'red' },
    mitigace: '3vrstvá anti-halucinační architektura. Extraktivní sumarizace s citacemi. Human-in-the-loop mandatory.',
    owner: 'Karel',
    status: { text: 'MITIGATED BY DESIGN', variant: 'blue' },
    isHighlight: 'loser',
  },
  {
    id: 'R4',
    riziko: 'Zrůst vkládá DD docs do consumer Claude — data mohou jít do tréninku',
    likelihood: 3,
    impact: 5,
    priority: 15,
    priorityFlag: { text: '15', variant: 'red' },
    mitigace: 'Upozornit (DONE v platform analýze). Nabídnout secure alternativu ASAP.',
    owner: 'Karel → Zrůst',
    status: { text: 'WARNING SENT', variant: 'yellow' },
  },
  {
    id: 'R5',
    riziko: 'Bez NDA/DPA — Arkadia právní expozice při práci s M&A dokumenty',
    likelihood: 3,
    impact: 4,
    priority: 12,
    priorityFlag: { text: '12', variant: 'yellow' },
    mitigace: 'Zrůst ústně odsouhlasil. Johanna na hovoru. Ale písemná ochrana = nula. Eskalovat na Able/Vašek pro formalizaci.',
    owner: 'Vašek / Johanna',
    status: { text: 'OPEN', variant: 'red' },
  },
  {
    id: 'R6',
    riziko: 'Single Point of Failure: Karel — jediný Arkadia resource',
    likelihood: 3,
    impact: 4,
    priority: 12,
    priorityFlag: { text: '12', variant: 'yellow' },
    mitigace: 'Dokumentovat vše. Tomáš Korčák (Able) jako backup na RAG. Ale realita: Karel onemocní = Phase 1 se nestihne.',
    owner: 'Karel / Vašek',
    status: { text: 'ACCEPTED', variant: 'yellow' },
  },
  {
    id: 'R7',
    riziko: 'Scope creep přes 3–6 měsíců DD — průběžné doplňování dokumentů',
    likelihood: 4,
    impact: 3,
    priority: 12,
    priorityFlag: { text: '12', variant: 'yellow' },
    mitigace: 'T&M model = kredit za scope creep automaticky. Ale potřeba jasně komunikovat: víc dokumentů = víc hodin = víc fakturace.',
    owner: 'Karel / Dvořák',
    status: { text: 'MITIGATED BY T&M', variant: 'green' },
  },
  {
    id: 'R8',
    riziko: 'OCR kvalita na skenech — špatná kvalita OCR = špatné sumarizace',
    likelihood: 3,
    impact: 3,
    priority: 9,
    priorityFlag: { text: '9', variant: 'yellow' },
    mitigace: 'Google Document AI jako primární OCR (nejlepší čeština). Manuální kontrola OCR výstupu na klíčovém dokumentu (163p smlouva).',
    owner: 'Karel',
    status: { text: 'PLANNED', variant: 'blue' },
  },
  {
    id: 'R9',
    riziko: 'Kapacitní omezení — při paralelním běhu Discovery + DD Agent',
    likelihood: 3,
    impact: 3,
    priority: 9,
    priorityFlag: { text: '9', variant: 'yellow' },
    mitigace: 'Jasné oddělení tracků. DD Agent = Karel primárně. Discovery = Karel + Tomáš. Workshop 1 (2. 4.) je paralelní s DD sprint.',
    owner: 'Karel / Vašek',
    status: { text: 'MONITOR', variant: 'yellow' },
  },
  {
    id: 'R10',
    riziko: 'Dual-role BB advokátní kancelář — BB radí oběma stranám',
    likelihood: 2,
    impact: 3,
    priority: 6,
    priorityFlag: { text: '6', variant: 'green' },
    mitigace: 'Nesklápět draft sumarizace/komentáře do dataroomu. Sdílet až finální, klientem schválené verze.',
    owner: 'Karel / Dvořák',
    status: { text: 'MITIGATED', variant: 'green' },
  },
];

export const riskRegisterNote =
  'L = Likelihood (1–5), I = Impact (1–5), Priority = L × I. Red ≥ 15, Yellow 9–14, Green < 9.';

// ─── SECTION 10: DELIVERABLES MATRIX ─────────────────────────────────────────

export interface DeliverableRow {
  faze: string;
  deliverable: string;
  format: string;
  acceptanceCriteria: string;
  owner: string;
  highlighted?: boolean;
}

export const deliverables: DeliverableRow[] = [
  {
    faze: 'Phase 1',
    deliverable: 'Organizovaný Google Drive dataroom',
    format: 'Google Drive folder structure',
    acceptanceCriteria: '13 standardních DD sekcí, dokumenty správně zařazeny, přístupová práva nastavena',
    owner: 'Karel',
    highlighted: true,
  },
  {
    faze: 'Phase 1',
    deliverable: 'AI sumarizace per folder',
    format: 'PDF/HTML v každé složce',
    acceptanceCriteria: 'Přehled obsahu složky, klíčové dokumenty highlighted, citace (strana/odstavec), zero hallucinations',
    owner: 'Karel',
    highlighted: true,
  },
  {
    faze: 'Phase 1',
    deliverable: 'AI sumarizace per document',
    format: 'PDF/HTML per dokument',
    acceptanceCriteria: 'Klíčové body, rizika, termíny, relevantní ustanovení — vše s citacemi',
    owner: 'Karel',
    highlighted: true,
  },
  {
    faze: 'Phase 2',
    deliverable: 'Q&A Agent',
    format: 'API endpoint / chat interface',
    acceptanceCriteria: 'Odpovídá na DD dotazy z nalezených dokumentů, confidence score, citace zdroje, „nevím" pokud nenajde',
    owner: 'Karel',
    highlighted: false,
  },
  {
    faze: 'Phase 3',
    deliverable: 'Activity Dashboard',
    format: 'React web app / HTML',
    acceptanceCriteria: 'Kdo přistupoval, jak dlouho, co nečetl, gap analysis — vizuální přehled',
    owner: 'Karel',
    highlighted: false,
  },
  {
    faze: 'Phase 4',
    deliverable: 'EU-compliant deployment',
    format: 'Vertex AI (Frankfurt)',
    acceptanceCriteria: 'Data residency EU, DPA podepsána, security audit dokumentace',
    owner: 'Karel',
    highlighted: false,
  },
];

// ─── SECTION 11: GO/NO-GO RECOMMENDATION ─────────────────────────────────────

export const goNogo = {
  recommendation: 'GO',
  pro: [
    'Gateway k 5–8.4M CZK full transformation',
    'Zrůst dal plný mandát, budget nebyl diskutován jako překážka',
    'Technicky zvládnutelné — RAG + document processing je naše kompetence',
    'PFF team AI-enthusiastic — náš work přímo impresuje kupujícího',
    'Reference klient: multi-miliardový RE developer',
    'Reusable template pro budoucí M&A projekty',
  ],
  contra: [
    '8denní deadline je aggressive, neúplné dokumenty (62% chybí)',
    'Žádné NDA/DPA = nulová právní ochrana',
    'Karel = single point of failure na technické straně',
    'Halucinační riziko v legal DD je existenční',
    'Scope creep téměř jistý přes 3–6 měsíců DD',
    'Paralelní běh s Discovery workshopy (kapacita)',
  ],
  goConditions: [
    {
      number: 1,
      title: 'Scope Phase 1 striktně ohraničit',
      text: 'Pouze existující dokumenty (52 souborů). Nové dokumenty dodané po 3. dubnu = Phase 1.5, fakturováno zvlášť.',
    },
    {
      number: 2,
      title: 'NDA/DPA eskalace',
      text: 'Vašek formálně požádá Johanna/Zrůsta o podpis PŘED zahájením práce s dokumenty. Pokud nepřijde do 1. dubna, dokumentujeme rozhodnutí a risk acceptance.',
    },
    {
      number: 3,
      title: 'Anti-hallucination = non-negotiable',
      text: 'Žádný AI výstup neopustí naše ruce bez lidské kontroly. Žádná sumarizace bez citací. Žádná odpověď na dotaz bez confidence score.',
    },
    {
      number: 4,
      title: 'Jira tracking od dne 0',
      text: 'Všechny hodiny logované v projektu PAT, oddělený track DD Agent vs. Discovery.',
    },
  ],
};

// ─── SECTION 12: NEXT STEPS ───────────────────────────────────────────────────

export interface NextStepRow {
  number: number;
  akce: string;
  owner: string;
  deadline: string;
  isKeyDeadline?: boolean;
}

export const nextSteps: NextStepRow[] = [
  {
    number: 1,
    akce: 'Odeslat CZ platform analýzu + scoping report Vaškovi',
    owner: 'Karel',
    deadline: '30. 3. (dnes)',
  },
  {
    number: 2,
    akce: 'Nastavit DD Agent jako separátní track v Jira (projekt PAT)',
    owner: 'Karel / Vašek',
    deadline: '31. 3.',
  },
  {
    number: 3,
    akce: 'Klient potvrdí platformu (Google Drive)',
    owner: 'Zrůst / Dvořák',
    deadline: '31. 3.',
  },
  {
    number: 4,
    akce: 'Klient pošle chybějící dokumenty (Financials, Permitting, Business Plan)',
    owner: 'Zrůst / Johanna',
    deadline: 'Před 3. 4.',
  },
  {
    number: 5,
    akce: 'Vašek eskaluje NDA/DPA signing',
    owner: 'Vašek',
    deadline: '1. 4.',
  },
  {
    number: 6,
    akce: 'Setup Google Drive structure + Claude API projekt',
    owner: 'Karel',
    deadline: '31. 3. – 1. 4.',
  },
  {
    number: 7,
    akce: 'OCR 163p rámcové smlouvy',
    owner: 'Karel',
    deadline: '1. 4.',
  },
  {
    number: 8,
    akce: 'Draft sumarizace → review se Zrůstem/Dvořákem',
    owner: 'Karel + Dvořák',
    deadline: '3.–4. 4.',
  },
  {
    number: 9,
    akce: 'Phase 1 LIVE — kupující získá přístup',
    owner: 'Team',
    deadline: '7. 4.',
    isKeyDeadline: true,
  },
  {
    number: 10,
    akce: 'Discovery Workshop 1 s Ševčíkem (paralelně)',
    owner: 'Karel + Tomáš',
    deadline: '2. 4.',
  },
];
