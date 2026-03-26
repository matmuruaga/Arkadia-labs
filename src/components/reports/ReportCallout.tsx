interface ReportCalloutProps {
  icon: string;
  title: string;
  text: string;
}

const ReportCallout: React.FC<ReportCalloutProps> = ({ icon, title, text }) => {
  return (
    <div
      className="flex flex-col gap-4 rounded-[2px] p-6 md:flex-row md:items-start md:gap-6 md:p-9 lg:px-10"
      style={{ backgroundColor: 'var(--rpt-ink)', color: 'var(--rpt-paper)' }}
    >
      {/* Icon */}
      <span
        className="shrink-0 text-[32px] md:text-[40px]"
        role="img"
        aria-hidden="true"
      >
        {icon}
      </span>

      {/* Content */}
      <div>
        <h3
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(17px, 2.5vw, 20px)',
            color: 'var(--rpt-paper)',
            lineHeight: 1.2,
          }}
        >
          {title}
        </h3>
        {/* Safe: text is statically authored internal report data, not user input */}
        <p
          className="mt-2 text-[14px] leading-relaxed [&_strong]:text-[var(--rpt-paper)] [&_strong]:opacity-100"
          style={{ color: 'var(--rpt-paper)', opacity: 0.65 }}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
    </div>
  );
};

export default ReportCallout;
