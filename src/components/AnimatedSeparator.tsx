// src/components/AnimatedSeparator.tsx
import { motion } from 'framer-motion';

const AnimatedSeparator = () => {
  return (
    <div className="w-full flex justify-center py-12 md:py-16">
      <svg width="80%" height="20" viewBox="0 0 800 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Define el gradiente que usará la línea y la chispa de luz */}
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D0BFFF" /> {/* Tu Morado Claro */}
            <stop offset="50%" stopColor="#1C7ED6" /> {/* Tu Azul Brillante */}
            <stop offset="100%" stopColor="#69DB7C" /> {/* Tu Verde */}
          </linearGradient>
          {/* Un gradiente más brillante para la "chispa" que viaja */}
          <radialGradient id="spark-gradient">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="#1C7ED6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* La línea base de la red (una onda suave) */}
        <motion.path
          d="M 0 10 C 200 2, 600 18, 800 10" // Curva de tipo "onda"
          stroke="url(#line-gradient)"
          strokeWidth="1.5"
          strokeOpacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Nodos que pulsan a lo largo de la línea */}
        {[100, 250, 400, 550, 700].map((cx, i) => (
          <motion.circle
            key={i}
            // Las posiciones Y (cy) se calculan para que queden sobre la onda
            cx={cx}
            cy={i % 2 === 0 ? 6 : 14} 
            r="3"
            fill="url(#line-gradient)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.2 }}
          >
            {/* Animación de pulso para cada nodo */}
            <animate
              attributeName="r"
              values="3; 4; 3"
              dur="2s"
              begin={`${i * 0.4}s`}
              repeatCount="indefinite"
            />
          </motion.circle>
        ))}

        {/* La "chispa" de luz que recorre la línea */}
        <motion.circle
          cx="0"
          cy="10"
          r="5"
          fill="url(#spark-gradient)"
        >
          <animateMotion
            dur="5s"
            repeatCount="indefinite"
            path="M 0 10 C 200 2, 600 18, 800 10" // Sigue la misma ruta que la línea
            rotate="auto"
          />
        </motion.circle>
      </svg>
    </div>
  );
};

export default AnimatedSeparator;