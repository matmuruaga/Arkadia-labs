import { schemaRecommendations } from '@/data/reports/roatan-seo-audit';
import ReportTechChecklist from '@/components/reports/ReportTechChecklist';

/**
 * ReportSchema — First part of the "SEO Técnico Avanzado" section.
 * Renders the schema markup recommendations grid.
 * ReportTechChecklist continues after this component inside the same section.
 */
const ReportSchema: React.FC = () => {
  return (
    <section
      id="tecnico"
      className="py-12 md:py-16 border-b border-[var(--rpt-border)]"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-16">
        {/* Section label */}
        <div className="text-[11px] font-medium tracking-[0.18em] uppercase text-[var(--rpt-accent)] mb-2">
          SEO TÉCNICO AVANZADO
        </div>

        <h2 className="report-heading text-2xl md:text-[32px] font-bold leading-[1.15] mb-3">
          Schema markup: el quick win más subestimado
        </h2>

        <p className="text-[15px] text-[var(--rpt-muted)] max-w-[680px] mb-10 font-light">
          Ninguno de los 7 sitios tiene schema markup implementado. Esta omisión
          bloquea los rich snippets de Google — estrellas, precios, horarios — que
          aumentan el CTR un 20–30%. Una tarde de trabajo por sitio puede generar
          resultados visibles en 2–4 semanas.
        </p>

        {/* Schema recommendation cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {schemaRecommendations.map((rec, index) => (
            <div
              key={index}
              className="border border-[var(--rpt-border)] rounded-[2px]"
              style={{ backgroundColor: 'var(--rpt-card)', padding: '20px 22px' }}
            >
              {/* Card title */}
              <h3
                className="mb-1"
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 700,
                  fontSize: '14px',
                  color: 'var(--rpt-ink)',
                  lineHeight: 1.3,
                }}
              >
                {rec.title}
              </h3>

              {/* Schema type — monospace accent */}
              <p
                className="mb-2.5 text-[11px]"
                style={{
                  fontFamily: 'monospace',
                  color: 'var(--rpt-accent)',
                  lineHeight: 1.4,
                }}
              >
                {rec.schemaType}
              </p>

              {/* Properties list */}
              <ul className="space-y-0.5">
                {rec.properties.map((prop, propIndex) => (
                  <li
                    key={propIndex}
                    className="flex gap-1.5 text-[12px] py-0.5"
                    style={{ color: 'var(--rpt-muted)' }}
                  >
                    <span
                      className="shrink-0 font-bold"
                      style={{ color: 'var(--rpt-good)' }}
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span>{prop}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Tech checklist continues in the same section */}
        <ReportTechChecklist />
      </div>
    </section>
  );
};

export default ReportSchema;
