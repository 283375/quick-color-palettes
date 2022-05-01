import packageJson from './package.json'
import { promisify } from 'util'
import { exec } from 'child_process'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { ViteAliases } from 'vite-aliases'
import ViteSvgLoader from 'vite-svg-loader'

const execPromise = promisify(exec)

async function getGitVersion() {
  const { stdout, stderr } = await execPromise(
    'git describe --tags --long --always'
  )
  if (stderr) throw stderr
  return stdout
}

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
  const __GIT_VERSION__ = await getGitVersion()
  return {
    plugins: [
      vue(),
      ViteAliases({ useConfig: true, deep: false }),
      ViteSvgLoader(),
    ],
    define: {
      __PACKAGE_JSON_VER__: JSON.stringify(packageJson.version),
      __GIT_VERSION__: JSON.stringify(
        Buffer.from(__GIT_VERSION__).toString().replace('\n', '')
      ),
    },
  }
})
