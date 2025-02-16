import { defineConfig } from 'vite'
import { resolve } from 'path'
import fullReload from 'vite-plugin-full-reload'
import { vitePluginCleanDevAssets } from './plugins/vite-plugin-clean-dev-assets'

/**
 * Function to resolve file paths in `src`
 */
const resolvePath = (type: 'js' | 'css', file: string) =>
  resolve(__dirname, `src/${type}/${file}`)

/**
 * Server configuration
 */
const serverConfig = {
  host: true,
  port: 3000,
  strictPort: true,
  proxy: {
    // Redirects all requests except `/assets/` to Ghost's local server
    '^/(?!assets/)(.*)': {
      target: 'http://localhost:2368',
      changeOrigin: true,
      secure: false,
    },
  },
}

/**
 * Build configuration
 */
const buildConfig = {
  outDir: resolve(__dirname, 'assets'),
  emptyOutDir: true,
  rollupOptions: {
    input: {
      main: resolvePath('js', 'main.ts'),
      styles: resolvePath('css', 'style.css'),
    },
    output: {
      entryFileNames: 'js/[name].js',
      assetFileNames: ({ name }) => {
        if (name?.endsWith('.css')) return 'css/[name][extname]'
        if (/^(img|font)\//.test(name || '')) return name
        return 'assets/[name][extname]'
      },
    },
  },
}

/**
 * Helper function to shorten file paths in logs
 */
const shortenPath = (file: string) =>
  file.replace(process.cwd(), '').replace(/^\/+/, '')

/**
 * Custom plugin to clean up file paths in Vite logs
 */
const logCleaner = {
  name: 'log-cleaner',
  configureServer(server) {
    server.ws.on('vite:full-reload', (data) => {
      if (typeof data.path === 'string') {
        console.log(`[vite] Reload: ${shortenPath(data.path)}`)
      }
    })
  },
}

/**
 * Plugins configuration
 */
const plugins = [
  fullReload(['*.hbs', 'partials/**/*.hbs', '!../node_modules/**']),

  logCleaner, // Custom plugin to clean up logs
  // Uso del plugin de limpieza de assets, conservando la carpeta "image"

  vitePluginCleanDevAssets({
    assetsDir: 'assets',
    whitelist: ['img'], // Puedes agregar más elementos si lo requieres
  }),
]

export default defineConfig({
  root: 'src',
  base: '/assets/',
  publicDir: resolve(__dirname, 'public'),
  server: serverConfig,
  build: buildConfig,
  plugins,
})
