import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import path from "path";

export default defineConfig({
  plugins: [vue(), libInjectCss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, ".")
    }
  },
  build: {
    cssCodeSplit: true,
    lib: {
      entry: path.resolve(__dirname, "main.ts"),
      formats: ["es"],
      fileName: () => "main.js"
    },
    rollupOptions: {
      external: ["vue", "vitepress", "@iconify/vue", "#posts-data"]
    }
  }
});
