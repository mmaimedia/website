import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://mmai.media',
  output: 'static',
  integrations: [tailwind(), mdx()],
  build: {
    format: 'directory',
  },
});
