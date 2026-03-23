# Documentación del proyecto — Portafolio AlecDev

Sitio estático de portafolio con estética **retro / pixel art** y tipografía **Press Start 2P**. Está construido con **Astro 6** y **Tailwind CSS 4** (integración mediante **Vite**).

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
│   └── favicon.svg       # (En el código también se referencia favicon.png y otros assets)
├── dist/                 # Salida del build (generada; no editar a mano)
└── src/
    ├── layouts/
    │   └── Layout.astro  # Shell HTML: meta, fuentes, slot de página, import global.css
    ├── pages/
    │   ├── index.astro   # Ruta "/"
    │   └── proyectos.astro # Ruta "/proyectos"
    ├── components/
    │   ├── PixelNav.astro
    │   ├── HeroSection.astro
    │   ├── StatsSection.astro
    │   ├── Footer.astro
    │   ├── ProjectGallery.astro
    │   └── LogoCanvas.astro
    └── styles/
        └── global.css    # Tailwind, variables, animaciones y utilidades globales
```

---

## Rutas y páginas

| Ruta | Archivo | Contenido |
|------|---------|-----------|
| `/` | `src/pages/index.astro` | Navegación, héroe (presentación), sección “Sobre mí” RPG, pie. |
| `/proyectos` | `src/pages/proyectos.astro` | Listado de proyectos (actualmente vacío), modal carrusel para imágenes cuando hay datos. |

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

Sección **pantalla completa** (`#inicio`): fondo `/background.png`, logo `/logo.png`, título, rol, tagline, botón a `#sobre-mi`, indicador de scroll. Usa clases globales como `scanlines`, `crt-flicker`, `float-animation`.

### `StatsSection.astro`

Sección **`#sobre-mi`**: ficha estilo videojuego con HP (corazones), MP (diamantes), biografía en párrafos, barra EXP, habilidades con porcentajes y enlace a `/proyectos`. Incluye estilos scoped (corazones, diamantes, barras) y un script que resalta barras al hover.

### `Footer.astro`

Pie con copyright **2026**, estado “READY TO WORK”, versión **v1.0.0**, mensaje “Hecho con ♥ y código” y franja decorativa de cuadrados animados.

### `ProjectGallery.astro`

Bloque de **preview** con título PROYECTOS y botón a `/proyectos`. **No está importado** en `index.astro` en el estado actual del repo; está listo para insertarse si se desea esa sección en la home.

### `LogoCanvas.astro`

Renderiza el logo en un **canvas** a partir de una cadena ASCII y una paleta de colores. **No está importado** en ninguna página actualmente; alternativa programática a `/logo.png`.

---

## Página de proyectos y carrusel

- Los proyectos se definen en el array **`posts`** en `proyectos.astro` (`{ src, description }`).
- Si `posts.length === 0`, se muestra **“Sin proyectos aún”**.
- Con datos, cada tarjeta tiene imagen clicable (clase **`.post-image`**) que abre un **modal** fullscreen con imagen ampliada, botones anterior/siguiente, cierre y teclado (**Escape**, flechas).

---

## Activos estáticos (`public/`)

El código referencia rutas absolutas desde la raíz del sitio:

- `/favicon.png` — configurado en `Layout.astro` (en `public/` puede existir otro favicon; conviene alinear nombre y formato).
- `/logo.png` — navegación, héroe, stats, tarjetas de proyecto.
- `/background.png` — fondo del héroe.

Asegúrate de que estos archivos existan en **`public/`** para evitar roturas visuales en build y producción.

---

## Paleta y naming visual

Colores recurrentes en componentes y CSS:

- **Primario**: `#0D8BDB`
- **Secundario**: `#06476F`
- **Texto claro**: `#EDEDED`
- **Texto atenuado**: `#DDE8EB`
- **Fondos oscuros**: `#1a1a1a`, `#0a0a12`, `#0d1b2a`

La clase utilitaria Tailwind **`font-pixel`** (definida en el tema o en capas de Tailwind según configuración) alinea la tipografía pixel del sitio.

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

1. **Añadir proyectos**: edita `posts` en `src/pages/proyectos.astro` y coloca imágenes en `public/` (o URLs externas en `src`).
2. **Mostrar galería preview en home**: importa `ProjectGallery.astro` en `index.astro` y colócalo donde corresponda.
3. **Usar logo canvas**: importa `LogoCanvas.astro` en una página y pasa `size="small" | "large"`; revisa ids únicos si hay varios canvas del mismo tamaño.

---

*Documentación generada para alinear el equipo y futuras revisiones del repositorio. Ajusta fechas, versión y nombre del paquete en `package.json` cuando el proyecto deje de ser prototipo.*
