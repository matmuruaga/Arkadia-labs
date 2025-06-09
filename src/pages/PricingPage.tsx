// src/pages/PricingPage.tsx
import { useState } from 'react'; // Importa useState
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import PricingTiers from '../components/PricingTiers';
import FeatureComparisonTable from '../components/FeatureComparisonTable';
import RoiCalculator from '../components/RoiCalculator';
import Modal from '../components/Modal'; // Importa el nuevo componente Modal
import FinalCtaSection from "../components/FinalCtaSection";

const PricingPage = () => {
  // --- 1. Estado para controlar la visibilidad del modal ---
  const [isRoiModalOpen, setIsRoiModalOpen] = useState(false);

  // --- 2. Funciones para abrir y cerrar el modal ---
  const openRoiModal = () => setIsRoiModalOpen(true);
  const closeRoiModal = () => setIsRoiModalOpen(false);

  return (
    <Layout>
      {/* Sección de los Planes de Precios */}
      <section id="pricing-tiers-section" className="py-20 md:py-24 bg-[#F1F3F5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div className="text-center mb-12 md:mb-16" /* ... */ >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0D1B2A] mb-4">
              Find the Perfect AI Partner for Your Business
            </h1>
            <p className="text-lg md:text-xl text-[#0D1B2A]/75 max-w-3xl mx-auto">
              Simple, transparent pricing to help you scale. Choose the plan that fits your growth ambitions.
            </p>
          </motion.div>
          <PricingTiers />
        </div>
      </section>

      {/* Sección de la Tabla Comparativa */}
      {/* --- 3. Pasa la función para abrir el modal como prop --- */}
      <FeatureComparisonTable onOpenCalculator={openRoiModal} />
      
      {/* Ya no renderizamos la calculadora directamente en la página */}
      {/* <section id="roi-calculator" ...> ... </section> */}

      {/* --- 4. Renderiza el Modal con la Calculadora de ROI adentro --- */}
      <Modal isOpen={isRoiModalOpen} onClose={closeRoiModal}>
        <RoiCalculator />
      </Modal>
      <FinalCtaSection />
    </Layout>
  );
};

export default PricingPage;