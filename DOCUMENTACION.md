# Documentación del proyecto — Portafolio AlecDev

| | |
|---|---|
| **Versión** | 1.3.0 |
| **Última actualización** | 2026-04-19 |
| **Estado** | Activo |

Sitio estático de portafolio con estética **retro / pixel art** y tipografía **Press Start 2P**. Está construido con **Astro 6** + **React 19** y **Tailwind CSS 4** (integración mediante **Vite**).

---

## Resumen

| Aspecto | Detalle |
|--------|---------|
| **Nombre en `package.json`** | `alecdev-portafolio` |
| **Versión** | `0.0.1` |
| **Node requerido** | `>= 22.12.0` |
| **Tipo de módulos** | ESM (`"type": "module"`) |

---

## Stack tecnológico

- **Astro** (`^6.0.8`): framework para páginas y componentes `.astro` (HTML + islands opcionales).
- **React** (`^19.x`): componentes interactivos (ProjectCard, ProjectModal, LoadingSpinner).
- **Tailwind CSS** (`^4.2.2`) + **@tailwindcss/vite** (`^4.2.2`): utilidades CSS y tema; configurados en `astro.config.mjs` como plugin de Vite.
- **Testing**: Vitest + React Testing Library + jsdom para tests unitarios.
- **Sin framework UI adicional**: maquetación con clases Tailwind y CSS scoped/global.

---

## Scripts npm

| Script | Comando | Descripción |
|--------|---------|-------------|
| Desarrollo | `npm run dev` | Servidor local de Astro (`astro dev`). |
| Compilación | `npm run build` | Genera la salida estática en `dist/` (`astro build`). |
| Vista previa | `npm run preview` | Sirve el build de producción (`astro preview`). |
| CLI Astro | `npm run astro` | Acceso directo al ejecutable de Astro. |
| Tests | `npm run test` | Ejecuta tests unitarios con Vitest. |
| Tests UI | `npm run test:ui` | Ejecuta Vitest con interfaz gráfica. |

---

## Estructura de carpetas

```
Mi Web/
├── astro.config.mjs      # Configuración de Astro + plugin Tailwind (Vite)
├── package.json
├── tsconfig.json         # Configuración TypeScript strict
├── vitest.config.ts      # Configuración de Vitest para testing
├── README.md             # Documentación general del proyecto
├── DOCUMENTACION.md      # Este archivo - documentación técnica detallada
├── public/               # Archivos servidos en la raíz del sitio (URLs estáticas)
│   ├── favicon-a.svg     # Favicon del sitio
│   ├── favicon.svg       # Favicon alternativo
│   ├── favicon.ico       # Favicon legacy
│   ├── logo.png          # Logo del portafolio
│   ├── my-logo.png      # Logo principal para navbar y hero
│   ├── DEV-LOGO.png    # Logo alternativo
│   ├── icon.webp        # Avatar anterior del héroe
│   ├── projects/        # Imágenes de proyectos
│   │   └── proyecto-a-large.webp
│   └── demos/            # Demos HTML de proyectos (para Live Preview)
│       └── prototipo-landing/
│           └── index.html
├── dist/                 # Salida del build (generada; no editar a mano)
└── src/
    ├── layouts/
    │   └── Layout.astro   # Shell HTML: meta, fuentes, slot de página
    ├── pages/
    │   ├── index.astro    # Ruta "/" - Home
    │   └── proyectos.astro # Ruta "/proyectos" - Galería
    ├── components/
    │   ├── sections/      # Componentes de sección específicos
    │   │   ├── PixelNav.astro      # Barra de navegación flotante
    │   │   ├── HeroSection.astro   # Sección hero con avatar circular
    │   │   ├── StatsCarousel.tsx   # Sección "Sobre mí" con carrusel 3D (React)
    │   │   ├── StackTecnologico.astro # Stack tecnológico con iconos pixel
    │   │   ├── ProyectosCTA.astro # CTA de proyectos con animación
    │   │   └── Footer.astro        # Pie de página
    │   ├── features/      # Componentes React de features específicas
    │   │   ├── ProjectCard.tsx     # Tarjeta de proyecto
    │   │   ├── ProjectModal.tsx    # Modal de Live Preview
    │   │   ├── ProjectModal.test.tsx # Tests del modal
    │   │   └── LoadingSpinner.tsx  # Spinner de carga pixel art
    │   └── ui/            # Componentes UI reutilizables (vacío por ahora)
    ├── styles/
    │   └── global.css     # Tailwind, tokens semánticos, animaciones
    └── test/
        └── setup.ts       # Configuración de Vitest + Testing Library
```

