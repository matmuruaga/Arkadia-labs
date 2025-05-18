import { motion } from 'framer-motion';
import AnimatedLines from '../components/AnimatedLines'; // o comentá esta línea si no lo usás

const Plans = () => {
  return (
    <section id="subscription-plans" className="py-20 px-4 bg-[#0C0F3F] relative overflow-hidden">
      <AnimatedLines />
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold text-center mb-6 gradient-text">
          Subscription Plans
        </h2>
        <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
          Choose the Perfect AI Sales Team for Your Business
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "AI Employee",
              price: "$1,997",
              setupFee: "$1,500 one-time setup fee",
              features: [
                "1 AI Sales System built & trained",
                "2× Monthly Strategy Calls (30 min)",
                "Standard Email & Chat Support",
                "CRM Integration",
                "Monthly Optimizing Session",
                "Standard Response (24–48h)"
              ],
              excluded: ["External Tools (Twilio, APIs, CRMs)","Dedicated Slack Channel"],
              description: "Small businesses automating lead qualification & follow-ups.",
              className: "pricing-card-basic"
            },
            {
              name: "AI Sales Team",
              price: "$3,997",
              setupFee: "$2,500 one-time setup fee",
              features: [
                "3 AI Sales Systems built & trained",
                "4× Monthly Strategy Calls (30 min)",
                "Priority Email & Chat Support",
                "Dedicated Slack Channel",
                "CRM Integration",
                "Bi-Weekly Optimization Session",
                "Priority Response (12–24h)"
              ],
              excluded: ["External Tools (Twilio, APIs, CRMs)"],
              description: "Designed for scaling teams automating multiple sales functions.",
              className: "pricing-card-pro"
            },
            {
              name: "AI Growth Partner",
              price: "$7,997",
              setupFee: "$5,000 one-time setup fee",
              features: [
                "10 AI Sales System built & trained",
                "Weekly Strategy Calls (60 min)",
                "Exclusive Email & Chat Support",
                "Dedicated Slack Channel",
                "CRM Integrations",
                "Weekly Optimization Sessions",
                "4-Hour Response Time"
              ],
              excluded: ["External Tools (Twilio, APIs, CRMs)",],
              description: "For companies automating their entire sales funnel.",
              className: "pricing-card-enterprise"
            }
          ].map((plan, index) => (
            <motion.div
              key={index}
              className={`pricing-card ${plan.className} p-8 rounded-xl neon-border flex flex-col items-center`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-2 text-center">{plan.name}</h3>
              <div className="flex items-baseline justify-center mb-1">
                <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                <span className="text-gray-400 ml-1">/mo</span>
              </div>
              <p className="text-sm text-gray-400 mb-6">{plan.setupFee}</p>
              
              <hr className="glow-divider" />
              
              <ul className="space-y-3 mb-6 text-left w-full">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <hr className="glow-divider" />

              <ul className="space-y-3 mb-6 text-left w-full">
                {plan.excluded.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-red-400 mr-2">✗</span>
                    <span className="text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>

              <p className="text-sm text-gray-400 mb-6">{plan.description}</p>

              <button className="w-full bg-[var(--accent)] hover:bg-[var(--secondary)] text-[var(--primary)] hover:text-white px-6 py-3 rounded-full font-semibold transition-all duration-300">
                Get Started
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="mb-6">
            <p className="text-[var(--accent)]">💰 Save 20% with annual billing</p>
            <p className="text-gray-400">Payment options: Invoice, Bank Transfer, Stripe (Credit Card)</p>
          </div>
          
          <div className="inline-block text-left">
            <h4 className="text-[var(--accent)] mb-2">✳️ Add-ons:</h4>
            <ul className="text-gray-300">
              <li>Additional Strategy Call – $250</li>
              <li>Sales Training for Human Team – $750</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Plans;
