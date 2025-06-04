// src/components/AnimatedNumber.tsx
import React, { useEffect, useRef } from 'react'; // Asegúrate de importar React
import { motion, useMotionValue, animate, useInView } from 'framer-motion';

interface AnimatedNumberProps {
  targetValue: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

// Componente interno para mostrar el valor del motionValue y aplicar el redondeo/formato
const DisplayValue: React.FC<{ motionValue: ReturnType<typeof useMotionValue>; prefix: string; suffix: string }> = ({ motionValue, prefix, suffix }) => {
  const [currentValue, setCurrentValue] = React.useState(0);

  useEffect(() => {
    // Establece el valor inicial en caso de que la animación no comience desde 0 visiblemente
    setCurrentValue(Math.round(motionValue.get())); 
    const unsubscribe = motionValue.onChange((latest) => {
      setCurrentValue(Math.round(latest));
    });
    return () => unsubscribe();
  }, [motionValue]);

  return <>{prefix}{currentValue}{suffix}</>;
};

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  targetValue,
  duration = 1.5, // Duración por defecto de la animación
  className,
  prefix = "",
  suffix = ""
}) => {
  const count = useMotionValue(0); // El valor que se animará
  const ref = useRef<HTMLSpanElement>(null); // Ref para el elemento que se observará

  // useInView para detectar cuándo el elemento es visible
  // once: true -> la animación solo se dispara una vez
  // margin: "-50px 0px -50px 0px" -> empieza la animación cuando el elemento está a 50px de entrar completamente en la vista
  const isInView = useInView(ref, { once: true, margin: "-50px 0px -50px 0px" });

  useEffect(() => {
    if (isInView) {
      // Solo inicia la animación si el elemento está en vista
      const controls = animate(count, targetValue, {
        duration: duration,
        ease: "easeOut", // Puedes probar otros tipos de 'ease'
      });
      // Detiene la animación si el componente se desmonta
      return () => controls.stop?.();
    }
  }, [isInView, targetValue, duration, count]); // Dependencias del efecto

  return (
    // El ref se asigna al span que envuelve para detectar su visibilidad
    <span ref={ref} className={className}>
      <DisplayValue motionValue={count} prefix={prefix} suffix={suffix} />
    </span>
  );
};

export default AnimatedNumber;