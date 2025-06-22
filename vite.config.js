import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr()
  ],
  server: {
    proxy: {
      '/vworld-api': {
        target: 'http://api.vworld.kr',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/vworld-api/, ''),
      },
      '/apihub': {
          target: 'https://apihub.kma.go.kr',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/apihub\/api/, '/api'),
          secure: false, // HTTPS가 아닌 경우 필요 없지만, HTTPS면 추가
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq, req) => {
              console.log(`[Proxy] Request: ${req.method} ${req.url} -> ${proxyReq.path}`)
            })
            proxy.on('proxyRes', (proxyRes, req) => {
              console.log(`[Proxy] Response: ${req.method} ${req.url} - ${proxyRes.statusCode}`)
            })
            proxy.on('error', (err, req, res) => {
              console.error(`[Proxy] Error: ${err.message}`)
            })
          }
        },
    }
  }
})
