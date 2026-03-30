import { reportMeta } from '@/data/reports/dd-agent-scoping';

const ScopingHero: React.FC = () => {
  return (
    <div className="px-4 md:px-8 pt-8 pb-4 max-w-[1280px] mx-auto">
      <h1 className="text-2xl md:text-[28px] font-bold text-[#f8fafc] mb-1">
        {reportMeta.title}
        <span
          className="inline-block align-middle ml-2 text-[11px] font-bold text-white tracking-widest uppercase rounded px-2 py-0.5"
          style={{ background: '#dc2626', letterSpacing: '1px' }}
        >
          {reportMeta.confidentialBadge}
        </span>
      </h1>
      <p className="sc-subtitle">{reportMeta.subtitle}</p>
    </div>
  );
};

export default ScopingHero;
