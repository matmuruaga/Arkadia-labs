import { ocrRows, ocrNote } from '@/data/reports/dd-dataroom-analyza';

const DDOcr: React.FC = () => {
  return (
    <section id="ocr" className="py-8 md:py-10">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <h2
          className="text-xl md:text-[22px] font-bold pb-2 mb-4 border-b-2"
          style={{ color: 'var(--dd-text)', borderColor: 'var(--dd-accent-blue)' }}
        >
          5. OCR výzva — 163stránková rámcová smlouva (SKEN)
        </h2>

        <div className="dd-card dd-card-red">
          <div className="overflow-x-auto">
            <table className="dd-table">
              <thead>
                <tr>
                  <th>Platforma</th>
                  <th>Schopnosti OCR</th>
                  <th>Kvalita češtiny</th>
                </tr>
              </thead>
              <tbody>
                {ocrRows.map((row) => {
                  const rowClass =
                    row.highlight === 'winner'
                      ? 'dd-winner'
                      : row.highlight === 'loser'
                      ? 'dd-loser'
                      : '';
                  return (
                    <tr key={row.platform} className={rowClass}>
                      <td className="font-medium whitespace-nowrap">{row.platform}</td>
                      <td>{row.capabilities}</td>
                      <td>{row.czechQuality}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="dd-note mt-2">{ocrNote}</p>
        </div>
      </div>
    </section>
  );
};

export default DDOcr;
