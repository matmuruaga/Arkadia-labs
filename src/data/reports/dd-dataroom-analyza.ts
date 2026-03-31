/**
 * DD Dataroom AI Agent — Analýza platforem
 * Arkadia Labs | 30. 3. 2026 v2 (revidováno)
 * DD Nový Zeleneč pro Skupinu Progresus
 *
 * All text content is in Czech. HTML strings are used for rich-text fields.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type BadgeVariant = 'red' | 'green' | 'blue' | 'yellow' | 'gray';
export type CardVariant = 'red' | 'green' | 'blue' | 'yellow' | 'gray';

export interface ReportMeta {
  title: string;
  subtitle: string;
  label: string;
}

export interface NavSection {
  id: string;
  label: string;
}

export interface UrgentAlert {
  title: string;
  /** Full rich-text body as HTML paragraphs */
  html: string;
}

export interface InventoryStat {
  value: string;
  label: string;
}

export interface InventoryRow {
  folder: string;
  files: string;
  content: string;
  note: string;
  /** Badge colour variant for the note pill */
  noteVariant?: BadgeVariant;
}

export interface GapRow {
  section: string;
  status: string;
  statusVariant: BadgeVariant;
  missing: string;
  priority: string;
}

export interface Finding {
  title: string;
  html: string;
  variant: CardVariant;
}

export interface ArchitectureSection {
  title: string;
  html: string;
  variant: CardVariant;
}

export interface OcrRow {
  platform: string;
  capabilities: string;
  czechQuality: string;
  /** true = winner (green highlight), false = loser (red highlight) */
  highlight?: 'winner' | 'loser';
}

export interface PlatformComparisonCriterion {
  criterion: string;
  values: {
    text: string;
    highlight?: 'winner' | 'loser';
  }[];
}

export interface ScoringRow {
  /** Variant label, e.g. "A. GDrive + Claude přes Vertex AI" */
  variant: string;
  /** Six individual scores as strings, e.g. ["3/5", "5/5", …] */
  scores: string[];
  total: string;
  highlight?: boolean;
}

export interface Recommendation {
  /** Main gradient-card HTML content */
  mainHtml: string;
  /** EU residency yellow-card HTML content */
  euHtml: string;
}

export interface TimelineRow {
  day: string;
  task: string;
  responsibility: string;
  output: string;
}

export interface CostRow {
  phase: string;
  scope: string;
  hours: string;
  price: string;
  isTotal?: boolean;
}

export interface RoiCard {
  title: string;
  html: string;
  highlight: string;
  variant: CardVariant;
}

export interface BlockerRow {
  blocker: string;
  impact: string;
  owner: string;
  deadline: string;
}

// ---------------------------------------------------------------------------
// Report Meta
// ---------------------------------------------------------------------------

export const reportMeta: ReportMeta = {
  title: 'DD Dataroom AI Agent — Analýza platforem',
  subtitle: 'Arkadia Labs & Able | 30. 3. 2026 | DD Nový Zeleneč pro Skupinu Progresus',
  label: 'DD Dataroom AI Agent — Analýza platforem a porovnání',
};

// ---------------------------------------------------------------------------
// Navigation sections
// ---------------------------------------------------------------------------

export const navSections: NavSection[] = [
  { id: 'inventar', label: '1. Inventář dokumentů' },
  { id: 'gap', label: '2. Gap analýza' },
  { id: 'zjisteni', label: '3. Klíčová zjištění' },
  { id: 'architektura', label: '4. Anti-halucinační architektura' },
  { id: 'ocr', label: '5. OCR výzva' },
  { id: 'platformy', label: '6. Porovnání platforem' },
  { id: 'scoring', label: '7. Scoring matice' },
  { id: 'doporuceni', label: '8. Doporučení' },
  { id: 'plan', label: '9. Implementační plán' },
  { id: 'roi', label: '11. ROI' },
  { id: 'blokery', label: '12. Akční body a blokery' },
];

// ---------------------------------------------------------------------------
// Urgent alert (Claude consumer-version warning)
// ---------------------------------------------------------------------------

export const urgentAlert: UrgentAlert = {
  title: 'Důležité upozornění: Claude ve spotřebitelské verzi',
  html: `
<p>Na hovoru Lukáš zmínil, že osobně používá spotřebitelskou verzi Claude (claude.ai) k analýze DD dokumentů.
<strong>Od září 2025 Anthropic ve výchozím nastavení používá data ze spotřebitelské verze Claude k tréninku svých modelů</strong>
(pokud se uživatel aktivně neodhlásí). To znamená, že obsah M&A dokumentů, které Lukáš do Claude vkládá,
může být součástí trénovacích dat modelu.</p>
<p style="margin-top:8px;">Pro kontext: mluvíme o transakci ve vyšších miliardách korun. Jedno nechtěné sdílení citlivých dat
= potenciální ohrožení celého dealu.</p>
<p style="margin-top:8px;"><strong>Doporučení:</strong> Do doby, než bude připraveno zabezpečené prostředí (API/Vertex),
prosíme Lukáše, aby DD dokumenty do spotřebitelského Claude nevkládal. Případně by si měl ihned ověřit a změnit
nastavení tréninku dat ve svém účtu (Settings → Privacy → Data Usage). Budování bezpečné alternativy je jedním
z hlavních cílů tohoto projektu.</p>
  `.trim(),
};

