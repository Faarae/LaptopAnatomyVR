import { defineConfig } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function copyArStaticAssets() {
  return {
    name: 'copy-ar-static-assets',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist')
      if (!fs.existsSync(distDir)) return

      // Copy targets.mind
      const mindSrc = path.resolve(__dirname, 'targets.mind')
      if (fs.existsSync(mindSrc)) {
        fs.copyFileSync(mindSrc, path.join(distDir, 'targets.mind'))
      }

      // Copy models/ and markers/ directories
      for (const dirName of ['models', 'markers']) {
        const srcDir = path.resolve(__dirname, dirName)
        const destDir = path.join(distDir, dirName)
        if (fs.existsSync(srcDir)) {
          fs.cpSync(srcDir, destDir, { recursive: true })
        }
      }
    },
  }
}

export default defineConfig(({ command }) => ({
  plugins: command === 'serve' ? [basicSsl()] : [copyArStaticAssets()],
  css: {
    postcss: {
      plugins: [],
    },
  },
  server: {
    host: true,
    port: 5173,
    open: false,
    allowedHosts: true,
  },
}))



