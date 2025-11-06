// src/components/OptimizedImage.tsx
import { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean; // Si es true, no hace lazy loading
  quality?: number; // Calidad de la imagen (default: 80)
}

/**
 * Componente optimizado para imágenes con:
 * - Lazy loading automático
 * - Conversión automática a WebP para Cloudinary
 * - Responsive images
 * - Placeholder blur durante carga
 */
export const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  quality = 80
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Si es priority, ya está "in view"
  const imgRef = useRef<HTMLImageElement>(null);

  // Optimizar URL de Cloudinary
  const getOptimizedSrc = (originalSrc: string): string => {
    // Si es Cloudinary, agregar parámetros de optimización
    if (originalSrc.includes('cloudinary.com')) {
      // Insertar parámetros de transformación antes de la versión o del nombre del archivo
      const parts = originalSrc.split('/upload/');
      if (parts.length === 2) {
        const transforms = [
          'f_auto', // Formato automático (WebP en navegadores compatibles)
          'q_auto:good', // Calidad automática optimizada
          width ? `w_${width}` : '',
          height ? `h_${height}` : '',
          'c_limit' // Mantener aspect ratio
        ].filter(Boolean).join(',');

        return `${parts[0]}/upload/${transforms}/${parts[1]}`;
      }
    }
    return originalSrc;
  };

  // Intersection Observer para lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px' // Empezar a cargar 50px antes de que sea visible
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [priority]);

  const optimizedSrc = getOptimizedSrc(src);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder blur mientras carga */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"
          style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
        />
      )}

      <img
        ref={imgRef}
        src={isInView ? optimizedSrc : undefined}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={`
          transition-opacity duration-300
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
          ${className}
        `}
        style={{
          maxWidth: '100%',
          height: 'auto'
        }}
      />
    </div>
  );
};

export default OptimizedImage;
