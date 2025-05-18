import { useEffect } from "react";

const MailerLiteForm = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://groot.mailerlite.com/js/w/webforms.min.js?v176e10baa5e7ed80d35ae235be3d5024";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="bg-[#0B0E35] p-6 rounded-xl shadow-lg neon-border max-w-3xl mx-auto">
      <div
        dangerouslySetInnerHTML={{
          __html: `<div class="ml-embedded" data-form="PBMiVg"></div>`,
        }}
      />
    </div>
  );
};

export default MailerLiteForm;
