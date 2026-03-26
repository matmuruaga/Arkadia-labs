/**
 * ReportHighlight
 *
 * Left-bordered highlight box for important notes inside report sections.
 *
 * Security note: The `html` prop is intended exclusively for statically
 * authored report data (internal strings defined in src/data/). It is
 * stripped of script tags and event handlers via a lightweight sanitiser
 * before rendering. Do NOT pass user-generated or third-party content to
 * this prop.
 */

interface ReportHighlightProps {
  /** JSX children — preferred for composing content in React. */
  children?: React.ReactNode;
  /**
   * Trusted HTML string from internal report data.
   * The string is sanitised before rendering to remove scripts and event
   * handlers, mitigating XSS risk on authored-content mutations.
   */
  html?: string;
}

/**
 * Lightweight HTML sanitiser using the browser's built-in DOMParser.
 * Strips <script> elements and all on* event attributes.
 * For trusted internal data only — not a substitute for DOMPurify on
 * truly user-generated input.
 */
function sanitizeHtml(raw: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(raw, 'text/html');

  // Remove all <script> elements
  doc.querySelectorAll('script').forEach((el) => el.remove());

  // Strip event handler attributes (onclick, onerror, onload, etc.)
  doc.querySelectorAll('*').forEach((el) => {
    Array.from(el.attributes).forEach((attr) => {
      if (attr.name.startsWith('on')) {
        el.removeAttribute(attr.name);
      }
    });
  });

  return doc.body.innerHTML;
}

const ReportHighlight: React.FC<ReportHighlightProps> = ({ children, html }) => {
  const containerStyle: React.CSSProperties = {
    borderLeft: '3px solid var(--rpt-accent)',
    backgroundColor: '#fdf8f3',
    padding: '14px 18px',
    fontSize: '13px',
    color: 'var(--rpt-muted)',
    lineHeight: 1.6,
  };

  if (html !== undefined) {
    const safeHtml = sanitizeHtml(html);
    return (
      // Safe: content is statically authored and additionally sanitised above.
      // eslint-disable-next-line react/no-danger
      <div style={containerStyle} dangerouslySetInnerHTML={{ __html: safeHtml }} />
    );
  }

  return <div style={containerStyle}>{children}</div>;
};

export default ReportHighlight;
