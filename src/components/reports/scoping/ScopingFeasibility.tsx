import {
  feasibilityDimensions,
  compositeFeasibility,
} from '@/data/reports/dd-agent-scoping';
import type { BadgeVariant } from '@/data/reports/dd-agent-scoping';

const cardColorClass = (variant: BadgeVariant) => {
  const map: Record<BadgeVariant, string> = {
    blue: 'sc-card-blue',
    green: 'sc-card-green',
    yellow: 'sc-card-yellow',
    purple: 'sc-card-purple',
    red: 'sc-card-red',
    gray: 'sc-card-gray',
  };
  return map[variant] ?? 'sc-card-blue';
};

const badgeClass = (variant: BadgeVariant) => `sc-badge sc-badge-${variant}`;

const flagClass = (variant: string) => `sc-flag sc-flag-${variant}`;

const ScopingFeasibility: React.FC = () => {
  return (
    <section id="feasibility" className="py-8 md:py-10">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <h2 className="text-xl md:text-[22px] font-bold text-[#f8fafc] pb-2 mb-4 border-b-2 border-[var(--sc-accent-blue)]">
          4. Feasibility Assessment
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {feasibilityDimensions.map((dim) => (
            <div
              key={dim.title}
              className={`sc-card ${cardColorClass(dim.badge.variant)}`}
            >
              <h3>
                {dim.title}{' '}
                <span className={badgeClass(dim.badge.variant)}>{dim.badge.text}</span>
              </h3>
              {/* Score bar */}
              <div className="sc-score-bar">
                <div
                  className="sc-score-fill"
                  style={{
                    width: `${dim.score * 10}%`,
                    background: dim.scoreBarColor,
                  }}
                />
              </div>
              <p className="text-[#cbd5e1] text-sm mt-3 leading-relaxed">
                {dim.description}
              </p>
              {dim.note && <p className="sc-note">{dim.note}</p>}
            </div>
          ))}
        </div>

        {/* Composite Score */}
        <div className="sc-rec">
          <h3>Composite Feasibility Score</h3>
          <div className="flex items-center gap-6 my-4 flex-wrap">
            <div className="text-center shrink-0">
              <div className="sc-metric" style={{ fontSize: '48px' }}>
                {compositeFeasibility.score.toFixed(1)}
              </div>
              <div className="sc-metric-label">/ 10</div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#e2e8f0] text-sm leading-relaxed">
                <strong>{compositeFeasibility.formula}</strong>
              </p>
              <p className="text-[#94a3b8] text-sm mt-2">
                Interpretace:{' '}
                <span className={flagClass(compositeFeasibility.flag.variant)}>
                  {compositeFeasibility.flag.text}
                </span>
              </p>
              <p className="text-[#94a3b8] text-sm mt-2 leading-relaxed">
                {compositeFeasibility.interpretation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScopingFeasibility;
