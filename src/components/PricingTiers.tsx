// src/components/PricingTiers.tsx
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Crown } from 'lucide-react';
import { useTranslation } from 'react-i18next'; // 1. Importar

// 2. La data ahora contiene claves de traducción (keys) y datos que no cambian
const plansData = [
  {
    price: "$1,997",
    isRecommended: false,
    nameKey: "pricing.plans.p1.name",
    setupFeeKey: "pricing.plans.p1.setupFee",
    descriptionKey: "pricing.plans.p1.description",
    ctaTextKey: "pricing.plans.p1.cta",
    featureKeys: [
      "pricing.plans.p1.features.f1", "pricing.plans.p1.features.f2", "pricing.plans.p1.features.f3",
      "pricing.plans.p1.features.f4", "pricing.plans.p1.features.f5", "pricing.plans.p1.features.f6"
    ],
    excludedKeys: ["pricing.plans.p1.excluded.e1", "pricing.plans.p1.excluded.e2"],
  },
  {
    price: "$3,997",
    isRecommended: true,
    nameKey: "pricing.plans.p2.name",
    setupFeeKey: "pricing.plans.p2.setupFee",
    descriptionKey: "pricing.plans.p2.description",
    ctaTextKey: "pricing.plans.p2.cta",
    featureKeys: [
      "pricing.plans.p2.features.f1", "pricing.plans.p2.features.f2", "pricing.plans.p2.features.f3",
      "pricing.plans.p2.features.f4", "pricing.plans.p2.features.f5", "pricing.plans.p2.features.f6", "pricing.plans.p2.features.f7"
    ],
    excludedKeys: ["pricing.plans.p2.excluded.e1"],
  },
  {
    price: "$7,997",
    isRecommended: false,
    nameKey: "pricing.plans.p3.name",
    setupFeeKey: "pricing.plans.p3.setupFee",
    descriptionKey: "pricing.plans.p3.description",
    ctaTextKey: "pricing.plans.p3.cta",
    featureKeys: [
      "pricing.plans.p3.features.f1", "pricing.plans.p3.features.f2", "pricing.plans.p3.features.f3",
      "pricing.plans.p3.features.f4", "pricing.plans.p3.features.f5", "pricing.plans.p3.features.f6", "pricing.plans.p3.features.f7"
    ],
    excludedKeys: ["pricing.plans.p3.excluded.e1"],
  }
];

const PricingTiers = () => {
  const { t } = useTranslation(); // 3. Inicializar hook

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {plansData.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="h-full"
          >
            {/* 4. Usar la función t() para todos los textos */}
            <div className={`w-full h-full rounded-2xl transition-all duration-300 ${plan.isRecommended ? 'p-1.5 bg-gradient-to-br from-[#D0BFFF] via-[#1C7ED6] to-[#69DB7C] shadow-2xl' : 'bg-white shadow-lg'}`}>
              <div className="bg-white rounded-xl h-full p-8 flex flex-col relative">
                
                {plan.isRecommended && (
                  <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#1C7ED6] to-[#D0BFFF] text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1.5 shadow-lg">
                    <Crown size={16} />
                    {t('pricing.mostPopular')}
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-2 text-center text-[#0D1B2A]">{t(plan.nameKey)}</h3>
                <div className="flex items-baseline justify-center mb-1">
                  <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0D1B2A] to-[#1C7ED6]">{plan.price}</span>
                  <span className="text-gray-500 ml-1">{t('pricing.perMonth')}</span>
                </div>
                <p className="text-sm text-gray-400 mb-6 text-center">{t(plan.setupFeeKey)}</p>
                
                <hr className="border-slate-200 my-4" />
                
                <ul className="space-y-3 mb-6 text-left w-full text-sm">
                  {plan.featureKeys.map((featureKey, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="text-[#69DB7C] mt-0.5 flex-shrink-0" size={18} />
                      <span className="text-[#0D1B2A]/90">{t(featureKey)}</span>
                    </li>
                  ))}
                </ul>

                {plan.excludedKeys && plan.excludedKeys.length > 0 && (
                  <>
                    <hr className="border-slate-200 my-4" />
                    <ul className="space-y-3 mb-6 text-left w-full text-sm">
                      {plan.excludedKeys.map((excludedKey, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <XCircle className="text-red-400 mt-0.5 flex-shrink-0" size={18}/>
                          <span className="text-gray-500">{t(excludedKey)}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <p className="text-sm text-gray-500 text-center flex-grow mb-8">{t(plan.descriptionKey)}</p>

                <button className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  plan.isRecommended
                    ? 'bg-[#1C7ED6] hover:bg-[#155CB0] text-white shadow-lg'
                    : 'bg-slate-100 hover:bg-slate-200 text-[#0D1B2A]'
                }`}>
                  {t(plan.ctaTextKey)}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center text-[#0D1B2A]/80">
        <p className="font-semibold text-[#1C7ED6] text-lg">{t('pricing.footer.annualDiscount')}</p>
        <p className="mt-2">{t('pricing.footer.paymentOptions')}</p>
        <div className="mt-8 inline-block text-left border-t border-slate-200 pt-6">
          <h4 className="font-semibold text-lg mb-2">{t('pricing.footer.addOnsTitle')}</h4>
          <ul className="space-y-1">
            <li>{t('pricing.footer.addOn1')}</li>
            <li>{t('pricing.footer.addOn2')}</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default PricingTiers;