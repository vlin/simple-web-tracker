import Banner from 'vite-plugin-banner'
import path from 'path'
import { defineConfig } from 'vite'

import pkg from './package.json'

export default defineConfig({
  envDir: './env',
  plugins: [Banner(
    `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n */`
  )],
  build: {
    target: 'es2015',
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      formats: ['umd'],
      name: 'tracker',
      fileName: () => `tracker-v${pkg.version}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
        }
      }
    }
  }
})
