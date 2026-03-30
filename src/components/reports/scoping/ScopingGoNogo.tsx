import { goNogo } from '@/data/reports/dd-agent-scoping';

const ScopingGoNogo: React.FC = () => {
  return (
    <section id="go-nogo" className="py-8 md:py-10">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <h2 className="text-xl md:text-[22px] font-bold text-[#f8fafc] pb-2 mb-4 border-b-2 border-[var(--sc-accent-blue)]">
          11. GO/NO-GO Recommendation
        </h2>

        <div className="sc-rec">
          <h3>Recommendation: {goNogo.recommendation}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* PRO */}
            <div>
              <p className="text-[#86efac] font-semibold text-[15px] mb-2">
                Pro (jít do toho):
              </p>
              <ul style={{ margin: '0 0 0 20px' }}>
                {goNogo.pro.map((item, i) => (
                  <li key={i} className="text-[#e2e8f0] text-sm mb-1">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* CONTRA */}
            <div>
              <p className="text-[#fca5a5] font-semibold text-[15px] mb-2">
                Contra (důvody k opatrnosti):
              </p>
              <ul style={{ margin: '0 0 0 20px' }}>
                {goNogo.contra.map((item, i) => (
                  <li key={i} className="text-[#e2e8f0] text-sm mb-1">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="sc-divider" style={{ background: 'rgba(255,255,255,0.1)' }} />

          <p className="text-[#f8fafc] text-[15px] mt-4 font-semibold">
            Podmínky pro GO:
          </p>
          <ol style={{ margin: '8px 0 0 20px', color: '#e2e8f0' }}>
            {goNogo.goConditions.map((cond) => (
              <li key={cond.number} className="text-sm mb-2">
                <strong className="text-[#f8fafc]">{cond.title}</strong> — {cond.text}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default ScopingGoNogo;
