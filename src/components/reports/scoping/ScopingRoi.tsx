import {
  clientRoi,
  clientRoiComment,
  roiDimensions,
  strategicValueArkadia,
  strategicValueNote,
} from '@/data/reports/dd-agent-scoping';

const ScopingRoi: React.FC = () => {
  return (
    <section id="roi" className="py-8 md:py-10">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <h2 className="text-xl md:text-[22px] font-bold text-[#f8fafc] pb-2 mb-4 border-b-2 border-[var(--sc-accent-blue)]">
          8. ROI Projection
        </h2>

        {/* Client ROI */}
        <div className="sc-card sc-card-green">
          <h3>Client ROI — Conservative Case</h3>
          <div className="overflow-x-auto">
            <table className="sc-table">
              <tbody>
                {clientRoi.map((row) => (
                  <tr key={row.label}>
                    <td>
                      <strong className="text-[#cbd5e1]">{row.label}</strong>
                    </td>
                    <td>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[#cbd5e1] text-sm font-semibold mt-4">
            Upřímný komentář k ROI:
          </p>
          <p className="text-[#cbd5e1] text-sm leading-relaxed mt-1">
            {clientRoiComment}
          </p>

          <p className="text-[#cbd5e1] text-sm mt-3 font-semibold">
            Reálně jsou tři ROI dimenze:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
            {roiDimensions.map((dim) => (
              <div key={dim.type} className="sc-card" style={{ margin: 0 }}>
                <div className="text-[#94a3b8] text-xs font-semibold uppercase tracking-wider mb-1">
                  {dim.label}
                </div>
                <p className="text-[#cbd5e1] text-sm leading-relaxed">
                  {dim.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic Value for Able + Arkadia */}
        <div className="sc-card sc-card-blue">
          <h3>Strategická hodnota pro Able + Arkadia</h3>
          <div className="overflow-x-auto">
            <table className="sc-table">
              <tbody>
                {strategicValueArkadia.map((row) => (
                  <tr key={row.label}>
                    <td>
                      <strong className="text-[#cbd5e1]">{row.label}</strong>
                    </td>
                    <td>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="sc-note">
            <strong>Bottom line:</strong>{' '}
            {strategicValueNote.replace('Bottom line: ', '')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ScopingRoi;
