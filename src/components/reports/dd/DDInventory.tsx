import {
  inventoryStats,
  inventoryIntro,
  inventoryRows,
} from '@/data/reports/dd-dataroom-analyza';
import SafeHtml from './SafeHtml';

const DDInventory: React.FC = () => {
  return (
    <section id="inventar" className="py-8 md:py-10">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <h2
          className="text-xl md:text-[22px] font-bold pb-2 mb-4 border-b-2"
          style={{ color: 'var(--dd-text)', borderColor: 'var(--dd-accent-blue)' }}
        >
          1. Inventář dokumentů
        </h2>

        <div className="dd-card dd-card-blue">
          {/* Key metrics row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {inventoryStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="dd-metric">{stat.value}</div>
                <div className="dd-metric-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Section intro with inline HTML (bold, etc.) */}
          <SafeHtml html={inventoryIntro} className="dd-section-intro" />

          {/* Document list table */}
          <div className="overflow-x-auto">
            <table className="dd-table">
              <thead>
                <tr>
                  <th>Složka</th>
                  <th>Soubory</th>
                  <th>Obsah</th>
                  <th>Poznámka</th>
                </tr>
              </thead>
              <tbody>
                {inventoryRows.map((row) => (
                  <tr key={row.folder}>
                    <td className="font-medium whitespace-nowrap">{row.folder}</td>
                    <td className="whitespace-nowrap">{row.files}</td>
                    <td>{row.content}</td>
                    <td>
                      {row.note && (
                        <span className={`dd-badge dd-badge-${row.noteVariant ?? 'gray'}`}>
                          {row.note}
                        </span>
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

export default DDInventory;
