// src/components/Layout.tsx
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import { SITE_CONFIG } from '@/config/site';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: SITE_CONFIG.logo,
    description: t('seo.organizationDescription', SITE_CONFIG.description),
    sameAs: [SITE_CONFIG.socialLinks.linkedin],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      url: `${SITE_CONFIG.url}/en/contact`,
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_CONFIG.url}/#website`,
    url: SITE_CONFIG.url,
    name: SITE_CONFIG.name,
    publisher: { '@id': `${SITE_CONFIG.url}/#organization` },
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      </Helmet>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:text-sky-600 focus:font-semibold">
        Skip to main content
      </a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;