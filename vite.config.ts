import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import version from "vite-plugin-package-version";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { TDesignResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    version(),
    AutoImport({ resolvers: [TDesignResolver({ library: "vue-next" })] }),
    Components({ resolvers: [TDesignResolver({ library: "vue-next" })] }),
  ],
  resolve: {
    alias: [{ find: "@", replacement: fileURLToPath(new URL("./src", import.meta.url)) }],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
            @import "@/styles/mixins.scss";
        `,
      },
    },
  },
});
