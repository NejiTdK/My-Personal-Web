# Documentación del proyecto — Portafolio AlecDev

| | |
|---|---|
| **Versión** | 1.1.0 |
| **Última actualización** | 2026-04-11 |
| **Estado** | Activo |

Sitio estático de portafolio con estética **retro / pixel art** y tipografía **Press Start 2P**. Está construido con **Astro 6** + **React 19** y **Tailwind CSS 4** (integración mediante **Vite**).

---

## Resumen

| Aspecto | Detalle |
|--------|---------|
| **Nombre en `package.json`** | `temp-project` (placeholder; el sitio se presenta como **AlecDev**) |
| **Versión** | `0.0.1` |
| **Node requerido** | `>= 22.12.0` |
| **Tipo de módulos** | ESM (`"type": "module"`) |

---

## Stack tecnológico

- **Astro** (`^6.0.8`): framework para páginas y componentes `.astro` (HTML + islands opcionales).
- **React** (`^19.x`): componentes interactivos (ProjectCard, ProjectModal, LoadingSpinner).
- **Tailwind CSS** (`^4.2.2`) + **@tailwindcss/vite** (`^4.2.2`): utilidades CSS y tema; configurados en `astro.config.mjs` como plugin de Vite.
- **Sin framework UI adicional**: maquetación con clases Tailwind y CSS scoped/global.

---

## Scripts npm

| Script | Comando | Descripción |
|--------|---------|-------------|
| Desarrollo | `npm run dev` | Servidor local de Astro (`astro dev`). |
| Compilación | `npm run build` | Genera la salida estática en `dist/` (`astro build`). |
| Vista previa | `npm run preview` | Sirve el build de producción (`astro preview`). |
| CLI Astro | `npm run astro` | Acceso directo al ejecutable de Astro. |

---

## Estructura de carpetas relevante

```
Mi Web/
├── astro.config.mjs      # Configuración de Astro + plugin Tailwind (Vite)
├── package.json
├── DOCUMENTACION.md      # Este archivo
├── public/               # Archivos servidos en la raíz del sitio (URLs estáticas)
│   ├── favicon.svg       # Favicon del sitio
│   ├── logo.png         # Logo del portafolio
│   ├── icon.webp        # Avatar del héroe
│   ├── projects/        # Imágenes de proyectos
│   │   └── proyecto-a-large.webp
│   └── demos/           # Demos HTML de proyectos (para Live Preview)
│       └── protipo-landing/
│           └── index.html
├── dist/                 # Salida del build (generada; no editar a mano)
└── src/
    ├── layouts/
    │   └── Layout.astro  # Shell HTML: meta, fuentes, slot de página, import global.css
    ├── pages/
    │   ├── index.astro   # Ruta "/"
    │   └── proyectos.astro # Ruta "/proyectos"
    ├── components/
    │   ├── PixelNav.astro       # Barra de navegación fija
    │   ├── HeroSection.astro   # Sección hero con avatar y sprites flotantes
    │   ├── StatsSection.astro # Sección "Sobre mí" con carrusel 3D
    │   ├── Footer.astro        # Pie de página
    │   ├── ScrollableImage.astro  # Imagen con scroll vertical (legacy)
    │   ├── TechIcon.astro         # Iconos pixel de tecnologías (legacy)
    │   ├── ProjectCard.tsx        # Tarjeta de proyecto (React)
    │   ├── ProjectModal.tsx      # Modal de Live Preview (React)
    │   └── LoadingSpinner.tsx   # Spinner de carga (React)
    └── styles/
        └── global.css    # Tailwind, variables, animaciones y utilidades globales
```

---

## Rutas y páginas

| Ruta | Archivo | Contenido |
|------|---------|-----------|
| `/` | `src/pages/index.astro` | Navegación, héroe (presentación), sección "Sobre mí" con carrusel 3D, pie. |
| `/proyectos` | `src/pages/proyectos.astro` | Grid de proyectos con tarjetas React, Live Preview modal para demos. |

El **file-based routing** de Astro convierte cada archivo en `src/pages/` en una URL.

---

## Layout y estilos globales

- **`Layout.astro`**: documento HTML5 (`lang="es"`), meta viewport, descripción SEO, favicon, fuente Google *Press Start 2P*, y `<slot />` donde cada página inyecta su contenido. Importa **`global.css`** de forma global.
- **`global.css`**: `@import "tailwindcss"`, bloque `@theme` con colores del proyecto, variables en `:root`, estilos base de `html`/`body`, scrollbar personalizada, animaciones (`flicker`, `float`, `pulse-glow`, etc.) y clases auxiliares (`.hp-bar`, `.gallery-item`, …).

