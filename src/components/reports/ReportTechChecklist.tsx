import { techChecklist } from '@/data/reports/roatan-seo-audit';

/**
 * ReportTechChecklist
 *
 * Renders the universal technical SEO checklist table. This component has no
 * section wrapper — it is designed to be embedded inside ReportSchema's
 * section element, after the schema recommendation cards.
 */
const ReportTechChecklist: React.FC = () => {
  return (
    <>
      {/* Visual separator from schema cards above */}
      <hr
        style={{
          borderTop: '1px solid var(--rpt-border)',
          margin: '2rem 0',
        }}
      />

      {/* Sub-section label */}
      <div
        className="text-[11px] font-semibold uppercase tracking-[0.14em] mb-5"
        style={{ color: 'var(--rpt-muted)' }}
      >
        Checklist técnico universal — Los 7 sitios
      </div>

      {/* Horizontally scrollable table on small viewports */}
      <div className="overflow-x-auto">
        <table className="rpt-table" style={{ minWidth: '900px' }}>
          <thead>
            <tr>
              <th>Tarea Técnica</th>
              <th>Impacto SEO</th>
              <th>Dificultad</th>
              <th>Tiempo Estimado</th>
              <th>Afecta a</th>
            </tr>
          </thead>
          <tbody>
            {techChecklist.map((row, index) => (
              <tr key={index}>
                <td style={{ color: 'var(--rpt-ink)', fontWeight: 500 }}>
                  {row.task}
                </td>
                <td>
                  <span
                    className={`rpt-badge rpt-badge-${row.impact.variant}`}
                  >
                    {row.impact.text}
                  </span>
                </td>
                <td>
                  <span
                    className={`rpt-badge rpt-badge-${row.difficulty.variant}`}
                  >
                    {row.difficulty.text}
                  </span>
                </td>
                <td
                  className="text-[13px]"
                  style={{ color: 'var(--rpt-muted)' }}
                >
                  {row.timeEstimate}
                </td>
                <td
                  className="text-[13px]"
                  style={{ color: 'var(--rpt-muted)' }}
                >
                  {row.affectedCompanies}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReportTechChecklist;
