// @ts-check
/**
 * Configuración principal de Astro para este sitio.
 * Pertenece a: raíz del proyecto (`astro.config.mjs`).
 * Define integraciones de build (Vite + Tailwind CSS v4).
 */
import { defineConfig } from 'astro/config';

/** Plugin de Vite que procesa Tailwind 4 en tiempo de compilación. */
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  /** URL base del sitio desplegado. Cambia esto por tu URL real. */
  site: 'https://NejiTdK.github.io',
  /** Prefijo de la ruta para GitHub Pages (nombre del repositorio). */
  base: '/My-Personal-Web/',
  vite: {
    /** Plugins de Vite aplicados al bundler interno de Astro. */
    plugins: [tailwindcss()]
  }
});
