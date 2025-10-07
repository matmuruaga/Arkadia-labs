// src/pages/LegalNoticePage.tsx
import { useTranslation } from 'react-i18next'; // 1. Importar

const LegalNoticePage = () => {
  const { t } = useTranslation(); // 2. Inicializar

  const legalPageStyles = "prose max-w-none text-[#0D1B2A]/80";
  const heading1Styles = "text-3xl md:text-4xl font-bold text-[#0D1B2A] mb-6";
  const heading2Styles = "text-xl md:text-2xl font-semibold text-[#0D1B2A] mt-8 mb-4";

  return (
    <main className="bg-white py-20 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* 3. Usar t() para traducir todos los textos */}
        <h1 className={heading1Styles}>{t('legalNotice.title')}</h1>
        <p className="text-sm text-gray-500 mb-8">{t('legalNotice.subtitle')}</p>

        <div className={legalPageStyles}>
          <p>{t('legalNotice.placeholderInfo')}</p>
          
          <h2 className={heading2Styles}>{t('legalNotice.headings.company')}</h2>
          <ul>
            <li><strong>{t('legalNotice.companyInfo.name')}</strong> Arkadia Labs AG</li>
            <li><strong>{t('legalNotice.companyInfo.address')}</strong> Bahnhofstrasse 1, 8001 Zürich, Switzerland</li>
            <li><strong>{t('legalNotice.companyInfo.representedBy')}</strong> {t('legalNotice.companyInfo.placeholder_ceo')}</li>
          </ul>

          <h2 className={heading2Styles}>{t('legalNotice.headings.contact')}</h2>
          <ul>
            <li><strong>{t('legalNotice.contactInfo.telephone')}</strong> {t('legalNotice.contactInfo.placeholder_phone')}</li>
            <li><strong>{t('legalNotice.contactInfo.email')}</strong> {t('legalNotice.contactInfo.placeholder_email')}</li>
          </ul>

          <h2 className={heading2Styles}>{t('legalNotice.headings.register')}</h2>
          <ul>
            <li>{t('legalNotice.registerInfo.entry')}</li>
            <li><strong>{t('legalNotice.registerInfo.court')}</strong> {t('legalNotice.registerInfo.placeholder_court')}</li>
            <li><strong>{t('legalNotice.registerInfo.number')}</strong> {t('legalNotice.registerInfo.placeholder_number')}</li>
            <li><strong>{t('legalNotice.registerInfo.vatId')}</strong> CHE-123.456.789</li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default LegalNoticePage;