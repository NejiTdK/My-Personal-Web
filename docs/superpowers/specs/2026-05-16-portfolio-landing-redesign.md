# Portfolio Landing Pages - Rediseño "Pixel Futurista Limpio"

**Fecha:** 2026-05-16
**Estado:** Aprobado por el usuario

---

## Resumen del Cambio

Rediseñar el portafolio para enfocarse en la creación de landing pages como servicio, cambiando el enfoque de "desarrollador front-end" a "creador de sitios web". Mezclar estética pixel art con toques retro-futuristas modernos manteniendo el live preview de proyectos existente.

---

## Objetivos

1. Reposicionar el sitio como catálogo de servicios de landing pages
2. Mantener personalidad visual (pixel + retro-futurista) pero más limpia/profesional
3. Preservar el sistema de live preview de proyectos tal cual funciona actualmente
4. Transicionar de "stack tecnológico" a "servicios ofrecidos" (orientado a cliente)

---

## Estilo Visual

### Paleta de Colores (ajustada para mayor claridad)

| Propósito | Color | Uso |
|-----------|-------|-----|
| Fondo | `#0a0a0a` | Superficies, cards |
| Fondo secundario | `#121212` | Secciones alternas |
| Acento primario | `#00E5FF` (Cyan) | Estructura, bordes, links |
| Acento secundario | `#FF6B35` (Naranja/warm) | CTAs, énfasis -替代 yellow para variedad |
| Acento glow | `#00FF88` (Green neon) | Efectos hover, acentos futuristas |
| Texto primario | `#FFFFFF` | Títulos, body |
| Texto secundario | `#888888` | Descripciones, hints |
| Borde | `#2a2a2a` | Bordes sutiles |

### Tipografía

- **Títulos:** Press Start 2P (mantener)
- **Body:** Fuente limpia tipo "Space Mono" o similar para readability
- **Tamaños:** Reducir un 20% para no saturar visualmente

### Elementos Decorativos

- Bordes pixel en cards, botones, navbar
- Glow sutil en elementos interactivos (box-shadow con color neon)
- Patrón de fondo sutil (grid pixelizado, no saturado)
- Efectos de "scanline" muy sutiles en headers

---

## Estructura de Secciones

### 1. Navbar (simplificado)
- Logo/Nombre a la izquierda
- Links: Inicio | Servicios | Proyectos | Contacto
- Fondo translúcido con blur
- Un ícono pixel decorativo (no saturado)

### 2. Hero
- Tu nombre en fuente pixel (más grande)
- Tagline breve: "Creo landing pages que convierten"
- CTA: "Ver proyectos" o "Hablemos"
- Fondo con patrón pixel sutil (no sobrecargado)
- Un elemento decorativo retro-futurista (ej: un frame pixel con glow)

### 3. Servicios (reemplaza Stack Tecnológico)

Tres cards/columnas con íconos pixel:

| Servicio | Descripción |
|----------|-------------|
| Landing Pages | "Sitios web estáticos, rápidos, optimizados para conversión. HTML, CSS, JS puro." |
| Prototipado | "Transformo tu idea en un mockup funcional. Diseños limpios y listos para implementar." |
| Sitios Estáticos | "Blogs, portfolios, páginas corporativas. Performance extrema, cero mantenimiento." |

Cada card con:
- Ícono pixel
- Título
- Descripción breve
--tech stack pequeño (no como lista principal)

### 4. Proyectos

**Mantener exactamente igual** al sistema actual:
- Grid de ProjectCard
- Live preview modal (no tocar)
- Filtro por búsqueda
- Estilo visual actualizado para que combine con el resto

### 5. Contacto

- Email (mailto)
- Links sociales minimal
- Un CTA claro: "¿Necesitas una landing?"

---

## Componentes a Modificar

| Componente | Acción |
|------------|--------|
| `Layout.astro` | Ajustar SEO description, fonts |
| `PixelNav.astro` | Simplificar, menos saturado |
| `HeroSection.astro` | Nuevo contenido, mantener estilo |
| `StackTecnologico.astro` | **Reemplazar** por `Servicios.astro` |
| `ProyectosCTA.astro` | Ajustar copy, mantener estructura |
| `Footer.astro` | Ajustar links |
| `global.css` | Nueva paleta, nuevos efectos glow |
| `index.astro` | Actualizar imported components |

## Componentes a Crear

- `src/components/sections/Servicios.astro` - Reemplaza StackTecnologico

---

## Live Preview Modal (SIN CAMBIOS)

El sistema actual de live preview en `/proyectos` debe mantenerse **exactamente igual**:
- `ProjectCard.tsx` sin cambios
- Modal de preview sin cambios
- Funcionalidad idéntica

Solo se actualiza el estilo visual外围 (colors, spacing) para que combine con el redesign.

---

## Animaciones (mantener existentes)

- Scroll reveal (ya existe)
- Tilt cards (ya existe)
- Glow effects (nuevo: agregar a hover states)
- Float animation (reducir intensidad)

---

## SEO Updates

- Title: "AlecDev - Creador de Landing Pages"
- Description: "Creo landing pages estáticas, rápidas y optimizadas. HTML, CSS, JS. Prototipado y desarrollo web."
- Keywords: "landing page, desarrollo web, HTML, CSS, JS, prototipado, sitios estáticos"

---

##验收标准

- [ ] Navbar minimal con links correctos
- [ ] Hero con nuevo copy orientado a servicios
- [ ] Sección "Servicios" con 3 columns (no stack tecnológico)
- [ ] Proyectos con live preview funcionando igual
- [ ] Estética pixel + retro-futurista pero más limpia
- [ ] Responsive en mobile
- [ ] SEO actualizado
- [ ] No mencionar "front-end", "React", "ciberseguridad"