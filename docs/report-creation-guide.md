# Report Creation Guide — Arkadia Labs & Able

> **Para quien crea reportes con Claude:** Pega este documento como instrucciones de proyecto en Claude (Project Instructions) o adjuntalo al inicio de tu conversacion. Claude generara los archivos directamente en el formato modular que necesitamos.

---

## Que es esto?

Cuando creas un reporte para cliente, Claude debe generar **archivos React modulares** listos para subir a nuestra web (arkadialabs.io), NO un HTML standalone. Cada reporte se compone de:

1. **Data file** (`src/data/reports/{slug}.ts`) — Todo el contenido tipado
2. **CSS file** (`src/styles/report-{slug}.css`) — Design tokens del tema
3. **Componentes** (`src/components/reports/{slug}/`) — Un componente por seccion
4. **Pagina** (`src/pages/reports/{Nombre}Page.tsx`) — Ensambla las secciones
5. **Ruta** — Una linea en `src/App.tsx`

---

## Instrucciones para Claude

Copia todo lo que esta debajo de la linea y pegalo como "Project Instructions" o al inicio de tu conversacion con Claude:

---

# INSTRUCCIONES DE GENERACION DE REPORTES

Cuando el usuario te pida crear un reporte/informe/analisis para cliente, genera SIEMPRE los siguientes archivos en formato React/TypeScript modular. NUNCA generes HTML standalone.

## Arquitectura obligatoria

Cada reporte produce estos archivos:

```
src/
  data/reports/{slug}.ts           # Datos tipados (TODO el contenido aqui)
  styles/report-{slug}.css         # CSS scoped con design tokens
  components/reports/{slug}/       # Un componente .tsx por seccion
    {Prefix}Hero.tsx
    {Prefix}Section1.tsx
    {Prefix}Section2.tsx
    ...
    {Prefix}Footer.tsx
    SafeHtml.tsx                   # Helper para HTML strings
  pages/reports/{Nombre}Page.tsx   # Pagina principal
```

## Regla #1: Separacion datos/presentacion

TODO el texto va en el data file. Los componentes NUNCA tienen texto hardcoded.

```typescript
// CORRECTO — en el componente
import { findings } from '@/data/reports/mi-reporte';
<h3>{finding.title}</h3>

// INCORRECTO — texto en el componente
<h3>Analisis de mercado</h3>
```

## Regla #2: Path aliases

Siempre usar `@/` para imports desde `src/`:

```typescript
import { reportMeta } from '@/data/reports/mi-reporte';
import SafeHtml from '@/components/reports/mi-reporte/SafeHtml';
```

## Regla #3: Temas disponibles

Hay 3 temas. Elige uno segun el tipo de reporte:

### Tema Light Corporate (recomendado para informes de cliente)
- Fondo: `#F4F6F8`, cards blancas, headers azul `#2563eb`
- Scope class: `.report-{slug}`
- Ejemplo: DD Dataroom Analyza

### Tema Dark (para informes internos/confidenciales)
- Fondo: `#0f172a`, cards `#1e293b`, texto claro
- Scope class: `.report-{slug}`
- Ejemplo: DD Agent Scoping

### Tema Warm Paper/Ink (para auditorias SEO/marketing)
- Fondo: `#f5f2eb`, accent naranja `#d4451a`, fuente Syne
- Scope class: `.report`
- Ejemplo: Roatan SEO Audit

---

## ARCHIVO 1: Data File (`src/data/reports/{slug}.ts`)

### Estructura obligatoria:

```typescript
/**
 * {Titulo del reporte}
 * {Empresa} | {Fecha}
 */

// ── TYPES ──────────────────────────────────────────────

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

// ... tipos especificos de cada seccion ...

// ── DATA ───────────────────────────────────────────────

export const reportMeta: ReportMeta = {
  title: 'Titulo del reporte',
  subtitle: 'Arkadia Labs & Able | Fecha | Contexto',
  label: 'LABEL SUPERIOR EN CAPS',
};

export const navSections: NavSection[] = [
  { id: 'seccion1', label: 'Seccion 1' },
  { id: 'seccion2', label: 'Seccion 2' },
  // ...
];

// Exportar datos de CADA seccion...
export const seccion1Data = { ... };
export const seccion2Rows = [ ... ];

export const footerText = 'Arkadia Labs & Able | Autor | Fecha | CONFIDENCIAL';
```

### Reglas para el data file:

