import { findings } from '@/data/reports/dd-dataroom-analyza';
import SafeHtml from './SafeHtml';

const DDFindings: React.FC = () => {
  return (
    <section id="zjisteni" className="py-8 md:py-10">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <h2
          className="text-xl md:text-[22px] font-bold pb-2 mb-4 border-b-2"
          style={{ color: 'var(--dd-text)', borderColor: 'var(--dd-accent-blue)' }}
        >
          3. Klíčová zjištění
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {findings.map((finding) => (
            <div key={finding.title} className={`dd-card dd-card-${finding.variant}`}>
              <h3
                className="text-base font-bold mb-2"
                style={{ color: 'var(--dd-text)' }}
              >
                {finding.title}
              </h3>
              <SafeHtml
                html={finding.html}
                className="text-sm"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DDFindings;
