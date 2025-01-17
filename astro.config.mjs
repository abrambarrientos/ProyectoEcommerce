// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';


import vercel from '@astrojs/vercel';


import auth from 'auth-astro';


// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), auth()],
  adapter: vercel(),
  output: 'server'
});