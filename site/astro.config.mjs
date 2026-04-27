// @ts-check
import { defineConfig } from 'astro/config';
import fs from 'fs';

// Vite cache moved outside OneDrive to prevent EPERM rename errors on Windows
export default defineConfig({
  outDir: '../docs',
  site: 'https://potato23456789.github.io',
  base: '/Portfolio',
  vite: {
    cacheDir: 'C:/Users/binhn/.vite-cache/portfolio',
  },
  integrations: [
    {
      name: 'nojekyll',
      hooks: {
        'astro:build:done': ({ dir }) => {
          fs.writeFileSync(new URL('.nojekyll', dir), '');
        },
      },
    },
  ],
});
