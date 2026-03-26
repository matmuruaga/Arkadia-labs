import ReportHighlight from '@/components/reports/ReportHighlight';
import {
  scorecardData,
  scorecardHighlight,
  type ScorecardRow,
  type ScorecardBadge,
} from '@/data/reports/roatan-seo-audit';

/** Maps a scoreLevel to the corresponding CSS class from report.css. */
const getScoreClass = (level: ScorecardRow['scoreLevel']): string => {
  switch (level) {
    case 'high':
      return 'score-high';
    case 'mid':
      return 'score-mid';
    case 'low':
      return 'score-low';
  }
};

const BadgeCell: React.FC<{ badge: ScorecardBadge }> = ({ badge }) => (
  <td>
    <span className={`rpt-badge rpt-badge-${badge.variant}`}>{badge.text}</span>
  </td>
);

const ReportScorecard: React.FC = () => {
  return (
    <section
      id="scorecard"
      className="py-12 md:py-16 border-b border-[var(--rpt-border)]"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-16">
        <div className="text-[11px] font-medium tracking-[0.18em] uppercase text-[var(--rpt-accent)] mb-2">
          SCORECARD COMPARATIVO
        </div>

        <h2 className="report-heading text-2xl md:text-[32px] font-bold leading-[1.15] mb-3">
          Ranking general de presencia digital
        </h2>

        <p className="text-[15px] text-[var(--rpt-muted)] max-w-[680px] mb-10 font-light">
          Evaluación de 10 dimensiones técnicas y de contenido para los 7 sitios
          auditados. El score máximo es 100 puntos; el promedio del grupo es 41.
          Las dimensiones miden title tag, meta description, H1 único, soporte
          bilingüe, schema markup, blog/contenido, sitemap, velocidad, y más.
        </p>

        <div
          className="overflow-x-auto mb-6"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <table className="rpt-table" style={{ minWidth: '900px' }}>
            <thead>
              <tr>
                <th>Empresa</th>
                <th>Score</th>
                <th>Title Tag</th>
                <th>Meta Desc</th>
                <th>H1 único</th>
                <th>Bilingüe</th>
                <th>Schema</th>
                <th>Blog</th>
                <th>Sitemap</th>
                <th>Velocidad</th>
                <th>Prioridad</th>
              </tr>
            </thead>
            <tbody>
              {scorecardData.map((row) => (
                <tr key={row.company}>
                  {/* Company */}
                  <td>
                    <div
                      className="font-semibold text-[13px]"
                      style={{ color: 'var(--rpt-ink)' }}
                    >
                      {row.company}
                    </div>
                    <div className="text-[11px]" style={{ color: 'var(--rpt-muted)' }}>
                      {row.url}
                    </div>
                  </td>

                  {/* Score */}
                  <td>
                    <span
                      className={getScoreClass(row.scoreLevel)}
                      style={{
                        fontFamily: 'Syne, sans-serif',
                        fontWeight: 800,
                        fontSize: '22px',
                        lineHeight: 1,
                      }}
                    >
                      {row.score}
                    </span>
                  </td>

                  <BadgeCell badge={row.titleTag} />
                  <BadgeCell badge={row.metaDesc} />
                  <BadgeCell badge={row.h1} />
                  <BadgeCell badge={row.bilingual} />
                  <BadgeCell badge={row.schema} />
                  <BadgeCell badge={row.blog} />
                  <BadgeCell badge={row.sitemap} />
                  <BadgeCell badge={row.speed} />

                  {/* Priority */}
                  <td>
                    <span
                      className={`rpt-priority rpt-priority-${row.priority}`}
                    >
                      {row.priority === 'critical'
                        ? 'Crítica'
                        : row.priority === 'high'
                        ? 'Alta'
                        : 'Media'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ReportHighlight html={scorecardHighlight} />
      </div>
    </section>
  );
};

export default ReportScorecard;