// ---------------------------------------------------------------------------
// Section 1 — Document inventory
// ---------------------------------------------------------------------------

export const inventoryStats: InventoryStat[] = [
  { value: '52', label: 'Souborů celkem' },
  { value: '454', label: 'Stran (pouze PDF)' },
  { value: '42 MB', label: 'Celková velikost' },
];

export const inventoryIntro =
  'Dva ZIP soubory přijaty od Zrůsta/Johanny. Jedná se o <strong>neúplný dataset</strong> — očekáváme další dokumenty. Aktuální stav:';

export const inventoryRows: InventoryRow[] = [
  {
    folder: 'Corporate Structure, MMA',
    files: '37 (33 PDF + 1 DOCX + 3 podsložky)',
    content:
      'Rámcová smlouva o převodu (163 str.), převody akcií/podílů, rozhodnutí akcionářů, zástavní práva, výpisy z OR',
    note: '163stránková rámcová smlouva je SKEN — potřebuje OCR',
    noteVariant: 'red',
  },
  {
    folder: 'Legal',
    files: '3 PDF',
    content:
      'Spor DANCORE (odpůrčí žaloba), podání k soudu, právní stanovisko (PŘÍSNĚ DŮVĚRNÉ)',
    note: 'Důvěrná právní stanoviska — vysoká citlivost',
    noteVariant: 'yellow',
  },
  {
    folder: 'Funding',
    files: '1 DOCX',
    content:
      'Přehled finančních linek, zástavní práva (CASPER, TARCU 2190), dluhová struktura',
    note: 'Zatím pouze přehledový dokument — chybí zdrojové smlouvy',
  },
  {
    folder: 'Elementary School',
    files: '3 PDF + 1 DOCX',
    content:
      'Architektonická soutěž, vítězný návrh (Studio Perspektiv), cenový odhad',
    note: 'Souvisí s druhým ZIPem (Návrh Studio Perspektiv)',
  },
  {
    folder: 'Kindergarten',
    files: '2 PDF + 1 DOCX',
    content: 'Nájemní smlouva, předávací protokol, kapacitní požadavky',
    note: 'Termíny kolaudace navázány na projektové milníky',
  },
  {
    folder: 'Employment',
    files: '0 (prázdná)',
    content: '—',
    note: 'Prázdná — dokumenty čekáme',
    noteVariant: 'gray',
  },
  {
    folder: 'Business Plan',
    files: '0 (prázdná)',
    content: '—',
    note: 'Prázdná — dokumenty čekáme',
    noteVariant: 'gray',
  },
  {
    folder: 'Návrh Studio Perspektiv',
    files: '3 JPG + 1 PDF',
    content: 'Architektonické panely + sešit vítěze soutěže na ZŠ',
    note: 'Vizuální podklady — 3 velké JPG panely',
  },
];

// ---------------------------------------------------------------------------
// Section 2 — Gap analysis
// ---------------------------------------------------------------------------

export const gapSummary: string =
  `Ze 13 standardních DD sekcí máme <strong>2 relativně kompletní</strong> (Corporate Structure, Občanská vybavenost), ` +
  `<strong>3 částečné</strong> (Legal, Funding, Real Estate) a <strong>8 zcela chybějících</strong>. ` +
  `Pro dataroom, který má být do úterý 7. dubna otevřen kupujícímu, je to kritický deficit. ` +
  `Minimálně sekce Úvod, Permitting a Business Plan by měly být prioritou #1 pro doplnění od klienta.`;

