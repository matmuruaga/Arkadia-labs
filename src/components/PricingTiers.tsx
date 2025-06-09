// src/components/PricingTiers.tsx
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Crown } from 'lucide-react';

const plansData = [
  {
    name: "AI Employee",
    price: "$1,997",
    setupFee: "$1,500 one-time setup fee",
    features: [ "1 AI Sales System built & trained", "2× Monthly Strategy Calls (30 min)", "Standard Email & Chat Support", "CRM Integration", "Monthly Optimizing Session", "Standard Response (24–48h)" ],
    excluded: ["External Tools (Twilio, APIs, CRMs)","Dedicated Slack Channel"],
    description: "For small businesses automating lead qualification & follow-ups.",
    ctaText: "Choose Plan",
  },
  {
    name: "AI Sales Team",
    price: "$3,997",
    setupFee: "$2,500 one-time setup fee",
    features: [ "3 AI Sales Systems built & trained", "4× Monthly Strategy Calls (30 min)", "Priority Email & Chat Support", "Dedicated Slack Channel", "CRM Integration", "Bi-Weekly Optimization Session", "Priority Response (12–24h)" ],
    excluded: ["External Tools (Twilio, APIs, CRMs)"],
    description: "Designed for scaling teams automating multiple sales functions.",
    ctaText: "Get Started Now",
    isRecommended: true,
  },
  {
    name: "AI Growth Partner",
    price: "$7,997",
    setupFee: "$5,000 one-time setup fee",
    features: [ "10 AI Sales System built & trained", "Weekly Strategy Calls (60 min)", "Exclusive Email & Chat Support", "Dedicated Slack Channel", "CRM Integrations", "Weekly Optimization Sessions", "4-Hour Response Time" ],
    excluded: ["External Tools (Twilio, APIs, CRMs)"],
    description: "For enterprises automating their entire sales funnel.",
    ctaText: "Contact Sales",
  }
];

const PricingTiers = () => {
  return (
    // Este componente no necesita su propia <section> si se usa dentro de otra sección en PricingPage
    // Si lo usaras solo, podrías añadir una <section> aquí.
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {plansData.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <div className={`w-full h-full rounded-2xl transition-all duration-300 ${plan.isRecommended ? 'p-1.5 bg-gradient-to-br from-[#D0BFFF] via-[#1C7ED6] to-[#69DB7C] shadow-2xl' : 'bg-white shadow-lg'}`}>
              <div className="bg-white rounded-xl h-full p-8 flex flex-col relative">
                
                {plan.isRecommended && (
                  <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#1C7ED6] to-[#D0BFFF] text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1.5 shadow-lg">
                    <Crown size={16} />
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-2 text-center text-[#0D1B2A]">{plan.name}</h3>
                <div className="flex items-baseline justify-center mb-1">
                  <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0D1B2A] to-[#1C7ED6]">{plan.price}</span>
                  <span className="text-gray-500 ml-1">/mo</span>
                </div>
                <p className="text-sm text-gray-400 mb-6 text-center">{plan.setupFee}</p>
                
                <hr className="border-slate-200 my-4" />
                
                <ul className="space-y-3 mb-6 text-left w-full text-sm">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="text-[#69DB7C] mt-0.5 flex-shrink-0" size={18} />
                      <span className="text-[#0D1B2A]/90">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.excluded && plan.excluded.length > 0 && (
                  <>
                    <hr className="border-slate-200 my-4" />
                    <ul className="space-y-3 mb-6 text-left w-full text-sm">
                      {plan.excluded.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <XCircle className="text-red-400 mt-0.5 flex-shrink-0" size={18}/>
                          <span className="text-gray-500">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <p className="text-sm text-gray-500 text-center flex-grow mb-8">{plan.description}</p>

                <button className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  plan.isRecommended
                    ? 'bg-[#1C7ED6] hover:bg-[#155CB0] text-white shadow-lg'
                    : 'bg-slate-100 hover:bg-slate-200 text-[#0D1B2A]'
                }`}>
                  {plan.ctaText}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center text-[#0D1B2A]/80">
        <p className="font-semibold text-[#1C7ED6] text-lg">💰 Save up to 20% with annual billing!</p>
        <p className="mt-2">Payment options: Invoice, Bank Transfer, Stripe (Credit Card)</p>
        <div className="mt-8 inline-block text-left border-t border-slate-200 pt-6">
          <h4 className="font-semibold text-lg mb-2">✳️ Add-ons Available:</h4>
          <ul className="space-y-1">
            <li>Additional Strategy Call – $250</li>
            <li>Sales Training for Human Team – $750</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default PricingTiers;