1. **Todo el texto del reporte va aqui** — titulos, parrafos, filas de tablas, bullets
2. **Usar HTML strings** para texto rico: `<strong>negrita</strong>`, `<em>italica</em>`, `<br>`, `<code>inline</code>`
3. **Tipar todo** — cada estructura de datos tiene su interface
4. **Badges tienen variante**: `BadgeVariant` = 'red' | 'green' | 'blue' | 'yellow' | 'gray'
5. **Cards tienen variante**: mismo patron
6. **Tablas como arrays de objetos** con un campo por columna
7. **navSections**: array de `{id, label}` — el `id` es el anchor de la seccion

### Ejemplo de tabla tipada:

```typescript
export interface GapRow {
  section: string;
  status: string;
  statusVariant: BadgeVariant;
  missing: string;
  priority: string;
}

export const gapRows: GapRow[] = [
  {
    section: '00 — Uvod',
    status: 'Chybi',
    statusVariant: 'red',
    missing: 'Teaser, Information Memorandum, timeline',
    priority: 'Vysoka',
  },
  // ...
];
```

### Ejemplo de card tipada:

```typescript
export interface Finding {
  title: string;
  html: string;        // HTML string con parrafos, bold, etc.
  variant: CardVariant; // color del borde izquierdo
}

export const findings: Finding[] = [
  {
    title: 'Estructura del proyecto',
    html: '<p>Descripcion con <strong>texto importante</strong>...</p>',
    variant: 'green',
  },
];
```

---

## ARCHIVO 2: CSS (`src/styles/report-{slug}.css`)

### Tema Light Corporate:

```css
.report-{slug} {
  --dd-bg: #F4F6F8;
  --dd-surface: #FFFFFF;
  --dd-hero: #0D1B2A;
  --dd-border: #E2E6EB;
  --dd-text: #1A2332;
  --dd-text-secondary: #4A5568;
  --dd-text-muted: #7A8599;
  --dd-accent-blue: #2563eb;
  --dd-accent-green: #22c55e;
  --dd-accent-red: #ef4444;
  --dd-accent-yellow: #f59e0b;
  --dd-accent-gray: #9ca3af;

  /* Bridge tokens para ReportNav compartido */
  --rpt-card: var(--dd-surface);
  --rpt-border: var(--dd-border);
  --rpt-ink: var(--dd-text);
  --rpt-muted: var(--dd-text-muted);
  --rpt-accent: var(--dd-accent-blue);

  font-family: 'Noto Sans', sans-serif;
  background: var(--dd-bg);
  color: var(--dd-text);
  line-height: 1.6;
}

/* Cards */
.dd-card { background: var(--dd-surface); border-radius: 12px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.08); margin: 16px 0; }
.dd-card-red    { border-left: 4px solid var(--dd-accent-red); }
.dd-card-green  { border-left: 4px solid var(--dd-accent-green); }
.dd-card-blue   { border-left: 4px solid var(--dd-accent-blue); }
.dd-card-yellow { border-left: 4px solid var(--dd-accent-yellow); }
.dd-card-gray   { border-left: 4px solid var(--dd-accent-gray); }

/* Badges */
.dd-badge { display: inline-block; padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; }
.dd-badge-red    { background: #fef2f2; color: #dc2626; }
.dd-badge-green  { background: #f0fdf4; color: #16a34a; }
.dd-badge-blue   { background: #eff6ff; color: var(--dd-accent-blue); }
.dd-badge-yellow { background: #fffbeb; color: #d97706; }
.dd-badge-gray   { background: #f3f4f6; color: #6b7280; }

/* Tables */
.dd-table { width: 100%; border-collapse: collapse; font-size: 14px; }
.dd-table thead th { background: #1e293b; color: #fff; padding: 12px 16px; text-align: left; font-weight: 600; }
.dd-table tbody td { padding: 10px 16px; border-bottom: 1px solid #e5e7eb; vertical-align: top; }
.dd-table tbody tr:hover td { background: #f9fafb; }
.dd-table .dd-winner td { background: #f0fdf4 !important; }
.dd-table .dd-loser td  { background: #fef2f2 !important; }

/* Metrics */
.dd-metric { font-size: 32px; font-weight: 700; color: var(--dd-accent-blue); }
.dd-metric-label { font-size: 13px; color: var(--dd-text-muted); }

/* Recommendation gradient box */
.dd-rec { background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; border-radius: 12px; padding: 24px; margin: 24px 0; }
.dd-rec h3 { color: white; font-size: 18px; font-weight: 700; margin-bottom: 12px; }
.dd-rec strong { color: white; font-weight: 700; }
.dd-rec p { color: rgba(255,255,255,0.92); margin: 12px 0; }

/* Callout */
.dd-callout { background: #fef3c7; border: 1px solid var(--dd-accent-yellow); border-radius: 12px; padding: 20px; margin: 16px 0; }
.dd-callout-red { background: #fef2f2; border-color: var(--dd-accent-red); }

/* Utils */
.dd-section-intro { font-size: 15px; color: var(--dd-text-secondary); margin-bottom: 16px; }
.dd-note { font-size: 13px; color: var(--dd-text-muted); margin-top: 8px; }
.report-{slug} strong { color: var(--dd-text); font-weight: 600; }

@media (max-width: 768px) {
  .dd-card { padding: 16px; }
  .dd-rec { padding: 20px; }
}

@media print {
  .report-{slug} nav { display: none !important; }
  .report-{slug} section { break-inside: avoid; }
}
```

