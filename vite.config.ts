import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Esta sección se mantiene para que el alias '@/...' siga funcionando.
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // La sección 'server' ha sido eliminada por no ser ya necesaria.
  
  // Esta sección es una optimización para 'lucide-react', es seguro mantenerla.
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});