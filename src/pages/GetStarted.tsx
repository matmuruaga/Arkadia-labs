import Layout from "../components/Layout";
import { useEffect, useRef } from "react";

const GetStarted = () => {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Elimina scripts antiguos si los hubiera
    const existingScript = document.getElementById("ml-universal");
    if (existingScript) existingScript.remove();

    // Crea el script de MailerLite
    const script = document.createElement("script");
    script.src = "https://assets.mailerlite.com/js/universal.js";
    script.async = true;
    script.id = "ml-universal";
    document.body.appendChild(script);

    // Limpieza: elimina script cuando desmonta el componente
    return () => {
      script.remove();
    };
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
            {/* Aquí va el código embebido EXACTO de MailerLite */}
            <div
              ref={formRef}
              className="ml-embedded"
              data-form="PBMiVg"
            ></div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GetStarted;
