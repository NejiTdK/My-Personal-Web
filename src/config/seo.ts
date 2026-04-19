/**
 * Configuración SEO para el portafolio AlecDev
 * Centraliza metadatos, URLs y datos del sitio para SEO
 */

export const siteConfig = {
  // Datos principales
  title: 'AlecDev',
  tagline: 'Desarrollador Front-end',
  description: 'Portafolio de AlecDev - Desarrollador Front-end JR. Transformando ideas en proyectos con IA y creatividad. Especializado en React, Astro y JavaScript.',
  author: 'AlecDev',
  
  // URLs
  siteUrl: 'https://NejiTdK.github.io',
  baseUrl: '/My-Personal-Web/',
  
  // Social
  twitterHandle: '@AlecDev', // Reemplazar con tu handle real
  githubUsername: 'NejiTdK',
  
  // Idioma
  language: 'es',
  locale: 'es_ES',
  
  // Imagen por defecto para Open Graph (debe existir en /public)
  ogImage: 'og-image.png', // 1200x630px recomendado
  
  // Favicon
  favicon: 'DEV-LOGO.png',
};

export const pages = {
  home: {
    title: 'AlecDev | Desarrollador Front-end',
    description: 'Portafolio de AlecDev - Desarrollador Front-end JR. Transformando ideas en proyectos con IA y creatividad.',
    ogImage: 'og-image.png',
  },
  proyectos: {
    title: 'AlecDev | Proyectos',
    description: 'Explora mis proyectos de desarrollo web. Desde landing pages hasta aplicaciones interactivas con React y Astro.',
    ogImage: 'og-image.png',
  },
};

export default siteConfig;
