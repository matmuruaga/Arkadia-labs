// ─────────────────────────────────────────────────────────────────────────────
// Roatán SEO/SEM Audit — Report Data
// Spanish-only client deliverable. No i18n keys — direct Spanish strings.
// Source: roatan-research.html (Arkadia Labs, Marzo 2026)
// ─────────────────────────────────────────────────────────────────────────────

// ─── TYPES ───────────────────────────────────────────────────────────────────

export type BadgeVariant = 'green' | 'yellow' | 'red' | 'blue';
export type ScoreLevel = 'high' | 'mid' | 'low';
export type PriorityLevel = 'critical' | 'high' | 'medium';
export type DotColor = 'red' | 'yellow' | 'green' | 'blue';
export type ThreatLevel = 'high' | 'medium' | 'low';
export type ContentTag = 'evergreen' | 'seasonal' | 'transactional' | 'cruise';

export interface ReportMeta {
  title: string;
  label: string;
  heading: string;
  headingAccent: string;
  headingRest: string;
  subtitle: string;
  stats: { value: string; label: string }[];
}

export interface StatCard {
  value: string;
  description: string;
  colorClass?: 'accent' | 'gold' | 'blue';
}

export interface ScorecardBadge {
  text: string;
  variant: BadgeVariant;
}

export interface ScorecardRow {
  company: string;
  url: string;
  score: number;
  scoreLevel: ScoreLevel;
  titleTag: ScorecardBadge;
  metaDesc: ScorecardBadge;
  h1: ScorecardBadge;
  bilingual: ScorecardBadge;
  schema: ScorecardBadge;
  blog: ScorecardBadge;
  sitemap: ScorecardBadge;
  speed: ScorecardBadge;
  priority: PriorityLevel;
}

export interface IssueItem {
  text: string;
  dotColor: DotColor;
}

export interface CompanyAnalysis {
  name: string;
  url: string;
  score: number;
  scoreLevel: ScoreLevel;
  tags: ScorecardBadge[];
  criticalIssues: IssueItem[];
  strengths: IssueItem[];
  keywords: IssueItem[];
}

export interface KeywordRow {
  keyword: string;
  volumeWidth: number;
  cpc: string;
  competition?: string;
  currentRanker: string;
  targetCompany: string;
  opportunity: string;
  opportunityLevel: 'alta' | 'media' | 'baja';
}

export interface InformationalKeywordRow {
  keyword: string;
  volumeWidth: number;
  cpc: string;
  dominatedBy: string;
  contentOpportunity: string;
  priority: string;
  priorityLevel: 'alta' | 'media' | 'baja';
}

export interface CampaignKeyword {
  keyword: string;
  cpc: string;
}

export interface Campaign {
  icon: string;
  iconBg: string;
  title: string;
  subtitle: string;
  description: string;
  keywords: CampaignKeyword[];
}

export interface BudgetRow {
  company: string;
  initialBudget: string;
  highSeasonBudget: string;
  campaignType: string;
  biddingStrategy: string;
  kpiTarget: string;
}

export interface Competitor {
  name: string;
  threatLevel: ThreatLevel;
  description: string;
  points: string[];
}

export interface ContentArticle {
  tag: ContentTag;
  title: string;
  description: string;
  volume: string;
  destination: string;
}

export interface SchemaRecommendation {
  title: string;
  schemaType: string;
  properties: string[];
}

export interface TechChecklistRow {
  task: string;
  impact: ScorecardBadge;
  difficulty: ScorecardBadge;
  timeEstimate: string;
  affectedCompanies: string;
}

export interface RoadmapItem {
  number: number;
  text: string;
}

export interface RoadmapPhase {
  label: string;
  phaseNumber: 1 | 2 | 3;
  title: string;
  timeframe: string;
  items: RoadmapItem[];
}

export interface NavSection {
  id: string;
  label: string;
}

// ─── REPORT META ─────────────────────────────────────────────────────────────

export const reportMeta: ReportMeta = {
  title: 'Auditoría SEO/SEM — 7 Empresas Turísticas de Roatán',
  label: 'Arkadia Labs · Informe de Propuesta Comercial · Marzo 2026',
  heading: 'Auditoría ',
  headingAccent: 'SEO/SEM',
  headingRest: ' Integral —\n7 Empresas Turísticas\nde Roatán, Honduras',
  subtitle:
    'Diagnóstico completo de presencia digital, análisis de keywords, estrategia SEM y hoja de ruta de crecimiento para el portafolio turístico de Roatán.',
  stats: [
    { value: '7', label: 'Sitios Auditados' },
    { value: '41/100', label: 'Score Promedio' },
    { value: '2M+', label: 'Visitantes Anuales' },
    { value: '$0.75–$2.50', label: 'CPC Estimado Google Ads' },
    { value: '7.7x', label: 'ROAS Promedio Travel' },
  ],
};

// ─── NAV SECTIONS ────────────────────────────────────────────────────────────

export const navSections: NavSection[] = [
  { id: 'mercado', label: 'Mercado' },
  { id: 'scorecard', label: 'Scorecard' },
  { id: 'empresas', label: 'Análisis por Empresa' },
  { id: 'keywords', label: 'Keywords' },
  { id: 'sem', label: 'Campañas SEM' },
  { id: 'competencia', label: 'Competencia' },
  { id: 'contenido', label: 'Plan de Contenido' },
  { id: 'tecnico', label: 'SEO Técnico' },
  { id: 'roadmap', label: 'Hoja de Ruta' },
];

// ─── MARKET STATS ────────────────────────────────────────────────────────────

export const marketStats: StatCard[] = [
  {
    value: '3.1M',
    description:
      'Visitantes recibió Honduras en 2025, crecimiento del 11.6% vs año anterior',
    colorClass: 'accent',
  },
  {
    value: '2M+',
    description:
      'Cruceristas que pasaron por Roatán en 2025 — destino #1 de cruceros de Centroamérica',
  },
  {
    value: '$180M',
    description: 'Impacto económico anual del turismo de cruceros en Roatán (USD)',
    colorClass: 'gold',
  },
  {
    value: '80%',
    description:
      'De los viajeros reservan de forma independiente online antes de llegar',
    colorClass: 'blue',
  },
  {
    value: '52%',
    description: 'De visitantes proviene de EE.UU. — mercado principal anglohablante',
  },
  {
    value: '10–11',
    description:
      'Días de estancia promedio del turista de estadía — el segmento de mayor valor',
    colorClass: 'accent',
  },
  {
    value: '$656',
    description: 'Gasto promedio por visitante en destino (USD)',
  },
  {
    value: '7.71x',
    description:
      'ROAS mediano de la industria travel en Google Ads — entre los más altos de todas las industrias',
    colorClass: 'gold',
  },
];

export const marketCallout = {
  icon: '⚡',
  title: 'El CPС de Roatán es 40–60% más barato que Cancún o Punta Cana',
  text: 'Mientras los destinos caribeños masificados compiten con CPCs de $5–$15 USD, Roatán opera en el rango de $0.75–$2.50. Con un ROAS promedio de la industria de 7.71x, cada $1,000 invertidos en Google Ads puede generar $7,710 en reservas. Ninguna de las 7 empresas tiene campañas activas detectables.',
};

export const marketHighlight =
  '<strong>Temporadas clave:</strong> Temporada alta noviembre–abril (clima seco, pico de cruceros). Temporada baja septiembre–noviembre (ciclones). Las búsquedas en Google para viajes a Roatán alcanzan su pico en <strong>octubre–enero</strong>, cuando los viajeros americanos planifican escapadas invernales. Los presupuestos SEM deben escalar 50–100% durante este período.';

// ─── SCORECARD DATA ───────────────────────────────────────────────────────────

