import { defineConfig, type Connect, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import { createReadStream } from 'node:fs'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      name: "static-apps-dev",
      configureServer(server) {
        const apps = [
          { url: "/adgile", file: fileURLToPath(new URL("./public/adgile/index.html", import.meta.url)) },
          { url: "/coliseu", file: fileURLToPath(new URL("./public/coliseu/index.html", import.meta.url)) },
        ]
        const sendApp: Connect.NextHandleFunction = (req, res, next) => {
          const pathname = req.url?.split("?")[0]
          const app = apps.find((item) => pathname === item.url || pathname === `${item.url}/`)
          if (!app) return next()
          res.statusCode = 200
          res.setHeader("Content-Type", "text/html; charset=utf-8")
          createReadStream(app.file).pipe(res)
        }
        return () => {
          const stack = (server as ViteDevServer).middlewares.stack
          stack.unshift({ route: "", handle: sendApp })
        }
      },
    },
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
