import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'
import fs from 'fs'
import path from 'path'

function saveModelMiddleware() {
  return {
    name: 'save-model-middleware',
    configureServer(server) {
      server.middlewares.use('/api/save-model', (req, res) => {
        if (req.method === 'POST') {
          const url = new URL(req.url, 'http://localhost')
          const filename = url.searchParams.get('name')
          const chunks = []
          req.on('data', chunk => chunks.push(chunk))
          req.on('end', () => {
            const buffer = Buffer.concat(chunks)
            const targetPath = path.resolve('public/ar/models', filename)
            fs.mkdirSync(path.dirname(targetPath), { recursive: true })
            fs.writeFileSync(targetPath, buffer)
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: true, file: filename, bytes: buffer.length }))
          })
        } else {
          res.statusCode = 405
          res.end('Method Not Allowed')
        }
      })
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl(), saveModelMiddleware()],
  server: {
    host: true,
    port: 5173,
    open: false,
    allowedHosts: true
  }
})
