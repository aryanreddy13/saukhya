// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import siteConfig from './src/content/site.config.json';

// https://astro.build/config
export default defineConfig({
  site: siteConfig.siteUrl || 'https://saukhyaclinic.com',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [sitemap()]
});