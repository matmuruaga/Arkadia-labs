import { roiCards } from '@/data/reports/dd-dataroom-analyza';
import SafeHtml from './SafeHtml';

const DDRoi: React.FC = () => {
  return (
    <section id="roi" className="py-8 md:py-10">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <h2
          className="text-xl md:text-[22px] font-bold pb-2 mb-4 border-b-2"
          style={{ color: 'var(--dd-text)', borderColor: 'var(--dd-accent-blue)' }}
        >
          11. ROI a přidaná hodnota
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {roiCards.map((card) => (
            <div key={card.title} className={`dd-card dd-card-${card.variant}`}>
              <h3
                className="text-base font-bold mb-2"
                style={{ color: 'var(--dd-text)' }}
              >
                {card.title}
              </h3>
              <SafeHtml html={card.html} className="text-sm mb-3" />
              <p
                className="text-sm font-semibold"
                style={{ color: 'var(--dd-accent-blue)' }}
              >
                {card.highlight}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DDRoi;
