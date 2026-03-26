import type { Campaign } from '@/data/reports/roatan-seo-audit';
import { campaigns } from '@/data/reports/roatan-seo-audit';

// ─── Icon background colour map ───────────────────────────────────────────────

/**
 * Maps the `iconBg` identifier from campaign data to a concrete CSS background
 * colour. The data uses short slugs instead of hardcoded colours so the mapping
 * lives here, close to rendering logic.
 */
const iconBgColor = (iconBg: string): string => {
  switch (iconBg) {
    case 'ci-hotel':
      return '#fdf0e8'; // warm amber — hotel/accommodation
    case 'ci-search':
      return '#e8f0fb'; // light blue — search/ads
    case 'ci-remark':
      return '#edf7ed'; // light green — remarketing
    default:
      return '#f3f3f3';
  }
};

const iconBorderColor = (iconBg: string): string => {
  switch (iconBg) {
    case 'ci-hotel':
      return '#f3d4b8';
    case 'ci-search':
      return '#aac4ef';
    case 'ci-remark':
      return '#a8d5a8';
    default:
      return '#e0e0e0';
  }
};

// ─── Single campaign card ─────────────────────────────────────────────────────

const CampaignCard: React.FC<{ campaign: Campaign }> = ({ campaign }) => (
  <div
    className="flex flex-col"
    style={{
      backgroundColor: 'var(--rpt-card)',
      border: '1px solid var(--rpt-border)',
      borderRadius: 2,
      padding: 'clamp(20px, 3vw, 24px)',
    }}
  >
    {/* Card header: icon + title + subtitle */}
    <div className="flex items-start gap-3 mb-3">
      {/* Icon circle */}
      <div
        className="shrink-0 flex items-center justify-center rounded-full text-[18px]"
        style={{
          width: 36,
          height: 36,
          backgroundColor: iconBgColor(campaign.iconBg),
          border: `1px solid ${iconBorderColor(campaign.iconBg)}`,
        }}
        aria-hidden="true"
      >
        {campaign.icon}
      </div>

      {/* Title + subtitle */}
      <div className="min-w-0">
        <div
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 700,
            fontSize: 15,
            color: 'var(--rpt-ink)',
            lineHeight: 1.2,
          }}
        >
          {campaign.title}
        </div>
        <div
          className="mt-0.5 leading-snug"
          style={{ fontSize: 12, color: 'var(--rpt-muted)' }}
        >
          {campaign.subtitle}
        </div>
      </div>
    </div>

    {/* Description */}
    <p
      className="mb-3 leading-relaxed"
      style={{ fontSize: 13, color: 'var(--rpt-muted)' }}
    >
      {campaign.description}
    </p>

    {/* Keyword list */}
    <ul className="mt-auto" style={{ margin: 0, padding: 0, listStyle: 'none' }}>
      {campaign.keywords.map((kw, idx) => (
        <li
          key={kw.keyword}
          className="flex items-center justify-between gap-3 py-2"
          style={{
            borderBottom:
              idx < campaign.keywords.length - 1
                ? '1px solid var(--rpt-border)'
                : 'none',
          }}
        >
          {/* Keyword text */}
          <span style={{ fontSize: 12, color: 'var(--rpt-ink)', flex: 1, minWidth: 0 }}>
            {kw.keyword}
          </span>

          {/* CPC pill */}
          <span
            className="shrink-0 whitespace-nowrap"
            style={{
              fontSize: 11,
              fontWeight: 600,
              padding: '2px 8px',
              backgroundColor: 'var(--rpt-paper)',
              border: '1px solid var(--rpt-border)',
              borderRadius: 9999,
              color: 'var(--rpt-muted)',
            }}
          >
            {kw.cpc}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────

const ReportCampaigns: React.FC = () => {
  return (
    <>
      {/* Section label */}
      <div className="text-[11px] font-medium tracking-[0.18em] uppercase text-[var(--rpt-accent)] mb-2">
        ESTRATEGIA SEM / GOOGLE ADS
      </div>

      {/* Title */}
      <h2 className="report-heading text-2xl md:text-[32px] font-bold leading-[1.15] mb-3">
        Campañas publicitarias recomendadas
      </h2>

      {/* Intro */}
      <p className="text-[15px] text-[var(--rpt-muted)] max-w-[680px] mb-10 font-light">
        Seis tipos de campaña diseñados para capturar la intención de compra en
        cada segmento del portafolio. Ninguna empresa del grupo tiene campañas
        activas detectables — toda la demanda pagada va actualmente a OTAs e
        intermediarios.
      </p>

      {/* Campaign grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.title} campaign={campaign} />
        ))}
      </div>
    </>
  );
};

export default ReportCampaigns;
