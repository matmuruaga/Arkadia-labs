import Layout from "../components/Layout";
import { useEffect } from "react";

const GetStarted = () => {
  useEffect(() => {
    // Solo añade el script si no existe ya
    if (!document.getElementById("ml-universal")) {
      const script = document.createElement("script");
      script.src = "https://assets.mailerlite.com/js/universal.js";
      script.async = true;
      script.id = "ml-universal";
      document.body.appendChild(script);
    }
    // NO pongas ningún window.ml aquí
  }, []);

  return (
    <Layout>
      <section className="bg-[#0C0F3F] text-white py-20 px-4 min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Let’s Design Your AI Agent Together
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Tell us what you need and we’ll help you plan the perfect AI system — no pressure, just discovery.
          </p>

          <div className="bg-white p-6 rounded-xl shadow-xl mx-auto max-w-2xl">
            {/* Aquí MailerLite sí detecta el div embebido */}
            <div
              dangerouslySetInnerHTML={{
                __html: `<div class="ml-embedded" data-form="WyCvO1"></div>`,
              }}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GetStarted;
