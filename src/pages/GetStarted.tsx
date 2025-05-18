import Layout from "../components/Layout";
import { useEffect } from "react";

const GetStarted = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://groot.mailerlite.com/js/w/webforms.min.js?v176e10baa5e7ed80d35ae235be3d5024";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Layout>
      <section className="min-h-screen bg-[#0C0F3F] px-4 py-20 text-white text-center">
        <h1 className="text-4xl font-bold gradient-text mb-4">
          Let’s Design Your AI Agent Together
        </h1>
        <p className="text-gray-300 mb-12 max-w-xl mx-auto">
          Tell us what you need and we’ll help you plan the perfect AI system — no pressure, just discovery.
        </p>

        {/* Formulario embebido de MailerLite */}
        <div className="flex justify-center">
          <div className="ml-embedded" data-form="PBMiVg"></div>
        </div>
      </section>
    </Layout>
  );
};

export default GetStarted;
