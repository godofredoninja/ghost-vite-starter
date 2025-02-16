import { Plugin } from 'vite'
import fs from 'fs-extra'
import path from 'path'
import archiver from 'archiver'

/**
 * Options for the build zip plugin.
 */
interface BuildZipOptions {
  /** Extensions of the files to copy */
  extensions?: string[]
  /** Folders to copy */
  folders?: string[]
  /** Specific files to copy */
  files?: string[]
  /** Directory where the optimized build will be stored */
  outputDir: string
  /** Directory where the ZIP file will be generated */
  outputZip: string
}

/**
 * Vite plugin to copy files, optimize the build, and generate a ZIP archive.
 *
 * @param options - Configuration options for the plugin.
 * @returns A Vite plugin instance.
 */
export function vitePluginBuildZip(options: BuildZipOptions): Plugin {
  return {
    name: 'vite-plugin-build-zip',
    apply: 'build',

    /**
     * Runs after the build is complete.
     */
    async closeBundle() {
      const rootDir = process.cwd()
      const destinationBase = path.resolve(rootDir, options.outputDir)
      const zipFolder = path.resolve(rootDir, options.outputZip)
      const packageJsonPath = path.join(rootDir, 'package.json')

      // 🔸 1. Clean the output directory
      cleanDirectory(destinationBase, options.outputDir)

      // 🔸 2. Copy files and folders based on the options
      options.extensions &&
        copyFilesByExtension(rootDir, destinationBase, options.extensions)
      options.folders && copyFolders(rootDir, destinationBase, options.folders)
      options.files && copyFiles(rootDir, destinationBase, options.files)

      // 🔸 3. Get the ZIP filename from package.json
      if (!fs.existsSync(packageJsonPath)) {
        console.error(
          '❌ package.json not found. Cannot generate ZIP filename.',
        )
        return
      }

      const { name, version } = JSON.parse(
        fs.readFileSync(packageJsonPath, 'utf-8'),
      )
      const zipFileName = `${name}-v-${version.replace(/\./g, '-')}.zip`
      const zipFilePath = path.join(zipFolder, zipFileName)

      // 🔸 4. Clean the ZIP folder before creating the archive
      cleanDirectory(zipFolder, options.outputZip)

      // 🔸 5. Generate the ZIP archive
      await zipDirectory(destinationBase, zipFilePath)
    },
  }
}

/**
 * Clean a directory (if it exists) and recreate it.
 */
function cleanDirectory(dirPath: string, dirName: string) {
  if (fs.existsSync(dirPath)) {
    fs.removeSync(dirPath)
    console.log(`🗑️ Deleted folder: ${dirName}`)
  }
  fs.ensureDirSync(dirPath)
}

/**
 * Copy files by extension.
 */
function copyFilesByExtension(
  rootDir: string,
  destinationBase: string,
  extensions: string[],
) {
  const filesInRoot = fs.readdirSync(rootDir)
  for (const file of filesInRoot) {
    const sourcePath = path.join(rootDir, file)
    const destinationPath = path.join(destinationBase, file)

    if (
      fs.statSync(sourcePath).isFile() &&
      extensions.includes(path.extname(file))
    ) {
      fs.copySync(sourcePath, destinationPath)
      logCopyAction(rootDir, sourcePath, destinationPath)
    }
  }
}

/**
 * Copy entire folders.
 */
function copyFolders(
  rootDir: string,
  destinationBase: string,
  folders: string[],
) {
  for (const folder of folders) {
    const sourcePath = path.join(rootDir, folder)
    const destinationPath = path.join(destinationBase, folder)

    if (fs.existsSync(sourcePath) && fs.statSync(sourcePath).isDirectory()) {
      fs.copySync(sourcePath, destinationPath)
      logCopyAction(rootDir, sourcePath, destinationPath, true)
    } else {
      console.warn(`⚠️ Folder not found: ${folder}`)
    }
  }
}

/**
 * Copy specific files.
 */
function copyFiles(rootDir: string, destinationBase: string, files: string[]) {
  for (const file of files) {
    const sourcePath = path.join(rootDir, file)
    const destinationPath = path.join(destinationBase, file)

    if (fs.existsSync(sourcePath) && fs.statSync(sourcePath).isFile()) {
      fs.copySync(sourcePath, destinationPath)
      logCopyAction(rootDir, sourcePath, destinationPath)
    } else {
      console.warn(`⚠️ File not found: ${file}`)
    }
  }
}

/**
 * Generate a ZIP archive of the specified directory.
 */
async function zipDirectory(
  sourceDir: string,
  zipFilePath: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(zipFilePath)
    const archive = archiver('zip', { zlib: { level: 9 } })

    output.on('close', () => {
      console.log(
        `✅ ZIP created: ${path.basename(zipFilePath)} (${archive.pointer()} bytes)`,
      )
      resolve()
    })

    archive.on('error', (err) => reject(err))

    archive.pipe(output)
    archive.directory(sourceDir, false)
    archive.finalize()
  })
}

/**
 * Log a copy action to the console.
 */
function logCopyAction(
  rootDir: string,
  source: string,
  destination: string,
  isFolder = false,
) {
  const sourceName = path.basename(source)
  let relativeDest = path.relative(rootDir, destination)

  // Clean up the relative path
  if (relativeDest.startsWith('.') || relativeDest.startsWith(path.sep)) {
    relativeDest = relativeDest.substring(2)
  }

  const type = isFolder ? '📁 Folder' : '📄 File'
  console.log(`✅ ${type} copied: ${sourceName} → ${relativeDest}`)
}
