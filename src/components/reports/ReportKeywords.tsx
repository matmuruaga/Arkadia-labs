import type {
  KeywordRow,
  InformationalKeywordRow,
} from '@/data/reports/roatan-seo-audit';
import {
  transactionalKeywords,
  informationalKeywords,
} from '@/data/reports/roatan-seo-audit';

// ─── Opportunity colour helpers ───────────────────────────────────────────────

const opportunityStyle = (
  level: KeywordRow['opportunityLevel'],
): React.CSSProperties => {
  switch (level) {
    case 'alta':
      return { color: 'var(--rpt-good)', fontWeight: 600 };
    case 'media':
      return { color: 'var(--rpt-warn)', fontWeight: 500 };
    case 'baja':
      return { color: 'var(--rpt-bad)', fontWeight: 500 };
  }
};

const infoPriorityStyle = (
  level: InformationalKeywordRow['priorityLevel'],
): React.CSSProperties => {
  switch (level) {
    case 'alta':
      return { color: 'var(--rpt-good)', fontWeight: 600 };
    case 'media':
      return { color: 'var(--rpt-warn)', fontWeight: 500 };
    case 'baja':
      return { color: 'var(--rpt-bad)', fontWeight: 500 };
  }
};

// ─── Sub-label shared style ───────────────────────────────────────────────────

const SubLabel: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div
    className={`text-[11px] font-medium tracking-[0.18em] uppercase text-[var(--rpt-accent)] mb-3 ${className}`}
  >
    {children}
  </div>
);

// ─── Transactional keywords table ────────────────────────────────────────────

const TransactionalTable: React.FC = () => (
  <div
    style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
  >
    <table
      className="rpt-table"
      style={{ minWidth: 640, width: '100%', borderCollapse: 'collapse' }}
    >
      <thead>
        <tr>
          <th>Keyword</th>
          <th>Volumen Est.</th>
          <th>CPC Est.</th>
          <th>Competencia</th>
          <th>¿Quién ranquea ahora?</th>
          <th>Empresa objetivo</th>
          <th>Oportunidad</th>
        </tr>
      </thead>
      <tbody>
        {transactionalKeywords.map((row) => (
          <tr key={row.keyword}>
            {/* Keyword */}
            <td style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 500 }}>
              {row.keyword}
            </td>

            {/* Volume with bar */}
            <td>
              <div className="flex items-center gap-2">
                <div
                  className="rpt-vol-bar shrink-0"
                  style={{ width: row.volumeWidth }}
                  aria-hidden="true"
                />
              </div>
            </td>

            {/* CPC */}
            <td style={{ whiteSpace: 'nowrap' }}>{row.cpc}</td>

            {/* Competition stars */}
            <td>
              <span className="rpt-stars">{row.competition ?? '—'}</span>
            </td>

            {/* Current ranker */}
            <td style={{ fontSize: 13, color: 'var(--rpt-muted)' }}>
              {row.currentRanker}
            </td>

            {/* Target company */}
            <td style={{ fontSize: 13 }}>{row.targetCompany}</td>

            {/* Opportunity */}
            <td style={opportunityStyle(row.opportunityLevel)}>
              {row.opportunity}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─── Informational keywords table ────────────────────────────────────────────

const InformationalTable: React.FC = () => (
  <div
    style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
  >
    <table
      className="rpt-table"
      style={{ minWidth: 640, width: '100%', borderCollapse: 'collapse' }}
    >
      <thead>
        <tr>
          <th>Keyword</th>
          <th>Volumen Est.</th>
          <th>CPC Est.</th>
          <th>Dominado por</th>
          <th>Oportunidad de contenido</th>
          <th>Prioridad</th>
        </tr>
      </thead>
      <tbody>
        {informationalKeywords.map((row) => (
          <tr key={row.keyword}>
            {/* Keyword */}
            <td style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 500 }}>
              {row.keyword}
            </td>

            {/* Volume with bar */}
            <td>
              <div className="flex items-center gap-2">
                <div
                  className="rpt-vol-bar shrink-0"
                  style={{ width: row.volumeWidth }}
                  aria-hidden="true"
                />
              </div>
            </td>

            {/* CPC */}
            <td style={{ whiteSpace: 'nowrap' }}>{row.cpc}</td>

            {/* Dominated by */}
            <td style={{ fontSize: 13, color: 'var(--rpt-muted)' }}>
              {row.dominatedBy}
            </td>

            {/* Content opportunity */}
            <td style={{ fontSize: 13 }}>{row.contentOpportunity}</td>

            {/* Priority */}
            <td style={infoPriorityStyle(row.priorityLevel)}>
              {row.priority}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────

const ReportKeywords: React.FC = () => {
  return (
    <section
      id="keywords"
      className="py-12 md:py-16 border-b border-[var(--rpt-border)]"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-16">
        {/* Section label */}
        <div className="text-[11px] font-medium tracking-[0.18em] uppercase text-[var(--rpt-accent)] mb-2">
          INVESTIGACIÓN DE KEYWORDS
        </div>

        {/* Title */}
        <h2 className="report-heading text-2xl md:text-[32px] font-bold leading-[1.15] mb-3">
          Mapa de keywords y brechas de posicionamiento
        </h2>

        {/* Intro */}
        <p className="text-[15px] text-[var(--rpt-muted)] max-w-[680px] mb-10 font-light">
          Análisis de las keywords de mayor valor para el portafolio turístico de
          Roatán, identificando oportunidades no explotadas frente a competidores
          y plataformas OTA que actualmente dominan las SERPs.
        </p>

        {/* Transactional table */}
        <SubLabel>
          Keywords transaccionales — Alta intención de compra
        </SubLabel>
        <TransactionalTable />

        {/* Informational table */}
        <SubLabel className="mt-8">
          Keywords informativos — Alto volumen, baja competencia directa
        </SubLabel>
        <InformationalTable />
      </div>
    </section>
  );
};

export default ReportKeywords;
