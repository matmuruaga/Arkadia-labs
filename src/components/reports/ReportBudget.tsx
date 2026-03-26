import ReportHighlight from '@/components/reports/ReportHighlight';
import type { BudgetRow } from '@/data/reports/roatan-seo-audit';
import { budgetData, budgetHighlight } from '@/data/reports/roatan-seo-audit';

// ─── Budget table ─────────────────────────────────────────────────────────────

const BudgetTable: React.FC = () => (
  <div
    style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
  >
    <table
      className="rpt-table"
      style={{ minWidth: 680, width: '100%', borderCollapse: 'collapse' }}
    >
      <thead>
        <tr>
          <th>Empresa</th>
          <th>Presupuesto Inicial/mes</th>
          <th>Presupuesto Alta Temporada</th>
          <th>Tipo de Campaña Principal</th>
          <th>Estrategia de Bidding</th>
          <th>KPI Objetivo</th>
        </tr>
      </thead>
      <tbody>
        {budgetData.map((row: BudgetRow) => (
          <tr key={row.company}>
            {/* Company name — bold */}
            <td style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
              {row.company}
            </td>

            {/* Budgets */}
            <td style={{ whiteSpace: 'nowrap' }}>{row.initialBudget}</td>
            <td style={{ whiteSpace: 'nowrap' }}>{row.highSeasonBudget}</td>

            {/* Campaign type */}
            <td style={{ fontSize: 13, color: 'var(--rpt-muted)' }}>
              {row.campaignType}
            </td>

            {/* Bidding strategy */}
            <td style={{ fontSize: 13 }}>{row.biddingStrategy}</td>

            {/* KPI */}
            <td
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--rpt-good)',
                whiteSpace: 'nowrap',
              }}
            >
              {row.kpiTarget}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────

/**
 * ReportBudget — budget table and geo-targeting highlight.
 *
 * Rendered INSIDE the "sem" section wrapper, after ReportCampaigns.
 * Does not include its own <section> tag.
 */
const ReportBudget: React.FC = () => {
  return (
    <>
      {/* Visual separator */}
      <hr
        className="my-10"
        style={{ border: 'none', borderTop: '1px solid var(--rpt-border)' }}
      />

      {/* Sub-label */}
      <div className="text-[11px] font-medium tracking-[0.18em] uppercase text-[var(--rpt-accent)] mb-3">
        Presupuestos y estrategia de bidding recomendados
      </div>

      {/* Table */}
      <BudgetTable />

      {/* Geo-targeting highlight */}
      <div className="mt-6">
        <ReportHighlight html={budgetHighlight} />
      </div>
    </>
  );
};

export default ReportBudget;
