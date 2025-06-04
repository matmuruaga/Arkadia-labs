// src/components/KpiSection.tsx
import { motion } from 'framer-motion';
import AnimatedNumber from './AnimatedNumber'; // Importa el nuevo componente
import { TrendingUp, Zap, BarChart4, CheckCircle } from 'lucide-react'; // Nuevos iconos

// En KpiSection.tsx, actualiza kpiData
const kpiData = [
    {
      Icon: TrendingUp,
      description: "Global law firm automates compiling and analysis of legal docs with our AI.",
      numericValue: 75,
      suffix: "%",
      label: "Reduction in Manual Task Time",
      accentColor: "#69DB7C", // Tu Verde (directamente el hexadecimal)
    },
    {
      Icon: Zap,
      description: "European fintech scales up new hire onboarding using AI agents.",
      numericValue: 3,
      suffix: "x",
      label: "Faster Response & Resolution",
      accentColor: "#1C7ED6", // Tu Azul Brillante
    },
    {
      Icon: BarChart4, // Un icono de gráfico diferente para variar
      description: "Leading SaaS company automates L1 support queries with custom AI.",
      numericValue: 40,
      suffix: "%",
      label: "Increase in Lead Qualification",
      accentColor: "#D0BFFF", // Tu Morado Claro
    },
    {
      Icon: CheckCircle,
      description: "Industrial market leader uses AI agent to augment customer support globally.",
      numericValue: 90,
      suffix: "%",
      label: "Operational Efficiency Boost",
      accentColor: "#1C7ED6", // Azul Brillante de nuevo, o puedes usar otro
    },
  ];

  
const KpiSection = () => {
    return (
      <section 
        id="kpis" 
        // Mantenemos el gradiente de fondo más notable que solicitaste
        className="py-16 md:py-24 bg-gradient-to-br from-[#1C7ED6]/[0.15] via-[#D0BFFF]/[0.10] to-white"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12 md:mb-20" // Aumentado margen inferior para más espacio
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0D1B2A] mb-4">
              The ElevAIte Impact: Measurable Results
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-[#0D1B2A]/75 max-w-3xl mx-auto">
              Discover how our crafted AI solutions translate into tangible benefits and significant growth for businesses like yours.
            </p>
          </motion.div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16"> {/* Ajustado gap */}
            {kpiData.map((kpi, index) => (
              <motion.div
                key={index}
                className="text-center flex flex-col items-center" // No más fondo de tarjeta, alineación central
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                {/* Icono con fondo de color de acento de baja opacidad */}
                <div 
                  className="inline-block p-4 rounded-full mb-5" 
                  style={{ backgroundColor: `${kpi.accentColor}25` }} // Hex + opacidad (ej. #RRGGBBAA), 25 es ~15%
                >
                  <kpi.Icon size={36} strokeWidth={2} style={{ color: kpi.accentColor }} />
                </div>
  
                <p className="text-sm text-[#0D1B2A]/80 mb-3 mx-auto max-w-[200px] h-16 line-clamp-3 overflow-hidden"> 
                  {/* max-w para la descripción para que no sea demasiado ancha */}
                  {kpi.description}
                </p>
                
                <AnimatedNumber
                  targetValue={kpi.numericValue}
                  suffix={kpi.suffix}
                  // Números aún más grandes y con color de acento directo
                  className="block text-6xl sm:text-7xl md:text-8xl font-extrabold py-1" 
                  style={{ color: kpi.accentColor }} // Aplicamos el color de acento directamente
                  duration={2 + index * 0.2} // Animación escalonada
                />
                
                <p className="text-md font-semibold text-[#0D1B2A] mt-2 capitalize"> {/* Capitalize para la etiqueta */}
                  {kpi.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default KpiSection;