export const gapRows: GapRow[] = [
  {
    section: '00 — Úvod & Proces',
    status: 'Chybí',
    statusVariant: 'red',
    missing:
      'Teaser/IM (Information Memorandum), shrnutí transakce, timeline DD procesu, Q&A pravidla, kontaktní údaje',
    priority: 'Vysoká — první věc, kterou kupující vidí',
  },
  {
    section: '01 — Corporate Structure & MMA',
    status: 'Existuje',
    statusVariant: 'green',
    missing:
      'Relativně kompletní. Chybí: organigram (zmíněn v DOCX, ale není jako obrázek), UBO declaration',
    priority: 'Střední',
  },
  {
    section: '02 — Financials & KPIs',
    status: 'Chybí',
    statusVariant: 'red',
    missing:
      'Historické výkazy (rozvaha, VZZ), cash flow projekce, rozpočet projektu, aktuální bilance, audit reports',
    priority: 'Vysoká',
  },
  {
    section: '03 — Daně',
    status: 'Chybí',
    statusVariant: 'red',
    missing:
      'Daňová přiznání, daňové posudky, DPH režim projektu, transfer pricing dokumentace',
    priority: 'Střední',
  },
  {
    section: '04 — Legal & Klíčové smlouvy',
    status: 'Částečně',
    statusVariant: 'yellow',
    missing:
      'Existuje: spor DANCORE, právní stanovisko. Chybí: seznam všech smluv (contract register), dodavatelské smlouvy, smlouvy s obcí (plánovací smlouva!), pojistné smlouvy',
    priority: 'Vysoká — plánovací smlouva je klíčová',
  },
  {
    section: '05 — Zákazníci & Výnosy',
    status: 'Chybí',
    statusVariant: 'red',
    missing:
      'Přehled prodejů (bytů/domů), rezervační smlouvy, SoSB s kupujícími, pricing strategy, marketing materiály',
    priority: 'Vysoká',
  },
  {
    section: '06 — HR & Zaměstnanci',
    status: 'Chybí',
    statusVariant: 'red',
    missing:
      'Pracovní smlouvy, org. struktura, mzdové náklady, BOZP, klíčoví zaměstnanci',
    priority: 'Střední',
  },
  {
    section: '07 — Funding / Financování',
    status: 'Částečně',
    statusVariant: 'yellow',
    missing:
      'Existuje: přehled (overview DOCX). Chybí: úvěrové smlouvy (CASPER, TARCU), směnky, pay-off kalkulace, zástavní smlouvy (detailní)',
    priority: 'Vysoká',
  },
  {
    section: '08 — Územní plán & Permitting',
    status: 'Chybí',
    statusVariant: 'red',
    missing:
      'Územní plán, územní rozhodnutí, stavební povolení, EIA, plánovací smlouva s obcí, vyjádření DOSS',
    priority: 'Kritická — jádro celého projektu',
  },
  {
    section: '09 — Real Estate & Pozemky',
    status: 'Částečně',
    statusVariant: 'yellow',
    missing:
      'Existuje: převodní smlouvy, výpisy z KN (implicitně). Chybí: geometrické plány, znalecké posudky, věcná břemena (detail), aktuální LV výpisy',
    priority: 'Vysoká',
  },
  {
    section: '10 — Občanská vybavenost (ZŠ, MŠ)',
    status: 'Existuje',
    statusVariant: 'green',
    missing:
      'ZŠ + MŠ overview + soutěžní dokumentace. Relativně kompletní pro tuto fázi.',
    priority: 'Nízká',
  },
  {
    section: '11 — Pojištění',
    status: 'Chybí',
    statusVariant: 'red',
    missing:
      'Pojistné smlouvy (odpovědnost, stavební), přehled pojistného krytí',
    priority: 'Střední',
  },
  {
    section: '12 — Environmental / ESG',
    status: 'Chybí',
    statusVariant: 'red',
    missing:
      'EIA, ekologický audit pozemků, radon, kontaminace, hlukové studie',
    priority: 'Střední',
  },
  {
    section: '13 — Business Plan / Projekce',
    status: 'Chybí',
    statusVariant: 'red',
    missing:
      'Finanční model projektu, fázování výstavby, prodejní plán, harmonogram, sensitivity analýza',
    priority: 'Vysoká — kupující to bude chtít jako první',
  },
];

// ---------------------------------------------------------------------------
// Section 3 — Key findings (4 cards)
// ---------------------------------------------------------------------------