export const scorecardData: ScorecardRow[] = [
  {
    company: 'Roatán Ferry',
    url: 'roatanferry.com',
    score: 62,
    scoreLevel: 'high',
    titleTag: { text: '✓ Bueno', variant: 'green' },
    metaDesc: { text: '✓ Presente', variant: 'green' },
    h1: { text: 'Débil', variant: 'yellow' },
    bilingual: { text: 'ES/EN', variant: 'green' },
    schema: { text: '✗ Ausente', variant: 'red' },
    blog: { text: '✗ No', variant: 'red' },
    sitemap: { text: 'Parcial', variant: 'yellow' },
    speed: { text: 'Buena', variant: 'green' },
    priority: 'medium',
  },
  {
    company: 'CM Airlines',
    url: 'cmairlines.com',
    score: 58,
    scoreLevel: 'mid',
    titleTag: { text: 'Parcial', variant: 'yellow' },
    metaDesc: { text: 'Parcial', variant: 'yellow' },
    h1: { text: '✓ Sí', variant: 'green' },
    bilingual: { text: 'Irregular', variant: 'yellow' },
    schema: { text: '✗ Ausente', variant: 'red' },
    blog: { text: '✗ No', variant: 'red' },
    sitemap: { text: '✗ No', variant: 'red' },
    speed: { text: 'Buena', variant: 'green' },
    priority: 'medium',
  },
  {
    company: 'Turquoise Bay Resort',
    url: 'turquoisebayresort.com',
    score: 55,
    scoreLevel: 'mid',
    titleTag: { text: '✓ Presente', variant: 'green' },
    metaDesc: { text: 'Parcial', variant: 'yellow' },
    h1: { text: '9 H1 tags ✗', variant: 'red' },
    bilingual: { text: 'Roto', variant: 'yellow' },
    schema: { text: '✗ Ausente', variant: 'red' },
    blog: { text: '✗ No', variant: 'red' },
    sitemap: { text: '✗ No', variant: 'red' },
    speed: { text: 'Media', variant: 'yellow' },
    priority: 'high',
  },
  {
    company: 'Mayan Princess',
    url: 'v2.mayanprincess.com / mayanprincess.com',
    score: 52,
    scoreLevel: 'mid',
    titleTag: { text: 'Sin keywords', variant: 'red' },
    metaDesc: { text: '✗ Ausente', variant: 'red' },
    h1: { text: '2 H1 tags ✗', variant: 'red' },
    bilingual: { text: 'ES/EN', variant: 'green' },
    schema: { text: '✗ Ausente', variant: 'red' },
    blog: { text: '✗ No', variant: 'red' },
    sitemap: { text: '✗ No', variant: 'red' },
    speed: { text: 'Media', variant: 'yellow' },
    priority: 'high',
  },
  {
    company: 'Roatán Excursions',
    url: 'roatanexcursions.com',
    score: 45,
    scoreLevel: 'mid',
    titleTag: { text: '✓ Keywords', variant: 'green' },
    metaDesc: { text: 'Parcial', variant: 'yellow' },
    h1: { text: '✓ Único', variant: 'green' },
    bilingual: { text: 'Solo EN', variant: 'red' },
    schema: { text: '✗ Ausente', variant: 'red' },
    blog: { text: '✗ No', variant: 'red' },
    sitemap: { text: 'Parcial', variant: 'yellow' },
    speed: { text: 'Media', variant: 'yellow' },
    priority: 'high',
  },
  {
    company: 'Mayan Adventures',
    url: 'mayanadventures.com',
    score: 30,
    scoreLevel: 'low',
    titleTag: { text: 'Básico', variant: 'yellow' },
    metaDesc: { text: '✗ Ausente', variant: 'red' },
    h1: { text: '5 H1 tags ✗', variant: 'red' },
    bilingual: { text: 'Solo EN', variant: 'red' },
    schema: { text: '✗ Ausente', variant: 'red' },
    blog: { text: '✗ No', variant: 'red' },
    sitemap: { text: '✗ No', variant: 'red' },
    speed: { text: 'Lenta', variant: 'red' },
    priority: 'critical',
  },
  {
    company: 'Acqua Di Mare Resort',
    url: 'acquadimareresort.com',
    score: 28,
    scoreLevel: 'low',
    titleTag: { text: 'Mezcla idiomas', variant: 'yellow' },
    metaDesc: { text: '✗ Ausente', variant: 'red' },
    h1: { text: 'Múltiples ✗', variant: 'red' },
    bilingual: { text: 'Solo ES', variant: 'red' },
    schema: { text: '✗ Ausente', variant: 'red' },
    blog: { text: '✗ No', variant: 'red' },
    sitemap: { text: 'Wix auto', variant: 'yellow' },
    speed: { text: 'Lenta (Wix)', variant: 'red' },
    priority: 'critical',
  },
];

export const scorecardHighlight =
  '<strong>Hallazgo universal:</strong> Los 7 sitios comparten 3 deficiencias críticas sin excepción: (1) <strong>cero implementación de schema markup</strong>, eliminando cualquier posibilidad de rich snippets en Google; (2) <strong>ausencia total de blog o estrategia de contenido</strong>, cediendo todo el tráfico informacional a blogs independientes y OTAs; (3) <strong>ningún sitio tiene campañas activas de Google Ads detectables</strong>, pese a CPCs 40–60% más baratos que destinos competidores.';

// ─── COMPANY ANALYSIS ────────────────────────────────────────────────────────

