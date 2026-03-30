import {
  tShirtSizing,
  effortBreakdown,
  effortNote,
} from '@/data/reports/dd-agent-scoping';

const ScopingEffort: React.FC = () => {
  return (
    <section id="effort" className="py-8 md:py-10">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <h2 className="text-xl md:text-[22px] font-bold text-[#f8fafc] pb-2 mb-4 border-b-2 border-[var(--sc-accent-blue)]">
          6. Effort &amp; Timeline
        </h2>

        {/* T-Shirt Sizing */}
        <div className="sc-card sc-card-blue">
          <h3>T-Shirt Sizing</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            {tShirtSizing.map((card) => (
              <div key={card.label} className="sc-card text-center" style={{ margin: 0 }}>
                <div className="sc-metric-sm" style={{ color: card.color }}>
                  {card.value}
                </div>
                <div className="sc-metric-label">{card.label}</div>
                <p className="sc-note mt-1">{card.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Effort Breakdown Table */}
        <div className="sc-card sc-card-green">
          <h3>Bottom-Up Effort Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="sc-table">
              <thead>
                <tr>
                  <th>Fáze</th>
                  <th>Aktivita</th>
                  <th>Hodiny (range)</th>
                  <th>Cena (2 000 CZK/h)</th>
                </tr>
              </thead>
              <tbody>
                {effortBreakdown.map((row, i) => {
                  if (row.isTotal) {
                    return (
                      <tr
                        key={i}
                        style={{
                          background: 'rgba(34, 197, 94, 0.15)',
                          fontWeight: 700,
                          fontSize: '15px',
                        }}
                      >
                        <td colSpan={2} style={{ textAlign: 'right' }}>
                          <strong className="text-[#f8fafc]">TOTAL (s bufferem)</strong>
                        </td>
                        <td><strong>{row.hoursRange}</strong></td>
                        <td><strong>{row.cenaRange}</strong></td>
                      </tr>
                    );
                  }

                  if (row.isBuffer) {
                    return (
                      <tr key={i} style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                        <td colSpan={2} style={{ textAlign: 'right', fontWeight: 700 }}>
                          15% Unknown Buffer
                        </td>
                        <td><strong>{row.hoursRange}</strong></td>
                        <td><strong>{row.cenaRange}</strong></td>
                      </tr>
                    );
                  }

                  if (row.isSubtotal) {
                    return (
                      <tr key={i}>
                        <td colSpan={2} style={{ textAlign: 'right', fontWeight: 700 }}>
                          <strong className="text-[#f8fafc]">{row.activity}</strong>
                        </td>
                        <td><strong>{row.hoursRange}</strong></td>
                        <td><strong>{row.cenaRange}</strong></td>
                      </tr>
                    );
                  }

                  return (
                    <tr
                      key={i}
                      style={row.phaseColor ? { background: row.phaseColor } : undefined}
                    >
                      <td>
                        {row.phaseLabel && (
                          <strong className="text-[#f8fafc] whitespace-pre-line">
                            {row.phaseLabel}
                          </strong>
                        )}
                      </td>
                      <td>{row.activity}</td>
                      <td>{row.hoursRange}</td>
                      <td>{row.cenaRange}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="sc-note">
            <strong>Zaokrouhleno:</strong>{' '}
            {effortNote.replace('Zaokrouhleno: ', '')}
          </p>
        </div>

        {/* Stress Test */}
        <div className="sc-callout sc-callout-red">
          <h3 style={{ color: '#fca5a5', marginTop: 0 }}>
            Stress-test: Co když přibydou dokumenty?
          </h3>
          <p className="text-[#cbd5e1] text-sm leading-relaxed">
            Aktuální dataset: 52 souborů, 454 stran, 42 MB. Ale 8/13 DD sekcí je prázdných.
            Pokud klient dodá Financials, Permitting, Business Plan a další — objem se může{' '}
            <strong className="text-[#f8fafc]">zdvojnásobit až ztrojnásobit</strong>{' '}
            (100–150 souborů, 1000+ stran).
          </p>
          <p className="text-[#cbd5e1] text-sm leading-relaxed mt-2">
            Impact na Phase 1: +15–25h extra (sumarizace nových sekcí). Impact na Phase 2: +10–20h
            (větší vector DB, více chunkování).{' '}
            <strong className="text-[#f8fafc]">Worst case total: 180–270h / 360–540K CZK.</strong>
          </p>
          <p className="text-[#cbd5e1] text-sm leading-relaxed mt-2">
            Mitigace: T&M model — fakturujeme skutečně odpracované hodiny. Klient ví, že víc
            dokumentů = víc práce.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ScopingEffort;
