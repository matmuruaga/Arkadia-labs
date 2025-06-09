// src/pages/PrivacyPolicyPage.tsx
import LegalPageLayout from '../components/LegalPageLayout';

const privacyPolicyContent = [
  {
    id: 'introduction',
    heading: 'Introduction',
    body: (
      <>
        <p>This Privacy Policy describes how ElevAIte Labs AG ("ElevAIte", "we", "us", or "our") collects, uses, processes, and discloses your information in connection with your access to and use of our website (elevaitelabs.io), our AI-powered services, and other interactions you may have with us (collectively, the "Services").</p>
        <p>We are committed to protecting your privacy and handling your data in an open and transparent manner. When you access our Website or use our Services, you are trusting us with your information. We understand this is a big responsibility and we work hard to protect your information and put you in control.</p>
      </>
    ),
  },
  {
    id: 'information-we-collect',
    heading: 'Information We Collect',
    body: (
      <>
        <p>We collect information to provide better services to all our users. The types of personal information we may collect depend on your interaction with us and can be broadly categorized as follows:</p>
        <h4 className="font-semibold mt-4 mb-2">A. Information You Provide to Us</h4>
        <p>This includes data you voluntarily provide when you create an account, request a demo, contact our sales or support teams, or otherwise communicate with us. This may include your full name, email address, phone number, company name, job title, and the content of your communications.</p>
        <h4 className="font-semibold mt-4 mb-2">B. Information We Collect Automatically</h4>
        <p>When you navigate our Website or use our Services, we may collect certain information automatically from your device. This includes your IP address, device type, browser type, operating system, unique device identifiers, and broad geographic location. We also collect information about how your device has interacted with our Website, including the pages accessed and links clicked. We use tools like **Google Analytics 4 (GA4)** for this purpose. For more details, please see our Cookie Policy.</p>
      </>
    ),
  },
  {
    id: 'how-we-use-information',
    heading: 'How We Use Your Information',
    body: (
      <>
        <p>We use the information we collect for various business purposes, including to:</p>
        <ul>
          <li><strong>Provide, Operate, and Maintain our Services:</strong> To set up and manage your account, process transactions, and provide you with the AI agent services you request.</li>
          <li><strong>Improve, Personalize, and Expand our Services:</strong> To understand and analyze how you use our Services and to develop new products, services, features, and functionality.</li>
          <li><strong>Communicate with You:</strong> To send you transactional messages, technical notices, updates, security alerts, and support messages. We may also send you marketing communications (in accordance with your preferences) about our products and services.</li>
          <li><strong>For Security and Fraud Prevention:</strong> To detect and prevent fraudulent activities, abuse, and other harmful activities to protect you, our other customers, and ourselves.</li>
          <li><strong>For Legal Compliance:</strong> To comply with applicable legal requirements, such as tax and accounting obligations, and to respond to lawful requests by public authorities.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'data-sharing',
    heading: 'How We Share Your Information',
    body: (
      <>
        <p>We do not sell your personal data. We may share your information with third parties who provide services on our behalf, but only in the following circumstances:</p>
        <ul>
          <li><strong>With Service Providers:</strong> We work with third-party service providers to support our business operations, such as cloud hosting (e.g., Vercel, AWS), CRM platforms, analytics providers, and payment processors. These providers only have access to the information necessary to perform their functions and are contractually obligated to protect it.</li>
          <li><strong>For Legal Reasons:</strong> We may disclose your information if we believe it is required by applicable law, regulation, legal process, or governmental request.</li>
          <li><strong>Business Transfers:</strong> In connection with any merger, sale of company assets, financing, or acquisition of all or a portion of our business by another company.</li>
        </ul>
      </>
    ),
  },
    {
    id: 'data-retention',
    heading: 'Data Retention',
    body: (
      <p>We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies. Once the data is no longer needed for these purposes, it is securely deleted or anonymized.</p>
    ),
  },
  {
    id: 'your-rights',
    heading: 'Your Data Protection Rights',
    body: (
      <>
      <p>Depending on your location, you may have the following rights regarding your personal data:</p>
      <ul>
        <li>The right to **access**, **update**, or **delete** the information we have on you.</li>
        <li>The right of **rectification** if that information is inaccurate or incomplete.</li>
        <li>The right to **object** to our processing of your personal data.</li>
        <li>The right to request that we **restrict** the processing of your personal information.</li>
        <li>The right to **data portability**, allowing you to be provided with a copy of your information in a structured, machine-readable format.</li>
        <li>The right to **withdraw consent** at any time where we relied on your consent to process your information.</li>
      </ul>
      <p>To exercise any of these rights, please contact us at our designated email address.</p>
      </>
    ),
  },
  {
    id: 'contact',
    heading: 'Contact Us',
    body: (
      <p>If you have any questions, concerns, or comments about this Privacy Policy or our data practices, please do not hesitate to contact us. You can reach our privacy team by emailing: <strong>hello@elevaitelabs.io</strong>.</p>
    ),
  }
];

const PrivacyPolicyPage = () => (
  <LegalPageLayout
    title="Privacy Policy"
    lastUpdated="June 10, 2025" // <-- REEMPLAZA CON LA FECHA REAL
    content={privacyPolicyContent}
  />
);

export default PrivacyPolicyPage;