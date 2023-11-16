/*
 * @Author: 叶毅 yeyi@brandnewdata.com
 * @Date: 2023-11-06 13:16:41
 * @LastEditors: 叶毅 yeyi@brandnewdata.com
 * @LastEditTime: 2023-11-06 13:43:39
 * @FilePath: /designable/examples/sandbox/vite.sandbox.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Alias, defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { GlobSync } from 'glob'
import { resolve } from 'node:path'
import fs from 'fs-extra'
import basicSsl from '@vitejs/plugin-basic-ssl'

const getWorkspaceAlias = () => {
  const basePath = resolve(__dirname, '../../')
  const pkg = fs.readJSONSync(resolve(basePath, 'package.json')) || {}
  const alias: Alias[] = []
  const workspaces = pkg.workspaces
  if (Array.isArray(workspaces)) {
    workspaces.forEach((pattern) => {
      const { found } = new GlobSync(pattern, { cwd: basePath })
      found.forEach((name) => {
        try {
          const pkg = fs.readJSONSync(resolve(basePath, name, './package.json'))
          alias.push({
            find: pkg.name,
            replacement: resolve(basePath, name, './src'),
          })
        } catch (error) {}
      })
    })
  }
  return alias
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
  resolve: {
    alias: [
      { find: /^~/, replacement: '' },
      { find: '@', replacement: resolve(__dirname, 'src') },
      ...getWorkspaceAlias(),
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        charset: false,
      },
      scss: {
        javascriptEnabled: true,
        charset: false,
      },
    },
  },
  build: {
    sourcemap: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/sandbox.tsx'),
      name: 'sandbox',
      // the proper extensions will be added
      fileName: 'sandbox.bundle',
      formats: ['umd'],
    },
    cssTarget: 'chrome58',
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'antd',
        'dayjs',
        // Designable
        '@oxygen/designable-core',

        // Formily
        '@formily/react',
        '@formily/reactive',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          antd: 'antd',
          dayjs: 'dayjs',
          // Designable
          '@oxygen/designable-core': 'Designable.Core',
          // Formily
          '@formily/core': 'Formily.Core',
          '@formily/reactive': 'Formily.Reactive',
        },
      },
    },
  },
})
