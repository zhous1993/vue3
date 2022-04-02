import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables";@import "@/styles/mixin";`,
        javascriptEnabled: true,
      },
    },
  },
  server: {
    host: true,
    port: 8080,
    open: true,
    cors: true,
    strictPort: true,
    proxy: {
      "/api": {
        // 本地8080前端代码的接口 代理到8888的服务端口
        target: "http://localhost:8888",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/"),
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 2000,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log"],
      },
    },
    assetsDir: "static/assets",
    rollupOptions: {
      output: {
        chunkFileNames: "static/js/[name].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/assets/[name]-[hash][extname]",
      },
    },
  },
  plugins: [vue()],
});
