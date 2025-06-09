// src/pages/CookiePolicyPage.tsx
import LegalPageLayout from '../components/LegalPageLayout';

const cookiePolicyContent = [
  {
    id: 'introduction',
    heading: 'What are cookies and other tracking technologies?',
    body: (
      <>
        <p>A cookie is a small data file that is placed on your device when you visit a website. Cookies are widely used to make websites work, or to work more efficiently, as well as to provide reporting information.</p>
        <p>This notice also applies to similar tracking technologies, like web beacons (sometimes called "tracking pixels" or "clear gifs"). These are tiny graphics files that contain a unique identifier that enable us to recognize when someone has visited our Website. This allows us, for example, to monitor the traffic patterns of users from one page within our Website to another and to understand whether you have come to our Website from an online advertisement displayed on a third-party website.</p>
      </>
    ),
  },
  {
    id: 'why-we-use-cookies',
    heading: 'Why do we use cookies?',
    body: (
      <p>We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies enable us to provide a better experience on our Website, and others are used for analytics and marketing purposes. This is described in more detail below.</p>
    ),
  },
  {
    id: 'types-of-cookies',
    heading: 'Types of cookies we use',
    body: (
      <>
        <p>Our website uses the following categories of cookies, managed through our consent management platform, **Cookiebot**:</p>
        
        <h4 className="font-semibold mt-4 mb-2">1. Necessary Cookies</h4>
        <p>These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as remembering your consent preferences. Because these cookies are strictly necessary to deliver the Website to you, you cannot refuse them without impacting how our site functions.</p>
        <ul>
          <li><strong>Provider:</strong> Cookiebot</li>
          <li><strong>Purpose:</strong> To store your consent status for other cookie categories for the current domain.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-2">2. Statistics Cookies</h4>
        <p>These cookies collect information that is used in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are. This data helps us understand traffic patterns, which pages are most and least popular, and how visitors move around the site.</p>
        <ul>
          <li><strong>Provider:</strong> Google Analytics (GA4)</li>
          <li><strong>Purpose:</strong> To collect anonymous data on user behavior, such as page views, session duration, and user demographics, to help us understand and optimize our website's performance. All data collected is aggregated and does not personally identify you.</li>
        </ul>

        <h4 className="font-semibold mt-4 mb-2">3. Marketing Cookies</h4>
        <p>These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring ads are properly displayed, and in some cases, selecting advertisements based on your interests. We may use this data to build a profile of your interests and show you relevant adverts on other sites.</p>
        <ul>
          <li><strong>Provider(s):</strong> [List your marketing providers here, e.g., Meta (Facebook), LinkedIn, Google Ads]</li>
          <li><strong>Purpose:</strong> To track the effectiveness of marketing campaigns, enable targeted advertising, and understand user engagement with our marketing content.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'cookie-control',
    heading: 'How can you control cookies?',
    body: (
      <>
        <p>You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences at any time by clicking on the cookie settings link or banner provided by our consent management platform, **Cookiebot**. Through the banner, you can select which categories of cookies you accept or reject. Essential cookies cannot be rejected.</p>
        <p>In addition, you can set or amend your web browser controls to accept or refuse cookies. As the means by which you can refuse cookies through your web browser controls vary from browser-to-browser, you should visit your browser's help menu for more information.</p>
        <p>You can also opt out of targeted advertising by visiting industry portals such as the Digital Advertising Alliance (DAA) <a href="http://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-[#1C7ED6] hover:underline">opt-out portal</a>.</p>
      </>
    ),
  },
  {
    id: 'updates',
    heading: 'How often will we update this Cookie Notice?',
    body: (
      <p>We may update this Cookie Notice from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Notice regularly to stay informed about our use of cookies and related technologies. The date at the top of this Cookie Notice indicates when it was last updated.</p>
    ),
  },
  {
    id: 'contact',
    heading: 'Where can I get further information?',
    body: (
      <p>If you have any questions about our use of cookies or other technologies, please email us at **[Tu email de contacto, ej. privacy@elevaitelabs.io]**.</p>
    ),
  }
];

const CookiePolicyPage = () => (
  <LegalPageLayout
    title="Cookie Notice"
    lastUpdated="June 10, 2025" // <-- REEMPLAZA CON LA FECHA REAL
    content={cookiePolicyContent}
  />
);

export default CookiePolicyPage;