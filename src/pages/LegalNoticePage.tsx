// src/pages/LegalNoticePage.tsx
const legalPageStyles = "prose max-w-none text-[#0D1B2A]/80";
const heading1Styles = "text-3xl md:text-4xl font-bold text-[#0D1B2A] mb-6";
const heading2Styles = "text-xl md:text-2xl font-semibold text-[#0D1B2A] mt-8 mb-4";

const LegalNoticePage = () => (
  <main className="bg-white py-20 md:py-24">
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <h1 className={heading1Styles}>Legal Notice (Imprint)</h1>
      <p className="text-sm text-gray-500 mb-8">Information provided according to § 5 TMG (German Telemedia Act) and other relevant regulations.</p>

      <div className={legalPageStyles}>
        <p>This is a placeholder for your Legal Notice or Imprint. It's legally required in many countries, especially in Europe. You must replace this with your official company details.</p>
        
        <h2 className={heading2Styles}>Company Information</h2>
        <ul>
          <li><strong>Company Name:</strong> ElevAIte Labs AG</li>
          <li><strong>Address:</strong> Bahnhofstrasse 1, 8001 Zürich, Switzerland</li>
          <li><strong>Represented by:</strong> [Your Name/CEO's Name]</li>
        </ul>

        <h2 className={heading2Styles}>Contact Information</h2>
        <ul>
          <li><strong>Telephone:</strong> [Your Phone Number]</li>
          <li><strong>Email:</strong> [Your Contact Email]</li>
        </ul>

        <h2 className={heading2Styles}>Register Entry</h2>
        <ul>
          <li><strong>Entry in the Handelsregister.</strong></li>
          <li><strong>Registering Court:</strong> [Your Register Court]</li>
          <li><strong>Registration Number:</strong> [Your Registration Number]</li>
          <li><strong>VAT ID:</strong> CHE-123.456.789</li>
        </ul>
      </div>
    </div>
  </main>
);

export default LegalNoticePage;