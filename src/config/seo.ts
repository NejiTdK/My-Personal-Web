/**
 * Configuración SEO para el portafolio AlecDev
 * Centraliza metadatos, URLs y datos del sitio para SEO
 */

export const siteConfig = {
  // Datos principales
  title: 'AlecDev',
  tagline: 'Creador de Landing Pages',
  description: 'Creo landing pages estáticas, rápidas y optimizadas. HTML, CSS, JS. Prototipado y desarrollo web.',
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
    title: 'AlecDev | Creador de Landing Pages',
    description: 'Creo landing pages estáticas, rápidas y optimizadas para tu negocio.',
    ogImage: 'og-image.png',
  },
  proyectos: {
    title: 'AlecDev | Proyectos',
    description: 'Explora mis proyectos de landing pages y sitios estáticos.',
    ogImage: 'og-image.png',
  },
};

export default siteConfig;
