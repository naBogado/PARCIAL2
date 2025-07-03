import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        extra: resolve(__dirname, "extra.html"),
      },
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:3001", // Solo para desarrollo local
    },
  },
});
