// src/pages/PrivacyPolicyPage.tsx
import LegalPageLayout from '../components/LegalPageLayout';
import { useTranslation } from 'react-i18next'; // 1. Importar

const PrivacyPolicyPage = () => {
  const { t } = useTranslation(); // 2. Inicializar el hook

  // 3. Definir el contenido DENTRO del componente usando la función t()
  const privacyPolicyContent = [
    {
      id: 'introduction',
      heading: t('privacyPolicy.sections.introduction.heading'),
      body: (
        <>
          <p>{t('privacyPolicy.sections.introduction.body.p1')}</p>
          <p>{t('privacyPolicy.sections.introduction.body.p2')}</p>
        </>
      ),
    },
    {
      id: 'information-we-collect',
      heading: t('privacyPolicy.sections.informationWeCollect.heading'),
      body: (
        <>
          <p>{t('privacyPolicy.sections.informationWeCollect.body.p1')}</p>
          <h4 className="font-semibold mt-4 mb-2">{t('privacyPolicy.sections.informationWeCollect.body.h4_1')}</h4>
          <p>{t('privacyPolicy.sections.informationWeCollect.body.p2')}</p>
          <h4 className="font-semibold mt-4 mb-2">{t('privacyPolicy.sections.informationWeCollect.body.h4_2')}</h4>
          <p>{t('privacyPolicy.sections.informationWeCollect.body.p3')}</p>
        </>
      ),
    },
    {
      id: 'how-we-use-information',
      heading: t('privacyPolicy.sections.howWeUseInformation.heading'),
      body: (
        <>
          <p>{t('privacyPolicy.sections.howWeUseInformation.body.p1')}</p>
          <ul>
            <li><strong>{t('privacyPolicy.sections.howWeUseInformation.body.li1_strong')}</strong>{t('privacyPolicy.sections.howWeUseInformation.body.li1_text')}</li>
            <li><strong>{t('privacyPolicy.sections.howWeUseInformation.body.li2_strong')}</strong>{t('privacyPolicy.sections.howWeUseInformation.body.li2_text')}</li>
            <li><strong>{t('privacyPolicy.sections.howWeUseInformation.body.li3_strong')}</strong>{t('privacyPolicy.sections.howWeUseInformation.body.li3_text')}</li>
            <li><strong>{t('privacyPolicy.sections.howWeUseInformation.body.li4_strong')}</strong>{t('privacyPolicy.sections.howWeUseInformation.body.li4_text')}</li>
            <li><strong>{t('privacyPolicy.sections.howWeUseInformation.body.li5_strong')}</strong>{t('privacyPolicy.sections.howWeUseInformation.body.li5_text')}</li>
          </ul>
        </>
      ),
    },
    {
      id: 'data-sharing',
      heading: t('privacyPolicy.sections.dataSharing.heading'),
      body: (
        <>
          <p>{t('privacyPolicy.sections.dataSharing.body.p1')}</p>
          <ul>
            <li><strong>{t('privacyPolicy.sections.dataSharing.body.li1_strong')}</strong>{t('privacyPolicy.sections.dataSharing.body.li1_text')}</li>
            <li><strong>{t('privacyPolicy.sections.dataSharing.body.li2_strong')}</strong>{t('privacyPolicy.sections.dataSharing.body.li2_text')}</li>
            <li><strong>{t('privacyPolicy.sections.dataSharing.body.li3_strong')}</strong>{t('privacyPolicy.sections.dataSharing.body.li3_text')}</li>
          </ul>
        </>
      ),
    },
      {
      id: 'data-retention',
      heading: t('privacyPolicy.sections.dataRetention.heading'),
      body: <p>{t('privacyPolicy.sections.dataRetention.body.p1')}</p>,
    },
    {
      id: 'your-rights',
      heading: t('privacyPolicy.sections.yourRights.heading'),
      body: (
        <>
          <p>{t('privacyPolicy.sections.yourRights.body.p1')}</p>
          <ul>
            <li>{t('privacyPolicy.sections.yourRights.body.li1_text1')}<strong>{t('privacyPolicy.sections.yourRights.body.li1_strong1')}</strong>, <strong>{t('privacyPolicy.sections.yourRights.body.li1_strong2')}</strong>, {t('privacyPolicy.sections.yourRights.body.li1_text2')}<strong>{t('privacyPolicy.sections.yourRights.body.li1_strong3')}</strong>{t('privacyPolicy.sections.yourRights.body.li1_text3')}</li>
            <li>{t('privacyPolicy.sections.yourRights.body.li2_text1')}<strong>{t('privacyPolicy.sections.yourRights.body.li2_strong')}</strong>{t('privacyPolicy.sections.yourRights.body.li2_text2')}</li>
            <li>{t('privacyPolicy.sections.yourRights.body.li3_text1')}<strong>{t('privacyPolicy.sections.yourRights.body.li3_strong')}</strong>{t('privacyPolicy.sections.yourRights.body.li3_text2')}</li>
            <li>{t('privacyPolicy.sections.yourRights.body.li4_text1')}<strong>{t('privacyPolicy.sections.yourRights.body.li4_strong')}</strong>{t('privacyPolicy.sections.yourRights.body.li4_text2')}</li>
            <li>{t('privacyPolicy.sections.yourRights.body.li5_text1')}<strong>{t('privacyPolicy.sections.yourRights.body.li5_strong')}</strong>{t('privacyPolicy.sections.yourRights.body.li5_text2')}</li>
            <li>{t('privacyPolicy.sections.yourRights.body.li6_text1')}<strong>{t('privacyPolicy.sections.yourRights.body.li6_strong')}</strong>{t('privacyPolicy.sections.yourRights.body.li6_text2')}</li>
          </ul>
          <p>{t('privacyPolicy.sections.yourRights.body.p2')}</p>
        </>
      ),
    },
    {
      id: 'contact',
      heading: t('privacyPolicy.sections.contact.heading'),
      body: (
          <p>{t('privacyPolicy.sections.contact.body.p1')}<strong>{t('privacyPolicy.sections.contact.body.p1_email')}</strong>.</p>
      ),
    }
  ];

  return (
    <LegalPageLayout
      title={t('privacyPolicy.title')}
      lastUpdated={t('privacyPolicy.lastUpdated')}
      content={privacyPolicyContent}
    />
  );
};

export default PrivacyPolicyPage;