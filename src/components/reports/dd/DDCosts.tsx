import { costRows, costNote } from '@/data/reports/dd-dataroom-analyza';

const DDCosts: React.FC = () => {
  return (
    <section id="naklady" className="py-8 md:py-10">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <h2
          className="text-xl md:text-[22px] font-bold pb-2 mb-4 border-b-2"
          style={{ color: 'var(--dd-text)', borderColor: 'var(--dd-accent-blue)' }}
        >
          10. Odhad nákladů
        </h2>

        <div className="dd-card dd-card-green">
          <div className="overflow-x-auto">
            <table className="dd-table">
              <thead>
                <tr>
                  <th>Fáze</th>
                  <th>Rozsah prací</th>
                  <th>Hodiny</th>
                  <th>Cena (Kč)</th>
                </tr>
              </thead>
              <tbody>
                {costRows.map((row) => (
                  <tr
                    key={row.phase}
                    className={row.isTotal ? 'dd-winner font-bold' : ''}
                  >
                    <td className="font-medium whitespace-nowrap">{row.phase}</td>
                    <td>{row.scope}</td>
                    <td className="whitespace-nowrap">{row.hours}</td>
                    <td className="whitespace-nowrap font-semibold">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="dd-note mt-2">{costNote}</p>
        </div>
      </div>
    </section>
  );
};

export default DDCosts;
