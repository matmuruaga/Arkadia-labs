const ReportFooter: React.FC = () => {
  return (
    <footer
      className="px-4 py-8 text-center text-[12px] md:px-10 md:py-8"
      style={{ backgroundColor: 'var(--rpt-ink)', color: 'var(--rpt-paper)', opacity: 1 }}
    >
      <p style={{ color: 'var(--rpt-paper)', opacity: 0.45 }}>
        Elaborado por{' '}
        <strong style={{ color: 'var(--rpt-paper)', opacity: 1, fontWeight: 600 }}>
          Arkadia Labs
        </strong>
        {' '}· Marzo 2026 · Roatán SEO/SEM Audit
      </p>
      <p
        className="mt-1.5"
        style={{ color: 'var(--rpt-paper)', opacity: 0.45 }}
      >
        Este informe es confidencial y está destinado exclusivamente a uso
        interno y presentación comercial.
      </p>
    </footer>
  );
};

export default ReportFooter;
