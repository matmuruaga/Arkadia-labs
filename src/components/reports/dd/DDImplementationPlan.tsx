import { timelineRows, timelineNote } from '@/data/reports/dd-dataroom-analyza';

const DDImplementationPlan: React.FC = () => {
  return (
    <section id="plan" className="py-8 md:py-10">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <h2
          className="text-xl md:text-[22px] font-bold pb-2 mb-4 border-b-2"
          style={{ color: 'var(--dd-text)', borderColor: 'var(--dd-accent-blue)' }}
        >
          9. Implementační plán (7 dní)
        </h2>

        <div className="dd-card dd-card-blue">
          <div className="overflow-x-auto">
            <table className="dd-table">
              <thead>
                <tr>
                  <th>Den</th>
                  <th>Úkol</th>
                  <th>Odpovědnost</th>
                  <th>Output</th>
                </tr>
              </thead>
              <tbody>
                {timelineRows.map((row) => (
                  <tr key={row.day}>
                    <td className="font-medium whitespace-nowrap">{row.day}</td>
                    <td>{row.task}</td>
                    <td className="whitespace-nowrap">{row.responsibility}</td>
                    <td>{row.output}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="dd-note mt-2">{timelineNote}</p>
        </div>
      </div>
    </section>
  );
};

export default DDImplementationPlan;
