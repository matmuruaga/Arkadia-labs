import { motion } from 'framer-motion';
import { reportMeta } from '@/data/reports/roatan-seo-audit';

const ReportMasthead: React.FC = () => {
  return (
    <section
      className="relative overflow-hidden px-4 py-8 md:px-16 md:py-12 lg:py-[60px] lg:px-16"
      style={{ backgroundColor: 'var(--rpt-ink)', color: 'var(--rpt-paper)' }}
    >
      {/* Decorative watermark — desktop only */}
      <span
        className="pointer-events-none absolute right-[-20px] top-[-20px] hidden select-none md:block"
        style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: '180px',
          fontWeight: 800,
          opacity: 0.04,
          color: 'var(--rpt-paper)',
          lineHeight: 1,
          letterSpacing: '-0.04em',
        }}
        aria-hidden="true"
      >
        ROATÁN
      </span>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 max-w-5xl"
      >
        {/* Label */}
        <p
          className="mb-4 text-[11px] uppercase tracking-[0.18em]"
          style={{ color: 'var(--rpt-accent)' }}
        >
          {reportMeta.label}
        </p>

        {/* H1 */}
        <h1
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(28px, 5vw, 58px)',
            fontWeight: 800,
            lineHeight: 1.05,
            color: 'var(--rpt-paper)',
          }}
        >
          {reportMeta.heading}
          <span style={{ color: 'var(--rpt-accent)' }}>
            {reportMeta.headingAccent}
          </span>
          {reportMeta.headingRest.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < reportMeta.headingRest.split('\n').length - 1 && <br />}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          className="mt-4 text-[16px]"
          style={{ color: 'var(--rpt-paper)', opacity: 0.55 }}
        >
          {reportMeta.subtitle}
        </p>

        {/* Meta stats */}
        <div className="mt-8 border-t border-white/10 pt-8 grid grid-cols-2 gap-x-6 gap-y-5 md:flex md:flex-wrap md:gap-x-10 md:gap-y-4">
          {reportMeta.stats.map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(22px, 3vw, 28px)',
                  color: 'var(--rpt-paper)',
                  lineHeight: 1.1,
                }}
              >
                {stat.value}
              </div>
              <div
                className="mt-0.5 text-[11px] uppercase tracking-wider"
                style={{ color: 'var(--rpt-paper)', opacity: 0.45 }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ReportMasthead;
