import packageJson from './package.json'
import { execSync } from 'child_process'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { ViteAliases } from 'vite-aliases'
import ViteSvgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteAliases({ useConfig: true, deep: false }),
    ViteSvgLoader(),
  ],
  define: {
    __PACKAGE_JSON_VER__: JSON.stringify(packageJson.version),
    __GIT_VERSION__: JSON.stringify(
      Buffer.from(execSync('git describe --tags --long --always'))
        .toString()
        .replace('\n', '')
    ),
  },
})