### Tema Dark:

Cambia los tokens:
```css
.report-{slug} {
  --sc-bg: #0f172a;
  --sc-surface: #1e293b;
  --sc-border: #334155;
  --sc-text: #e2e8f0;
  --sc-text-muted: #64748b;
  --sc-accent-blue: #3b82f6;
  /* ... */
}
```

Y los componentes CSS usan fondo oscuro, badges con fondos oscuros, tablas invertidas.

---

## ARCHIVO 3: SafeHtml helper

Copiar exactamente este archivo en cada directorio de reporte:

```typescript
// src/components/reports/{slug}/SafeHtml.tsx

interface SafeHtmlProps {
  html: string;
  className?: string;
}

function buildStaticHtmlProp(content: string) {
  const key = ['__html'];
  return { [key[0]]: content } as { __html: string };
}

const SafeHtml: React.FC<SafeHtmlProps> = ({ html, className }) => {
  const innerProp = buildStaticHtmlProp(html);
  return <div className={className} {...{ dangerouslySetInnerHTML: innerProp }} />;
};

export default SafeHtml;
```

---

## ARCHIVO 4: Componentes de seccion

### Patron de seccion:

```tsx
// src/components/reports/{slug}/{Prefix}NombreSeccion.tsx

import { datosSeccion } from '@/data/reports/{slug}';
import SafeHtml from './SafeHtml';

const {Prefix}NombreSeccion: React.FC = () => {
  return (
    <section id="seccionId" className="py-8 md:py-10">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <h2
          className="text-xl md:text-[22px] font-bold pb-2 mb-4 border-b-2"
          style={{ color: 'var(--dd-text)', borderColor: 'var(--dd-accent-blue)' }}
        >
          Titulo de la Seccion
        </h2>

        {/* Contenido aqui */}
      </div>
    </section>
  );
};

export default {Prefix}NombreSeccion;
```

### Patron Hero (header oscuro):

```tsx
import { reportMeta } from '@/data/reports/{slug}';

const {Prefix}Hero: React.FC = () => (
  <header
    className="py-14 md:py-20 px-4 md:px-8 text-center relative overflow-hidden"
    style={{ background: 'var(--dd-hero)' }}
  >
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: 'radial-gradient(ellipse 600px 400px at 20% 50%, rgba(37,99,235,0.12), transparent), radial-gradient(ellipse 600px 400px at 80% 50%, rgba(124,92,191,0.10), transparent)',
      }}
    />
    <div className="max-w-[1200px] mx-auto relative z-10">
      <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--dd-accent-blue)' }}>
        {reportMeta.label}
      </p>
      <h1 className="text-2xl md:text-[32px] font-extrabold leading-snug mb-4" style={{ color: '#fff' }}>
        {reportMeta.title}
      </h1>
      <p className="text-sm md:text-base" style={{ color: '#94a3b8' }}>
        {reportMeta.subtitle}
      </p>
    </div>
  </header>
);

export default {Prefix}Hero;
```

### Patron Card con HTML:

```tsx
import { findings } from '@/data/reports/{slug}';
import SafeHtml from './SafeHtml';

const {Prefix}Findings: React.FC = () => (
  <section id="findings" className="py-8 md:py-10">
    <div className="max-w-[1200px] mx-auto px-4 md:px-8">
      <h2 className="text-xl md:text-[22px] font-bold pb-2 mb-4 border-b-2"
        style={{ color: 'var(--dd-text)', borderColor: 'var(--dd-accent-blue)' }}>
        Titulo
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {findings.map((f, i) => (
          <div key={i} className={`dd-card dd-card-${f.variant}`}>
            <h3 className="text-[17px] font-semibold mb-2" style={{ color: 'var(--dd-text)' }}>
              {f.title}
            </h3>
            <SafeHtml html={f.html} className="text-sm" />
          </div>
        ))}
      </div>
    </div>
  </section>
);
```

### Patron Tabla:

