// @ts-check
import { defineConfig } from 'astro/config';

import min from 'astro-min';

// https://astro.build/config
export default defineConfig({
  integrations: [min()]
});