import { gapRows, gapSummary } from '@/data/reports/dd-dataroom-analyza';
import SafeHtml from './SafeHtml';

const DDGapAnalysis: React.FC = () => {
  return (
    <section id="gap" className="py-8 md:py-10">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <h2
          className="text-xl md:text-[22px] font-bold pb-2 mb-4 border-b-2"
          style={{ color: 'var(--dd-text)', borderColor: 'var(--dd-accent-blue)' }}
        >
          2. Gap analýza DD sekcí
        </h2>

        <div className="dd-card dd-card-red">
          <div className="overflow-x-auto">
            <table className="dd-table">
              <thead>
                <tr>
                  <th>Sekce</th>
                  <th>Stav</th>
                  <th>Co chybí / poznámka</th>
                  <th>Priorita</th>
                </tr>
              </thead>
              <tbody>
                {gapRows.map((row) => {
                  const rowClass =
                    row.statusVariant === 'green'
                      ? 'dd-winner'
                      : row.statusVariant === 'red'
                      ? 'dd-loser'
                      : '';
                  return (
                    <tr key={row.section} className={rowClass}>
                      <td className="font-medium whitespace-nowrap">{row.section}</td>
                      <td>
                        <span className={`dd-badge dd-badge-${row.statusVariant}`}>
                          {row.status}
                        </span>
                      </td>
                      <td>{row.missing}</td>
                      <td>{row.priority}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Gap summary with inline HTML */}
          <SafeHtml
            html={`<p class="dd-note" style="margin-top:16px;">${gapSummary}</p>`}
            className="mt-4"
          />
        </div>
      </div>
    </section>
  );
};

export default DDGapAnalysis;
