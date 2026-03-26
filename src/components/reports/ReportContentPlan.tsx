import ReportHighlight from '@/components/reports/ReportHighlight';
import {
  contentPlan,
  contentHighlight,
} from '@/data/reports/roatan-seo-audit';
import type { ContentTag } from '@/data/reports/roatan-seo-audit';

/** Inline style for each content-type tag badge. */
const getTagStyle = (tag: ContentTag): React.CSSProperties => {
  switch (tag) {
    case 'evergreen':
      return { backgroundColor: '#e6f4ed', color: 'var(--rpt-good)' };
    case 'seasonal':
      return { backgroundColor: '#fff3e0', color: '#c07a00' };
    case 'transactional':
      return { backgroundColor: '#e8f0fe', color: 'var(--rpt-accent2)' };
    case 'cruise':
      return { backgroundColor: '#fce4ec', color: '#b71c5d' };
  }
};

/** Human-readable tag label. */
const tagLabel: Record<ContentTag, string> = {
  evergreen: 'Evergreen',
  seasonal: 'Estacional',
  transactional: 'Transaccional',
  cruise: 'Cruceros',
};

const ReportContentPlan: React.FC = () => {
  return (
    <section
      id="contenido"
      className="py-12 md:py-16 border-b border-[var(--rpt-border)]"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-16">
        {/* Section label */}
        <div className="text-[11px] font-medium tracking-[0.18em] uppercase text-[var(--rpt-accent)] mb-2">
          PLAN DE CONTENIDO SEO
        </div>

        <h2 className="report-heading text-2xl md:text-[32px] font-bold leading-[1.15] mb-3">
          Los {contentPlan.length} artículos que transformarían el tráfico
          orgánico
        </h2>

        <p className="text-[15px] text-[var(--rpt-muted)] max-w-[680px] mb-10 font-light">
          Cada artículo está seleccionado por volumen de búsqueda, baja
          competencia directa y potencial de conversión. Combinados, estas piezas
          pueden capturar cientos de miles de visitas anuales que hoy van a blogs
          sin interés comercial.
        </p>

        {/* Content cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-6">
          {contentPlan.map((article, index) => (
            <div
              key={index}
              className="border border-[var(--rpt-border)] rounded-[2px] flex flex-col"
              style={{ backgroundColor: 'var(--rpt-card)', padding: '22px' }}
            >
              {/* Content type tag */}
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.15em] px-2 py-0.5 rounded-sm inline-block mb-3 self-start"
                style={getTagStyle(article.tag)}
              >
                {tagLabel[article.tag]}
              </span>

              {/* Article title */}
              <h3
                className="leading-tight mb-2"
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 700,
                  fontSize: '14px',
                  color: 'var(--rpt-ink)',
                }}
              >
                {article.title}
              </h3>

              {/* Description */}
              <p
                className="text-[12px] leading-relaxed mb-2.5 flex-1"
                style={{ color: 'var(--rpt-muted)' }}
              >
                {article.description}
              </p>

              {/* Meta row */}
              <div
                className="flex gap-3 flex-wrap text-[11px]"
                style={{ color: 'var(--rpt-muted)' }}
              >
                <span>
                  Volumen:{' '}
                  <strong style={{ color: 'var(--rpt-ink)' }}>
                    {article.volume}
                  </strong>
                </span>
                <span>
                  Destino:{' '}
                  <strong style={{ color: 'var(--rpt-ink)' }}>
                    {article.destination}
                  </strong>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Strategy highlight */}
        <ReportHighlight html={contentHighlight} />
      </div>
    </section>
  );
};

export default ReportContentPlan;