---

## Componentes

### `PixelNav.astro`

Barra **fija** superior con logo, marca **ALECDEV** y enlaces:

- **INICIO** → `/`
- **SOBRE MÍ** → `#sobre-mi` en home, o `/#sobre-mi` en otras rutas
- **PROYECTOS** → `/proyectos`

### `HeroSection.astro`

Sección **pantalla completa** (`#inicio`): avatar `/icon.webp`, título, rol, tagline, botón a `#sobre-mi`, indicador de scroll y **sprites flotantes** de tecnologías (HTML, CSS, JS, Astro, React, MySQL) con animaciones.

### `StatsSection.astro`

Sección **`#sobre-mi`** con dos layouts:

- **Mobile**: grid de tarjetas apiladas (perfil + bios)
- **Desktop**: **carrusel 3D** con efecto de profundidad (escala, opacidad, posición)

Incluye script con navegación por botones y teclado (flechas).

### `Footer.astro`

Pie con copyright **2026**, estado "READY TO WORK", versión **v1.0.0**, mensaje "Hecho con ♥ y código" y franja decorativa de cuadrados animados (pulse-glow).

### `ScrollableImage.astro` *(legacy)*

Componente de imagen con scroll vertical. Muestra indicador "SCROLL" que se oculta al hacer hover. Útil para capturas largas.

### `TechIcon.astro` *(legacy)*

Iconos SVG pixel art para tecnologías: HTML, CSS, JS, PostCSS. Tamaños: `sm`, `md`, `lg`.

### `ProjectCard.tsx` *(React)*

Tarjeta de proyecto con:

- Header con logo y título
- Miniatura con overlay de **Live Preview** (si `hasDemo: true`)
- Descripción, año y tecnologías
- **Modal integrado** para demos

Se usa con `client:load` en `proyectos.astro`.

### `ProjectModal.tsx` *(React)*

Modal fullscreen con iframe para **Live Preview**:

- Estados: loading (spinner), error (retry), listo
- Cerrar: Escape, click fuera, botón X
- Accesibilidad: `role="dialog"`, `aria-modal`

### `LoadingSpinner.tsx` *(React)*

Spinner animado estilo 8-bit con 4 esquinas pulsantes y centro amarillo estático.

### `ProjectGallery.astro` *(sin usar)*

Bloque de preview con botón a proyectos. **No está importado** actualmente.

### `LogoCanvas.astro` *(sin usar)*

Renderiza el logo en canvas desde ASCII. **No está importado** actualmente.

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
  demoUrl?: string;     // Ruta al demo HTML (en /public/demos/)
  hasDemo?: boolean;    // Habilita botón Live Preview
}
```

### Live Preview

Si un proyecto tiene `hasDemo: true` y `demoUrl`, al hacer click en la miniatura se abre un **modal con iframe** que carga el demo en vivo. El demo debe ser un archivo HTML autocontenido en `/public/demos/`.

Si no hay proyectos (`projects.length === 0`), se muestra "Sin proyectos aún".

### Componentes React

- **`ProjectCard.tsx`**: Renderiza cada tarjeta. Usa `client:load` para hydrate en cliente.
- **`ProjectModal.tsx`**: Modal con iframe, estados de carga/error,retry.
- **`LoadingSpinner.tsx`**: Spinner pixel art para estados de carga.

---

## Activos estáticos (`public/`)

El código referencia rutas absolutas desde la raíz del sitio:

- `/favicon.svg` — configurado en `Layout.astro`
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
vite: { plugins: [tailwindcss()] }
```

No hay adaptador de servidor en el config actual: el proyecto está orientado a **sitio estático** por defecto.

---

## Comentarios en el código

En los archivos fuente se añadieron comentarios que describen:

- **Qué es** cada archivo o bloque principal.
- **A qué pertenece** (ruta del archivo, relación con rutas o layout).
- **Props** de componentes, **variables** relevantes y **comportamiento** de scripts (carrusel, hover de habilidades, canvas).

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

- Datos del perfil: `src/components/StatsSection.astro` → array `profileData`
- Biografía: `src/components/StatsSection.astro` → array `bioParagraphs`

### Mostrar galería preview en home

1. Crea o descomenta `src/components/ProjectGallery.astro` (actualmente sin usar)
2. Impórtalo en `index.astro` y colócalo donde corresponda

### Cambiar imágenes del héroe

- Avatar: `public/icon.webp` (cambia también en `HeroSection.astro` si renombras)
- Sprites flotantes: están embebidos como SVGs en `HeroSection.astro`

---

*Documentación actualizada tras revisión de código y adición de componentes React.*
