import { deliverables } from '@/data/reports/dd-agent-scoping';

const ScopingDeliverables: React.FC = () => {
  return (
    <section id="deliverables" className="py-8 md:py-10">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <h2 className="text-xl md:text-[22px] font-bold text-[#f8fafc] pb-2 mb-4 border-b-2 border-[var(--sc-accent-blue)]">
          10. Deliverables Matrix
        </h2>

        <div className="sc-card sc-card-blue">
          <div className="overflow-x-auto">
            <table className="sc-table">
              <thead>
                <tr>
                  <th>Fáze</th>
                  <th>Deliverable</th>
                  <th>Formát</th>
                  <th>Acceptance Criteria</th>
                  <th>Owner</th>
                </tr>
              </thead>
              <tbody>
                {deliverables.map((row, i) => (
                  <tr
                    key={i}
                    className={row.highlighted ? 'sc-winner' : ''}
                  >
                    <td>{row.faze}</td>
                    <td>{row.deliverable}</td>
                    <td>{row.format}</td>
                    <td className="text-sm">{row.acceptanceCriteria}</td>
                    <td>{row.owner}</td>
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

export default ScopingDeliverables;
