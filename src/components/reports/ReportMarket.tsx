import ReportStatGrid from '@/components/reports/ReportStatGrid';
import ReportCallout from '@/components/reports/ReportCallout';
import ReportHighlight from '@/components/reports/ReportHighlight';
import {
  marketStats,
  marketCallout,
  marketHighlight,
} from '@/data/reports/roatan-seo-audit';

const ReportMarket: React.FC = () => {
  return (
    <section
      id="mercado"
      className="py-12 md:py-16 border-b border-[var(--rpt-border)]"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-16">
        <div className="text-[11px] font-medium tracking-[0.18em] uppercase text-[var(--rpt-accent)] mb-2">
          CONTEXTO DE MERCADO
        </div>

        <h2 className="report-heading text-2xl md:text-[32px] font-bold leading-[1.15] mb-3">
          Roatán: un mercado en auge
          <br />
          con presencia digital amateur
        </h2>

        <p className="text-[15px] text-[var(--rpt-muted)] max-w-[680px] mb-10 font-light">
          Honduras recibió 3.1 millones de visitantes en 2025, con Roatán como el
          principal destino. El mercado crece a doble dígito, los CPCs son
          40–60% más baratos que el Caribe masificado, y ninguna de las 7 empresas
          analizadas tiene presencia digital competitiva.
        </p>

        <div className="mb-8">
          <ReportStatGrid stats={marketStats} />
        </div>

        <div className="mb-6">
          <ReportCallout
            icon={marketCallout.icon}
            title={marketCallout.title}
            text={marketCallout.text}
          />
        </div>

        <ReportHighlight html={marketHighlight} />
      </div>
    </section>
  );
};

export default ReportMarket;