export const companies: CompanyAnalysis[] = [
  {
    name: 'Mayan Princess Beach & Dive Resort',
    url: 'v2.mayanprincess.com · mayanprincess.com',
    score: 52,
    scoreLevel: 'mid',
    tags: [
      { text: 'All-Inclusive', variant: 'yellow' },
      { text: 'West Bay Beach', variant: 'green' },
      { text: 'PADI Diving', variant: 'blue' },
      { text: 'Dominio duplicado', variant: 'red' },
    ],
    criticalIssues: [
      {
        text: 'Dominio dividido entre <code>v2.mayanprincess.com</code> y <code>mayanprincess.com</code> sin 301 redirects — divide autoridad y genera contenido duplicado',
        dotColor: 'red',
      },
      {
        text: 'Title tag homepage: <em>"Wake up in Roatan, stay for the memories"</em> — sin keywords SEO (resort, all inclusive, dive, hotel, Honduras)',
        dotColor: 'red',
      },
      {
        text: 'Error de marca crítico: "Mayans Princess" (con S) en texto del sitio — afecta búsquedas de marca',
        dotColor: 'red',
      },
      {
        text: '2 H1 tags en homepage: ninguno con keywords transaccionales',
        dotColor: 'red',
      },
      {
        text: 'Sin meta description en homepage — Google auto-genera snippets genéricos',
        dotColor: 'red',
      },
      {
        text: 'Sin robots.txt, sin sitemap.xml en ninguno de los dos dominios',
        dotColor: 'red',
      },
      {
        text: 'Sin schema markup Hotel, LodgingBusiness ni AggregateRating',
        dotColor: 'red',
      },
      {
        text: 'Countdown "HOT SUMMER SALE" expirado visible en 0:0:0',
        dotColor: 'yellow',
      },
      {
        text: 'Video en hero sin lazy load ni poster — mata el LCP (Largest Contentful Paint)',
        dotColor: 'yellow',
      },
      {
        text: 'URL con typo permanente: <code>/accomodations</code> (falta una "m")',
        dotColor: 'yellow',
      },
    ],
    strengths: [
      {
        text: '1,748 reseñas en TripAdvisor — Travelers\' Choice. Base sólida para schema AggregateRating',
        dotColor: 'green',
      },
      {
        text: 'Bilingüe ES/EN con subdirectorios funcionales',
        dotColor: 'green',
      },
      {
        text: 'Estructura de páginas ricas: Diving, Weddings, Kids Club, Spa, múltiples restaurantes',
        dotColor: 'green',
      },
      {
        text: 'Paquetes all-inclusive con precios visibles — activo para Google Hotel Ads',
        dotColor: 'green',
      },
    ],
    keywords: [
      {
        text: '"all inclusive resort Roatan Honduras" · "Roatan beach resort" · "West Bay Beach hotel"',
        dotColor: 'blue',
      },
      {
        text: '"Roatan diving resort PADI" · "honeymoon Roatan" · "Roatan family all inclusive"',
        dotColor: 'blue',
      },
    ],
  },
  {
    name: 'Acqua Di Mare Resort',
    url: 'acquadimareresort.com',
    score: 28,
    scoreLevel: 'low',
    tags: [
      { text: 'Luxury / Condos', variant: 'blue' },
      { text: 'WorldHotels™', variant: 'yellow' },
      { text: 'Wix · Lento', variant: 'red' },
      { text: 'Solo ES', variant: 'red' },
    ],
    criticalIssues: [
      {
        text: 'Construido en <strong>Wix</strong> — limitaciones severas de velocidad, control técnico SEO y crawlability',
        dotColor: 'red',
      },
      {
        text: 'Sin versión EN — mercado americano (52% de visitantes) completamente excluido',
        dotColor: 'red',
      },
      {
        text: 'URLs Wix ilegibles: <code>/general-6</code> (Condos), <code>/services-7</code> (Packages) — sin keywords',
        dotColor: 'red',
      },
      {
        text: '~80% de imágenes sin alt text o con créditos de foto stock como alt ("Image by Jesse van Vliet")',
        dotColor: 'red',
      },
      {
        text: 'Botón BOOK NOW roto con XML visible en código',
        dotColor: 'red',
      },
      {
        text: 'Múltiples H1 en homepage, ninguno optimizado',
        dotColor: 'red',
      },
      {
        text: 'Typo en contenido: "coktails" en lugar de "cocktails"',
        dotColor: 'red',
      },
      {
        text: 'Sin página About Us, FAQ ni testimonials — sin trust signals',
        dotColor: 'yellow',
      },
      {
        text: 'Membresía WorldHotels™ (credencial de lujo valiosa) no mencionada en el sitio',
        dotColor: 'yellow',
      },
    ],
    strengths: [
      {
        text: 'Nicho diferenciado: condos de lujo vs resort estándar — menor competencia directa',
        dotColor: 'green',
      },
      {
        text: 'Title tag incluye ubicación exacta (Kai Linda Way, West Bay) — señal local',
        dotColor: 'green',
      },
      {
        text: '8.2/10 en Hotels.com (30 reseñas) — reputación positiva para escalar',
        dotColor: 'green',
      },
    ],
    keywords: [
      {
        text: '"luxury condo Roatan" · "vacation rental West Bay Roatan" · "resort condo Honduras Caribbean"',
        dotColor: 'blue',
      },
    ],
  },
  {
    name: 'Turquoise Bay Dive & Beach Resort',
    url: 'turquoisebayresort.com',
    score: 55,
    scoreLevel: 'mid',
    tags: [
      { text: 'Diving', variant: 'blue' },
      { text: 'East Side Roatán', variant: 'green' },
      { text: 'Bilingüe roto', variant: 'yellow' },
      { text: '9 H1 tags', variant: 'red' },
    ],
    criticalIssues: [
      {
        text: '<strong>9 H1 tags</strong> en homepage — el peor caso de todos los sitios. Google no puede determinar el tema principal',
        dotColor: 'red',
      },
      {
        text: 'Versión ES con title tags <em>en inglés</em> sin traducir ("Roatan Weddings", "Scuba Diving Courses")',
        dotColor: 'red',
      },
      {
        text: 'Mezcla de idiomas en ambas versiones: headings en español en páginas inglesas y viceversa',
        dotColor: 'red',
      },
      {
        text: 'Countdown "HOT SUMMER SALE" expirado aparece en TODAS las páginas incluyendo <code>/accommodations/</code>',
        dotColor: 'red',
      },
      {
        text: 'URL con ID MongoDB: <code>/packages/6344b1f38e10c89f14760b20/</code> — inaceptable para SEO',
        dotColor: 'red',
      },
      {
        text: 'Typo en alt text: "Turuoise" en múltiples imágenes',
        dotColor: 'red',
      },
      {
        text: 'Enlace "Leave a review" apunta a tripadvisor.es en lugar de tripadvisor.com',
        dotColor: 'red',
      },
      {
        text: 'Sin hreflang tags pese a implementación EN/ES',
        dotColor: 'red',
      },
    ],
    strengths: [
      {
        text: 'Title tag posicionado: "Roatan\'s Best Dive Value" — keyword de buceo directo',
        dotColor: 'green',
      },
      {
        text: '1,021 reseñas TripAdvisor · 36K seguidores Instagram · Travelers\' Choice',
        dotColor: 'green',
      },
      {
        text: 'Estructura granular: páginas separadas para diving courses, recreational diving, dive shop',
        dotColor: 'green',
      },
      {
        text: 'Página FAQ presente — captura long-tail conversacional',
        dotColor: 'green',
      },
    ],
    keywords: [
      {
        text: '"dive resort Roatan" · "Roatan scuba diving packages" · "East Roatan resort" · "Roatan PADI courses"',
        dotColor: 'blue',
      },
    ],
  },
  {
    name: 'CM Airlines',
    url: 'cmairlines.com',
    score: 58,
    scoreLevel: 'mid',
    tags: [
      { text: 'Aerolínea Regional', variant: 'blue' },
      { text: 'Next.js', variant: 'green' },
      { text: 'Rutas Honduras+', variant: 'yellow' },
      { text: 'Sin ranking orgánico', variant: 'red' },
    ],
    criticalIssues: [
      {
        text: 'Cero visibilidad para keywords de rutas — no aparece en top 10 para "flights to Roatan Honduras" ni "vuelos a Roatán"',
        dotColor: 'red',
      },
      {
        text: 'Title tags exponen slugs internos: <em>"Roatan-en - CM Airlines"</em>, <em>"our-fleet - CM Airlines"</em>',
        dotColor: 'red',
      },
      {
        text: 'URLs mezclan español e inglés: <code>/equipaje-en</code>, <code>/cargo-en</code> — estructura no estándar',
        dotColor: 'red',
      },
      {
        text: 'Motor de reservas externo (<code>fo-latam.ttinteractive.com</code>) — todo el funnel de booking sale del dominio',
        dotColor: 'red',
      },
      {
        text: 'Sin schema Airline ni Flight — no aparece en Google Flights Knowledge Panel',
        dotColor: 'red',
      },
      {
        text: 'Sin robots.txt, sin sitemap.xml',
        dotColor: 'red',
      },
      {
        text: 'Copyright dice "© 2023" — señal de contenido desactualizado',
        dotColor: 'yellow',
      },
    ],
    strengths: [
      {
        text: 'Built on Next.js — mejor rendimiento técnico base que Wix',
        dotColor: 'green',
      },
      {
        text: 'Páginas de destino por ciudad con contenido de hotel y actividades — base sólida',
        dotColor: 'green',
      },
      {
        text: 'Rutas exclusivas: Guanaja, Puerto Lempira, La Ceiba — sin competencia directa en esos segmentos',
        dotColor: 'green',
      },
      {
        text: 'Código descuento WEB visible — potencial de branded searches',
        dotColor: 'green',
      },
    ],
    keywords: [
      {
        text: '"vuelos Tegucigalpa Roatán" · "flights Tegucigalpa to Roatan" · "cheap flights to Roatan from Honduras"',
        dotColor: 'blue',
      },
      {
        text: '"flights to Guanaja Honduras" · "vuelos San Pedro Sula Islas de la Bahía"',
        dotColor: 'blue',
      },
    ],
  },
  {
    name: 'Roatán Ferry — Galaxy Wave',
    url: 'roatanferry.com',
    score: 62,
    scoreLevel: 'high',
    tags: [
      { text: 'Mejor del grupo', variant: 'green' },
      { text: 'Ferry La Ceiba↔Roatán', variant: 'blue' },
      { text: 'App Móvil', variant: 'yellow' },
    ],
    criticalIssues: [
      {
        text: 'H1 homepage genérico: <em>"Where Your Journey Begins"</em> — desaprovecha el elemento más importante para SEO',
        dotColor: 'red',
      },
      {
        text: 'No ranquea para "how to get to Roatan Honduras" — keyword informacional de alto volumen dominado por blogs',
        dotColor: 'red',
      },
      {
        text: 'Motor de reservas en subdominio SPA (<code>obe.roatanferry.com</code>) — no indexable por Google',
        dotColor: 'red',
      },
      {
        text: 'Sin schema TransportationService ni Schedule',
        dotColor: 'red',
      },
      {
        text: 'Páginas de destino son thin content — oportunidad perdida de autoridad temática',
        dotColor: 'red',
      },
      {
        text: 'Textos en español aparecen en versión inglesa del schedule',
        dotColor: 'yellow',
      },
      {
        text: 'Intermediarios (DirectFerries, Bookaway) capturan tráfico y cobran comisiones',
        dotColor: 'yellow',
      },
    ],
    strengths: [
      {
        text: 'Title tags keyword-rich en páginas internas — el mejor del grupo',
        dotColor: 'green',
      },
      {
        text: 'Arquitectura de contenido más completa: destinos, hoteles, atracciones, transporte, FAQ',
        dotColor: 'green',
      },
      {
        text: 'App móvil propia (App Store + Google Play) — señal de marca y backlinks',
        dotColor: 'green',
      },
      {
        text: 'Travel Agent Portal — canal B2B con autoridad',
        dotColor: 'green',
      },
    ],
    keywords: [
      {
        text: '"how to get to Roatan" · "ferry La Ceiba Roatan" · "Roatan ferry schedule" · "ferry vs flight Roatan"',
        dotColor: 'blue',
      },
    ],
  },
  {
    name: 'Mayan Adventures',
    url: 'mayanadventures.com',
    score: 30,
    scoreLevel: 'low',
    tags: [
      { text: 'Casi invisible', variant: 'red' },
      { text: 'Tours / Excursiones', variant: 'yellow' },
      { text: '3 páginas indexadas', variant: 'red' },
      { text: 'Copyright 2021', variant: 'red' },
    ],
    criticalIssues: [
      {
        text: 'Google solo indexa ~3 páginas — SPA Next.js probablemente impide indexación correcta del catálogo',
        dotColor: 'red',
      },
      {
        text: '5 H1 tags en homepage incluyendo "Roatan" (una sola palabra como H1)',
        dotColor: 'red',
      },
      {
        text: 'URL con typo permanente: <code>/turquoise-bay-all-incluisve</code> ("incluisve" en lugar de "inclusive")',
        dotColor: 'red',
      },
      {
        text: 'Sin versión ES — mercado hispanohablante completamente ignorado',
        dotColor: 'red',
      },
      {
        text: 'Copyright footer "© 2021" — señal de abandono para Google',
        dotColor: 'red',
      },
      {
        text: 'Catálogo de tours limitado a day passes de resorts — falta zip line, monos/perezosos, diving',
        dotColor: 'red',
      },
      {
        text: 'Sin precios visibles, sin sistema de booking evidente',
        dotColor: 'red',
      },
    ],
    strengths: [],
    keywords: [
      {
        text: '"Roatan cruise excursions" · "Roatan day pass resort" · "excursiones Roatán crucero"',
        dotColor: 'blue',
      },
    ],
  },
  {
    name: 'Roatán Excursions',
    url: 'roatanexcursions.com',
    score: 45,
    scoreLevel: 'mid',
    tags: [
      { text: 'Exact-match domain', variant: 'green' },
      { text: '20+ Tours', variant: 'blue' },
      { text: 'Precios visibles', variant: 'green' },
      { text: 'Solo EN', variant: 'red' },
    ],
    criticalIssues: [
      {
        text: 'Sin versión ES — cero captura de mercado latinoamericano (cruceristas + turistas hispanohablantes)',
        dotColor: 'red',
      },
      {
        text: 'Sin schema Tour, TourOperator ni AggregateRating — no aparece en Google Shopping ni rich results',
        dotColor: 'red',
      },
      {
        text: 'URLs con mayúsculas y español mezclado: <code>/tour/Explorando-Cayos-Cochinos/</code>',
        dotColor: 'red',
      },
      {
        text: 'Email de contacto referencia <code>tours@mayanprincess.com</code> — revela relación corporativa no declarada',
        dotColor: 'red',
      },
      {
        text: 'Sin blog — keywords "best snorkeling Roatan", "Roatan zip line guide" no capturados',
        dotColor: 'red',
      },
    ],
    strengths: [
      {
        text: 'Exact-match domain — ventaja SEO natural para "Roatan excursions"',
        dotColor: 'green',
      },
      {
        text: '20+ tipos de actividades con precios ($25–$600) y carrito de compras',
        dotColor: 'green',
      },
      {
        text: 'Página dedicada para cruceristas — segmentación correcta',
        dotColor: 'green',
      },
      {
        text: 'Código descuento activo "1STBOOKING" — señal de negocio activo',
        dotColor: 'green',
      },
    ],
    keywords: [
      {
        text: '"Roatan excursions cruise ship" · "things to do in Roatan" · "Roatan snorkeling tour" · "excursiones Roatán"',
        dotColor: 'blue',
      },
    ],
  },
];

