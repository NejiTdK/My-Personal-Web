# Spec: Rediseño Retro Pixel Art 8-Bit Portafolio

**Fecha**: 2026-03-23
**Objetivo**: Rediseñar completamente el portafolio AlecDev con estética Retro Pixel Art 8-bit, alta visibilidad, paleta negro/amarillo/blanco.

---

## Paleta de Colores

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-bg` | `#000000` | Fondo puro de la página |
| `--color-surface` | `#0a0a0a` | Fondos de paneles/cards (levísima elevación) |
| `--color-primary` | `#FFE500` | Acento principal — bordes, títulos, botones |
| `--color-primary-dim` | `#CCA300` | Variante oscura del acento (hover) |
| `--color-text` | `#FFFFFF` | Texto principal |
| `--color-text-muted` | `#888888` | Texto secundario |
| `--color-border` | `#333333` | Bordes sutiles |

**Reglas**: Fondo siempre `#000000`, texto siempre `#FFFFFF`, acentos siempre `#FFE500`. Sin gradientes.

---

## Grid de Guía

Puntos de guía sutiles como fondo:

```css
body {
  background-image: radial-gradient(circle, #1a1a1a 1px, transparent 1px);
  background-size: 24px 24px;
}
```

---

## Componentes

### 1. PixelNav — Navegación flotante
- `absolute top-4 left-1/2 -translate-x-1/2`
- Fondo `#000000`, borde sólido `2px #FFE500`, `border-radius: 2px`
- Sombra pixel: `4px 4px 0 #FFE500` (offset sólido, sin glow)
- Enlaces: `#FFFFFF`, hover `#FFE500`, cambio de color directo

### 2. HeroSection — Sección principal
- Fondo `#000000` puro, sin background.png
- Avatar: Sprite pixel art SVG inline (128x128, renderizado pixelated)
- Sprites tech flotantes: placeholders divs `32x32` con borde punteado `#333`
- CTA: Botón rectangular `bg-#FFE500 text-#000000`, sin gradientes
- Sin scanlines, sin CRT flicker

### 3. StatsSection → Tabla "Sobre Mí" estilo consola
- Panel único con borde `#FFE500`
- Tabla estilo terminal con prompt `>` en `#FFE500`:
  ```
  > NOMBRE:    ALECDEV
  > ROL:       DESARROLLADOR FRONTEND
  > EDAD:      23
  > FORMACIÓN: INGENIERÍA EN SISTEMAS
  > ESTADO:    APRENDIENDO
  ```
- Botón expandir (+) junto al título
- Bio con shimmer `#FFE500`

### 4. Footer
- Fondo `#000000`, borde superior `2px #FFE500`
- Pixel stripe con `#FFE500`

### 5. proyectos.astro
- Posts con fondo `#0a0a0a`, bordes `#FFE500`, textos blancos
- Carrusel adaptado a amarillo/negro

---

## Avatar Pixel Art

SVG inline con rectángulos `<rect>` por pixel. Inspirado en Makoto Yuki + Ren Amamiya:
- Cabello oscuro flequillo asimétrico
- Ojos azules/grises
- Chaleco/abrigo school uniform
- Pose frontal estática

---

## Sprites Tech (Placeholders)

Slots en hero para imágenes que el usuario proporcionará después:
- Contenedor flotante con animación `float` escalonada
- Por ahora: divs vacíos `32x32` con borde punteado `#333`

---

## Archivos a Modificar

| Archivo | Cambio |
|---------|--------|
| `src/styles/global.css` | Reescribir: paleta amarillo/negro, grid dots, quitar azul/scanlines/CRT |
| `src/components/PixelNav.astro` | Reescribir: nueva paleta, sombra pixel |
| `src/components/HeroSection.astro` | Reescribir: avatar SVG, sin fondo, sprites tech placeholders |
| `src/components/StatsSection.astro` | Reescribir: tabla consola, quitar RPG |
| `src/components/Footer.astro` | Reescribir: paleta amarillo |
| `src/pages/proyectos.astro` | Adaptar colores |

## Archivos a Eliminar

| Archivo | Razón |
|---------|-------|
| `public/background.png` | Ya no se usa |
| `src/components/ProjectGallery.astro` | No importado |

---

## Animaciones Conservadas

| Animación | Uso |
|-----------|-----|
| `float` | Sprites tech flotantes |
| `fadeIn` | Carrusel |

## Animaciones Eliminadas

| Animación | Razón |
|-----------|-------|
| `crt-flicker` | Demasiado ruidoso |
| `scanlines` | No aporta al estilo limpio |
| `pulse-glow` | Reemplazado por sombra pixel estática |
| `bio-glow` | Reemplazado por shimmer simple |
