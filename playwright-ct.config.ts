import { type PlaywrightTestConfig, devices } from '@playwright/experimental-ct-vue'

import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

const config: PlaywrightTestConfig = {
  testDir: './tests/component',
  use: {
    headless: false,
    trace: 'on-first-retry',
    ctViteConfig: {
      plugins: [vue()],
      resolve: {
        alias: {
          '@': resolve(__dirname, './src'),
        },
      },
    },
  },
  // projects: [
  //   {
  //     name: 'iPhone 6',
  //     use: {
  //       browserName: 'webkit',
  //       ...devices['iPhone 6'],
  //     },
  //   },
  //   {
  //     name: 'Macbook 11',
  //     use: {
  //       browserName: 'firefox',
  //       ...devices['Macbook 11'],
  //     },
  //   },
  //   {
  //     name: 'Desktop',
  //     use: {
  //       browserName: 'chromium',
  //       ...devices['Macbook Pro'],
  //     },
  //   },
  // ],
}

export default config