export const findings: Finding[] = [
  {
    title: 'Struktura projektu (z Corporate Overview)',
    html: `<p>Skupina Progresus vstoupila do projektu Nový Zeleneč v roce 2021 a dokončila kompletní ekvitní převzetí 30. 8. 2024. Tři entity v transakčním perimetru:</p>
<p style="margin:8px 0;"><strong>1. Nový Zeleneč a.s.</strong> — hlavní operativní entita (smlouvy, permitting, zaměstnanci, know-how). Vlastní minoritní pozemky.<br>
<strong>2. RD Rýmařov Invest III. alpha s.r.o.</strong> — drží většinu projektových pozemků (LV 927 Mstětice, LV 1326 Zeleneč). Entita skupiny Progresus.<br>
<strong>3. Inženýrské a technické služby Mstětice s.r.o.</strong> — ovládá ČOV prostřednictvím věcného břemene. Zanedbatelný dluh (&lt;1 mil. Kč).</p>`,
    variant: 'green',
  },
  {
    title: 'Klíčové riziko: Spor DANCORE',
    html: `<p>Americká společnost DANCORE má aktivní žalobu proti projektu. Spor byl objeven při původním DD v roce 2021.
Věc je nyní ve fázi dovolání (Nejvyšší soud). Advokátní kancelář BB vypracovala právní stanovisko — označené „PŘÍSNĚ DŮVĚRNÉ".
Bude jedním z hlavních témat DD pro PFF.</p>`,
    variant: 'yellow',
  },
  {
    title: 'Klíčové riziko: Financování / zástavní práva',
    html: `<p>Dva externí věřitelé: <strong>CASPER FINANCING s.r.o.</strong> (zástavní právo k pozemkům + směnka)
a <strong>TARCU 2190 s.r.o.</strong> (25 mil. Kč přímý úvěr + průtok přes Aquaarietis Gama).
Předpoklad transakce: výnosy nejprve splatí tyto věřitele, s pay-off letters a úplným uvolněním zajištění.
Kupující bude chtít čistý titul.</p>`,
    variant: 'yellow',
  },
  {
    title: 'Povinnosti vůči obci',
    html: `<p><strong>Základní škola:</strong> kapacita min. 600 žáků, musí být vybudována a předána obci. Termín: 36 měsíců od zahájení stavby NEBO před kolaudací prvního bytového domu 2. etapy (co nastane dříve). Soutěž vyhrál Studio Perspektiv.<br>
<strong>Mateřská škola:</strong> kapacita 112 dětí, termín 31. 12. 2030 nebo 12 měsíců od kolaudace prvního RD. Aktuálně provozována dočasná dětská skupina v pronajatých prostorách.</p>`,
    variant: 'blue',
  },
];

// ---------------------------------------------------------------------------
// Section 4 — Anti-hallucination architecture (3 cards)
// ---------------------------------------------------------------------------

export const architectureSections: ArchitectureSection[] = [
  {
    title: 'Problém: LLM halucinují — i ty nejlepší',
    html: `<p>Na hovoru Tomáš Johanna (advokát): <em>„Četl jsem, co na to základě — vymýšlí si příšerně."</em>
Toto je reálné riziko. Podle aktuálních benchmarků (Stanford, 2025) i RAG-based právní AI nástroje stále halucinují
ve <strong>17–34 % případů</strong>. Pro DD, kde jedna špatná informace může znehodnotit celý proces,
potřebujeme vícevrstvou ochranu.</p>`,
    variant: 'red',
  },
  {
    title: 'Navrhovaná architektura: 3 vrstvy ochrany',
    html: `<p><strong>Vrstva 1 — Extraktivní sumarizace (Fáze 1, nutná ihned):</strong></p>
<p style="margin:8px 0 16px 16px;">Místo generativní sumarizace (kde model „vymýšlí" shrnutí) použijeme extraktivní přístup: model dostane JEDEN konkrétní
dokument a jeho úkolem je POUZE identifikovat a citovat klíčové body přímo z textu. Žádné křížové reference mezi dokumenty,
žádné „domýšlení" kontextu. Každý výstup musí obsahovat konkrétní citace (strana, odstavec). Tím eliminujeme nejčastější
zdroj halucinací — model nemá prostor si něco vymyslet, protože se odkazuje na konkrétní text.</p>
<p><strong>Vrstva 2 — RAG s přísným groundingem (Fáze 2, pro Q&A agenta):</strong></p>
<p style="margin:8px 0 16px 16px;">Pro Q&A agenta (odpovědi na dotazy kupujícího) bude nutný plnohodnotný RAG pipeline: vektorová databáze
(embeddingy dokumentů), chunking optimalizovaný pro právní texty, retrieval s re-rankingem, a generace odpovědí POUZE
z nalezených fragmentů. Model musí odpovídat jen na základě toho, co reálně najde v dataroomu. Pokud odpověď nenajde,
musí říct „nemám k dispozici dostatek informací" — nikoliv vymyslet odpověď.</p>
<p><strong>Vrstva 3 — Human-in-the-Loop (vždy):</strong></p>
<p style="margin:8px 0 0 16px;">Každý AI výstup projde lidskou kontrolou před sdílením s kupujícím. Toto Lukáš na hovoru potvrdil:
<em>„Všechny výstupy budeme číst, než dáme druhé straně."</em> Nicméně tato vrstva sama o sobě nestačí —
kontrolor musí vědět, ČEMU nevěřit, a proto potřebuje vrstvy 1 a 2 s citacemi a confidence indikátory.</p>`,
    variant: 'blue',
  },
  {
    title: 'Co to znamená pro timeline',
    html: `<p><strong>Fáze 1 (sumarizace složek) nepotřebuje plný RAG.</strong> Extraktivní sumarizace per-document je jednodušší a rychlejší. Ale i tak potřebujeme:</p>
<ul style="margin:8px 0 0 20px; font-size:14px;">
  <li>OCR pipeline pro skenované dokumenty (163p rámcová smlouva)</li>
  <li>Prompt engineering s přísným groundingem a požadavkem na citace</li>
  <li>Výstupní formát s jasným odlišením AI textu vs. přímých citací</li>
  <li>Alespoň 1 kolo revize se Zrůstem/Dvořákem</li>
</ul>
<p style="margin-top:8px;"><strong>Fáze 2 (Q&A Agent) vyžaduje plný RAG.</strong> To znamená: vektorová databáze,
embedding pipeline, chunking strategie, retrieval + re-ranking, generace s groundingem.
Realisticky 3–4 týdny na produkční kvalitu.</p>`,
    variant: 'yellow',
  },
];

