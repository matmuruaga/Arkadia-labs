import { urgentAlert } from '@/data/reports/dd-dataroom-analyza';
import SafeHtml from './SafeHtml';

const DDAlertBanner: React.FC = () => {
  return (
    <section id="upozorneni" className="py-6 md:py-8">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="dd-callout dd-callout-red">
          <h3
            className="text-base font-bold mb-2"
            style={{ color: 'var(--dd-accent-red)' }}
          >
            {urgentAlert.title}
          </h3>
          <SafeHtml
            html={urgentAlert.html}
            className="text-sm"
          />
        </div>
      </div>
    </section>
  );
};

export default DDAlertBanner;