---

## Arquitectura de Componentes

### Estrategia: Astro vs React

| Componente | Tecnología | Razón |
|------------|------------|-------|
| `PixelNav`, `HeroSection`, `StatsSection`, `Footer` | Astro | Mayormente estáticos, JS mínimo para animaciones CSS |
| `ProjectCard`, `ProjectModal`, `LoadingSpinner` | React | Estado complejo (loading, error, retry), interacciones del usuario |

**Regla**: Si necesita `useState`, `useEffect` o manejo de eventos complejos → React. Si es markup con CSS → Astro.

### Organización de carpetas

- **`sections/`**: Componentes que representan secciones completas de página
- **`features/`**: Componentes React relacionados con features específicos (proyectos)
- **`ui/`**: Componentes UI reutilizables genéricos (vacío, listo para escalar)

---

## Tokens semánticos CSS

Los tokens están definidos en `src/styles/global.css` usando `@theme` de Tailwind v4:

### Tokens primitivos (colores base)

```css
--color-cyan: #00E5FF;
--color-cyan-dim: #0099AA;
--color-yellow: #FFE500;
--color-yellow-dim: #CCA300;
--color-bg: #000000;
--color-surface: #0a0a0a;
--color-text: #FFFFFF;
--color-text-muted: #888888;
--color-border: #333333;
```

### Tokens semánticos (uso por propósito)

```css
--theme-bg-primary: var(--color-bg);        /* Fondos principales */
--theme-bg-secondary: var(--color-surface);  /* Tarjetas, secciones */
--theme-accent-primary: var(--color-cyan);    /* Estructura, bordes */
--theme-accent-cta: var(--color-yellow);     /* Botones, CTAs */
--theme-text-primary: var(--color-text);     /* Texto principal */
--theme-text-secondary: var(--color-text-muted); /* Descripciones */
--theme-border-subtle: var(--color-border);  /* Bordes sutiles */
--theme-border-accent: var(--color-cyan);    /* Bordes destacados */
```

**Beneficio**: Si cambias la paleta, solo modificas los tokens primitivos; los componentes usan tokens semánticos y no se rompen.

---

## Rutas y páginas

| Ruta | Archivo | Contenido |
|------|---------|-----------|
| `/` | `src/pages/index.astro` | Navbar flotante, héroe, Sobre Mí (carrusel), Stack tecnológico, CTA Proyectos, Footer. |
| `/proyectos` | `src/pages/proyectos.astro` | Grid de proyectos con tarjetas React, búsqueda con query `?q=`, Live Preview. |

Parámetros de URL (proyectos):
- `?q=<texto>` - Filtra proyectos por título

---

## Layout y estilos globales

- **`Layout.astro`**: documento HTML5 (`lang="es"`), meta viewport, descripción SEO, favicon con `BASE_URL`, fuente Google *Press Start 2P*, y `<slot />` donde cada página inyecta su contenido. Importa **`global.css`** de forma global.
- **`global.css`**: `@import "tailwindcss"`, tokens `@theme` con colores semánticos, variables en `:root`, estilos base de `html`/`body`, scrollbar personalizada, animaciones (`flicker`, `float`, `pulse-glow`, etc.) y clases auxiliares.

---

## Componentes

### `PixelNav.astro` (en `sections/`)

Barra **flotante** superior (position: fixed) con:
- Logo circular con borde cyan
- Marca **ALECDEV**
- Enlaces: **INICIO** → `/`, **SOBRE MÍ** → `/#sobre-mi`, **STACK** → `/#stack`, **PROYECTOS** → `/proyectos`
- Buscador funcional con sugerencias (autocomplete)
- Menú hamburguesa para mobile

Características:
- Estilo pixel con box-shadow
- Border-radius: 8px
- Hover effects con scale y color amber

### `HeroSection.astro` (en `sections/`)

Sección **pantalla completa** (`#inicio`):
- Avatar **circular** con `/my-logo.png` y efecto tilt
- Título **ALECDEV** con acentos cyan
- Rol profesional en tarjeta
- Tagline descriptiva
- Botón a `#sobre-mi`
- Indicador de scroll animación
- Sprites flotantes de tecnologías (HTML, CSS, JS, Astro, React, MySQL)

### `StatsCarousel.tsx` (en `features/`)

