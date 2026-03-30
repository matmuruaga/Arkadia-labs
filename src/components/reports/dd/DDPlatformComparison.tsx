import { platformHeaders, platformComparison } from '@/data/reports/dd-dataroom-analyza';

// Accent colours for each platform column header
const PLATFORM_COLORS = ['#2563eb', '#16a34a', '#9333ea', '#d97706'];

const DDPlatformComparison: React.FC = () => {
  return (
    <section id="platformy" className="py-8 md:py-10">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <h2
          className="text-xl md:text-[22px] font-bold pb-2 mb-4 border-b-2"
          style={{ color: 'var(--dd-text)', borderColor: 'var(--dd-accent-blue)' }}
        >
          6. Porovnání platforem (4 varianty)
        </h2>

        <div className="dd-card">
          <div className="overflow-x-auto">
            <table className="dd-table">
              <thead>
                <tr>
                  <th>Kritérium</th>
                  {platformHeaders.map((header, idx) => (
                    <th key={header} style={{ color: PLATFORM_COLORS[idx] }}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {platformComparison.map((row) => (
                  <tr key={row.criterion}>
                    <td className="font-medium whitespace-nowrap">{row.criterion}</td>
                    {row.values.map((cell, idx) => {
                      const cellClass =
                        cell.highlight === 'winner'
                          ? 'bg-[#f0fdf4]'
                          : cell.highlight === 'loser'
                          ? 'bg-[#fef2f2]'
                          : '';
                      return (
                        <td key={idx} className={cellClass}>
                          {cell.text}
                        </td>
                      );
                    })}
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

export default DDPlatformComparison;
