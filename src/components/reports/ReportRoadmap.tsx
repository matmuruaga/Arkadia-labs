import ReportCallout from '@/components/reports/ReportCallout';
import {
  roadmapPhases,
  roadmapCallout,
} from '@/data/reports/roatan-seo-audit';

/** Returns phase-specific color tokens for label, circle bg, and circle text. */
const getPhaseColors = (
  phaseNumber: 1 | 2 | 3,
): {
  label: React.CSSProperties;
  circleBg: string;
  circleText: string;
} => {
  switch (phaseNumber) {
    case 1:
      return {
        label: { color: 'var(--rpt-bad)' },
        circleBg: '#fde8e8',
        circleText: 'var(--rpt-bad)',
      };
    case 2:
      return {
        label: { color: 'var(--rpt-warn)' },
        circleBg: '#fef3d8',
        circleText: 'var(--rpt-warn)',
      };
    case 3:
      return {
        label: { color: 'var(--rpt-good)' },
        circleBg: '#e6f4ed',
        circleText: 'var(--rpt-good)',
      };
  }
};

const ReportRoadmap: React.FC = () => {
  return (
    <section
      id="roadmap"
      className="py-12 md:py-16 border-b border-[var(--rpt-border)]"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-16">
        {/* Section label */}
        <div className="text-[11px] font-medium tracking-[0.18em] uppercase text-[var(--rpt-accent)] mb-2">
          PLAN DE ACCIÓN
        </div>

        <h2 className="report-heading text-2xl md:text-[32px] font-bold leading-[1.15] mb-3">
          Hoja de ruta de implementación
        </h2>

        <p className="text-[15px] text-[var(--rpt-muted)] max-w-[680px] mb-10 font-light">
          Un plan de 6 meses dividido en tres fases progresivas. Cada fase
          construye sobre la anterior: primero los cimientos técnicos, luego el
          contenido y las campañas, finalmente la escala de autoridad y presupuesto.
        </p>

        {/* Three-phase grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 border border-[var(--rpt-border)] rounded-[2px] mb-10"
          style={{ backgroundColor: 'var(--rpt-card)' }}
        >
          {roadmapPhases.map((phase, phaseIndex) => {
            const colors = getPhaseColors(phase.phaseNumber);
            const isLastPhase = phaseIndex === roadmapPhases.length - 1;

            return (
              <div
                key={phaseIndex}
                className={[
                  'px-7 py-6 md:px-6',
                  // Desktop: right border on all but last column
                  !isLastPhase
                    ? 'border-b border-[var(--rpt-border)] md:border-b-0 md:border-r md:border-[var(--rpt-border)]'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {/* Phase label */}
                <p
                  className="text-[10px] uppercase tracking-wide font-semibold mb-1"
                  style={colors.label}
                >
                  {phase.label}
                </p>

                {/* Phase title */}
                <h3
                  className="mb-1"
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 700,
                    fontSize: '18px',
                    color: 'var(--rpt-ink)',
                    lineHeight: 1.2,
                  }}
                >
                  {phase.title}
                </h3>

                {/* Timeframe */}
                <p
                  className="text-[12px] mb-4"
                  style={{ color: 'var(--rpt-muted)' }}
                >
                  {phase.timeframe}
                </p>

                {/* Items list */}
                <ul>
                  {phase.items.map((item, itemIndex) => {
                    const isLastItem = itemIndex === phase.items.length - 1;
                    return (
                      <li
                        key={itemIndex}
                        className={[
                          'flex gap-3 items-start py-2.5',
                          !isLastItem
                            ? 'border-b border-[var(--rpt-border)]'
                            : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                      >
                        {/* Numbered circle */}
                        <span
                          className="shrink-0 w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-bold"
                          style={{
                            backgroundColor: colors.circleBg,
                            color: colors.circleText,
                            minWidth: '18px',
                          }}
                          aria-hidden="true"
                        >
                          {item.number}
                        </span>

                        {/* Item text */}
                        <span
                          className="text-[13px] leading-snug"
                          style={{ color: 'var(--rpt-ink)' }}
                        >
                          {item.text}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        {/* ROI callout */}
        <ReportCallout
          icon={roadmapCallout.icon}
          title={roadmapCallout.title}
          text={roadmapCallout.text}
        />
      </div>
    </section>
  );
};

export default ReportRoadmap;
