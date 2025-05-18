import { motion } from 'framer-motion';
import { Map, Wrench, RefreshCw, LineChart, Rocket } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 px-4 bg-[#0C0F3F] relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        <h2 className="text-4xl font-bold text-center mb-6 gradient-text">
          How Implementation Works
        </h2>
        <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
          A Streamlined Process to Get AI Systems Delivering Results — Without Disrupting Your Team
        </p>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[var(--accent)]/20">
            <div className="timeline-line">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="timeline-dot"
                  style={{
                    top: `${20 * i}%`,
                    animationDelay: `${i * 0.4}s`
                  }}
                />
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {[
              {
                step: "STEP 1",
                title: "Strategy Call & Process Discovery",
                duration: "1-4 Hours",
                icon: Map,
                color: "bg-yellow-500",
                description: "We start with a collaborative call to map your sales process, tools, and growth goals. This ensures your AI system is designed for maximum impact from day one."
              },
              {
                step: "STEP 2",
                title: "AI System Design & Buildout",
                duration: "1-4 Weeks",
                icon: Wrench,
                color: "bg-purple-500",
                description: "Our team handles the heavy lifting: we analyze workflows, design your AI logic, and prep integrations. Minimal input required — you stay focused on running your business."
              },
              {
                step: "STEP 3",
                title: "Seamless Integration & Live Launch",
                duration: "1 Week",
                icon: RefreshCw,
                color: "bg-orange-500",
                description: "Your AI system is embedded directly into your existing stack (CRM, email, calls, etc.). No disruption. No workflow changes. Just an invisible upgrade that starts working immediately."
              },
              {
                step: "STEP 4",
                title: "Onboarding, Training & Performance Dashboard",
                duration: "1 Week",
                icon: LineChart,
                color: "bg-green-500",
                description: "We onboard your team (if needed), train you on how to review results, and provide a live dashboard to track performance. You'll see exactly how AI is moving your pipeline — in real-time."
              },
              {
                step: "STEP 5",
                title: "Optional: Continuous Optimization & Scale",
                duration: "Ongoing",
                icon: Rocket,
                color: "bg-purple-500",
                description: "As you grow, we optimize your AI systems, layer on new capabilities, and ensure your revenue engine scales — without extra headcount.",
                optional: true
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-8`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="hidden md:flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[var(--accent)] flex items-center justify-center shadow-[0_0_15px_rgba(92,225,230,0.5)]">
                    <step.icon size={24} className="text-[#0C0F3F]" />
                  </div>
                </div>

                <div className={`
                  flex-1 p-6 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] neon-border
                  ${step.optional ? 'border border-dashed border-[var(--accent)]/30' : ''}
                `}>
                  <div className="md:hidden mb-4">
                    <div className="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center shadow-[0_0_15px_rgba(92,225,230,0.5)]">
                      <step.icon size={20} className="text-[#0C0F3F]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[var(--accent)] font-semibold">{step.step}</span>
                      <span className="text-gray-400 text-sm">({step.duration})</span>
                    </div>

                    <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
