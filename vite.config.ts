import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Gzip compression
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024, // Solo comprimir archivos > 1KB
      deleteOriginFile: false,
    }),
    // Brotli compression (mejor que gzip)
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  optimizeDeps: {
    exclude: ['lucide-react'],
  },

  build: {
    // Optimizaciones de build
    target: 'es2015', // Compatibilidad con navegadores modernos
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Eliminar console.log en producción
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
    },
    rollupOptions: {
      output: {
        // Mejorar code splitting
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', 'lucide-react'],
          'forms-vendor': ['react-hook-form', 'zod'],
        },
      },
    },
    // Aumentar límite de advertencia de chunks
    chunkSizeWarningLimit: 1000,
    // Reportar tamaños comprimidos
    reportCompressedSize: true,
    // Source maps solo en dev
    sourcemap: false,
  },
});