// ─── TRANSACTIONAL KEYWORDS ───────────────────────────────────────────────────

export const transactionalKeywords: KeywordRow[] = [
  {
    keyword: 'Roatan all inclusive resort',
    volumeWidth: 80,
    cpc: '$2.50–$4.00',
    competition: '★★★★☆',
    currentRanker: 'Booking, Expedia, TripAdvisor',
    targetCompany: 'Mayan Princess',
    opportunity: 'MUY ALTA',
    opportunityLevel: 'alta',
  },
  {
    keyword: 'Roatan beach resort',
    volumeWidth: 72,
    cpc: '$1.80–$3.50',
    competition: '★★★★☆',
    currentRanker: 'OTAs + Infinity Bay, Kimpton',
    targetCompany: 'Mayan Princess · Turquoise Bay',
    opportunity: 'ALTA',
    opportunityLevel: 'alta',
  },
  {
    keyword: 'hotels West Bay Roatan',
    volumeWidth: 60,
    cpc: '$1.50–$3.50',
    competition: '★★★☆☆',
    currentRanker: 'OTAs',
    targetCompany: 'Mayan Princess · Acqua Di Mare',
    opportunity: 'ALTA',
    opportunityLevel: 'alta',
  },
  {
    keyword: 'dive resort Roatan Honduras',
    volumeWidth: 55,
    cpc: '$1.00–$2.00',
    competition: '★★★☆☆',
    currentRanker: 'CoCo View, Anthony\'s Key',
    targetCompany: 'Turquoise Bay · Mayan Princess',
    opportunity: 'ALTA',
    opportunityLevel: 'alta',
  },
  {
    keyword: 'Roatan vacation packages',
    volumeWidth: 65,
    cpc: '$2.00–$3.50',
    competition: '★★★☆☆',
    currentRanker: 'OTAs',
    targetCompany: 'Todos los resorts',
    opportunity: 'ALTA',
    opportunityLevel: 'alta',
  },
  {
    keyword: 'Roatan cruise excursions',
    volumeWidth: 75,
    cpc: '$0.80–$2.00',
    competition: '★★★☆☆',
    currentRanker: 'Bodden Tours, Viator',
    targetCompany: 'Roatán Excursions · Mayan Adventures',
    opportunity: 'MUY ALTA',
    opportunityLevel: 'alta',
  },
  {
    keyword: 'flights to Roatan Honduras',
    volumeWidth: 68,
    cpc: '$1.20–$2.50',
    competition: '★★★★☆',
    currentRanker: 'Expedia, KAYAK, Google Flights',
    targetCompany: 'CM Airlines',
    opportunity: 'CRÍTICA',
    opportunityLevel: 'alta',
  },
  {
    keyword: 'ferry La Ceiba Roatan',
    volumeWidth: 45,
    cpc: '$0.30–$0.60',
    competition: '★★☆☆☆',
    currentRanker: 'Roatán Ferry #1 ✓',
    targetCompany: 'Roatán Ferry',
    opportunity: 'CONTROLADA',
    opportunityLevel: 'media',
  },
  {
    keyword: 'Roatan snorkeling tour',
    volumeWidth: 58,
    cpc: '$0.75–$1.50',
    competition: '★★★☆☆',
    currentRanker: 'Viator, GetYourGuide',
    targetCompany: 'Roatán Excursions',
    opportunity: 'ALTA',
    opportunityLevel: 'alta',
  },
  {
    keyword: 'luxury condo Roatan',
    volumeWidth: 35,
    cpc: '$1.50–$3.00',
    competition: '★★☆☆☆',
    currentRanker: 'Portales inmobiliarios',
    targetCompany: 'Acqua Di Mare',
    opportunity: 'ALTA',
    opportunityLevel: 'alta',
  },
];

