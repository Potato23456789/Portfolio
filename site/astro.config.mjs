// @ts-check
import { defineConfig } from 'astro/config';

// Vite cache moved outside OneDrive to prevent EPERM rename errors on Windows
export default defineConfig({
  outDir: '../docs',
  vite: {
    cacheDir: 'C:/Users/binhn/.vite-cache/portfolio',
  },
});
