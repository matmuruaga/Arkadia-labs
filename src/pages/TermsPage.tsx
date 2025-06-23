// src/pages/TermsPage.tsx
import LegalPageLayout from '../components/LegalPageLayout';
import { useTranslation } from 'react-i18next'; // 1. Importar

const TermsPage = () => {
  const { t } = useTranslation(); // 2. Inicializar

  // 3. Definir el contenido DENTRO del componente
  const termsContent = [
    {
      id: 'agreement-to-terms',
      heading: t('termsAndConditions.sections.agreement.heading'),
      body: (
        <>
          <p>{t('termsAndConditions.sections.agreement.body.p1')}</p>
          <p>{t('termsAndConditions.sections.agreement.body.p2')}</p>
          <p>{t('termsAndConditions.sections.agreement.body.p3')}</p>
        </>
      ),
    },
    {
      id: 'description-of-service',
      heading: t('termsAndConditions.sections.description.heading'),
      body: <p>{t('termsAndConditions.sections.description.body.p1')}</p>,
    },
    {
      id: 'user-responsibilities',
      heading: t('termsAndConditions.sections.responsibilities.heading'),
      body: (
        <>
          <p>{t('termsAndConditions.sections.responsibilities.body.p1')}</p>
          <p>{t('termsAndConditions.sections.responsibilities.body.p2')}</p>
        </>
      ),
    },
    {
      id: 'acceptable-use',
      heading: t('termsAndConditions.sections.acceptableUse.heading'),
      body: (
        <>
          <p>{t('termsAndConditions.sections.acceptableUse.body.p1')}</p>
          <ul>
            <li>{t('termsAndConditions.sections.acceptableUse.body.li1')}</li>
            <li>{t('termsAndConditions.sections.acceptableUse.body.li2')}</li>
            <li>{t('termsAndConditions.sections.acceptableUse.body.li3')}</li>
            <li>{t('termsAndConditions.sections.acceptableUse.body.li4')}</li>
          </ul>
        </>
      ),
    },
    {
      id: 'fees-and-payment',
      heading: t('termsAndConditions.sections.payment.heading'),
      body: <p>{t('termsAndConditions.sections.payment.body.p1')}</p>,
    },
    {
      id: 'intellectual-property',
      heading: t('termsAndConditions.sections.ip.heading'),
      body: <p>{t('termsAndConditions.sections.ip.body.p1')}</p>,
    },
    {
      id: 'termination',
      heading: t('termsAndConditions.sections.termination.heading'),
      body: <p>{t('termsAndConditions.sections.termination.body.p1')}</p>,
    },
    {
      id: 'disclaimers',
      heading: t('termsAndConditions.sections.disclaimers.heading'),
      body: (
        <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-md">
          <p className="font-semibold text-yellow-800">{t('termsAndConditions.sections.disclaimers.body.reviewRequired')}</p>
          <p className="text-yellow-700">{t('termsAndConditions.sections.disclaimers.body.p1')}</p>
        </div>
      ),
    },
    {
      id: 'liability-limitation',
      heading: t('termsAndConditions.sections.liability.heading'),
      body: (
        <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-md">
          <p className="font-semibold text-yellow-800">{t('termsAndConditions.sections.liability.body.reviewRequired')}</p>
          <p className="text-yellow-700">{t('termsAndConditions.sections.liability.body.p1')}</p>
        </div>
      ),
    },
    {
      id: 'governing-law',
      heading: t('termsAndConditions.sections.governingLaw.heading'),
      body: <p>{t('termsAndConditions.sections.governingLaw.body.p1')}</p>,
    },
  ];

  return (
    <LegalPageLayout
      title={t('termsAndConditions.title')}
      lastUpdated={t('termsAndConditions.lastUpdated')}
      content={termsContent}
    />
  );
};

export default TermsPage;