// ─── INFORMATIONAL KEYWORDS ───────────────────────────────────────────────────

export const informationalKeywords: InformationalKeywordRow[] = [
  {
    keyword: 'things to do in Roatan',
    volumeWidth: 90,
    cpc: '$0.30–$0.80',
    dominatedBy: 'Madison\'s Footsteps, Travel blogs',
    contentOpportunity: 'Guía de actividades + tours → Roatán Excursions',
    priority: 'MUY ALTA',
    priorityLevel: 'alta',
  },
  {
    keyword: 'how to get to Roatan Honduras',
    volumeWidth: 70,
    cpc: '$0.20–$0.50',
    dominatedBy: 'Travel blogs, coconuttreedivers.com',
    contentOpportunity: 'Landing page específica → Roatán Ferry + CM Airlines',
    priority: 'CRÍTICA',
    priorityLevel: 'alta',
  },
  {
    keyword: 'best time to visit Roatan',
    volumeWidth: 65,
    cpc: '$0.15–$0.40',
    dominatedBy: 'Blogs independientes',
    contentOpportunity: 'Artículo de blog → todos los resorts',
    priority: 'ALTA',
    priorityLevel: 'alta',
  },
  {
    keyword: 'is Roatan safe for tourists',
    volumeWidth: 60,
    cpc: '$0.10–$0.30',
    dominatedBy: 'Reddit, Lonely Planet, blogs',
    contentOpportunity: 'Artículo de confianza → resorts + ferry',
    priority: 'ALTA',
    priorityLevel: 'alta',
  },
  {
    keyword: 'West Bay vs West End Roatan',
    volumeWidth: 40,
    cpc: '$0.10–$0.25',
    dominatedBy: 'Blogs (baja competencia)',
    contentOpportunity: 'Artículo comparativo → resorts West Bay',
    priority: 'ALTA',
    priorityLevel: 'alta',
  },
  {
    keyword: 'Roatan honeymoon',
    volumeWidth: 50,
    cpc: '$0.50–$1.50',
    dominatedBy: 'TripAdvisor, blogs',
    contentOpportunity: 'Landing page de bodas + luna de miel → resorts',
    priority: 'ALTA',
    priorityLevel: 'alta',
  },
  {
    keyword: 'ferry vs flight Roatan',
    volumeWidth: 38,
    cpc: '$0.15–$0.35',
    dominatedBy: 'Blogs de viaje',
    contentOpportunity: 'Artículo comparativo → Roatán Ferry + CM Airlines',
    priority: 'ALTA',
    priorityLevel: 'alta',
  },
  {
    keyword: 'vuelos Tegucigalpa Roatán',
    volumeWidth: 48,
    cpc: '$0.40–$1.20',
    dominatedBy: 'Kayak ES, Despegar',
    contentOpportunity: 'Página de ruta específica → CM Airlines (ES)',
    priority: 'CRÍTICA',
    priorityLevel: 'alta',
  },
];

// ─── CAMPAIGNS ────────────────────────────────────────────────────────────────

export const campaigns: Campaign[] = [
  {
    icon: '🏨',
    iconBg: 'ci-hotel',
    title: 'Google Hotel Ads',
    subtitle: 'Mayan Princess · Acqua Di Mare · Turquoise Bay',
    description:
      'Modelo pay-per-stay: solo se paga por reservas efectivas. ROI directo y medible. Requiere integración con Google Hotel Center a través del PMS. Recomendado como primera acción SEM para resorts.',
    keywords: [
      { keyword: '"Roatan all inclusive resort"', cpc: '$2.50–$4.00' },
      { keyword: '"hotels West Bay Roatan"', cpc: '$1.50–$3.50' },
      { keyword: '"dive resort Roatan"', cpc: '$1.00–$2.00' },
      { keyword: '"Roatan vacation package"', cpc: '$2.00–$3.50' },
      { keyword: 'Branded: "Mayan Princess hotel"', cpc: '$0.40–$0.80' },
    ],
  },
  {
    icon: '🔍',
    iconBg: 'ci-search',
    title: 'Search — Resorts',
    subtitle: 'Mayan Princess · Turquoise Bay · Acqua Di Mare',
    description:
      'Campañas de búsqueda para capturar intención alta de reserva. Segmentar por tipo de viajero: familias, buceadores, parejas. Extensiones de precio con tarifas desde $189/noche.',
    keywords: [
      { keyword: '"Roatan Honduras resort book"', cpc: '$1.80–$3.00' },
      { keyword: '"all inclusive Roatan deals"', cpc: '$2.00–$3.50' },
      { keyword: '"Roatan diving packages price"', cpc: '$0.80–$1.80' },
      { keyword: '"Roatan wedding venue"', cpc: '$1.20–$2.50' },
      { keyword: '"Roatan family resort kids"', cpc: '$1.50–$3.00' },
    ],
  },
  {
    icon: '✈️',
    iconBg: 'ci-search',
    title: 'Search — CM Airlines',
    subtitle: 'Campañas ES + EN por ruta',
    description:
      'Campañas separadas por idioma (ES para hondureños, EN para turistas internacionales). Keywords de ruta exacta con bid adjustments por ciudad de origen con vuelos directos.',
    keywords: [
      { keyword: '"vuelos Tegucigalpa Roatán"', cpc: '$0.40–$1.20' },
      { keyword: '"vuelos San Pedro Sula Islas Bahía"', cpc: '$0.35–$1.00' },
      { keyword: '"flights to Roatan Honduras"', cpc: '$1.20–$2.50' },
      { keyword: '"cheap flights Roatan Central America"', cpc: '$0.80–$1.80' },
      { keyword: '"CM Airlines promo" (branded)', cpc: '$0.20–$0.50' },
    ],
  },
  {
    icon: '⛴️',
    iconBg: 'ci-search',
    title: 'Search — Roatán Ferry',
    subtitle: 'Capturar tráfico de intermediarios',
    description:
      'Recuperar tráfico que DirectFerries y Bookaway capturan como intermediarios. Enfoque en viajero independiente que planifica con días de antelación. Extensiones de location.',
    keywords: [
      { keyword: '"ferry La Ceiba Roatan ticket"', cpc: '$0.25–$0.60' },
      { keyword: '"Roatan ferry schedule price"', cpc: '$0.20–$0.50' },
      { keyword: '"how to get to Roatan by boat"', cpc: '$0.15–$0.40' },
      { keyword: '"Galaxy Wave ferry book"', cpc: '$0.15–$0.35' },
      { keyword: '"Roatan ferry vs flight"', cpc: '$0.20–$0.45' },
    ],
  },
  {
    icon: '🤿',
    iconBg: 'ci-search',
    title: 'Search — Tours y Excursiones',
    subtitle: 'Roatán Excursions · Mayan Adventures',
    description:
      'Activar en temporada alta de cruceros (noviembre–abril). Campañas separadas para cruceristas (day trips) vs turistas de estadía. Segmentar por actividad con landing pages específicas.',
    keywords: [
      { keyword: '"Roatan cruise excursions book"', cpc: '$0.90–$2.00' },
      { keyword: '"Roatan snorkeling tour price"', cpc: '$0.75–$1.50' },
      { keyword: '"Roatan zip line tour"', cpc: '$0.60–$1.20' },
      { keyword: '"things to do Roatan cruise port"', cpc: '$0.50–$1.00' },
      { keyword: '"Roatan dolphin encounter"', cpc: '$0.80–$1.50' },
    ],
  },
  {
    icon: '🎯',
    iconBg: 'ci-remark',
    title: 'Remarketing + Display',
    subtitle: 'Todas las empresas',
    description:
      'Ventanas de remarketing de 30/60/90 días alineadas con ciclos de planificación de viajes. Audiencias in-market Google: "Caribbean Vacations", "Beach Vacations", "Scuba Diving". Custom intent desde URLs de Booking.com/Expedia Roatán.',
    keywords: [
      { keyword: 'Display: "Caribbean resort deals"', cpc: '$0.35–$0.60' },
      { keyword: 'Display: "Honduras travel packages"', cpc: '$0.25–$0.50' },
      { keyword: 'Remarketing visitantes 30d', cpc: '$0.40–$0.80' },
      { keyword: 'Competitor audiences (Booking)', cpc: '$0.45–$0.90' },
    ],
  },
];