// ---------------------------------------------------------------------------
// Section 5 — OCR challenge
// ---------------------------------------------------------------------------

export const ocrRows: OcrRow[] = [
  {
    platform: 'Google Document AI / Vision',
    capabilities: 'Nativní, produkční kvalita',
    czechQuality: 'Výborná podpora češtiny',
    highlight: 'winner',
  },
  {
    platform: 'Azure AI Document Intelligence',
    capabilities: 'Nativní, produkční kvalita',
    czechQuality: 'Dobrá podpora češtiny',
  },
  {
    platform: 'Anthropic Claude (Vision)',
    capabilities: 'Čte naskenovaná PDF nativně přes vision',
    czechQuality: 'Dobrá — ale stránku po stránce, bez dávkového zpracování',
  },
  {
    platform: 'Lokální (Tesseract)',
    capabilities: 'Open-source, vyžaduje ladění',
    czechQuality: 'Český model existuje, ale nižší kvalita',
    highlight: 'loser',
  },
];

export const ocrNote: string =
  'Claude umí číst naskenovaná PDF přímo přes vision — žádný samostatný OCR krok není potřeba. Ale 163 stran po jedné = pomalé a drahé. Pro velké skenované dokumenty je efektivnější nejprve spustit dávkové OCR (Google Document AI) a teprve text předat Claude k analýze.';

// ---------------------------------------------------------------------------
// Section 6 — Platform comparison (4×10 matrix)
// ---------------------------------------------------------------------------

export const platformHeaders: string[] = [
  'A. Google Drive + Claude API přes Vertex',
  'B. Google Drive + Claude API (přímé)',
  'C. SharePoint + Azure OpenAI',
  'D. Lokální (Ollama + úložiště)',
];

