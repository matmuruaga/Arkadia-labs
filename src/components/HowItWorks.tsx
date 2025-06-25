import React from 'react';
import { useTranslation } from 'react-i18next'; // 1. Importar

const imageUrl = 'https://res.cloudinary.com/dwhidn4z1/image/upload/v1750856143/u5837542839_A_visually_striking_3D_digital_illustration_of_in_056caa21-e46c-4e64-9a6e-7c4905c17c9a_3_ivp7px.png';

const HowItWorks: React.FC = () => {
  const { t } = useTranslation(); // 2. Inicializar hook

  return (
    <section className="how-it-works-section">
      <div className="how-it-works-grid">
        
        {/* Columna de Texto */}
        <div className="how-it-works-text">
          {/* 3. Usar la función t() para todos los textos */}
          <h2>{t('howItWorks.title')}</h2>
          <p>{t('howItWorks.p1')}</p>
          <p>{t('howItWorks.p2')}</p>
        </div>

        {/* Columna de Imagen */}
        <div className="how-it-works-image-container">
          <img 
            src={imageUrl} 
            alt={t('howItWorks.altImage')} 
            className="how-it-works-image" 
          />
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;