// ─── BUDGET DATA ──────────────────────────────────────────────────────────────

export const budgetData: BudgetRow[] = [
  {
    company: 'Mayan Princess',
    initialBudget: '$2,500–$3,500',
    highSeasonBudget: '$5,000–$7,000',
    campaignType: 'Google Hotel Ads + Search',
    biddingStrategy: 'Max. Conversions → Target ROAS',
    kpiTarget: 'CPA <$80 / reserva',
  },
  {
    company: 'Turquoise Bay',
    initialBudget: '$2,000–$3,000',
    highSeasonBudget: '$4,000–$6,000',
    campaignType: 'Google Hotel Ads + Search Diving',
    biddingStrategy: 'Max. Clicks → Max. Conversions',
    kpiTarget: 'ROAS > 6x',
  },
  {
    company: 'Acqua Di Mare',
    initialBudget: '$1,500–$2,500',
    highSeasonBudget: '$3,000–$4,500',
    campaignType: 'Search branded + Display lujo',
    biddingStrategy: 'Target Impression Share',
    kpiTarget: 'CTR > 8% branded',
  },
  {
    company: 'CM Airlines',
    initialBudget: '$1,500–$2,500',
    highSeasonBudget: '$2,500–$4,000',
    campaignType: 'Search por ruta (ES + EN)',
    biddingStrategy: 'Max. Conversions',
    kpiTarget: 'CPA <$15 / ticket',
  },
  {
    company: 'Roatán Ferry',
    initialBudget: '$800–$1,500',
    highSeasonBudget: '$1,500–$2,500',
    campaignType: 'Search informacional + branded',
    biddingStrategy: 'Max. Clicks',
    kpiTarget: 'CPA <$5 / ticket',
  },
  {
    company: 'Roatán Excursions',
    initialBudget: '$1,200–$2,000',
    highSeasonBudget: '$3,000–$5,000',
    campaignType: 'Search tours + remarketing',
    biddingStrategy: 'Max. Conversions',
    kpiTarget: 'ROAS > 5x',
  },
  {
    company: 'Mayan Adventures',
    initialBudget: '$800–$1,200',
    highSeasonBudget: '$2,000–$3,500',
    campaignType: 'Search cruceristas (temporal)',
    biddingStrategy: 'Max. Clicks',
    kpiTarget: 'CPA <$25 / reserva',
  },
];

export const budgetHighlight =
  '<strong>Geo-targeting recomendado:</strong> Ciudades con vuelos directos a Roatán — Miami, Houston, Dallas-Fort Worth, Atlanta, Denver, Minneapolis (EE.UU.) + Toronto y Montreal (Canadá). Excluir países de alta latencia/baja conversión. Bid adjustment +30% para Miami y Houston (mercados de mayor volumen). Para CM Airlines, agregar Tegucigalpa, San Pedro Sula, Guatemala City. Para tours/cruceros, considerar geo-targeting a puertos de origen de cruceros (Miami, Fort Lauderdale, New Orleans, Houston).';

// ─── COMPETITORS ─────────────────────────────────────────────────────────────

export const competitors: Competitor[] = [
  {
    name: 'Booking.com / Expedia / Hotels.com',
    threatLevel: 'high',
    description:
      'Las OTAs dominan la primera página de Google para casi todos los keywords de alojamiento en Roatán. Cobran comisiones del 15–20% por cada reserva. El antídoto es invertir en SEO directo + Google Hotel Ads para recuperar reservas propias.',
    points: [
      'Ranking promedio: posiciones 1-3 en todas las SERPs de hoteles',
      'Comisión que capturan: $30–$90 por reserva de resort',
      'Estrategia defensiva: Google Hotel Ads + landing pages con precio garantizado',
    ],
  },
  {
    name: 'Viator / GetYourGuide / TripAdvisor',
    threatLevel: 'high',
    description:
      'Para tours y excursiones, estas plataformas dominan las búsquedas. Cobran 20–30% de comisión. Mayan Adventures y Roatán Excursions deben invertir en SEO de contenido para competir directamente.',
    points: [
      'Viator domina "Roatan snorkeling tour", "Roatan zip line"',
      'TripAdvisor Experiences captura búsquedas de cruceristas',
      'Contrarrestar con blog de actividades + landing pages por actividad',
    ],
  },
  {
    name: 'Infinity Bay Spa & Beach Resort',
    threatLevel: 'high',
    description:
      'Competidor directo de Mayan Princess y Acqua Di Mare en West Bay. Tiene mejor presencia en TripAdvisor (posición más alta) y más reseñas recientes.',
    points: [
      'Keywords en común: "West Bay Beach resort", "Roatan luxury hotel"',
      'Presencia OTA más agresiva que los sitios auditados',
      'Debilidad: tampoco tiene blog ni schema markup',
    ],
  },
  {
    name: 'Kimpton Grand Roatán Resort',
    threatLevel: 'high',
    description:
      'Marca internacional (IHG) con presupuesto de marketing significativo. Domina searches de lujo. Compite directamente con Acqua Di Mare en el segmento premium.',
    points: [
      'Respaldo de cadena internacional: IHG Rewards Program',
      'Aparece en "best luxury resort Roatan"',
      'Debilidad: más caro — oportunidad de posicionamiento valor/precio',
    ],
  },
  {
    name: 'Bodden Tours',
    threatLevel: 'medium',
    description:
      'Operador de tours con >20 años en Roatán. Fuerte presencia en Google para búsquedas de excursiones de cruceros. Principal competidor de Mayan Adventures y Roatán Excursions.',
    points: [
      'Especialidad: perezosos/monos, zip line — tours estrella de la isla',
      'Debilidad: sitio web poco moderno, sin sistema de booking online robusto',
      'Oportunidad: superar en UX y booking experience',
    ],
  },
  {
    name: 'Copa Airlines / American Airlines',
    threatLevel: 'high',
    description:
      'Aerolíneas internacionales que operan vuelos directos a RTB desde Miami, Houston y otros hubs. Presupuestos de marketing infinitamente superiores a CM Airlines.',
    points: [
      'CM Airlines no puede competir en keywords genéricos de vuelos',
      'Estrategia: nicho de rutas domésticas (Tegucigalpa, SPS) y frecuencias',
      'Keywords de ruta específica tienen mucho menor competencia',
    ],
  },
  {
    name: 'CoCo View / Anthony\'s Key Resort',
    threatLevel: 'medium',
    description:
      'Competidores directos de Turquoise Bay en el nicho de dive resorts. Anthony\'s Key es el más conocido internacionalmente y ranquea mejor para búsquedas de buceo.',
    points: [
      'Debilidad común: ninguno tiene blog activo de buceo',
      'Oportunidad: blog de buceo en Roatán como ventaja diferencial',
      "Anthony's Key: fuerte en búsquedas de \"dive resort\" pero sitio lento",
    ],
  },
  {
    name: "Madison's Footsteps / Travel Blogs",
    threatLevel: 'medium',
    description:
      'Blogs de viaje independientes capturan prácticamente todo el tráfico informacional de Roatán. Madison\'s Footsteps tiene 22+ artículos sobre Roatán que dominan las búsquedas informacionales.',
    points: [
      'Dominan: "things to do", "is Roatan safe", "best beaches Roatan"',
      'Estrategia: crear blog propio + partnerships con bloggers para backlinks',
      'Estos sitios son aliados potenciales (colaboraciones pagadas)',
    ],
  },
];

