import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface NavSection {
  id: string;
  label: string;
}

interface ReportNavProps {
  sections: NavSection[];
}

const ReportNav: React.FC<ReportNavProps> = ({ sections }) => {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible section
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            const rectA = a.boundingClientRect;
            const rectB = b.boundingClientRect;
            return rectA.top - rectB.top;
          });

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { threshold: 0.3 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [sections]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="report-nav sticky top-0 z-20 overflow-x-auto border-b"
      style={{
        backgroundColor: 'var(--rpt-card)',
        borderColor: 'var(--rpt-border)',
      }}
    >
      <div className="flex whitespace-nowrap">
        {sections.map(({ id, label }) => {
          const isActive = activeId === id;
          return (
            <button
              key={id}
              onClick={() => handleClick(id)}
              className={cn(
                'shrink-0 border-b-2 font-medium transition-colors focus-visible:outline-none',
                'px-2 py-2.5 text-[11px] md:px-5 md:py-3 md:text-[13px]',
                isActive
                  ? 'border-[var(--rpt-accent)] text-[var(--rpt-ink)]'
                  : 'border-transparent text-[var(--rpt-muted)] hover:text-[var(--rpt-ink)]'
              )}
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default ReportNav;
