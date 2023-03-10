import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { VitePluginFonts } from 'vite-plugin-fonts' // 追加
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/gidict-dev/",
  plugins: [
    vue(),
    VitePluginFonts({
      google: {
        families: [
          'Noto Sans JP' // ここに導入したいフォント名を入れる
        ],
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '#': fileURLToPath(new URL('./public', import.meta.url))
    }
  },
  server: {
    host: true
  },
  publicDir: "public",
  build: {
    outDir: "docs"
  },
  css: {
    modules: {
      scopeBehaviour: 'local',
    },
    preprocessorOptions:{
      scss:{
        additionalData: `@import "@/assets/var.scss";`,
      }
    }
  }
})
