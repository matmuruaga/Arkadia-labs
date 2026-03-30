import { recommendation } from '@/data/reports/dd-dataroom-analyza';
import SafeHtml from './SafeHtml';

const DDRecommendation: React.FC = () => {
  return (
    <section id="doporuceni" className="py-8 md:py-10">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <h2
          className="text-xl md:text-[22px] font-bold pb-2 mb-4 border-b-2"
          style={{ color: 'var(--dd-text)', borderColor: 'var(--dd-accent-blue)' }}
        >
          8. Doporučení
        </h2>

        {/* Main recommendation — blue gradient card */}
        <div className="dd-rec">
          <SafeHtml html={recommendation.mainHtml} className="text-sm md:text-base" />
        </div>

        {/* EU residency callout — yellow */}
        <div className="dd-callout">
          <SafeHtml html={recommendation.euHtml} className="text-sm" />
        </div>
      </div>
    </section>
  );
};

export default DDRecommendation;
