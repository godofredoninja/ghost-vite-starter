import { Plugin } from 'vite'
import fs from 'fs-extra'
import path from 'path'
import fg from 'fast-glob'
import prettier from 'prettier'

interface FormatTailwindHbsOptions {
  patterns: string[] // Glob patterns to search for .hbs files
}

export function viteOrderTailwindClasses(options: FormatTailwindHbsOptions): Plugin {
  return {
    name: 'format-tailwind-hbs',
    apply: 'serve', // Only in development mode

    async buildStart() {
      console.log('🔍 Searching for .hbs files...')
      const files: string[] = await fg(options.patterns)
      await formatFiles(files)
    },

    async handleHotUpdate({ file }) {
      if (file.endsWith('.hbs')) {
        console.log(`♻ File modified: ${path.basename(file)}`)
        await formatFiles([file])
      }
    },
  }
}

// Function to format .hbs files
async function formatFiles(files: string[]) {
  for (const file of files) {
    let content: string = fs.readFileSync(file, 'utf-8')

    // Find all matches of `class="..."`
    const matches = [...content.matchAll(/class="([^"]+)"/g)]

    for (const match of matches) {
      const fullMatch = match[0] // class="..."
      let originalClass = match[1] // Unsorted classes

      try {
        // Separate Handlebars logic and static classes
        const handlebarsLogic = originalClass.match(/{{[^}]+}}/g) || []
        let classParts = originalClass.split(/{{[^}]+}}/g) // Split by Handlebars logic
        let formattedClass = ''

        // Sort only static classes with Prettier
        for (let i = 0; i < classParts.length; i++) {
          let cleanedClass = classParts[i].trim()
          if (cleanedClass) {
            const formatted = await prettier.format(`<div class="${cleanedClass}"></div>`, {
              plugins: ['prettier-plugin-tailwindcss'],
              parser: 'html',
            })

            formattedClass += formatted.match(/class="([^"]+)"/)?.[1] || cleanedClass
          }

          // Restore Handlebars logic in its original position
          if (handlebarsLogic[i]) {
            formattedClass += ` ${handlebarsLogic[i]}`
          }
        }

        // Replace in the content
        content = content.replace(fullMatch, `class="${formattedClass.trim()}"`)
      } catch (error) {
        console.error(`❌ Error formatting classes in ${path.basename(file)}:`, error)
      }
    }

    // Ensure the folder exists before writing
    fs.ensureDirSync(path.dirname(file))

    // Save the file with sorted classes
    fs.writeFileSync(file, content, 'utf-8')
    console.log(`✅ Classes sorted in: ${path.basename(file)}`)
  }
}
