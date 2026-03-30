import { footerText } from '@/data/reports/dd-dataroom-analyza';

const DDFooter: React.FC = () => {
  return (
    <footer
      className="py-6 mt-4 text-center"
      style={{
        borderTop: '1px solid var(--dd-border)',
        color: 'var(--dd-text-muted)',
        fontSize: '13px',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <p>{footerText}</p>
      </div>
    </footer>
  );
};

export default DDFooter;
