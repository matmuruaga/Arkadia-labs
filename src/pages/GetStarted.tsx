import { useEffect } from "react";
import Layout from "../components/Layout";

const GetStarted = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined" && window.ml) {
        window.ml("form", "load");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      <section className="bg-[var(--primary)] text-white py-24 px-6 min-h-screen flex flex-col items-center justify-center text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Let’s Design Your AI Agent Together
          </h1>
          <p className="text-lg text-gray-300 mb-10">
            Tell us what you need and we’ll help you plan the perfect AI system —
            no pressure, just discovery.
          </p>
        </div>

        {/* FORMULARIO MAILERLITE */}
          <div className="ml-embedded" data-form="PBMiVg"></div>
      </section>
    </Layout>
  );
};

export default GetStarted;
