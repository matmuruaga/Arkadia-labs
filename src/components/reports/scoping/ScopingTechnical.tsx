import {
  stackMapping,
  architectureDecisionRecords,
} from '@/data/reports/dd-agent-scoping';

const ScopingTechnical: React.FC = () => {
  return (
    <section id="technical" className="py-8 md:py-10">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <h2 className="text-xl md:text-[22px] font-bold text-[#f8fafc] pb-2 mb-4 border-b-2 border-[var(--sc-accent-blue)]">
          5. Technical Architecture
        </h2>

        {/* Stack Mapping */}
        <div className="sc-card sc-card-blue">
          <h3>Stack Mapping</h3>
          <div className="overflow-x-auto">
            <table className="sc-table">
              <thead>
                <tr>
                  <th>Layer</th>
                  <th>Technologie</th>
                  <th>Poznámka</th>
                </tr>
              </thead>
              <tbody>
                {stackMapping.map((row) => (
                  <tr key={row.layer}>
                    <td>
                      <strong className="text-[#cbd5e1]">{row.layer}</strong>
                    </td>
                    <td>{row.technologie}</td>
                    <td>{row.poznamka}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ADRs */}
        <div className="sc-card sc-card-yellow">
          <h3>Architecture Decision Records</h3>
          <div className="space-y-4">
            {architectureDecisionRecords.map((adr, i) => (
              <div key={adr.id}>
                {i > 0 && <div className="sc-divider" />}
                <p className="text-[#f8fafc] font-semibold text-sm mb-2">
                  <strong>{adr.id}: {adr.title}</strong>
                </p>
                <p className="text-[#cbd5e1] text-sm leading-relaxed">{adr.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScopingTechnical;
