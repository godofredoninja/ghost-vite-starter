import { Plugin } from 'vite'
import { resolve, relative } from 'path'
import fs from 'fs-extra'

/**
 * Options for the clean assets plugin.
 */
interface CleanDevAssetsOptions {
  /** Relative path to the assets directory to clean */
  assetsDir: string
  /** List of filenames or folders to keep */
  whitelist?: string[]
}

/**
 * Cleans the specified assets directory, preserving only whitelisted items.
 *
 * @param options - Configuration options
 */
async function cleanAssets(options: CleanDevAssetsOptions) {
  const { assetsDir, whitelist = [] } = options
  const resolvedAssetsPath = resolve(process.cwd(), assetsDir)

  if (!(await fs.pathExists(resolvedAssetsPath))) {
    console.warn(`⚠️ Skipping cleanup: "${assetsDir}" does not exist.`)
    return
  }

  const items = await fs.readdir(resolvedAssetsPath)

  await Promise.all(
    items.map(async (item) => {
      if (!whitelist.includes(item)) {
        const itemPath = resolve(resolvedAssetsPath, item)
        try {
          await fs.remove(itemPath)
          console.log(`🗑️ Removed: ${relative(process.cwd(), itemPath)}`)
        } catch (error) {
          console.error(`❌ Failed to remove ${itemPath}:`, error)
        }
      }
    }),
  )

  console.log(
    `🧹 Cleanup completed in "${assetsDir}". Preserved items: ${whitelist.join(', ') || 'none'}.`,
  )
}

/**
 * Vite plugin to clean the assets directory in development mode.
 *
 * @param options - Configuration options.
 * @returns A Vite plugin instance.
 */
export function vitePluginCleanDevAssets(
  options: CleanDevAssetsOptions,
): Plugin {
  return {
    name: 'vite-plugin-clean-dev-assets',
    apply: 'serve', // Runs only in development mode
    async configureServer() {
      await cleanAssets(options)
    },
  }
}
