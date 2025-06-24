// src/pages/ThankYouPage.tsx

import { Link } from 'react-router-dom';
import { InlineWidget } from 'react-calendly';
import { CheckCircle } from 'lucide-react';

export const ThankYouPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white p-8 md:p-12 rounded-xl shadow-lg text-center">
        
        {/* 1. Icono de Éxito */}
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>

        {/* 2. Mensaje de Agradecimiento y Siguiente Paso */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          ¡Gracias por tu interés!
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Hemos recibido tu solicitud y nos pondremos en contacto contigo pronto. <br/>
          Para acelerar el proceso, puedes agendar una llamada directamente en nuestro calendario:
        </p>

        {/* 3. Widget de Calendly Incrustado */}
        {/* IMPORTANTE: Reemplaza la URL con el enlace a tu evento de Calendly */}
        <div className="min-h-[700px] border rounded-lg overflow-hidden">
          <InlineWidget url="https://calendly.com/tu-usuario/tu-evento-de-15min" />
        </div>

        {/* 4. Enlace para volver al inicio */}
        <div className="mt-8">
          <Link to="/" className="text-sm text-blue-600 hover:underline">
            Volver a la página principal
          </Link>
        </div>

      </div>
    </div>
  );
};