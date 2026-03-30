import { reportMeta } from '@/data/reports/dd-dataroom-analyza';

const DDHero: React.FC = () => {
  return (
    <header
      className="py-14 md:py-20 px-4 md:px-8 text-center relative overflow-hidden"
      style={{ background: 'var(--dd-hero)' }}
    >
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 600px 400px at 20% 50%, rgba(37,99,235,0.12), transparent), radial-gradient(ellipse 600px 400px at 80% 50%, rgba(124,92,191,0.10), transparent)',
        }}
      />
      <div className="max-w-[1200px] mx-auto relative z-10">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: 'var(--dd-accent-blue)' }}
        >
          {reportMeta.label}
        </p>
        <h1
          className="text-2xl md:text-[32px] font-extrabold leading-snug mb-4"
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
