import { nextSteps } from '@/data/reports/dd-agent-scoping';

const ScopingNextSteps: React.FC = () => {
  return (
    <section id="next-steps" className="py-8 md:py-10">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <h2 className="text-xl md:text-[22px] font-bold text-[#f8fafc] pb-2 mb-4 border-b-2 border-[var(--sc-accent-blue)]">
          12. Next Steps
        </h2>

        <div className="sc-card sc-card-green">
          <div className="overflow-x-auto">
            <table className="sc-table">
              <thead>
                <tr>
                  <th style={{ width: '4%' }}>#</th>
                  <th>Akce</th>
                  <th style={{ width: '18%' }}>Owner</th>
                  <th style={{ width: '15%' }}>Deadline</th>
                </tr>
              </thead>
              <tbody>
                {nextSteps.map((step) => (
                  <tr
                    key={step.number}
                    style={
                      step.isKeyDeadline
                        ? { background: 'rgba(34, 197, 94, 0.12)' }
                        : undefined
                    }
                  >
                    <td>{step.number}</td>
                    <td>{step.akce}</td>
                    <td>{step.owner}</td>
                    <td>
                      {step.isKeyDeadline ? (
                        <strong className="text-[#86efac]">{step.deadline}</strong>
                      ) : (
                        step.deadline
                      )}
                    </td>
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

export default ScopingNextSteps;
