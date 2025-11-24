import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          title: 'Gustavo Hesse - Branding & Direção Criativa',
          description: 'Crio marcas que fazem sentido. Por dentro e por fora. Designer especializado em branding, identidade visual e direção criativa.',
          themeColor: '#f6f5ef',
          ogTitle: 'Gustavo Hesse - Branding & Direção Criativa',
          ogDescription: 'Crio marcas que fazem sentido. Por dentro e por fora. Identidades visuais que viraram pontos de conexão reais.',
          ogImage: 'https://gustavohesse.com.br/portfolio.png',
          ogUrl: 'https://gustavohesse.com.br',
          twitterTitle: 'Gustavo Hesse - Branding & Direção Criativa',
          twitterDescription: 'Crio marcas que fazem sentido. Por dentro e por fora.',
          twitterImage: 'https://gustavohesse.com.br/portfolio.png',
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,
    port: 7070,
  },
})
