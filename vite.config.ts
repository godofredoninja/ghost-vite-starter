import { defineConfig } from 'vite'
import { resolve } from 'path'
import fullReload from 'vite-plugin-full-reload'
import { vitePluginCleanDevAssets } from './plugins/vite-plugin-clean-dev-assets'
import { vitePluginBuildZip } from './plugins/vite-plugin-build-zip'

/**
 * Function to resolve file paths within `src`
 */
const resolvePath = (type: 'js' | 'css', file: string) => resolve(__dirname, `src/${type}/${file}`)

/**
 * Server configuration
 */
const serverConfig = {
  host: true,
  port: 3000,
  strictPort: true,
  proxy: {
    // Redirect all requests except `/assets/` to Ghost's local server
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
const shortenPath = (file: string) => file.replace(process.cwd(), '').replace(/^\/+/, '')

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
  logCleaner, // Custom plugin to clean up logs

  fullReload(['*.hbs', 'partials/**/*.hbs', '!../node_modules/**']),

  // Uses the asset cleanup plugin, keeping the "img" folder
  vitePluginCleanDevAssets({
    assetsDir: 'assets',
    whitelist: ['img'], // Add more elements if needed
  }),

  vitePluginBuildZip({
    extensions: ['.hbs'], // Copy all .hbs files from the root
    folders: ['assets', 'partials'], // Copy entire folders
    files: ['package.json'], // Copy individual files
    outputDir: 'dist', // 📂 User-defined destination folder
    outputZip: 'zip', // Output folder name to be included in the ZIP
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
