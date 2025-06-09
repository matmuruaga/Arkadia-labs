// src/pages/TermsPage.tsx
import LegalPageLayout from '../components/LegalPageLayout';

const termsContent = [
  {
    id: 'agreement-to-terms',
    heading: '1. Agreement to Terms',
    body: (
      <>
        <p>These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and ElevAIte Labs AG (“we,” “us,” or “our”), concerning your access to and use of our AI agent services and the elevaitelabs.io website (collectively, the “Services”).</p>
        <p>You agree that by accessing the Services, you have read, understood, and agree to be bound by all of these Terms and Conditions. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.</p>
        <p>Supplemental terms and conditions or documents that may be posted on the Website from time to time are hereby expressly incorporated herein by reference.</p>
      </>
    ),
  },
  {
    id: 'description-of-service',
    heading: '2. Description of Service',
    body: (
      <p>ElevAIte Labs provides custom-built, AI-powered agents designed to automate and optimize business processes, including but not limited to sales, marketing, operations, and customer support. The specific functionalities, scope, and performance metrics of each AI agent are defined in the specific service plan and setup agreement (“Service Plan”) you subscribe to. The Service is provided on a subscription basis and may include a one-time setup fee.</p>
    ),
  },
  {
    id: 'user-responsibilities',
    heading: '3. User Accounts and Responsibilities',
    body: (
      <>
        <p>To use certain features of the Service, you may be required to create an account. You are responsible for safeguarding your account password and for any activities or actions under your account. You agree to provide and maintain true, accurate, current, and complete information about yourself as prompted by the service's registration form.</p>
        <p>You are also responsible for providing the necessary data, access to third-party systems (e.g., CRMs), and strategic guidance required for us to build and maintain your AI agents as outlined in your Service Plan. You retain all ownership rights to your underlying data.</p>
      </>
    ),
  },
  {
    id: 'acceptable-use',
    heading: '4. Acceptable Use Policy',
    body: (
      <>
        <p>You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us. As a user of the Services, you agree not to:</p>
        <ul>
          <li>Use the AI agents for any illegal, harmful, or fraudulent activities.</li>
          <li>Attempt to reverse-engineer, decompile, or otherwise discover the source code or underlying algorithms of the AI agents.</li>
          <li>Interfere with, disrupt, or create an undue burden on the Services or the networks or services connected to them.</li>
          <li>Use any data provided by the Service for purposes other than your internal business operations as intended by your Service Plan.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'fees-and-payment',
    heading: '5. Fees and Payment',
    body: (
      <p>We offer various subscription plans as detailed on our Pricing Page. You agree to pay all fees, including any applicable one-time setup fees, in accordance with the terms of your selected Service Plan. Subscription fees are billed on a recurring basis (e.g., monthly or annually) in advance. All payments are non-refundable except as expressly stated in your Service Plan. We reserve the right to change our prices and will notify you in advance of any such changes.</p>
    ),
  },
  {
    id: 'intellectual-property',
    heading: '6. Intellectual Property Rights',
    body: (
      <p>The Services, including the underlying AI models, software, algorithms, and all content on our Website (excluding your data), are the exclusive property of ElevAIte Labs AG and its licensors. These are protected by copyright, trademark, and other laws of Switzerland and foreign countries. Our trademarks may not be used in connection with any product or service without our prior written consent. You retain full ownership of the data you provide to the Service.</p>
    ),
  },
  {
    id: 'termination',
    heading: '7. Termination',
    body: (
      <p>We may terminate or suspend your account and bar access to the Services immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including but not limited to a breach of these Terms. If you wish to terminate your account, you may do so by providing written notice in accordance with your Service Plan. Upon termination, your right to use the Service will immediately cease.</p>
    ),
  },
  {
    id: 'disclaimers',
    heading: '8. Disclaimer of Warranties',
    body: (
      <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-md">
        <p className="font-semibold text-yellow-800">Legal Review Required</p>
        <p className="text-yellow-700">The service is provided on an "AS IS" and "AS AVAILABLE" basis. ElevAIte Labs expressly disclaims all warranties of any kind, whether express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the service will be uninterrupted, timely, secure, or error-free. </p>
      </div>
    ),
  },
  {
    id: 'liability-limitation',
    heading: '9. Limitation of Liability',
    body: (
      <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-md">
        <p className="font-semibold text-yellow-800">Legal Review Required</p>
        <p className="text-yellow-700">In no event shall ElevAIte Labs AG, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service. </p>
      </div>
    ),
  },
  {
    id: 'governing-law',
    heading: '10. Governing Law',
    body: (
      <p>These Terms shall be governed and construed in accordance with the laws of Switzerland, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.</p>
    ),
  },
];

const TermsPage = () => (
  <LegalPageLayout
    title="Terms & Conditions"
    lastUpdated="June 10, 2025" // <-- REPLACE WITH THE REAL DATE
    content={termsContent}
  />
);

export default TermsPage;