import { cn } from '@/lib/utils';
import type { StatCard } from '@/data/reports/roatan-seo-audit';

interface ReportStatGridProps {
  stats: StatCard[];
}

/** Returns the CSS color value for a given colorClass. */
const getNumberColor = (colorClass?: StatCard['colorClass']): string => {
  switch (colorClass) {
    case 'accent':
      return 'var(--rpt-accent)';
    case 'gold':
      return 'var(--rpt-gold)';
    case 'blue':
      return 'var(--rpt-accent2)';
    default:
      return 'var(--rpt-ink)';
  }
};

const ReportStatGrid: React.FC<ReportStatGridProps> = ({ stats }) => {
  return (
    <div
      className="grid grid-cols-2 gap-px md:grid-cols-4"
      style={{ backgroundColor: 'var(--rpt-border)' }}
    >
      {stats.map((stat, index) => (
        <div
          key={index}
          className={cn(
            'flex flex-col justify-center',
            'px-4 py-5 md:px-6 md:py-7'
          )}
          style={{ backgroundColor: 'var(--rpt-card)' }}
        >
          <div
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(28px, 4vw, 36px)',
              color: getNumberColor(stat.colorClass),
              lineHeight: 1.05,
            }}
          >
            {stat.value}
          </div>
          <p
            className="mt-1.5 text-[13px] leading-snug"
            style={{ color: 'var(--rpt-muted)' }}
          >
            {stat.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReportStatGrid;
