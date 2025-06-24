import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // === AÑADE ESTA SECCIÓN MANUALMENTE ===
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // Esto permite que Vite sea accesible externamente
    port: 3000, // Fijamos el puerto para consistencia
    strictPort: true, // Si el puerto 3000 está ocupado, falla en lugar de probar otro
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
