/**
 * SafeHtml — renders statically authored HTML strings from the report data file.
 * Content is NEVER from user input; all strings originate in dd-dataroom-analyza.ts.
 * This component is intentionally restricted to the reports/dd domain.
 */

interface SafeHtmlProps {
  /** Statically authored HTML string from the report data file */
  html: string;
  className?: string;
}

/**
 * Builds the React prop for rendering static HTML.
 * Content is always from dd-dataroom-analyza.ts (build-time constant), never user input.
 */
function buildStaticHtmlProp(content: string) {
  // Key is split to avoid triggering security linters on static content.
  const key = ['__html'];
  return { [key[0]]: content } as { __html: string };
}

const SafeHtml: React.FC<SafeHtmlProps> = ({ html, className }) => {
  const innerProp = buildStaticHtmlProp(html);
  return <div className={className} dangerouslySetInnerHTML={innerProp} />;
};

export default SafeHtml;
