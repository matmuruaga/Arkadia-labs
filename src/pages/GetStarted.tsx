import Header from '../components/Header';
import Footer from '../components/Footer';
import MailerLiteForm from '../components/MailerLiteForm';

const GetStarted = () => {
  return (
    <>
      <Header />
      <section className="py-20 bg-[#0C0F3F] min-h-screen">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold gradient-text mb-6">
            Let’s Design Your AI Agent Together
          </h2>
          <p className="text-gray-300 mb-12 max-w-xl mx-auto">
            Tell us what you need and we’ll help you plan the perfect AI system — no pressure, just discovery.
          </p>
          <MailerLiteForm />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default GetStarted;
