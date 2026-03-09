// src/pages/PrivacyPolicyPage.tsx
import LegalPageLayout from '../components/LegalPageLayout';
import { useTranslation } from 'react-i18next';

const PrivacyPolicyPage = () => {
  const { t } = useTranslation();

  const tableClass = "w-full border-collapse my-4 text-sm";
  const thClass = "text-left p-3 border border-gray-200 bg-gray-50 font-semibold";
  const tdClass = "text-left p-3 border border-gray-200";
  const highlightClass = "bg-gray-50 border-l-4 border-[#1C7ED6] p-4 my-5 rounded-r-md text-sm";
  const linkClass = "text-[#1C7ED6] hover:underline";

  const content = [
    {
      id: 'introduction',
      heading: t('privacyPolicy.sections.introduction.heading'),
      body: (
        <>
          <div className={highlightClass}>
            <p><strong>{t('privacyPolicy.dataController.label')}</strong> {t('privacyPolicy.dataController.value')}</p>
            <p><strong>{t('privacyPolicy.dataController.addressLabel')}</strong> {t('privacyPolicy.dataController.address')}</p>
            <p><strong>{t('privacyPolicy.dataController.licenceLabel')}</strong> {t('privacyPolicy.dataController.licence')}</p>
            <p><strong>{t('privacyPolicy.dataController.privacyLabel')}</strong>{' '}
              <a href="mailto:dpo@arkadialabs.com" className={linkClass}>dpo@arkadialabs.com</a>
            </p>
          </div>
          <p>{t('privacyPolicy.sections.introduction.body.p1')}</p>
          <p>{t('privacyPolicy.sections.introduction.body.p2')}</p>
          <p>{t('privacyPolicy.sections.introduction.body.p3')}</p>
        </>
      ),
    },
    {
      id: 'information-we-collect',
      heading: t('privacyPolicy.sections.informationWeCollect.heading'),
      body: (
        <>
          <h3 className="font-semibold mt-4 mb-2">{t('privacyPolicy.sections.informationWeCollect.body.h3a')}</h3>
          <p>{t('privacyPolicy.sections.informationWeCollect.body.p1')}</p>
          <ul>
            <li>{t('privacyPolicy.sections.informationWeCollect.body.li1')}</li>
            <li>{t('privacyPolicy.sections.informationWeCollect.body.li2')}</li>
            <li>{t('privacyPolicy.sections.informationWeCollect.body.li3')}</li>
            <li>{t('privacyPolicy.sections.informationWeCollect.body.li4')}</li>
          </ul>

          <h3 className="font-semibold mt-4 mb-2">{t('privacyPolicy.sections.informationWeCollect.body.h3b')}</h3>
          <p>{t('privacyPolicy.sections.informationWeCollect.body.p2')}</p>
          <ul>
            <li>{t('privacyPolicy.sections.informationWeCollect.body.li5')}</li>
            <li>{t('privacyPolicy.sections.informationWeCollect.body.li6')}</li>
            <li>{t('privacyPolicy.sections.informationWeCollect.body.li7')}</li>
            <li>{t('privacyPolicy.sections.informationWeCollect.body.li8')}</li>
          </ul>
          <p>{t('privacyPolicy.sections.informationWeCollect.body.p3')}</p>

          <h3 className="font-semibold mt-4 mb-2">{t('privacyPolicy.sections.informationWeCollect.body.h3c')}</h3>
          <p>{t('privacyPolicy.sections.informationWeCollect.body.p4')}</p>
        </>
      ),
    },
    {
      id: 'legal-basis',
      heading: t('privacyPolicy.sections.legalBasis.heading'),
      body: (
        <>
          <p>{t('privacyPolicy.sections.legalBasis.body.p1')}</p>
          <table className={tableClass}>
            <thead>
              <tr>
                <th className={thClass}>{t('privacyPolicy.sections.legalBasis.body.th1')}</th>
                <th className={thClass}>{t('privacyPolicy.sections.legalBasis.body.th2')}</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6, 7].map(i => (
                <tr key={i}>
                  <td className={tdClass}>{t(`privacyPolicy.sections.legalBasis.body.r${i}c1`)}</td>
                  <td className={tdClass}>{t(`privacyPolicy.sections.legalBasis.body.r${i}c2`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>{t('privacyPolicy.sections.legalBasis.body.p2')}{' '}
            <a href="mailto:dpo@arkadialabs.com" className={linkClass}>dpo@arkadialabs.com</a>.
          </p>
        </>
      ),
    },
    {
      id: 'how-we-use',
      heading: t('privacyPolicy.sections.howWeUse.heading'),
      body: (
        <>
          <p>{t('privacyPolicy.sections.howWeUse.body.p1')}</p>
          <ul>
            <li><strong>{t('privacyPolicy.sections.howWeUse.body.li1_strong')}</strong> {t('privacyPolicy.sections.howWeUse.body.li1_text')}</li>
            <li><strong>{t('privacyPolicy.sections.howWeUse.body.li2_strong')}</strong> {t('privacyPolicy.sections.howWeUse.body.li2_text')}</li>
            <li><strong>{t('privacyPolicy.sections.howWeUse.body.li3_strong')}</strong> {t('privacyPolicy.sections.howWeUse.body.li3_text')}</li>
            <li><strong>{t('privacyPolicy.sections.howWeUse.body.li4_strong')}</strong> {t('privacyPolicy.sections.howWeUse.body.li4_text')}</li>
            <li><strong>{t('privacyPolicy.sections.howWeUse.body.li5_strong')}</strong> {t('privacyPolicy.sections.howWeUse.body.li5_text')}</li>
          </ul>
        </>
      ),
    },
    {
      id: 'how-we-share',
      heading: t('privacyPolicy.sections.howWeShare.heading'),
      body: (
        <>
          <p>{t('privacyPolicy.sections.howWeShare.body.p1')}</p>

          <h3 className="font-semibold mt-4 mb-2">{t('privacyPolicy.sections.howWeShare.body.h3a')}</h3>
          <p>{t('privacyPolicy.sections.howWeShare.body.p2')}</p>
          <div className="overflow-x-auto">
            <table className={tableClass}>
              <thead>
                <tr>
                  <th className={thClass}>{t('privacyPolicy.sections.howWeShare.body.th1')}</th>
                  <th className={thClass}>{t('privacyPolicy.sections.howWeShare.body.th2')}</th>
                  <th className={thClass}>{t('privacyPolicy.sections.howWeShare.body.th3')}</th>
                  <th className={thClass}>{t('privacyPolicy.sections.howWeShare.body.th4')}</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map(i => (
                  <tr key={i}>
                    <td className={tdClass}>{t(`privacyPolicy.sections.howWeShare.body.r${i}c1`)}</td>
                    <td className={tdClass}>{t(`privacyPolicy.sections.howWeShare.body.r${i}c2`)}</td>
                    <td className={tdClass}>{t(`privacyPolicy.sections.howWeShare.body.r${i}c3`)}</td>
                    <td className={tdClass}>{t(`privacyPolicy.sections.howWeShare.body.r${i}c4`)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="font-semibold mt-4 mb-2">{t('privacyPolicy.sections.howWeShare.body.h3b')}</h3>
          <p>{t('privacyPolicy.sections.howWeShare.body.p3')}</p>

          <h3 className="font-semibold mt-4 mb-2">{t('privacyPolicy.sections.howWeShare.body.h3c')}</h3>
          <p>{t('privacyPolicy.sections.howWeShare.body.p4')}</p>
        </>
      ),
    },
    {
      id: 'international-transfers',
      heading: t('privacyPolicy.sections.international.heading'),
      body: (
        <>
          <p>{t('privacyPolicy.sections.international.body.p1')}</p>
          <ul>
            <li><strong>{t('privacyPolicy.sections.international.body.li1_strong')}</strong> {t('privacyPolicy.sections.international.body.li1_text')}</li>
            <li><strong>{t('privacyPolicy.sections.international.body.li2_strong')}</strong> {t('privacyPolicy.sections.international.body.li2_text')}</li>
            <li><strong>{t('privacyPolicy.sections.international.body.li3_strong')}</strong> {t('privacyPolicy.sections.international.body.li3_text')}</li>
          </ul>
          <p>{t('privacyPolicy.sections.international.body.p2')}{' '}
            <a href="mailto:dpo@arkadialabs.com" className={linkClass}>dpo@arkadialabs.com</a>.
          </p>
        </>
      ),
    },
    {
      id: 'data-retention',
      heading: t('privacyPolicy.sections.retention.heading'),
      body: (
        <>
          <p>{t('privacyPolicy.sections.retention.body.p1')}</p>
          <table className={tableClass}>
            <thead>
              <tr>
                <th className={thClass}>{t('privacyPolicy.sections.retention.body.th1')}</th>
                <th className={thClass}>{t('privacyPolicy.sections.retention.body.th2')}</th>
                <th className={thClass}>{t('privacyPolicy.sections.retention.body.th3')}</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map(i => (
                <tr key={i}>
                  <td className={tdClass}>{t(`privacyPolicy.sections.retention.body.r${i}c1`)}</td>
                  <td className={tdClass}>{t(`privacyPolicy.sections.retention.body.r${i}c2`)}</td>
                  <td className={tdClass}>{t(`privacyPolicy.sections.retention.body.r${i}c3`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>{t('privacyPolicy.sections.retention.body.p2')}</p>
        </>
      ),
    },
    {
      id: 'your-rights',
      heading: t('privacyPolicy.sections.rights.heading'),
      body: (
        <>
          <p>{t('privacyPolicy.sections.rights.body.p1')}</p>
          <ul>
            <li><strong>{t('privacyPolicy.sections.rights.body.li1_strong')}</strong> {t('privacyPolicy.sections.rights.body.li1_text')}</li>
            <li><strong>{t('privacyPolicy.sections.rights.body.li2_strong')}</strong> {t('privacyPolicy.sections.rights.body.li2_text')}</li>
            <li><strong>{t('privacyPolicy.sections.rights.body.li3_strong')}</strong> {t('privacyPolicy.sections.rights.body.li3_text')}</li>
            <li><strong>{t('privacyPolicy.sections.rights.body.li4_strong')}</strong> {t('privacyPolicy.sections.rights.body.li4_text')}</li>
            <li><strong>{t('privacyPolicy.sections.rights.body.li5_strong')}</strong> {t('privacyPolicy.sections.rights.body.li5_text')}</li>
            <li><strong>{t('privacyPolicy.sections.rights.body.li6_strong')}</strong> {t('privacyPolicy.sections.rights.body.li6_text')}</li>
            <li><strong>{t('privacyPolicy.sections.rights.body.li7_strong')}</strong> {t('privacyPolicy.sections.rights.body.li7_text')}</li>
          </ul>
          <p>{t('privacyPolicy.sections.rights.body.p2')}{' '}
            <a href="mailto:dpo@arkadialabs.com" className={linkClass}>dpo@arkadialabs.com</a>{' '}
            {t('privacyPolicy.sections.rights.body.p2b')}
          </p>
          <p>{t('privacyPolicy.sections.rights.body.p3')}</p>
          <div className={highlightClass}>
            <p><strong>{t('privacyPolicy.sections.rights.body.complaint_label')}</strong>{' '}
              {t('privacyPolicy.sections.rights.body.complaint_text')}{' '}
              <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className={linkClass}>
                {t('privacyPolicy.sections.rights.body.complaint_aepd')}
              </a>.{' '}
              {t('privacyPolicy.sections.rights.body.complaint_list')}{' '}
              <a href="https://edpb.europa.eu/about-edpb/about-edpb/members_en" target="_blank" rel="noopener noreferrer" className={linkClass}>
                edpb.europa.eu
              </a>.
            </p>
          </div>
        </>
      ),
    },
    {
      id: 'cookies',
      heading: t('privacyPolicy.sections.cookies.heading'),
      body: (
        <>
          <p>{t('privacyPolicy.sections.cookies.body.p1')}</p>
          <h3 className="font-semibold mt-4 mb-2">{t('privacyPolicy.sections.cookies.body.h3')}</h3>
          <table className={tableClass}>
            <thead>
              <tr>
                <th className={thClass}>{t('privacyPolicy.sections.cookies.body.th1')}</th>
                <th className={thClass}>{t('privacyPolicy.sections.cookies.body.th2')}</th>
                <th className={thClass}>{t('privacyPolicy.sections.cookies.body.th3')}</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map(i => (
                <tr key={i}>
                  <td className={tdClass}>{t(`privacyPolicy.sections.cookies.body.r${i}c1`)}</td>
                  <td className={tdClass}>{t(`privacyPolicy.sections.cookies.body.r${i}c2`)}</td>
                  <td className={tdClass}>{t(`privacyPolicy.sections.cookies.body.r${i}c3`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>{t('privacyPolicy.sections.cookies.body.p2')}</p>
        </>
      ),
    },
    {
      id: 'children',
      heading: t('privacyPolicy.sections.children.heading'),
      body: (
        <p>{t('privacyPolicy.sections.children.body.p1')}{' '}
          <a href="mailto:dpo@arkadialabs.com" className={linkClass}>dpo@arkadialabs.com</a>{' '}
          {t('privacyPolicy.sections.children.body.p1b')}
        </p>
      ),
    },
    {
      id: 'eu-representative',
      heading: t('privacyPolicy.sections.euRep.heading'),
      body: (
        <>
          <p>{t('privacyPolicy.sections.euRep.body.p1')}</p>
          <div className={highlightClass}>
            <p><strong>{t('privacyPolicy.sections.euRep.body.rep_label')}</strong></p>
            <p>{t('privacyPolicy.sections.euRep.body.rep_name')}</p>
            <p>{t('privacyPolicy.sections.euRep.body.rep_address')}</p>
            <p className="mt-2"><strong>{t('privacyPolicy.sections.euRep.body.rep_email_label')}</strong>{' '}
              <a href="mailto:gdpr@euverify.com" className={linkClass}>gdpr@euverify.com</a>
            </p>
            <p className="mt-2"><strong>{t('privacyPolicy.sections.euRep.body.rep_portal_label')}</strong>{' '}
              {t('privacyPolicy.sections.euRep.body.rep_portal_text')}
            </p>
            <p>
              <a href="https://gdpr.euverify.com/verify/f39563a3-7807-4804-abaf-9eb3e4cc2bad" target="_blank" rel="noopener noreferrer" className={linkClass}>
                {t('privacyPolicy.sections.euRep.body.rep_portal_url')}
              </a>
            </p>
            <p className="mt-2">{t('privacyPolicy.sections.euRep.body.rep_portal_note')}</p>
          </div>
        </>
      ),
    },
    {
      id: 'changes',
      heading: t('privacyPolicy.sections.changes.heading'),
      body: (
        <>
          <p>{t('privacyPolicy.sections.changes.body.p1')}</p>
          <p>{t('privacyPolicy.sections.changes.body.p2')}</p>
        </>
      ),
    },
    {
      id: 'contact',
      heading: t('privacyPolicy.sections.contact.heading'),
      body: (
        <>
          <p>{t('privacyPolicy.sections.contact.body.p1')}</p>
          <ul>
            <li><strong>{t('privacyPolicy.sections.contact.body.li1_label')}</strong>{' '}
              <a href="mailto:dpo@arkadialabs.com" className={linkClass}>dpo@arkadialabs.com</a>
            </li>
            <li><strong>{t('privacyPolicy.sections.contact.body.li2_label')}</strong>{' '}
              <a href="mailto:hello@arkadialabs.io" className={linkClass}>hello@arkadialabs.io</a>
            </li>
            <li><strong>{t('privacyPolicy.sections.contact.body.li3_label')}</strong>{' '}
              {t('privacyPolicy.sections.contact.body.li3_text')}
            </li>
          </ul>
          <p>{t('privacyPolicy.sections.contact.body.p2')}</p>
        </>
      ),
    },
  ];

  return (
    <LegalPageLayout
      title={t('privacyPolicy.title')}
      lastUpdated={t('privacyPolicy.lastUpdated')}
      content={content}
    />
  );
};

export default PrivacyPolicyPage;
