// src/pages/CookiePolicyPage.tsx
import LegalPageLayout from '../components/LegalPageLayout';
import { useTranslation } from 'react-i18next'; // 1. Importar

const CookiePolicyPage = () => {
  const { t } = useTranslation(); // 2. Inicializar

  // 3. Definir el contenido dentro del componente
  const cookiePolicyContent = [
    {
      id: 'introduction',
      heading: t('cookiePolicy.sections.introduction.heading'),
      body: (
        <>
          <p>{t('cookiePolicy.sections.introduction.body.p1')}</p>
          <p>{t('cookiePolicy.sections.introduction.body.p2')}</p>
        </>
      ),
    },
    {
      id: 'why-we-use-cookies',
      heading: t('cookiePolicy.sections.whyWeUseCookies.heading'),
      body: <p>{t('cookiePolicy.sections.whyWeUseCookies.body.p1')}</p>,
    },
    {
      id: 'types-of-cookies',
      heading: t('cookiePolicy.sections.typesOfCookies.heading'),
      body: (
        <>
          <p>{t('cookiePolicy.sections.typesOfCookies.body.p1')}</p>
          
          <h4 className="font-semibold mt-4 mb-2">{t('cookiePolicy.sections.typesOfCookies.body.h4_1')}</h4>
          <p>{t('cookiePolicy.sections.typesOfCookies.body.p2')}</p>
          <ul>
            <li><strong>{t('cookiePolicy.sections.typesOfCookies.body.necessary_li1_strong')}</strong> {t('cookiePolicy.sections.typesOfCookies.body.necessary_li1_text')}</li>
            <li><strong>{t('cookiePolicy.sections.typesOfCookies.body.necessary_li2_strong')}</strong> {t('cookiePolicy.sections.typesOfCookies.body.necessary_li2_text')}</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2">{t('cookiePolicy.sections.typesOfCookies.body.h4_2')}</h4>
          <p>{t('cookiePolicy.sections.typesOfCookies.body.p3')}</p>
          <ul>
            <li><strong>{t('cookiePolicy.sections.typesOfCookies.body.stats_li1_strong')}</strong> {t('cookiePolicy.sections.typesOfCookies.body.stats_li1_text')}</li>
            <li><strong>{t('cookiePolicy.sections.typesOfCookies.body.stats_li2_strong')}</strong> {t('cookiePolicy.sections.typesOfCookies.body.stats_li2_text')}</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2">{t('cookiePolicy.sections.typesOfCookies.body.h4_3')}</h4>
          <p>{t('cookiePolicy.sections.typesOfCookies.body.p4')}</p>
          <ul>
            <li><strong>{t('cookiePolicy.sections.typesOfCookies.body.marketing_li1_strong')}</strong> {t('cookiePolicy.sections.typesOfCookies.body.marketing_li1_text')}</li>
            <li><strong>{t('cookiePolicy.sections.typesOfCookies.body.marketing_li2_strong')}</strong> {t('cookiePolicy.sections.typesOfCookies.body.marketing_li2_text')}</li>
          </ul>
        </>
      ),
    },
    {
      id: 'cookie-control',
      heading: t('cookiePolicy.sections.cookieControl.heading'),
      body: (
        <>
          <p>{t('cookiePolicy.sections.cookieControl.body.p1')}</p>
          <p>{t('cookiePolicy.sections.cookieControl.body.p2')}</p>
          <p dangerouslySetInnerHTML={{ __html: t('cookiePolicy.sections.cookieControl.body.p3_html') }} />
        </>
      ),
    },
    {
      id: 'updates',
      heading: t('cookiePolicy.sections.updates.heading'),
      body: <p>{t('cookiePolicy.sections.updates.body.p1')}</p>,
    },
    {
      id: 'contact',
      heading: t('cookiePolicy.sections.contact.heading'),
      body: <p>{t('cookiePolicy.sections.contact.body.p1_text')} <strong>{t('cookiePolicy.sections.contact.body.p1_email')}</strong>.</p>,
    }
  ];

  return (
    <LegalPageLayout
      title={t('cookiePolicy.title')}
      lastUpdated={t('cookiePolicy.lastUpdated')}
      content={cookiePolicyContent}
    />
  );
};

export default CookiePolicyPage;