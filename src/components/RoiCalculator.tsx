// src/components/RoiCalculator.tsx
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const plans = [
  { id: 'employee', name: 'AI Employee', cost: 1997, savedHoursPerRep: 10, leadIncrease: 0.20 },
  { id: 'team', name: 'AI Sales Team', cost: 3997, savedHoursPerRep: 25, leadIncrease: 0.45 },
  { id: 'partner', name: 'AI Growth Partner', cost: 7997, savedHoursPerRep: 40, leadIncrease: 0.70 },
];

const RoiCalculator = () => {
  const [selectedPlanId, setSelectedPlanId] = useState('team');
  const [numReps, setNumReps] = useState(5);
  const [avgDealSize, setAvgDealSize] = useState(5000);
  const [monthlyLeads, setMonthlyLeads] = useState(100);

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);

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

  return (
    <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-slate-200">
      <h3 className="text-3xl font-bold text-center mb-2 text-[#0D1B2A]">Calculate Your ROI</h3>
      <p className="text-center text-gray-500 mb-8 md:mb-12">Adjust the sliders to see your potential savings and revenue growth.</p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-2 mb-8 bg-slate-100 p-1.5 rounded-full max-w-lg mx-auto">
        {plans.map(plan => (
          <button
            key={plan.id}
            onClick={() => setSelectedPlanId(plan.id)}
            className={`px-4 py-2 rounded-full font-semibold transition-all w-full text-sm ${selectedPlanId === plan.id ? 'bg-[#1C7ED6] text-white shadow' : 'text-gray-600 hover:bg-slate-200'}`}
          >
            {plan.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Columna de Inputs (Sliders) */}
        <div className="space-y-6">
          <div>
            <label htmlFor="numReps" className="block text-sm font-medium text-gray-700">Number of Sales Reps</label>
            <input id="numReps" type="range" min="1" max="50" value={numReps} onChange={e => setNumReps(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1C7ED6]" />
            <span className="text-lg font-bold text-[#1C7ED6]">{numReps}</span>
          </div>
          <div>
            <label htmlFor="avgDealSize" className="block text-sm font-medium text-gray-700">Average Deal Size</label>
            <input id="avgDealSize" type="range" min="500" max="50000" step="500" value={avgDealSize} onChange={e => setAvgDealSize(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1C7ED6]" />
            <span className="text-lg font-bold text-[#1C7ED6]">{formatCurrency(avgDealSize)}</span>
          </div>
          <div>
            <label htmlFor="monthlyLeads" className="block text-sm font-medium text-gray-700">Current Monthly Leads</label>
            <input id="monthlyLeads" type="range" min="10" max="2000" step="10" value={monthlyLeads} onChange={e => setMonthlyLeads(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1C7ED6]" />
            <span className="text-lg font-bold text-[#1C7ED6]">{monthlyLeads}</span>
          </div>
        </div>

        {/* Columna de Resultados */}
        <div className="bg-slate-50 p-6 rounded-lg text-center flex flex-col justify-center border border-slate-200">
            {/* --- ASTERISCO AÑADIDO AQUÍ --- */}
            <p className="text-sm font-semibold text-gray-500 tracking-wider">POTENTIAL MONTHLY GAIN*</p>
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
                <p className="text-xs text-gray-500">HOURS SAVED*</p>
                <motion.p key={`hours-${calculation.hoursSaved}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-bold text-[#0D1B2A]">{calculation.hoursSaved}/mo</motion.p>
              </div>
              <div>
                <p className="text-xs text-gray-500">EST. ROI*</p>
                <motion.p key={`roi-${calculation.roi}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-bold text-[#0D1B2A]">{calculation.roi.toFixed(0)}%</motion.p>
              </div>
            </div>
        </div>
      </div>

      {/* --- TEXTO DE DESCARGO DE RESPONSABILIDAD AÑADIDO AQUÍ --- */}
      <p className="text-xs text-gray-500 mt-8 text-center px-4">
        *All results shown are estimates based on the data you provide and our general customer models. A personalized deep-dive analysis is required for a more precise forecast.
      </p>
    </div>
  );
};

export default RoiCalculator;