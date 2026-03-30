import {
  companyProfile,
  maTrackRecord,
  maTrackRecordNote,
  decisionMakers,
  decisionMakersNote,
  digitalMaturityText,
} from '@/data/reports/dd-agent-scoping';

const ScopingProspect: React.FC = () => {
  return (
    <section id="prospect-context" className="py-8 md:py-10">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <h2 className="text-xl md:text-[22px] font-bold text-[#f8fafc] pb-2 mb-4 border-b-2 border-[var(--sc-accent-blue)]">
          2. Prospect &amp; Company Intelligence
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Company Profile */}
          <div className="sc-card sc-card-blue">
            <h3>Company Profile</h3>
            <div className="overflow-x-auto">
              <table className="sc-table">
                <tbody>
                  {companyProfile.map((row) => (
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
          </div>

          {/* M&A Track Record */}
          <div className="sc-card sc-card-purple">
            <h3>M&amp;A Track Record (veřejně ověřeno)</h3>
            <div className="overflow-x-auto">
              <table className="sc-table">
                <thead>
                  <tr>
                    <th>Deal</th>
                    <th>Rok</th>
                    <th>Poznámka</th>
                  </tr>
                </thead>
                <tbody>
                  {maTrackRecord.map((row) => (
                    <tr key={row.deal}>
                      <td>{row.deal}</td>
                      <td>{row.rok}</td>
                      <td>{row.poznamka}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="sc-note">{maTrackRecordNote}</p>
          </div>
        </div>

        {/* Decision Makers */}
        <div className="sc-card sc-card-yellow">
          <h3>Decision-Makers &amp; Buying Committee</h3>
          <div className="overflow-x-auto">
            <table className="sc-table">
              <thead>
                <tr>
                  <th>Osoba</th>
                  <th>Role</th>
                  <th>Relevance pro DD Agent</th>
                </tr>
              </thead>
              <tbody>
                {decisionMakers.map((dm) => (
                  <tr key={dm.name}>
                    <td>
                      <strong className="text-[#cbd5e1]">{dm.name}</strong>
                    </td>
                    <td>{dm.role}</td>
                    <td>{dm.relevance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="sc-note">
            <strong className="text-[#fde68a]">Pozor:</strong>{' '}
            {decisionMakersNote.replace('Pozor: ', '')}
          </p>
        </div>

        {/* Digital Maturity */}
        <div className="sc-card sc-card-gray">
          <h3>Digital Maturity Assessment</h3>
          <p className="text-[#cbd5e1] text-sm leading-relaxed">{digitalMaturityText}</p>
        </div>
      </div>
    </section>
  );
};

export default ScopingProspect;
