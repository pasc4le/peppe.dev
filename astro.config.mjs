// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), icon()],
  vite: {
    plugins: [tailwindcss()]
  },
  adapter: vercel()
});
