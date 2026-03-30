import { reportMeta } from '@/data/reports/dd-dataroom-analyza';

const DDHero: React.FC = () => {
  return (
    <header
      className="py-12 px-4 md:px-8 text-center"
      style={{ background: 'var(--dd-hero)' }}
    >
      <div className="max-w-[1200px] mx-auto">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: 'var(--dd-accent-blue)' }}
        >
          {reportMeta.label}
        </p>
        <h1
          className="text-2xl md:text-[28px] font-bold leading-snug mb-3"
          style={{ color: '#fff' }}
        >
          {reportMeta.title}
        </h1>
        <p
          className="text-sm md:text-base"
          style={{ color: '#94a3b8' }}
        >
          {reportMeta.subtitle}
        </p>
      </div>
    </header>
  );
};

export default DDHero;
