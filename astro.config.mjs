import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://ravaniroshan.github.io',
  base: '/exist.os',
  devToolbar: { enabled: false },
  vite: { plugins: [tailwindcss()] },
});
