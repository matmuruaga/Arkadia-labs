import { scoringRows, scoringNote } from '@/data/reports/dd-dataroom-analyza';

const SCORE_HEADERS = [
  'Varianta',
  'Obtížnost realizace',
  'Kvalita výstupů',
  'Dopad na klienta',
  'Compliance',
  'Rychlost do 7. 4.',
  'Celkem',
];

const DDScoring: React.FC = () => {
  return (
    <section id="scoring" className="py-8 md:py-10">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <h2
          className="text-xl md:text-[22px] font-bold pb-2 mb-4 border-b-2"
          style={{ color: 'var(--dd-text)', borderColor: 'var(--dd-accent-blue)' }}
        >
          7. Scoring matice variant
        </h2>

        <div className="dd-card">
          <div className="overflow-x-auto">
            <table className="dd-table">
              <thead>
                <tr>
                  {SCORE_HEADERS.map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scoringRows.map((row) => (
                  <tr key={row.variant} className={row.highlight ? 'dd-winner' : ''}>
                    <td className="font-medium whitespace-nowrap">{row.variant}</td>
                    {row.scores.map((score, idx) => (
                      <td key={idx} className="text-center">
                        {score}
                      </td>
                    ))}
                    <td className="text-center font-bold">{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="dd-note mt-2">{scoringNote}</p>
        </div>
      </div>
    </section>
  );
};

export default DDScoring;
