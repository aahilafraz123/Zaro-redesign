// @ts-check
import { defineConfig } from 'astro/config';

// On GitHub Pages this build lives next to the main site, at /Zaro-redesign/minimal/.
const isPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  site: 'https://aahilafraz123.github.io',
  base: isPages ? '/Zaro-redesign/minimal' : '/',
  trailingSlash: 'always',
});
