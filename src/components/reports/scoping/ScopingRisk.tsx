import {
  riskRegister,
  riskRegisterNote,
} from '@/data/reports/dd-agent-scoping';
import type { BadgeVariant, FlagVariant } from '@/data/reports/dd-agent-scoping';

const badgeClass = (variant: BadgeVariant) => `sc-badge sc-badge-${variant}`;
const flagClass = (variant: FlagVariant) => `sc-flag sc-flag-${variant}`;

const ScopingRisk: React.FC = () => {
  return (
    <section id="risk" className="py-8 md:py-10">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <h2 className="text-xl md:text-[22px] font-bold text-[#f8fafc] pb-2 mb-4 border-b-2 border-[var(--sc-accent-blue)]">
          9. Risk Assessment
        </h2>

        <div className="sc-card sc-card-red">
          <h3>Risk Register</h3>
          <div className="overflow-x-auto">
            <table className="sc-table">
              <thead>
                <tr>
                  <th style={{ width: '4%' }}>#</th>
                  <th style={{ width: '22%' }}>Riziko</th>
                  <th style={{ width: '5%' }}>L</th>
                  <th style={{ width: '5%' }}>I</th>
                  <th style={{ width: '8%' }}>Priority</th>
                  <th style={{ width: '30%' }}>Mitigace</th>
                  <th style={{ width: '12%' }}>Owner</th>
                  <th style={{ width: '14%' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {riskRegister.map((risk) => (
                  <tr
                    key={risk.id}
                    className={
                      risk.isHighlight === 'loser'
                        ? 'sc-loser'
                        : risk.isHighlight === 'winner'
                          ? 'sc-winner'
                          : ''
                    }
                  >
                    <td>{risk.id}</td>
                    <td>
                      <strong className="text-[#cbd5e1]">{risk.riziko}</strong>
                    </td>
                    <td className="text-center">{risk.likelihood}</td>
                    <td className="text-center">{risk.impact}</td>
                    <td>
                      <span className={flagClass(risk.priorityFlag.variant)}>
                        {risk.priority}
                      </span>
                    </td>
                    <td className="text-sm">{risk.mitigace}</td>
                    <td className="text-sm">{risk.owner}</td>
                    <td>
                      <span className={badgeClass(risk.status.variant)}>
                        {risk.status.text}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="sc-note">{riskRegisterNote}</p>
        </div>
      </div>
    </section>
  );
};

export default ScopingRisk;
