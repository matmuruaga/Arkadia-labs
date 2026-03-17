// src/components/SEO.tsx
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { SITE_CONFIG } from '@/config/site';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface SEOProps {
  /** i18n key for the page title (will append " | Brand") */
  titleKey?: string;
  /** Direct title string (overrides titleKey) */
  title?: string;
  /** i18n key for meta description */
  descriptionKey?: string;
  /** Direct description string (overrides descriptionKey) */
  description?: string;
  /** Route path without lang prefix, e.g. '/pricing', '/solutions/lead-validator' */
  path?: string;
  /** OpenGraph type. Defaults to 'website' */
  ogType?: string;
  /** Override default OG image URL */
  ogImageUrl?: string;
  /** Additional JSON-LD schema(s) to inject */
  jsonLd?: object | object[];
  /** Set true to add noindex meta tag */
  noindex?: boolean;
  /** Breadcrumb trail for BreadcrumbList schema (excluding Home, which is auto-added) */
  breadcrumbs?: BreadcrumbItem[];
  /** Meta keywords (comma-separated or array) */
  keywords?: string | string[];
}

const SEO: React.FC<SEOProps> = ({
  titleKey,
  title: directTitle,
  descriptionKey,
  description: directDescription,
  path = '',
  ogType = 'website',
  ogImageUrl,
  jsonLd,
  noindex = false,
  breadcrumbs,
  keywords,
}) => {
  const { t } = useTranslation('seo');
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || SITE_CONFIG.defaultLocale;

  // Resolve title
  const resolvedTitle = directTitle || (titleKey ? t(titleKey) : SITE_CONFIG.name);
  const fullTitle = resolvedTitle.includes(SITE_CONFIG.name)
    ? resolvedTitle
    : `${resolvedTitle} | ${SITE_CONFIG.name}`;

  // Resolve description
  const resolvedDescription =
    directDescription || (descriptionKey ? t(descriptionKey) : SITE_CONFIG.description);

  // Build canonical URL
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const canonicalUrl = `${SITE_CONFIG.url}/${currentLang}${cleanPath}`;

  // OG image
  const ogImage = ogImageUrl || SITE_CONFIG.defaultOgImage;

  // Keywords
  const resolvedKeywords = Array.isArray(keywords) ? keywords.join(', ') : keywords;

  // Build BreadcrumbList JSON-LD if breadcrumbs provided
  const breadcrumbJsonLd = breadcrumbs
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${SITE_CONFIG.url}/${currentLang}`,
          },
          ...breadcrumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 2,
            name: crumb.name,
            item: `${SITE_CONFIG.url}/${currentLang}${crumb.path}`,
          })),
        ],
      }
    : null;

  // Build JSON-LD script tags
  const jsonLdScripts = [
    ...(jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []),
    ...(breadcrumbJsonLd ? [breadcrumbJsonLd] : []),
  ];

  return (
    <Helmet>
      {/* Core */}
      <title>{fullTitle}</title>
      <meta name="description" content={resolvedDescription} />
      {resolvedKeywords && <meta name="keywords" content={resolvedKeywords} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_CONFIG.name} />
      <meta property="og:locale" content={currentLang} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Hreflang - all supported languages + x-default */}
      {SITE_CONFIG.locales.map((locale) => (
        <link
          key={locale}
          rel="alternate"
          hrefLang={locale}
          href={`${SITE_CONFIG.url}/${locale}${cleanPath}`}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${SITE_CONFIG.url}/${SITE_CONFIG.defaultLocale}${cleanPath}`}
      />

      {/* JSON-LD Structured Data */}
      {jsonLdScripts.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
