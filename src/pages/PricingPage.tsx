// src/pages/PricingPage.tsx
import { useState } from 'react';
import PricingHeader from '../components/PricingHeader'; // 1. Importar el nuevo componente
import PricingTiers from '../components/PricingTiers';
import FeatureComparisonTable from '../components/FeatureComparisonTable';
import RoiCalculator from '../components/RoiCalculator';
import Modal from '../components/Modal';
import FinalCtaSection from "../components/FinalCtaSection";

const PricingPage = () => {
  const [isRoiModalOpen, setIsRoiModalOpen] = useState(false);

  const openRoiModal = () => setIsRoiModalOpen(true);
  const closeRoiModal = () => setIsRoiModalOpen(false);

  return (
    <>
      {/* 2. Usar el nuevo componente de cabecera */}
      <PricingHeader />

      {/* 3. Nueva sección solo para los planes de precios, manteniendo el estilo */}
      <section id="pricing-tiers-section" className="pb-20 md:pb-24 bg-[#F1F3F5] pt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <PricingTiers />
        </div>
      </section>

      {/* El resto de la página permanece igual */}
      <FeatureComparisonTable onOpenCalculator={openRoiModal} />
      
      <Modal isOpen={isRoiModalOpen} onClose={closeRoiModal}>
        <RoiCalculator />
      </Modal>

      <FinalCtaSection />
    </>
  );
};

export default PricingPage;