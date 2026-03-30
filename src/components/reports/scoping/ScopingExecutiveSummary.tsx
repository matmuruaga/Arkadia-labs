import {
  executiveSummaryIntro,
  executiveSummaryMetrics,
  executiveSummaryFlag,
  executiveSummaryRecommendation,
} from '@/data/reports/dd-agent-scoping';

const flagClass = (variant: string) => {
  if (variant === 'yellow') return 'sc-flag sc-flag-yellow';
  if (variant === 'green') return 'sc-flag sc-flag-green';
  return 'sc-flag sc-flag-red';
};

const ScopingExecutiveSummary: React.FC = () => {
  const metrics = [
    executiveSummaryMetrics.compositeScore,
    executiveSummaryMetrics.effortRange,
    executiveSummaryMetrics.budgetRange,
    executiveSummaryMetrics.daysToDeadline,
  ];

  return (
    <section id="executive-summary" className="py-8 md:py-10">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <h2 className="text-xl md:text-[22px] font-bold text-[#f8fafc] pb-2 mb-4 border-b-2 border-[var(--sc-accent-blue)]">
          1. Executive Summary
        </h2>

        <div className="sc-card sc-card-blue">
          <p className="text-base text-[#f8fafc] mb-4">{executiveSummaryIntro}</p>

          {/* 4 metric cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-5">
            {metrics.map((m, i) => (
              <div key={i} className="sc-card text-center" style={{ margin: 0 }}>
                <div className="sc-metric">{m.value}</div>
                <div className="sc-metric-label">{m.label}</div>
                {i === 0 && (
                  <div className="mt-2 flex justify-center">
                    <span className={flagClass(executiveSummaryFlag.variant)}>
                      {executiveSummaryFlag.text}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <p>
            <strong className="text-[#f8fafc]">Doporučení:</strong>{' '}
            {executiveSummaryRecommendation}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ScopingExecutiveSummary;
