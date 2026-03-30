import {
  budgetContext,
  budgetContextNote,
  tmModel,
  tmModelReasoning,
  hybridPricing,
  hybridPricingNote,
} from '@/data/reports/dd-agent-scoping';
import type { FlagVariant } from '@/data/reports/dd-agent-scoping';

const flagClass = (variant: FlagVariant) => `sc-flag sc-flag-${variant}`;

const ScopingPricing: React.FC = () => {
  return (
    <section id="pricing" className="py-8 md:py-10">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <h2 className="text-xl md:text-[22px] font-bold text-[#f8fafc] pb-2 mb-4 border-b-2 border-[var(--sc-accent-blue)]">
          7. Pricing Strategy
        </h2>

        {/* Budget Context */}
        <div className="sc-card sc-card-blue">
          <h3>Budget Context</h3>
          <div className="overflow-x-auto">
            <table className="sc-table">
              <thead>
                <tr>
                  <th>Parametr</th>
                  <th>Hodnota</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {budgetContext.map((row) => (
                  <tr key={row.parametr}>
                    <td>{row.parametr}</td>
                    <td>{row.hodnota}</td>
                    <td>
                      <span className={flagClass(row.flag.variant)}>{row.flag.text}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="sc-note">
            <strong>Poznámka:</strong> {budgetContextNote}
          </p>
        </div>

        {/* T&M Model */}
        <div className="sc-card sc-card-green">
          <h3>Doporučený model: T&amp;M</h3>
          <div className="overflow-x-auto">
            <table className="sc-table">
              <thead>
                <tr>
                  <th>Parametr</th>
                  <th>Hodnota</th>
                </tr>
              </thead>
              <tbody>
                {tmModel.map((row) => (
                  <tr key={row.parametr}>
                    <td>{row.parametr}</td>
                    <td>{row.hodnota}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[#cbd5e1] text-sm font-semibold mt-3">
            Proč T&amp;M a ne fixed price:
          </p>
          <ul className="mt-1">
            {tmModelReasoning.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Hybrid Pricing */}
        <div className="sc-card sc-card-gray">
          <h3>Alternativa: Hybrid (Phase 1 fixed + Phase 2–4 T&amp;M)</h3>
          <div className="overflow-x-auto">
            <table className="sc-table">
              <thead>
                <tr>
                  <th>Segment</th>
                  <th>Model</th>
                  <th>Cena</th>
                </tr>
              </thead>
              <tbody>
                {hybridPricing.map((row, i) => (
                  <tr
                    key={i}
                    style={row.isBold ? { fontWeight: 700 } : undefined}
                  >
                    <td>
                      {row.isBold ? (
                        <strong className="text-[#f8fafc]">{row.segment}</strong>
                      ) : (
                        row.segment
                      )}
                    </td>
                    <td>{row.model}</td>
                    <td>
                      {row.isBold ? (
                        <strong className="text-[#f8fafc]">{row.cena}</strong>
                      ) : (
                        row.cena
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="sc-note">{hybridPricingNote}</p>
        </div>
      </div>
    </section>
  );
};

export default ScopingPricing;
