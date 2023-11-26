import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    build: {
      rollupOptions: {},
      chunkSizeWarningLimit: 1000,
    },
    define: {
      "process.env": env,
    },
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: "https://api.genius.com",
          changeOrigin: true,
        },
        "/lyrics": {
          target: "https://genius.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/lyrics/, ""),
        },
      },
    },
  };
});
