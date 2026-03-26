import ReportHighlight from '@/components/reports/ReportHighlight';
import {
  competitors,
  competitorHighlight,
} from '@/data/reports/roatan-seo-audit';
import type { ThreatLevel } from '@/data/reports/roatan-seo-audit';

/** Returns inline style for the threat-level badge. */
const getThreatBadgeStyle = (
  level: ThreatLevel,
): React.CSSProperties => {
  switch (level) {
    case 'high':
      return { backgroundColor: '#fde8e8', color: 'var(--rpt-bad)' };
    case 'medium':
      return { backgroundColor: '#fef3d8', color: '#8a5700' };
    case 'low':
      return { backgroundColor: '#e6f4ed', color: 'var(--rpt-good)' };
  }
};

/** Human-readable threat label. */
const threatLabel: Record<ThreatLevel, string> = {
  high: 'Amenaza alta',
  medium: 'Amenaza media',
  low: 'Amenaza baja',
};

const ReportCompetitors: React.FC = () => {
  return (
    <section
      id="competencia"
      className="py-12 md:py-16 border-b border-[var(--rpt-border)]"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-16">
        {/* Section label */}
        <div className="text-[11px] font-medium tracking-[0.18em] uppercase text-[var(--rpt-accent)] mb-2">
          ANÁLISIS COMPETITIVO
        </div>

        <h2 className="report-heading text-2xl md:text-[32px] font-bold leading-[1.15] mb-3">
          El ecosistema competitivo digital
        </h2>

        <p className="text-[15px] text-[var(--rpt-muted)] max-w-[680px] mb-10 font-light">
          Las OTAs, plataformas de tours y competidores directos capturan el
          tráfico y las comisiones que deberían ir a los sitios auditados. Cada
          competidor tiene debilidades explotables con la estrategia correcta.
        </p>

        {/* Competitor cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {competitors.map((competitor, index) => (
            <div
              key={index}
              className="border border-[var(--rpt-border)] rounded-[2px]"
              style={{
                backgroundColor: 'var(--rpt-card)',
                padding: '20px 22px',
              }}
            >
              {/* Card header */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <span
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 700,
                    fontSize: '14px',
                    color: 'var(--rpt-ink)',
                    lineHeight: 1.3,
                  }}
                >
                  {competitor.name}
                </span>

                {/* Threat badge */}
                <span
                  className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide"
                  style={getThreatBadgeStyle(competitor.threatLevel)}
                >
                  {threatLabel[competitor.threatLevel]}
                </span>
              </div>

              {/* Description */}
              <p
                className="text-[12px] leading-relaxed mb-3"
                style={{ color: 'var(--rpt-muted)' }}
              >
                {competitor.description}
              </p>

              {/* Bullet points */}
              <ul className="space-y-1">
                {competitor.points.map((point, pointIndex) => (
                  <li
                    key={pointIndex}
                    className="flex gap-2 text-[12px] leading-relaxed"
                    style={{ color: 'var(--rpt-muted)' }}
                  >
                    <span
                      className="shrink-0 font-bold"
                      style={{ color: 'var(--rpt-accent)' }}
                      aria-hidden="true"
                    >
                      →
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Strategic highlight */}
        <ReportHighlight html={competitorHighlight} />
      </div>
    </section>
  );
};

export default ReportCompetitors;