export const competitorHighlight =
  '<strong>Hallazgo estratégico — El ecosistema Milton Bight Holding:</strong> Mayan Princess, Turquoise Bay, Acqua Di Mare, Mayan Adventures y Roatán Excursions pertenecen a la misma corporación. Esta estructura crea una oportunidad única de <strong>cross-linking estratégico</strong> (las 5 propiedades pueden enlazarse entre sí con anchor text optimizado, multiplicando la autoridad de dominio de todas), un <strong>blog corporativo centralizado</strong> que distribuya tráfico a todas las propiedades, y <strong>paquetes integrados</strong> resort + tours que ningún competidor puede replicar.';

// ─── CONTENT PLAN ─────────────────────────────────────────────────────────────

export const contentPlan: ContentArticle[] = [
  {
    tag: 'evergreen',
    title: 'Ultimate Guide to Roatan Honduras (2026)',
    description:
      'Guía central del destino. Captura decenas de keywords long-tail. Sirve como hub de enlace interno para todas las empresas del portafolio.',
    volume: 'Muy alto',
    destination: 'Todos los sitios',
  },
  {
    tag: 'evergreen',
    title: 'Is Roatan Safe for Tourists? The Honest Guide',
    description:
      'Keyword de alto volumen con fuerte intención de conversión. Los viajeros que superan la preocupación de seguridad están muy cerca de reservar.',
    volume: 'Alto',
    destination: 'Resorts',
  },
  {
    tag: 'evergreen',
    title: 'How to Get to Roatan Honduras: Flights, Ferry & All Options',
    description:
      'Oportunidad crítica para Roatán Ferry y CM Airlines. Cero competencia directa de las empresas — dominado por blogs sin interés comercial.',
    volume: 'Alto',
    destination: 'Ferry + CM Airlines',
  },
  {
    tag: 'evergreen',
    title: 'West Bay vs West End Roatan: Which is Better?',
    description:
      'Keyword comparativo de baja competencia. Posiciona a Mayan Princess y Acqua Di Mare como la elección obvia para West Bay.',
    volume: 'Medio',
    destination: 'Mayan Princess · Acqua Di Mare',
  },
  {
    tag: 'evergreen',
    title: 'Complete Guide to Diving in Roatan (Sites, Conditions, Costs)',
    description:
      'Artículo de autoridad para el nicho de buceo. Captura buscadores de "Roatan diving" y los dirige a Turquoise Bay y Mayan Princess.',
    volume: 'Alto',
    destination: 'Turquoise Bay · Mayan Princess',
  },
  {
    tag: 'seasonal',
    title: 'Best Time to Visit Roatan: Month-by-Month Guide',
    description:
      'Artículo estacional que captura búsquedas de planificación. Permite insertar CTAs de reserva para cada temporada con ofertas específicas.',
    volume: 'Alto',
    destination: 'Todos los resorts',
  },
  {
    tag: 'transactional',
    title: 'Roatan All-Inclusive vs. Independent Travel: True Cost Comparison',
    description:
      'Artículo de high intent que dirige al lector a reservar all-inclusive. Mayan Princess puede usarlo como argumento de venta directo.',
    volume: 'Medio-alto',
    destination: 'Mayan Princess',
  },
  {
    tag: 'cruise',
    title: 'Top 15 Things to Do in Roatan from a Cruise Ship (2026)',
    description:
      'Keyword de muy alto volumen para cruceristas. Captura el segmento de 2M visitantes anuales que llegan en crucero y buscan actividades.',
    volume: 'Muy alto',
    destination: 'Roatán Excursions · Mayan Adventures',
  },
  {
    tag: 'transactional',
    title: 'Roatan Honeymoon Guide: Best Resorts & Romantic Activities',
    description:
      'Segmento de alto valor económico. Los viajeros en luna de miel gastan 2-3x más que el turista promedio y tienen poca sensibilidad al precio.',
    volume: 'Medio',
    destination: 'Turquoise Bay · Mayan Princess',
  },
  {
    tag: 'evergreen',
    title: 'Ferry vs Flight to Roatan: Which Should You Choose?',
    description:
      'Artículo comparativo que posiciona Galaxy Wave y CM Airlines como las dos mejores opciones — eliminando a intermediarios y competidores.',
    volume: 'Medio',
    destination: 'Roatán Ferry · CM Airlines',
  },
  {
    tag: 'seasonal',
    title: 'Roatan in November–April: Your High Season Survival Guide',
    description:
      'Contenido estacional que captura búsquedas en el pico de planificación (octubre–enero). Incluye fechas de cruceros, clima y disponibilidad.',
    volume: 'Medio',
    destination: 'Todos los sitios',
  },
  {
    tag: 'cruise',
    title: 'Roatan Excursions for Every Cruise Line: Royal Caribbean, Carnival, Princess',
    description:
      'Landing pages específicas por línea de crucero. Captura búsquedas como "Royal Caribbean Roatan excursions" con alta intención comercial.',
    volume: 'Alto',
    destination: 'Roatán Excursions',
  },
];

export const contentHighlight =
  "<strong>Estrategia de link building:</strong> Cada artículo debe enviarse a Madison's Footsteps, Backpackers Wanderlust, The Travel Aisle y GoProCaribbean como oportunidad de colaboración o guest post. Registrar todas las empresas en: TripAdvisor (perfiles completos), Google Business Profile, Caribbean Journal, Lonely Planet, y Roatan Tourism Bureau. Un enlace desde Caribbean Journal o Travel + Leisure puede valer decenas de enlaces de blogs.";

// ─── SCHEMA RECOMMENDATIONS ───────────────────────────────────────────────────

export const schemaRecommendations: SchemaRecommendation[] = [
  {
    title: 'Mayan Princess + Turquoise Bay + Acqua Di Mare',
    schemaType: 'schema.org/LodgingBusiness + Hotel',
    properties: [
      'name, description, url, telephone',
      'address con addressLocality "West Bay, Roatan"',
      'geo (coordenadas GPS)',
      'starRating (5 stars)',
      'aggregateRating (de TripAdvisor)',
      'amenityFeature: pool, spa, diving, beach',
      'priceRange ($$ / $$$)',
      'checkInTime / checkOutTime',
    ],
  },
  {
    title: 'CM Airlines',
    schemaType: 'schema.org/Airline + Flight',
    properties: [
      'name: "CM Airlines", iataCode: "WR"',
      'Por cada ruta: FlightReservation',
      'departureAirport / arrivalAirport',
      'departureTime / arrivalTime',
      'flightNumber por ruta',
      'price desde + priceCurrency: USD',
    ],
  },
  {
    title: 'Roatán Ferry',
    schemaType: 'schema.org/BusTrip (adaptado a ferry)',
    properties: [
      'provider: "Galaxy Wave Ferry"',
      'departureStation: La Ceiba Terminal',
      'arrivalStation: Roatan Terminal',
      'departureTime: 09:30, 16:30',
      'price + priceCurrency: USD',
      'FAQPage para preguntas de viaje',
    ],
  },
  {
    title: 'Roatán Excursions + Mayan Adventures',
    schemaType: 'schema.org/TouristTrip + Product',
    properties: [
      'name + description por tour',
      'touristType: "Cruise Passenger", "Adventure Seeker"',
      'offers: price + priceCurrency + availability',
      'aggregateRating por tour',
      'duration por actividad',
      'itinerary por excursión',
    ],
  },
  {
    title: 'Todos los sitios — Base',
    schemaType: 'schema.org/Organization + BreadcrumbList',
    properties: [
      'Organization: name, url, logo, sameAs (RRSS)',
      'BreadcrumbList en todas las páginas',
      'WebSite con SearchAction (sitelinks searchbox)',
      'FAQPage en páginas de FAQ',
      'Review / AggregateRating',
    ],
  },
  {
    title: 'Implementación técnica recomendada',
    schemaType: 'JSON-LD en <head> — Estándar Google',
    properties: [
      'JSON-LD incrustado en <script type="application/ld+json">',
      'Validar con: search.google.com/test/rich-results',
      'Evitar Microdata y RDFa (más difíciles de mantener)',
      'Una implementación = rich snippet en 2-4 semanas',
      'Prioridad #1 tras title tags y meta descriptions',
    ],
  },
];