export const platformComparison: PlatformComparisonCriterion[] = [
  {
    criterion: 'Čas do Fáze 1 (sumarizace)',
    values: [
      { text: '5–7 dní' },
      { text: '4–6 dní', highlight: 'winner' },
      { text: '7–10 dní' },
      { text: '5–8 dní (ale nižší kvalita)' },
    ],
  },
  {
    criterion: 'Čas do Fáze 2 (Q&A RAG)',
    values: [
      { text: '3–4 týdny' },
      { text: '3–4 týdny' },
      { text: '4–5 týdnů' },
      { text: '6–8 týdnů (+ nízká kvalita)', highlight: 'loser' },
    ],
  },
  {
    criterion: 'EU rezidence dat',
    values: [
      { text: 'Ano — europe-west3 (Frankfurt)', highlight: 'winner' },
      { text: 'Ne — pouze US/global' },
      { text: 'Ano — Švédsko/Irsko', highlight: 'winner' },
      { text: 'Plná suverenita (on-prem)', highlight: 'winner' },
    ],
  },
  {
    criterion: 'Kvalita českých právních textů',
    values: [
      { text: 'Dobrá (Gemini) — 3,3 % míra halucinací' },
      { text: 'Nejlepší — Claude top performer na českém právu', highlight: 'winner' },
      { text: 'Přijatelná (GPT-4)' },
      { text: 'Špatná — open-source modely nemají trénink na české právo', highlight: 'loser' },
    ],
  },
  {
    criterion: 'Zpracování skenovaných PDF',
    values: [
      { text: 'Výborné (Document AI OCR + Gemini)', highlight: 'winner' },
      { text: 'Claude čte skeny nativně, ale pomalu u 163 stran' },
      { text: 'Dobré (Azure Document Intelligence)' },
      { text: 'Tesseract — vyžaduje ruční ladění', highlight: 'loser' },
    ],
  },
  {
    criterion: 'Měsíční náklady (odhad)',
    values: [
      { text: '~1 500–3 000 Kč' },
      { text: '~1 000–2 000 Kč', highlight: 'winner' },
      { text: '~3 000–8 000 Kč (licence SharePoint)' },
      { text: '~2 500–7 500 Kč (hardware/elektřina)' },
    ],
  },
  {
    criterion: 'Trénink na datech',
    values: [
      { text: 'Ne (výchozí nastavení Vertex AI)' },
      { text: 'Ne (výchozí nastavení API)' },
      { text: 'Ne (výchozí nastavení Azure OpenAI)' },
      { text: 'N/A' },
    ],
  },
  {
    criterion: 'DPA k dispozici',
    values: [
      { text: 'Ano (Google Cloud)' },
      { text: 'Ano (Anthropic API)' },
      { text: 'Ano (Microsoft Azure)' },
      { text: 'N/A (vy jste zpracovatel)' },
    ],
  },
  {
    criterion: 'Znalost klienta s platformou',
    values: [
      { text: 'Vysoká — Progresus používá Google', highlight: 'winner' },
      { text: 'Střední — Google pro úložiště, Claude pro AI' },
      { text: 'Nízká — SharePoint nepoužívají', highlight: 'loser' },
      { text: 'Žádná' },
    ],
  },
  {
    criterion: 'Klíčové omezení',
    values: [
      { text: 'Složitější setup (nutný GCP projekt)' },
      { text: 'Žádná EU rezidence dat na přímém API' },
      { text: 'Licence SharePoint; compliance riziko fine-tuningu' },
      { text: 'Kvalita češtiny nepoužitelná pro právní DD' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Section 7 — Scoring matrix (4×6 + total)
// ---------------------------------------------------------------------------

/**
 * Column order matches the scoring table headers:
 * [0] Obtížnost realizace, [1] Kvalita výstupů, [2] Dopad na klienta,
 * [3] Compliance bezpečnost, [4] Rychlost do 7. dubna, [5] (implied total col — see `total`)
 */
export const scoringRows: ScoringRow[] = [
  {
    variant: 'A. GDrive + Claude přes Vertex AI',
    scores: ['3/5', '5/5', '5/5', '5/5', '2/5'],
    total: '20/25',
    highlight: false,
  },
  {
    variant: 'B. GDrive + Claude API (přímé)',
    scores: ['2/5', '5/5', '5/5', '3/5', '4/5'],
    total: '19/25',
    highlight: true,
  },
  {
    variant: 'C. SharePoint + Azure OpenAI',
    scores: ['4/5', '4/5', '4/5', '4/5', '1/5'],
    total: '17/25',
    highlight: false,
  },
  {
    variant: 'D. Lokální (Ollama)',
    scores: ['3/5', '2/5', '1/5', '5/5', '1/5'],
    total: '12/25',
    highlight: false,
  },
];

export const scoringNote: string =
  'Váhy: Obtížnost realizace (invertovaná) 15 %, Kvalita výstupů 30 %, Dopad na klienta 20 %, Compliance 20 %, Rychlost 15 %. Oproti v1 sníženo skóre rychlosti u všech variant — realistická korekce.';

// ---------------------------------------------------------------------------
// Section 8 — Recommendation
// ---------------------------------------------------------------------------

export const recommendation: Recommendation = {
  mainHtml: `
<h3 style="color:white;margin-top:0;">Doporučujeme: Hybrid — Varianta B teď, upgrade na A po deadline</h3>
<p style="margin:12px 0;"><strong>Fáze 1 (teď → 7. dubna):</strong> Google Drive + Claude API přímé napojení. Nejrychlejší cesta.
Extraktivní sumarizace per-document (bez plného RAG). Claude čte skeny nativně. API data se ve výchozím nastavení NEPOUŽÍVAJÍ
k tréninku. Realistický odhad: <strong>4–6 pracovních dní</strong> od obdržení dokumentů a potvrzení platformy.
S aktuálním datasetem (52 souborů, 454 stran) stihneme do úterý generovat sumarizace, ale jen pro existující sekce.
Prázdné složky bez dat nesumarizujeme.</p>
<p style="margin:12px 0;"><strong>Fáze 2 (duben–květen):</strong> Plný RAG pipeline s vektorovou databází pro Q&A agenta.
Migrace na Vertex AI (Claude na GCP, Frankfurt) pro EU rezidenci. Podpis DPA s Google Cloud.
Realisticky <strong>3–4 týdny</strong> na produkční kvalitu s anti-halucinačními guardrails.</p>
<p style="margin:12px 0;"><strong>Proč ne varianta C (Azure)?</strong> Progresus nepoužívá SharePoint, setup je pomalejší
a GPT-4 je měřitelně horší než Claude na českých právních textech.</p>
<p style="margin:12px 0;"><strong>Proč ne varianta D (lokální)?</strong> Open-source modely nezvládají české právní texty
v produkční kvalitě. Míra halucinací 5–10x vyšší. Jedno vymyšlené ustanovení smlouvy v DD = zničená důvěryhodnost. Jednoznačně ne.</p>
  `.trim(),
  euHtml: `
<h3>EU rezidence dat — upřímný kompromis</h3>
<p>Přímé Claude API zpracovává data v USA. Pro Fázi 1 (interní použití, pouze na naší straně, kontrola před sdílením)
je to akceptovatelné, protože:</p>
<ul style="margin:8px 0 0 20px; font-size:14px;">
  <li>API data se NEPOUŽÍVAJÍ k tréninku (výchozí politika — ověřeno)</li>
  <li>Zatím není podepsáno ani NDA/DPA — fungujeme na důvěře tak jako tak</li>
  <li>Výstupy Fáze 1 procházejí lidskou kontrolou před sdílením s kupujícím</li>
</ul>
<p style="margin-top:8px;">Pro Fázi 2+ (produkce, dlouhodobě) migrujeme na Claude přes Vertex AI v eu-west3 (Frankfurt).
Tím získáme smluvní garanci EU rezidence.</p>
  `.trim(),
};

// ---------------------------------------------------------------------------
// Section 9 — Implementation plan (7-day)
// ---------------------------------------------------------------------------

export const timelineRows: TimelineRow[] = [
  {
    day: 'Den 0 (Po 30/3)',
    task: 'Příjem ZIPu, extrakce, inventář, gap analýza. Odeslání této analýzy + doporučení platformy Vaškovi a klientovi.',
    responsibility: 'Karel',
    output: 'Tento dokument',
  },
  {
    day: 'Den 1 (Út 31/3)',
    task: 'Klient potvrdí platformu + pošle chybějící dokumenty (priorita: Business Plan, Permitting). Setup Google Drive + sdílená struktura. Založení Claude API projektu.',
    responsibility: 'Karel + Dvořák/Zrůst',
    output: 'Google Drive se strukturou, API klíče',
  },
  {
    day: 'Den 2 (St 1/4)',
    task: 'Ingest textových PDF do pipeline. OCR 163stránkové rámcové smlouvy (Google Document AI nebo Claude Vision stránku po stránce). Prompt engineering — první drafty sumarizací Corporate Structure.',
    responsibility: 'Karel',
    output: 'Surové sumarizace ke kontrole',
  },
  {
    day: 'Den 3 (Čt 2/4)',
    task: 'Generování sumarizací pro všechny existující sekce. Iterace promptů na základě kvality výstupů. Přidání citací a confidence indikátorů. (Paralelně: Discovery Workshop 1 s Ševčíkem.)',
    responsibility: 'Karel',
    output: 'Draft sumarizace všech sekcí',
  },
  {
    day: 'Den 4 (Pá 3/4)',
    task: 'Review sumarizací se Zrůstem/Dvořákem. Zapracování zpětné vazby. Finalizace výstupního formátu. Nahrání do Google Drive.',
    responsibility: 'Karel + Dvořák',
    output: 'Revidované sumarizace',
  },
  {
    day: 'Den 5–6 (So–Ne / Velikonoce)',
    task: 'Buffer. Oprava nalezených halucinací. Ingest případných dalších dokumentů od klienta.',
    responsibility: 'Karel',
    output: '—',
  },
  {
    day: 'Den 7 (Po 6/4 nebo Út 7/4)',
    task: 'Finální QA. Dataroom živý pro kupujícího — čistý Google Drive + AI sumarizace v každé sekci.',
    responsibility: 'Tým',
    output: 'Kupující získává přístup',
  },
];

export const timelineNote: string =
  'Tento plán je agresivní, ale realistický PRO EXISTUJÍCÍ DOKUMENTY. Sekce, ke kterým klient nedodá podklady (Business Plan, Employment, Permitting, atd.), prostě nebudou mít AI sumarizaci — budou prázdné nebo budou obsahovat jen manuálně vytvořený overview. To je potřeba klientovi říct přímo — AI nesoumarizuje něco, co neexistuje.';

// ---------------------------------------------------------------------------
// Section 10 — Cost estimate
// ---------------------------------------------------------------------------

export const costRows: CostRow[] = [
  {
    phase: 'Fáze 1: Sumarizace složek',
    scope:
      'Setup Google Drive, OCR, prompt engineering, extraktivní sumarizace per-document, review, iterace, finalizace formátu',
    hours: '35–50 h',
    price: '70 000–100 000 Kč',
  },
  {
    phase: 'Fáze 2: Q&A Agent s RAG',
    scope:
      'Vektorová DB, embedding pipeline, chunking, retrieval s re-rankingem, generace s groundingem, anti-halucinační guardrails, testování',
    hours: '50–70 h',
    price: '100 000–140 000 Kč',
  },
  {
    phase: 'Fáze 3: Monitoring + Analytika',
    scope:
      'Sledování přístupů, gap analýza, analytika návštěvnosti, dashboard',
    hours: '30–40 h',
    price: '60 000–80 000 Kč',
  },
  {
    phase: 'Fáze 4: EU migrace + Hardening',
    scope:
      'Přechod na Vertex AI (EU), DPA, bezpečnostní audit, produkční zpevnění',
    hours: '15–20 h',
    price: '30 000–40 000 Kč',
  },
  {
    phase: 'Celkem',
    scope: '',
    hours: '130–180 h',
    price: '260 000–360 000 Kč',
    isTotal: true,
  },
];

export const costNote: string =
  'Oproti v1 navýšeno o ~15–30 h kvůli realistickým odhadům RAG pipeline a anti-halucinačních guardrails. API náklady (Claude): odhadem 1 000–3 000 Kč/měsíc. Google Drive: prakticky zdarma.';

// ---------------------------------------------------------------------------
// Section 11 — ROI cards
// ---------------------------------------------------------------------------

export const roiCards: RoiCard[] = [
  {
    title: 'Úspora času',
    html: '<p>Manuální příprava DD pro projekt této velikosti: typicky 200–400 hodin práce právníků/analytiků za 3 000–5 000 Kč/h. AI sumarizace + Q&A snižují tento objem o ~60–70 %.</p>',
    highlight: 'Odhadovaná úspora: 400 000–1 000 000 Kč na odborných poplatcích v průběhu 3–6měsíčního DD procesu.',
    variant: 'green',
  },
  {
    title: 'Dojem na kupujícího',
    html: '<p>Slovy Zrůsta: „Chci ukázat, že máme pořádek v datech." AI-organizovaný dataroom s okamžitými sumarizacemi signalizuje PFF, že Progresus je sofistikovaný, datově řízený a „vpředu".</p>',
    highlight: 'Hodnota: Nekvantifikovatelná, ale potenciálně klíčová pro deal. První dojem v miliardové transakci.',
    variant: 'blue',
  },
  {
    title: 'Znovupoužitelnost',
    html: '<p>Zrůst: „Příští rok něco prodávat... stavíme produkt." DD agent se stane znovupoužitelným aktivem pro budoucí transakce. RAG knowledge base akumuluje deal intelligence.</p>',
    highlight: 'Celoživotní hodnota: 3–5x počáteční náklady při opakovaném použití na dalších transakcích.',
    variant: 'yellow',
  },
];

// ---------------------------------------------------------------------------
// Section 12 — Blockers table
// ---------------------------------------------------------------------------

export const blockerRows: BlockerRow[] = [
  {
    blocker: 'Prázdné složky: Business Plan, Employment',
    impact: 'Bez obsahu nelze generovat AI sumarizaci',
    owner: 'Zrůst / Johanna',
    deadline: 'Před 7. dubnem',
  },
  {
    blocker: 'Chybějící složka: Permitting / Územní plán',
    impact: 'Zcela chybí — klíčová sekce pro RE development DD',
    owner: 'Zrůst / Johanna',
    deadline: 'ASAP — kritické',
  },
  {
    blocker: 'Chybějící složka: Financials',
    impact: 'Žádné výkazy, rozpočty, projekce — kupující to bude chtít jako první',
    owner: 'Zrůst / Lukánek',
    deadline: 'ASAP — kritické',
  },
  {
    blocker: 'Zdrojové dokumenty k financování',
    impact: 'Existuje pouze přehledový DOCX — chybí úvěrové smlouvy, směnky',
    owner: 'Zrůst / Johanna',
    deadline: 'Před 7. dubnem',
  },
  {
    blocker: 'Potvrzení volby platformy',
    impact: 'Nemůžeme nastavit sdílený přístup, dokud nebude potvrzeno',
    owner: 'Zrůst / Dvořák',
    deadline: '31. března',
  },
  {
    blocker: 'NDA / DPA',
    impact: 'Právní ochrana při práci s M&A dokumenty',
    owner: 'Johanna / Zrůst',
    deadline: 'ASAP, ale neblokuje Fázi 1 dle Zrůsta',
  },
  {
    blocker: 'Zrůst: přestat vkládat DD dokumenty do spotřebitelského Claude',
    impact: 'Data mohou být použita k tréninku modelu — bezpečnostní riziko',
    owner: 'Zrůst',
    deadline: 'Ihned',
  },
];

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export const footerText: string =
  'Arkadia Labs & Able | Připravil Karel Duchoň | 30. 3. 2026 v2 | DŮVĚRNÉ — Pro interní použití Able + Arkadia';
