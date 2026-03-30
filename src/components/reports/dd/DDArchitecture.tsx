import { architectureSections } from '@/data/reports/dd-dataroom-analyza';
import SafeHtml from './SafeHtml';

const DDArchitecture: React.FC = () => {
  return (
    <section id="architektura" className="py-8 md:py-10">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <h2
          className="text-xl md:text-[22px] font-bold pb-2 mb-4 border-b-2"
          style={{ color: 'var(--dd-text)', borderColor: 'var(--dd-accent-blue)' }}
        >
          4. Anti-halucinační architektura
        </h2>

        <div className="grid grid-cols-1 gap-0">
          {architectureSections.map((arch) => (
            <div key={arch.title} className={`dd-card dd-card-${arch.variant}`}>
              <h3
                className="text-base font-bold mb-2"
                style={{ color: 'var(--dd-text)' }}
              >
                {arch.title}
              </h3>
              <SafeHtml
                html={arch.html}
                className="text-sm"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DDArchitecture;
