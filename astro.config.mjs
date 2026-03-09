import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://cursor-community.kz',
  output: 'static',
  integrations: [sitemap(), mdx()],
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'kk', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});