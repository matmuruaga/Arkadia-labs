import {
  projectPhases,
  functionalRequirements,
  nonFunctionalRequirements,
  outOfScope,
  assumptionsDependencies,
} from '@/data/reports/dd-agent-scoping';
import type { BadgeVariant } from '@/data/reports/dd-agent-scoping';

const badgeClass = (variant: BadgeVariant) => `sc-badge sc-badge-${variant}`;

const ScopingScope: React.FC = () => {
  return (
    <section id="scope" className="py-8 md:py-10">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <h2 className="text-xl md:text-[22px] font-bold text-[#f8fafc] pb-2 mb-4 border-b-2 border-[var(--sc-accent-blue)]">
          3. Scope Summary
        </h2>

        {/* Project Phases */}
        <div className="sc-card sc-card-blue">
          <h3>Project Objectives</h3>
          <p className="text-[#cbd5e1] text-sm mb-3">
            Vybudovat AI-powered sell-side DD dataroom pro transakci Nový Zeleneč (Progresus → PPF). Čtyři fáze:
          </p>
          <div className="overflow-x-auto">
            <table className="sc-table">
              <thead>
                <tr>
                  <th>Fáze</th>
                  <th>Popis</th>
                  <th>Priorita</th>
                  <th>Deadline</th>
                </tr>
              </thead>
              <tbody>
                {projectPhases.map((phase) => (
                  <tr
                    key={phase.phase}
                    className={phase.highlighted ? 'sc-winner' : ''}
                  >
                    <td>
                      <strong className="text-[#cbd5e1]">{phase.phase}</strong>
                    </td>
                    <td>{phase.description}</td>
                    <td>
                      <span className={badgeClass(phase.priority.variant)}>
                        {phase.priority.text}
                      </span>
                    </td>
                    <td>
                      {phase.highlighted ? (
                        <strong className="text-[#f8fafc]">{phase.deadline}</strong>
                      ) : (
                        phase.deadline
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Functional Requirements */}
        <div className="sc-card sc-card-gray">
          <h3>Core Functional Requirements</h3>
          <div className="overflow-x-auto">
            <table className="sc-table">
              <thead>
                <tr>
                  <th>Kategorie</th>
                  <th>Requirement</th>
                  <th>Fáze</th>
                </tr>
              </thead>
              <tbody>
                {functionalRequirements.map((req, i) => (
                  <tr key={i}>
                    <td>{req.kategorie}</td>
                    <td>{req.requirement}</td>
                    <td className="text-center font-semibold">{req.faze}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Non-Functional Requirements */}
        <div className="sc-card sc-card-yellow">
          <h3>Non-Functional Requirements</h3>
          <div className="overflow-x-auto">
            <table className="sc-table">
              <thead>
                <tr>
                  <th>Requirement</th>
                  <th>Specifikace</th>
                  <th>Dopad</th>
                </tr>
              </thead>
              <tbody>
                {nonFunctionalRequirements.map((req) => (
                  <tr key={req.requirement}>
                    <td>
                      <strong className="text-[#cbd5e1]">{req.requirement}</strong>
                    </td>
                    <td>{req.specifikace}</td>
                    <td>{req.dopad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Out of Scope */}
        <div className="sc-card sc-card-red">
          <h3>Out of Scope</h3>
          <ul>
            {outOfScope.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Assumptions & Dependencies */}
        <div className="sc-card sc-card-yellow">
          <h3>Assumptions &amp; Dependencies</h3>
          <ul>
            {assumptionsDependencies.map((item) => (
              <li key={item.id}>
                <strong className="text-[#fde68a]">{item.id}:</strong> {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ScopingScope;