Sección **`#sobre-mi`** implementada como componente React:
- **Mobile**: grid de tarjetas apiladas (perfil + bios)
- **Desktop**: **carrusel 3D** con efecto de profundidad (escala, opacidad, posición)
- Navegación por botones y teclado (flechas)
- Tarjetas más grandes (`w-[28rem]`) con fuentes reducidas

### `StackTecnologico.astro` (en `sections/`)

Sección **`#stack`** con iconos pixel de tecnologías:
- HTML, CSS (Tailwind), JS, React, Astro
- Iconos SVG estilo pixel con colores oficiales
- Descripciones breves por tecnología
- Borde y box-shadow pixel

### `ProyectosCTA.astro` (en `sections/`)

CTA después del Stack con animación:
- Título "¿QUIERES VER MÁS?"
- Botón grande con efectos de hover
- Pulso de luz debajo al hacer hover
- Decoraciones pixel animadas

### `Footer.astro` (en `sections/`)

Pie con copyright **2026**, estado "READY TO WORK", versión **v1.0.0**, mensaje "Hecho con ♥ y código" y franja decorativa de cuadrados animados (pulse-glow).

### `ProjectCard.tsx` (en `features/`)

Tarjeta de proyecto con:
- Header con logo y título
- Miniatura con overlay de **Live Preview** (si `hasDemo: true`)
- Descripción, año y tecnologías
- **Modal integrado** para demos

Se usa con `client:load` en `proyectos.astro`.

### `ProjectModal.tsx` (en `features/`)

Modal fullscreen con iframe para **Live Preview**:
- Estados: loading (spinner), error (retry), listo
- Cerrar: Escape, click fuera, botón X
- Accesibilidad: `role="dialog"`, `aria-modal`
- **Tests**: `ProjectModal.test.tsx` verifica estados y accesibilidad

### `LoadingSpinner.tsx` (en `features/`)

Spinner animado estilo 8-bit con 4 esquinas pulsantes y centro amarillo estático.

---

## Testing

### Configuración

- **Vitest**: Runner de tests
- **@testing-library/react**: Renderizado y queries para React
- **@testing-library/jest-dom**: Matchers adicionales
- **jsdom**: Entorno de navegador simulado

### Ejecutar tests

```bash
npm run test        # Ejecuta todos los tests
npm run test -- --watch  # Modo watch (re-ejecuta al guardar)
```

### Tests existentes

**`ProjectModal.test.tsx`**:
- Renderizado condicional (isOpen)
- Estados de carga (spinner)
- Cierre del modal (Escape, click backdrop, botón X)
- Accesibilidad (ARIA attributes)
- Reset de estado al reabrir

---

## Página de proyectos

### Estructura de datos

Los proyectos se definen en el array **`projects`** en `proyectos.astro`:

```ts
interface Project {
  id: string;           // Identificador único
  title: string;        // Título del proyecto
  description: string;  // Descripción breve
  year: string;         // Año de creación
  technologies: string[]; // ['html', 'css', 'js', 'react', 'astro']
  thumbnail: string;   // Ruta a imagen (en /public)
  demoUrl?: string;     // Ruta al demo HTML (en /public/demos/) - opcional
  hasDemo?: boolean;    // Habilita botón Live Preview - opcional
}
```

### Live Preview

Si un proyecto tiene `hasDemo: true` y `demoUrl`, al hacer click en la miniatura se abre un **modal con iframe** que carga el demo en vivo. El demo debe ser un archivo HTML autocontenido en `/public/demos/`.

Si no hay proyectos (`projects.length === 0`), se muestra "Sin proyectos aún".

### Componentes React

- **`ProjectCard.tsx`**: Renderiza cada tarjeta. Usa `client:load` para hydrate en cliente.
- **`ProjectModal.tsx`**: Modal con iframe, estados de carga/error, retry.
- **`LoadingSpinner.tsx`**: Spinner pixel art para estados de carga.

---

## Activos estáticos (`public/`)

El código referencia rutas absolutas desde la raíz del sitio usando `import.meta.env.BASE_URL`:

- `/favicon-a.svg` — configurado en `Layout.astro`
- `/logo.png` — navegación, tarjetas de proyecto
- `/icon.webp` — avatar del héroe
- `/projects/` — miniaturas de proyectos
- `/demos/` — demos HTML para Live Preview

### Estructura de demos

Para el Live Preview, coloca el HTML y sus recursos en:

```
public/demos/[nombre-proyecto]/
├── index.html
├── styles.css
└── script.js
```