// ─── TECH CHECKLIST ───────────────────────────────────────────────────────────

export const techChecklist: TechChecklistRow[] = [
  {
    task: 'Crear robots.txt con sitemap reference',
    impact: { text: 'Alto', variant: 'blue' },
    difficulty: { text: 'Fácil', variant: 'green' },
    timeEstimate: '1 hora / sitio',
    affectedCompanies: '6 de 7 sitios',
  },
  {
    task: 'Generar sitemap.xml y submeter en Google Search Console',
    impact: { text: 'Alto', variant: 'blue' },
    difficulty: { text: 'Fácil', variant: 'green' },
    timeEstimate: '2 horas / sitio',
    affectedCompanies: 'Todos',
  },
  {
    task: 'Implementar schema markup JSON-LD apropiado',
    impact: { text: 'Crítico', variant: 'red' },
    difficulty: { text: 'Medio', variant: 'yellow' },
    timeEstimate: '1 día / sitio',
    affectedCompanies: 'Todos',
  },
  {
    task: 'Reescribir title tags con keywords primarios',
    impact: { text: 'Crítico', variant: 'red' },
    difficulty: { text: 'Fácil', variant: 'green' },
    timeEstimate: '2 horas / sitio',
    affectedCompanies: 'Todos',
  },
  {
    task: 'Escribir meta descriptions únicas por página',
    impact: { text: 'Alto', variant: 'blue' },
    difficulty: { text: 'Fácil', variant: 'green' },
    timeEstimate: '1 día / sitio',
    affectedCompanies: 'Todos',
  },
  {
    task: 'Implementar hreflang tags correctos EN/ES',
    impact: { text: 'Alto', variant: 'blue' },
    difficulty: { text: 'Medio', variant: 'yellow' },
    timeEstimate: '1 día / sitio',
    affectedCompanies: 'MP, TB, CM, Ferry',
  },
  {
    task: 'Corregir estructura H1 (1 por página, con keyword)',
    impact: { text: 'Crítico', variant: 'red' },
    difficulty: { text: 'Fácil', variant: 'green' },
    timeEstimate: '2 horas / sitio',
    affectedCompanies: 'Todos',
  },
  {
    task: 'Alt text en todas las imágenes con keywords',
    impact: { text: 'Medio', variant: 'yellow' },
    difficulty: { text: 'Fácil', variant: 'green' },
    timeEstimate: '4 horas / sitio',
    affectedCompanies: 'Todos',
  },
  {
    task: 'Resolver dominio dividido Mayan Princess (301 redirects)',
    impact: { text: 'Crítico', variant: 'red' },
    difficulty: { text: 'Técnico', variant: 'blue' },
    timeEstimate: '1 día',
    affectedCompanies: 'Mayan Princess',
  },
  {
    task: 'Migrar Acqua Di Mare de Wix a WordPress/Webflow',
    impact: { text: 'Crítico', variant: 'red' },
    difficulty: { text: 'Alto', variant: 'red' },
    timeEstimate: '2–4 semanas',
    affectedCompanies: 'Acqua Di Mare',
  },
  {
    task: 'Optimizar Core Web Vitals (LCP, CLS, FID)',
    impact: { text: 'Alto', variant: 'blue' },
    difficulty: { text: 'Medio', variant: 'yellow' },
    timeEstimate: '1 semana / sitio',
    affectedCompanies: 'MP, MA, ADM',
  },
  {
    task: 'Eliminar countdown timer expirado del código',
    impact: { text: 'Medio', variant: 'yellow' },
    difficulty: { text: 'Fácil', variant: 'green' },
    timeEstimate: '1 hora',
    affectedCompanies: 'Mayan Princess, TB',
  },
];

// ─── ROADMAP PHASES ───────────────────────────────────────────────────────────

export const roadmapPhases: RoadmapPhase[] = [
  {
    label: 'Fase 1 — Urgente',
    phaseNumber: 1,
    title: 'Fundamentos técnicos',
    timeframe: 'Semanas 1–4 · Todos los sitios',
    items: [
      { number: 1, text: 'Crear robots.txt + sitemap.xml para los 6 sitios que no los tienen' },
      { number: 2, text: 'Corregir title tags de todos los sitios con keywords primarios' },
      { number: 3, text: 'Escribir meta descriptions únicas por página principal' },
      { number: 4, text: 'Corregir estructura H1 — 1 único por página con keyword' },
      { number: 5, text: 'Resolver dominio dividido de Mayan Princess con 301 redirects' },
      { number: 6, text: 'Arreglar botón BOOK NOW roto en Acqua Di Mare' },
      { number: 7, text: 'Eliminar countdowns expirados del código (MP y TB)' },
      { number: 8, text: 'Corregir error de marca "Mayans Princess"' },
      { number: 9, text: 'Verificar y configurar Google Search Console para los 7 sitios' },
      { number: 10, text: 'Activar campañas Google Ads branded (bajo costo, alto retorno inmediato)' },
    ],
  },
  {
    label: 'Fase 2 — Crecimiento',
    phaseNumber: 2,
    title: 'SEO técnico + contenido',
    timeframe: 'Semanas 5–12 · Por prioridad',
    items: [
      { number: 1, text: 'Implementar schema markup JSON-LD en los 7 sitios' },
      { number: 2, text: 'Implementar hreflang tags correctos EN/ES' },
      { number: 3, text: 'Alt text optimizado en todas las imágenes' },
      { number: 4, text: 'Lanzar blog con primeros 4 artículos evergreen' },
      { number: 5, text: 'Crear landing page "How to Get to Roatan" para Ferry + CM Airlines' },
      { number: 6, text: 'Crear páginas de ruta específicas para CM Airlines' },
      { number: 7, text: 'Renombrar URLs de Acqua Di Mare (Wix slugs descriptivos)' },
      { number: 8, text: 'Activar campañas Google Ads Search por categoría' },
      { number: 9, text: 'Configurar Google Hotel Ads para los 3 resorts' },
      { number: 10, text: 'Registrar todas las empresas en TripAdvisor + Google Business Profile' },
    ],
  },
  {
    label: 'Fase 3 — Escala',
    phaseNumber: 3,
    title: 'Autoridad y optimización',
    timeframe: 'Meses 4–6 · Crecimiento compounding',
    items: [
      { number: 1, text: 'Lanzar 8–12 artículos de blog adicionales (long-tail + estacionales)' },
      { number: 2, text: 'Campaña de link building: outreach a 10 travel bloggers de Roatán' },
      { number: 3, text: 'Migrar Acqua Di Mare de Wix a plataforma SEO-friendly' },
      { number: 4, text: 'Activar remarketing audiences y campañas Display' },
      { number: 5, text: 'Optimizar Core Web Vitals de los 3 sitios más lentos' },
      { number: 6, text: 'Activar estrategia de cross-linking entre empresas del portafolio' },
      { number: 7, text: 'Crear landings por línea de crucero para operadores de tours' },
      { number: 8, text: 'Escalar presupuestos SEM para temporada alta (nov–abril)' },
      { number: 9, text: 'Implementar email marketing post-estadía para generar reseñas' },
      { number: 10, text: 'Pitching editorial a Caribbean Journal + Travel & Leisure' },
    ],
  },
];

export const roadmapCallout = {
  icon: '📊',
  title: 'ROI estimado de una implementación completa a 6 meses',
  text: 'Con inversión de ~$15,000–$20,000 (SEO + SEM + contenido) sobre el portafolio completo, las proyecciones conservadoras basadas en ROAS promedio de la industria (7.71x) y el volumen de búsquedas del mercado indican un potencial de <strong>120–180 reservas adicionales por mes</strong> para los resorts, más volumen incremental para ferry, aerolínea y tours. A un ticket promedio de $500–$2,500 por estancia, el retorno mensual proyectado supera los $60,000–$150,000 en reservas directas generadas.',
};
