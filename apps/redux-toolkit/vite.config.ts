import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: '/',
    plugins: [tsconfigPaths(), react()],
    build: {
      rollupOptions: {},
      chunkSizeWarningLimit: 1000
    },
    define: {
      'process.env': env
    },
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: 'https://api.genius.com',
          changeOrigin: true
        },
        '/lyrics': {
          target: 'https://genius.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/lyrics/, '')
        }
      }
    }
  };
});
