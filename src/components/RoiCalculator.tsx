// src/components/RoiCalculator.tsx
import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // 1. Importar
import { trackRoiCalculatorStart, trackRoiPlanChange, trackRoiResults } from '@/utils/dataLayer';

// 2. La data de los planes ahora usa claves de traducción para el nombre
const plans = [
  { id: 'employee', nameKey: 'roiCalculator.plans.employee', cost: 1997, savedHoursPerRep: 10, leadIncrease: 0.20 },
  { id: 'team', nameKey: 'roiCalculator.plans.team', cost: 3997, savedHoursPerRep: 25, leadIncrease: 0.45 },
  { id: 'partner', nameKey: 'roiCalculator.plans.partner', cost: 7997, savedHoursPerRep: 40, leadIncrease: 0.70 },
];

const RoiCalculator = () => {
  const { t, i18n } = useTranslation(); // 3. Inicializar hook
  const [selectedPlanId, setSelectedPlanId] = useState('team');
  const [numReps, setNumReps] = useState(5);
  const [avgDealSize, setAvgDealSize] = useState(5000);
  const [monthlyLeads, setMonthlyLeads] = useState(100);
  const [calculatorStarted, setCalculatorStarted] = useState(false);

  // La función de formato de moneda ahora se adapta al idioma
  const formatCurrency = (value: number) => {
    const locale = i18n.language === 'es' ? 'es-ES' : 'en-US';
    const currency = i18n.language === 'es' ? 'EUR' : 'USD';
    return new Intl.NumberFormat(locale, { style: 'currency', currency: currency, minimumFractionDigits: 0 }).format(value);
  };

  const calculation = useMemo(() => {
    const selectedPlan = plans.find(p => p.id === selectedPlanId);
    if (!selectedPlan) return { revenueGain: 0, hoursSaved: 0, roi: 0 };

    const additionalLeads = monthlyLeads * selectedPlan.leadIncrease;
    const additionalDeals = additionalLeads * 0.10;
    const revenueGain = additionalDeals * avgDealSize;
    const hoursSaved = numReps * selectedPlan.savedHoursPerRep;
    const savingsFromHours = hoursSaved * 50;
    const totalMonthlyGain = revenueGain + savingsFromHours;
    const roi = ((totalMonthlyGain - selectedPlan.cost) / selectedPlan.cost) * 100;

    return { revenueGain, hoursSaved, roi };
  }, [selectedPlanId, numReps, avgDealSize, monthlyLeads]);

  // Track when calculator interaction starts
  const handleCalculatorInteraction = () => {
    if (!calculatorStarted) {
      trackRoiCalculatorStart(selectedPlanId);
      setCalculatorStarted(true);
    }
  };

  // Track plan changes
  const handlePlanChange = (planId: string) => {
    const selectedPlan = plans.find(p => p.id === planId);
    if (selectedPlan) {
      trackRoiPlanChange(t(selectedPlan.nameKey));
    }
    setSelectedPlanId(planId);
  };

  // Track ROI results when calculation changes
  useEffect(() => {
    if (calculatorStarted && calculation.roi > 0) {
      trackRoiResults(
        calculation.revenueGain,
        calculation.hoursSaved,
        calculation.roi,
        selectedPlanId
      );
    }
  }, [calculation.revenueGain, calculation.hoursSaved, calculation.roi, selectedPlanId, calculatorStarted]);

  return (
    <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-slate-200">
      {/* 4. Usar t() para todos los textos */}
      <h3 className="text-3xl font-bold text-center mb-2 text-[#0D1B2A]">{t('roiCalculator.title')}</h3>
      <p className="text-center text-gray-500 mb-8 md:mb-12">{t('roiCalculator.subtitle')}</p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-2 mb-8 bg-slate-100 p-1.5 rounded-full max-w-lg mx-auto">
        {plans.map(plan => (
          <button
            key={plan.id}
            onClick={() => handlePlanChange(plan.id)}
            className={`px-4 py-2 rounded-full font-semibold transition-all w-full text-sm ${selectedPlanId === plan.id ? 'bg-[#1C7ED6] text-white shadow' : 'text-gray-600 hover:bg-slate-200'}`}
          >
            {t(plan.nameKey)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div className="space-y-6">
          <div>
            <label htmlFor="numReps" className="block text-sm font-medium text-gray-700">{t('roiCalculator.inputs.reps')}</label>
            <input
              id="numReps"
              type="range"
              min="1"
              max="50"
              value={numReps}
              onChange={e => setNumReps(Number(e.target.value))}
              onFocus={handleCalculatorInteraction}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1C7ED6]"
            />
            <span className="text-lg font-bold text-[#1C7ED6]">{numReps}</span>
          </div>
          <div>
            <label htmlFor="avgDealSize" className="block text-sm font-medium text-gray-700">{t('roiCalculator.inputs.dealSize')}</label>
            <input
              id="avgDealSize"
              type="range"
              min="500"
              max="50000"
              step="500"
              value={avgDealSize}
              onChange={e => setAvgDealSize(Number(e.target.value))}
              onFocus={handleCalculatorInteraction}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1C7ED6]"
            />
            <span className="text-lg font-bold text-[#1C7ED6]">{formatCurrency(avgDealSize)}</span>
          </div>
          <div>
            <label htmlFor="monthlyLeads" className="block text-sm font-medium text-gray-700">{t('roiCalculator.inputs.leads')}</label>
            <input
              id="monthlyLeads"
              type="range"
              min="10"
              max="2000"
              step="10"
              value={monthlyLeads}
              onChange={e => setMonthlyLeads(Number(e.target.value))}
              onFocus={handleCalculatorInteraction}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1C7ED6]"
            />
            <span className="text-lg font-bold text-[#1C7ED6]">{monthlyLeads}</span>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-lg text-center flex flex-col justify-center border border-slate-200">
            <p className="text-sm font-semibold text-gray-500 tracking-wider">{t('roiCalculator.results.gain')}</p>
            <motion.p 
              key={`revenue-${calculation.revenueGain}`}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-[#69DB7C] my-2"
            >
              {formatCurrency(calculation.revenueGain)}
            </motion.p>
            <hr className="my-4 border-slate-200"/>
            <div className="flex justify-around">
              <div>
                <p className="text-xs text-gray-500">{t('roiCalculator.results.hoursSaved')}</p>
                <motion.p key={`hours-${calculation.hoursSaved}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-bold text-[#0D1B2A]">{calculation.hoursSaved}{t('roiCalculator.results.perMonthSuffix')}</motion.p>
              </div>
              <div>
                <p className="text-xs text-gray-500">{t('roiCalculator.results.roi')}</p>
                <motion.p key={`roi-${calculation.roi}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-bold text-[#0D1B2A]">{calculation.roi.toFixed(0)}%</motion.p>
              </div>
            </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-8 text-center px-4">
        {t('roiCalculator.disclaimer')}
      </p>
    </div>
  );
};

export default RoiCalculator;