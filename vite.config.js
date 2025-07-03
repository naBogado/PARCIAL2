import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        public: resolve(__dirname, "/public/extra.html"),
      },
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:3001", //solo para desarrollo local
    },
  },
});
