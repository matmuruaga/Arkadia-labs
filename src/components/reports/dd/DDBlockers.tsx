import { blockerRows } from '@/data/reports/dd-dataroom-analyza';

const DDBlockers: React.FC = () => {
  return (
    <section id="blokery" className="py-8 md:py-10">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <h2
          className="text-xl md:text-[22px] font-bold pb-2 mb-4 border-b-2"
          style={{ color: 'var(--dd-text)', borderColor: 'var(--dd-accent-blue)' }}
        >
          12. Akční body a blokery
        </h2>

        <div className="dd-card dd-card-red">
          <div className="overflow-x-auto">
            <table className="dd-table">
              <thead>
                <tr>
                  <th>Bloker</th>
                  <th>Dopad</th>
                  <th>Owner</th>
                  <th>Deadline</th>
                </tr>
              </thead>
              <tbody>
                {blockerRows.map((row) => (
                  <tr key={row.blocker}>
                    <td className="font-medium">{row.blocker}</td>
                    <td>{row.impact}</td>
                    <td className="whitespace-nowrap">{row.owner}</td>
                    <td className="whitespace-nowrap font-semibold">{row.deadline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DDBlockers;
