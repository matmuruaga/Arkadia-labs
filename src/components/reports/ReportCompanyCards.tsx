import { cn } from '@/lib/utils';
import {
  companies,
  type CompanyAnalysis,
  type IssueItem,
} from '@/data/reports/roatan-seo-audit';

// ─── HTML sanitiser (same lightweight approach as ReportHighlight) ─────────────
// Strips <script> elements and all on* event attributes.
// For trusted internal/authored data only — not a substitute for DOMPurify on
// truly user-generated input.
function sanitizeHtml(raw: string): string {
  if (typeof document === 'undefined') return raw;
  const parser = new DOMParser();
  const doc = parser.parseFromString(raw, 'text/html');
  doc.querySelectorAll('script').forEach((el) => el.remove());
  doc.querySelectorAll('*').forEach((el) => {
    Array.from(el.attributes).forEach((attr) => {
      if (attr.name.startsWith('on')) el.removeAttribute(attr.name);
    });
  });
  return doc.body.innerHTML;
}

// ─── Sub-components ────────────────────────────────────────────────────────────

/** Renders a list of issue/strength/keyword items with colored status dots. */
const IssueList: React.FC<{ items: IssueItem[] }> = ({ items }) => (
  <ul className="list-none">
    {items.map((item, i) => (
      <li
        key={i}
        className="flex gap-2.5 items-start py-2 border-b border-[#f0ebe2] last:border-b-0 text-[13px] leading-[1.45]"
      >
        <span
          className={cn('rpt-dot mt-[5px]', `rpt-dot-${item.dotColor}`)}
          aria-hidden="true"
        />
        {/*
         * Safe: content is statically authored from internal report data and
         * additionally sanitised above, mirroring the ReportHighlight approach.
         * eslint-disable-next-line react/no-danger
         */}
        <span
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.text) }}
        />
      </li>
    ))}
  </ul>
);

/** Label row that separates issue/strength/keyword blocks inside a card body. */
const BlockLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    className="mt-4 mb-1 text-[10px] uppercase tracking-[0.12em] font-medium"
    style={{ color: 'var(--rpt-muted)' }}
  >
    {children}
  </div>
);

/** Maps a scoreLevel to the CSS class that applies the correct color. */
const getScoreColorClass = (level: CompanyAnalysis['scoreLevel']): string => {
  switch (level) {
    case 'high':
      return 'score-high';
    case 'mid':
      return 'score-mid';
    case 'low':
      return 'score-low';
  }
};

// ─── CompanyCard ───────────────────────────────────────────────────────────────

const CompanyCard: React.FC<{ company: CompanyAnalysis }> = ({ company }) => {
  return (
    <article
      className="rounded-sm border border-[var(--rpt-border)] overflow-hidden"
      style={{ backgroundColor: 'var(--rpt-card)' }}
    >
      {/* Card header */}
      <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-[var(--rpt-border)]">
        {/* Name + URL */}
        <div className="min-w-0">
          <div
            className="report-heading font-bold leading-[1.2] truncate"
            style={{ fontSize: '17px', color: 'var(--rpt-ink)' }}
          >
            {company.name}
          </div>
          <div
            className="text-[11px] mt-0.5 truncate"
            style={{ color: 'var(--rpt-muted)' }}
          >
            {company.url}
          </div>
        </div>

        {/* Score box */}
        <div
          className="shrink-0 flex flex-col items-center justify-center rounded-sm px-3 py-2 min-w-[60px]"
          style={{ backgroundColor: 'var(--rpt-ink)' }}
        >
          <span
            className={cn(
              'report-heading leading-none',
              getScoreColorClass(company.scoreLevel),
            )}
            style={{ fontWeight: 800, fontSize: '28px' }}
          >
            {company.score}
          </span>
          <span
            className="text-[10px] mt-0.5"
            style={{ color: 'var(--rpt-paper)', opacity: 0.5 }}
          >
            /100
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="px-5 py-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {company.tags.map((tag, i) => (
            <span key={i} className={`rpt-badge rpt-badge-${tag.variant}`}>
              {tag.text}
            </span>
          ))}
        </div>

        {/* Critical issues */}
        {company.criticalIssues.length > 0 && (
          <>
            <BlockLabel>🚨 Problemas críticos</BlockLabel>
            <IssueList items={company.criticalIssues} />
          </>
        )}

        {/* Strengths */}
        {company.strengths.length > 0 && (
          <>
            <BlockLabel>✅ Fortalezas a aprovechar</BlockLabel>
            <IssueList items={company.strengths} />
          </>
        )}

        {/* Keywords */}
        {company.keywords.length > 0 && (
          <>
            <BlockLabel>🎯 Keywords prioritarios</BlockLabel>
            <IssueList items={company.keywords} />
          </>
        )}
      </div>
    </article>
  );
};

// ─── ReportCompanyCards ────────────────────────────────────────────────────────

const ReportCompanyCards: React.FC = () => {
  return (
    <section
      id="empresas"
      className="py-12 md:py-16 border-b border-[var(--rpt-border)]"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-16">
        <div className="text-[11px] font-medium tracking-[0.18em] uppercase text-[var(--rpt-accent)] mb-2">
          DIAGNÓSTICO DETALLADO
        </div>

        <h2 className="report-heading text-2xl md:text-[32px] font-bold leading-[1.15] mb-3">
          Análisis por empresa
        </h2>

        <p className="text-[15px] text-[var(--rpt-muted)] max-w-[680px] mb-10 font-light">
          Diagnóstico individual de los 7 sitios auditados: problemas críticos que
          penalizan el posicionamiento, fortalezas existentes que pueden
          potenciarse, y las keywords prioritarias para cada negocio.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {companies.map((company) => (
            <CompanyCard key={company.url} company={company} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReportCompanyCards;
