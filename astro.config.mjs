// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import vercel from "@astrojs/vercel";

import icon from "astro-icon";

import svelte from "@astrojs/svelte";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [mdx(), icon(), svelte(), db()],
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: vercel(),
  env: {
    schema: {
      GITHUB_API_TOKEN: envField.string({ context: "server", access: "secret" })
    }
  }
});
