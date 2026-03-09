import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://cursor-community.kz',
  output: 'static',
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'kk', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
