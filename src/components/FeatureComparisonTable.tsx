// src/components/FeatureComparisonTable.tsx
import { motion } from 'framer-motion';
import { Check, X, Crown, Calculator } from 'lucide-react'; // Añadido icono de Calculadora

const featuresList = [
  { feature: "AI Sales Systems built & trained", plan1: "1", plan2: "3", plan3: "10" },
  { feature: "Monthly Strategy Calls", plan1: "2× (30 min)", plan2: "4× (30 min)", plan3: "Weekly (60 min)" },
  { feature: "Email & Chat Support", plan1: "Standard", plan2: "Priority", plan3: "Exclusive" },
  { feature: "Dedicated Slack Channel", plan1: false, plan2: true, plan3: true },
  { feature: "CRM Integration(s)", plan1: true, plan2: true, plan3: true },
  { feature: "Optimization Sessions", plan1: "Monthly", plan2: "Bi-Weekly", plan3: "Weekly" },
  { feature: "Support Response Time", plan1: "24–48h", plan2: "12–24h", plan3: "4-Hour" },
  { feature: "External Tools (Twilio, APIs, CRMs)", plan1: false, plan2: false, plan3: false },
];

const planNames = [
  { name: "AI Employee", recommended: false },
  { name: "AI Sales Team", recommended: true },
  { name: "AI Growth Partner", recommended: false }
];

// Se añade una prop 'onOpenCalculator' para que el componente padre le diga qué hacer al botón
interface FeatureTableProps {
  onOpenCalculator: () => void;
}

const FeatureComparisonTable: React.FC<FeatureTableProps> = ({ onOpenCalculator }) => {
  const checkIcon = <Check className="text-green-500" size={24} />;
  const xIcon = <X className="text-red-400" size={24} />;

  const getFeatureValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? checkIcon : xIcon;
    }
    return <span className="text-sm font-semibold text-[#0D1B2A]">{value}</span>;
  };

  return (
    <section id="feature-comparison" className="py-20 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div 
          className="text-center mb-12 md:mb-16" 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }} 
        >
          <h2 className="text-4xl font-bold text-[#0D1B2A]">Compare Plans Side-by-Side</h2>
          <p className="text-lg text-[#0D1B2A]/75 mt-2">Find the exact features you need to drive growth.</p>
        </motion.div>
        
        <motion.div
          className="w-full overflow-x-auto rounded-lg border border-slate-200 shadow-md"
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }} 
        >
          <table className="w-full min-w-[700px] border-collapse text-center">
            {/* Cabecera de la Tabla */}
            <thead>
              <tr >
                <th className="p-4 text-left font-bold text-lg text-[#0D1B2A] w-1/3">Features</th>
                {planNames.map(plan => (
                  <th key={plan.name} className={`p-4 border-b-2 ${plan.recommended ? 'border-[#1C7ED6]' : 'border-slate-200'}`}>
                    <span className={`text-lg font-bold ${plan.recommended ? 'text-[#1C7ED6]' : 'text-[#0D1B2A]'}`}>{plan.name}</span>
                    {plan.recommended && <Crown className="inline-block ml-2 text-yellow-500 fill-yellow-400" size={20}/>}
                  </th>
                ))}
              </tr>
            </thead>
            {/* Cuerpo de la Tabla */}
            <tbody>
              {featuresList.map((featureRow) => (
                <tr 
                  key={featureRow.feature}
                  className="border-b border-slate-200 last:border-b-0"
                >
                  <td className="p-4 text-left font-medium text-gray-700">{featureRow.feature}</td>
                  <td className="p-4"><div className="flex justify-center">{getFeatureValue(featureRow.plan1)}</div></td>
                  <td className="p-4 bg-blue-500/5"><div className="flex justify-center">{getFeatureValue(featureRow.plan2)}</div></td>
                  <td className="p-4"><div className="flex justify-center">{getFeatureValue(featureRow.plan3)}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
        
        {/* Botón para abrir la Calculadora de ROI */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <button
            onClick={onOpenCalculator} // Llama a la función recibida por props
            className="bg-slate-100 hover:bg-slate-200 text-[#0D1B2A] px-6 py-3 rounded-lg text-base font-semibold transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#1C7ED6]/20 flex items-center justify-center gap-2 mx-auto"
          >
            <Calculator size={20} className="text-[#1C7ED6]" />
            Calculate Your Potential ROI
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureComparisonTable;