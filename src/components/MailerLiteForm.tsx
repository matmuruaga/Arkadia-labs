import { useEffect } from 'react';

const MailerLiteForm = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://groot.mailerlite.com/js/w/webforms.min.js?v176e10baa5e7ed80d35ae235be3d5024';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex justify-center w-full">
      {/* Este div será procesado automáticamente por MailerLite */}
      <div className="ml-embedded" data-form="PBMiVg"></div>
    </div>
  );
};

export default MailerLiteForm;