```tsx
import { tableRows } from '@/data/reports/{slug}';

const {Prefix}MiTabla: React.FC = () => (
  <section id="tabla" className="py-8 md:py-10">
    <div className="max-w-[1200px] mx-auto px-4 md:px-8">
      <h2 className="text-xl md:text-[22px] font-bold pb-2 mb-4 border-b-2"
        style={{ color: 'var(--dd-text)', borderColor: 'var(--dd-accent-blue)' }}>
        Titulo
      </h2>
      <div className="dd-card">
        <div className="overflow-x-auto">
          <table className="dd-table">
            <thead>
              <tr>
                <th>Col 1</th>
                <th>Col 2</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, i) => (
                <tr key={i} className={row.highlight === 'winner' ? 'dd-winner' : row.highlight === 'loser' ? 'dd-loser' : ''}>
                  <td>{row.col1}</td>
                  <td>
                    <span className={`dd-badge dd-badge-${row.badgeVariant}`}>
                      {row.col2}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
);
```

### Patron Metrics Grid:

```tsx
import { stats } from '@/data/reports/{slug}';

<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
  {stats.map((stat) => (
    <div key={stat.label} className="text-center">
      <div className="dd-metric">{stat.value}</div>
      <div className="dd-metric-label">{stat.label}</div>
    </div>
  ))}
</div>
```

### Patron Footer:

```tsx
import { footerText } from '@/data/reports/{slug}';

const {Prefix}Footer: React.FC = () => (
  <footer className="text-center py-6 px-4 border-t" style={{ borderColor: 'var(--dd-border)', color: 'var(--dd-text-muted)', fontSize: '12px' }}>
    {footerText}
  </footer>
);

export default {Prefix}Footer;
```

---

## ARCHIVO 5: Pagina principal

```tsx
// src/pages/reports/{Nombre}Page.tsx

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { trackPageView } from '@/utils/dataLayer';
import ReportNav from '@/components/reports/ReportNav';
import '@/styles/report-{slug}.css';
import { reportMeta, navSections } from '@/data/reports/{slug}';

// Importar todos los componentes de seccion
import {Prefix}Hero from '@/components/reports/{slug}/{Prefix}Hero';
import {Prefix}Seccion1 from '@/components/reports/{slug}/{Prefix}Seccion1';
// ... etc
import {Prefix}Footer from '@/components/reports/{slug}/{Prefix}Footer';

const {Nombre}Page: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname, 'Nombre del Reporte', 'cs');
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>{reportMeta.title}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="report-{slug} min-h-screen">
        <{Prefix}Hero />
        <ReportNav sections={navSections} />
        <{Prefix}Seccion1 />
        {/* ... todas las secciones en orden */}
        <{Prefix}Footer />
      </div>
    </>
  );
};

export default {Nombre}Page;
```

---

## ARCHIVO 6: Ruta (agregar a App.tsx)

Agregar estas 2 lineas al archivo `src/App.tsx`:

```typescript
// Junto a los otros lazy imports (linea ~30):
const {Nombre}Page = lazy(() => import('./pages/reports/{Nombre}Page'));

// Junto a las otras rutas de reportes (linea ~75):
<Route path="reports/{slug}" element={<{Nombre}Page />} />
```

La ruta va FUERA de PublicLayout pero DENTRO de LanguageHandler.

---

## Checklist antes de entregar

- [ ] Data file tiene TODOS los textos del reporte
- [ ] Cada seccion tiene su propio componente
- [ ] Ningun componente tiene texto hardcoded
- [ ] CSS usa scope class `.report-{slug}`
- [ ] CSS incluye bridge tokens `--rpt-*` para ReportNav
- [ ] Hero tiene fondo oscuro con gradiente
- [ ] Tablas envueltas en `overflow-x-auto` para mobile
- [ ] Grids colapsan a 1 columna en mobile (`grid-cols-1 md:grid-cols-3`)
- [ ] Footer dice "Arkadia Labs & Able"
- [ ] Pagina tiene `<meta name="robots" content="noindex, nofollow" />`
- [ ] Pagina tiene `trackPageView` en useEffect
- [ ] SafeHtml.tsx esta incluido

---

## Nombrado

| Concepto | Ejemplo |
|----------|---------|
| Slug (kebab-case) | `dd-dataroom-analyza` |
| Prefijo componentes (PascalCase) | `DD` |
| Nombre pagina (PascalCase) | `DDDataroomPage` |
| Directorio componentes | `src/components/reports/dd/` |
| CSS class | `.report-dd` |

Para un reporte llamado "Progresus Discovery":
- Slug: `progresus-discovery`
- Prefijo: `Discovery`
- Pagina: `ProgresusDiscoveryPage`
- Dir: `src/components/reports/discovery/`
- CSS: `.report-discovery`
