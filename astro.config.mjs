// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://hellsing22.github.io",
  base: "Web-When-",
  integrations: [mdx(), sitemap()],

  vite: {
    assetsInclude: ['**/*.ttf', '**/*.woff', '**/*.woff2'],
    plugins: [
      tailwindcss(),
    ],
  },

  
});
