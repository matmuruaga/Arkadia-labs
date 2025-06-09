// src/components/Modal.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  // Efecto para cerrar el modal con la tecla 'Escape'
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Fondo Oscuro (Backdrop) */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose} // Cierra el modal al hacer clic en el fondo
          />

          {/* Contenedor del Modal */}
          <motion.div
            className="fixed inset-0 z-50 p-4 flex items-center justify-center"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div 
              className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del modal lo cierre
            >
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors z-10"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;