import { reportMeta } from '@/data/reports/dd-agent-scoping';

const ScopingFooter: React.FC = () => {
  const lines = reportMeta.footer.split('\n');

  return (
    <footer className="sc-footer max-w-[1280px] mx-auto px-4 md:px-8">
      {lines.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </footer>
  );
};

export default ScopingFooter;