La URL se define en `demoUrl` del proyecto (sin el prefijo `/public/`).

---

## Paleta y naming visual

Colores del tema (definidos en `global.css` con `@theme`):

| Color | Hex | Uso |
|-------|-----|-----|
| **Cyan neón** | `#00E5FF` | Estructura, bordes, acentos principales |
| **Cyan dim** | `#0099AA` | Estados hover, scrollbar |
| **Amarillo neón** | `#FFE500` | Interactivos, hover, CTAs |
| **Amarillo dim** | `#CCA300` | Estados hover de elementos amarillos |
| **Background** | `#000000` | Fondo principal |
| **Surface** | `#0a0a0a` | Fondos de tarjetas, secciones |
| **Texto** | `#FFFFFF` | Texto principal |
| **Texto muted** | `#888888` | Descripciones, textos secundarios |
| **Border** | `#333333` | Bordes sutiles, separadores |

La clase utilitaria Tailwind **`font-pixel`** aplica la fuente *Press Start 2P*.

---

## Configuración de Astro

**`astro.config.mjs`** exporta `defineConfig` con:

```js
site: 'https://NejiTdK.github.io',
base: '/My-Personal-Web/',
vite: { plugins: [tailwindcss()] }
```

Configurado para **GitHub Pages** con prefijo de ruta.

---

## Comentarios en el código

En los archivos fuente se añadieron comentarios que describen:
- **Qué es** cada archivo o bloque principal.
- **A qué pertenece** (ruta del archivo, relación con rutas o layout).
- **Props** de componentes, **variables** relevantes y **comportamiento** de scripts.
- **Estrategia** de Astro vs React para mantener consistencia.

---

## Mantenimiento rápido

### Añadir un proyecto

1. Añade el proyecto al array `projects` en `src/pages/proyectos.astro`:
   ```ts
   {
     id: 'mi-proyecto',
     title: 'Mi Proyecto',
     description: 'Descripción breve del proyecto...',
     year: '2026',
     technologies: ['html', 'css', 'js'],
     thumbnail: 'projects/mi-thumb.webp',
     demoUrl: 'demos/mi-proyecto/index.html',  // opcional
     hasDemo: true  // habilita Live Preview
   }
   ```
2. Coloca la miniatura en `public/projects/`
3. Si tiene demo, crea la carpeta `public/demos/mi-proyecto/` con el HTML

### Editar "Sobre Mí"

- Datos del perfil: `src/components/sections/StatsSection.astro` → array `profileData`
- Biografía: `src/components/sections/StatsSection.astro` → array `bioParagraphs`

### Cambiar imágenes del héroe

- Avatar: `public/icon.webp` (cambia también en `HeroSection.astro` si renombras)
- Sprites flotantes: están embebidos como SVGs en `HeroSection.astro`

### Agregar tests

1. Crea archivo `.test.tsx` junto al componente en `features/`
2. Importa React y los helpers de testing-library
3. Ejecuta con `npm run test`

---

## Changelog

### v1.3.0 (2026-04-19)
- ✅ Nuevo navbar flotante con estilo pixel
- ✅ Logo circular con tilt effect
- ✅ Buscador funcional con sugerencias en navbar
- ✅ Nueva sección Stack Tecnológico con iconos pixel
- ✅ CTA Proyectos con animación de pulso
- ✅ Bug fixes: navegación #sobre-mi/#stack funciona desde cualquier página
- ✅ View Transitions con cleanup de observers
- ✅ Reordenado: navbar (Inicio → Sobre Mí → Stack → Proyectos)
- ✅ Agregado padding a proyectos.astro para evitar overlap

### v1.2.0 (2026-04-12)
- ✅ Renombrado package.json de `temp-project` a `alecdev-portafolio`
- ✅ Actualizado README.md con información completa del proyecto
- ✅ Reorganizada estructura de componentes:
  - Creadas carpetas `sections/`, `features/`, `ui/`
  - Movidos componentes a ubicaciones semánticas
- ✅ Implementados tokens semánticos CSS en `global.css`
- ✅ Agregado sistema de testing con Vitest + React Testing Library
- ✅ Tests para `ProjectModal` (renderizado, estados, accesibilidad)

### v1.1.0 (2026-04-11)
- Actualización de componentes React para Live Preview
- Documentación técnica expandida

---

*Documentación actualizada tras refactorización del navbar, adición de Stack Tecnológico y CTA de proyectos.*
