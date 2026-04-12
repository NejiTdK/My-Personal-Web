# AlecDev Portfolio

Portafolio personal con estética retro pixel art 8-bit. Sitio estático construido con Astro, React y Tailwind CSS para presentar proyectos y perfil profesional.

![Astro](https://img.shields.io/badge/Astro-6.0+-BC52EE?logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-4.2-06B6D4?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)

---

## Características

- **Estética Pixel Art**: Paleta cyan/amarillo neón sobre fondo negro con fuente Press Start 2P
- **Animaciones Retro**: Efectos flotantes, pulsos, brillo holográfico y transiciones suaves
- **Galería de Proyectos**: Tarjetas interactivas con Live Preview en modales
- **Carrusel 3D**: Sección "Sobre mí" con navegación por teclado y efectos de profundidad
- **Responsive**: Layouts adaptativos para móvil y escritorio
- **Performance**: Astro genera HTML estático con hidratación selectiva

---

## Stack Tecnológico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| **Astro** | ^6.0.8 | Framework principal, generación de páginas estáticas |
| **React** | ^19.2.5 | Componentes interactivos (tarjetas, modales) |
| **Tailwind CSS** | ^4.2.2 | Estilos utility-first con integración Vite |
| **TypeScript** | Strict | Tipado estático con config de Astro |

---

## Estructura del Proyecto

```
Mi Web/
├── astro.config.mjs          # Configuración Astro + Tailwind (Vite)
├── package.json              # Dependencias y scripts
├── tsconfig.json             # Configuración TypeScript strict
├── DOCUMENTACION.md          # Documentación técnica detallada
├── public/                   # Assets estáticos (favicon, imágenes, demos)
│   ├── favicon.svg
│   ├── logo.png
│   ├── icon.webp
│   ├── projects/             # Miniaturas de proyectos
│   └── demos/                # Demos HTML para Live Preview
├── src/
│   ├── layouts/
│   │   └── Layout.astro      # Layout base con metadatos y estilos globales
│   ├── pages/
│   │   ├── index.astro       # Página principal (Hero + Sobre mí)
│   │   └── proyectos.astro   # Galería de proyectos
│   ├── components/
│   │   ├── PixelNav.astro    # Navegación fija superior
│   │   ├── HeroSection.astro # Sección de presentación
│   │   ├── StatsSection.astro # Carrusel 3D "Sobre mí"
│   │   ├── Footer.astro      # Pie de página
│   │   ├── ProjectCard.tsx   # Tarjeta de proyecto (React)
│   │   ├── ProjectModal.tsx  # Modal Live Preview (React)
│   │   └── LoadingSpinner.tsx # Spinner de carga pixel art (React)
│   └── styles/
│       └── global.css        # Tailwind, variables CSS y animaciones
└── dist/                     # Output del build (generado)
```

---

## Scripts Disponibles

```bash
# Desarrollo local
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

---

## Desarrollo Local

1. **Clonar e instalar**:
   ```bash
   git clone <repo-url>
   cd "Mi Web"
   npm install
   ```

2. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   El sitio estará disponible en `http://localhost:4321`

3. **Build de producción**:
   ```bash
   npm run build
   ```
   Los archivos estáticos se generan en `dist/`

---

## Estrategia de Componentes

Este proyecto usa **Astro para la mayoría** y **React solo donde se necesita interactividad real**:

| Componente | Tecnología | Razón |
|------------|------------|-------|
| `PixelNav`, `HeroSection`, `StatsSection` | Astro | Mayormente estáticos, JS mínimo para animaciones CSS |
| `ProjectCard`, `ProjectModal` | React | Estado complejo (loading, error, retry), interacciones del usuario |
| `LoadingSpinner` | React | Animación controlada por estado |

**Regla**: Si necesita estado React (useState, useEffect) o manejo de eventos complejos → React. Si es markup con CSS → Astro.

---

## Deployment

Configurado para **GitHub Pages**:
- URL base: `/My-Personal-Web/`
- Dominio: `https://NejiTdK.github.io`

Verifica que el build funcione correctamente:
```bash
npm run build
npm run preview
```

---

## Paleta de Colores

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-cyan` | `#00E5FF` | Estructura, bordes, acentos principales |
| `--color-cyan-dim` | `#0099AA` | Estados hover, scrollbar |
| `--color-yellow` | `#FFE500` | Interactivos, CTAs, selección |
| `--color-yellow-dim` | `#CCA300` | Hover de elementos amarillos |
| `--color-bg` | `#000000` | Fondo principal |
| `--color-surface` | `#0a0a0a` | Tarjetas y secciones |
| `--color-text` | `#FFFFFF` | Texto principal |
| `--color-text-muted` | `#888888` | Descripciones, texto secundario |
| `--color-border` | `#333333` | Bordes sutiles |

---

## Licencia

Proyecto personal - Hecho con ♥ y código.

Copyright 2026 AlecDev.
