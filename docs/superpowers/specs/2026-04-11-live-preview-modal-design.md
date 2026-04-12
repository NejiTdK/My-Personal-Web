# Spec: Live Preview Modal con React

**Fecha:** 2026-04-11
**Objetivo:** Añadir funcionalidad de demo interactiva para proyectos en la página de proyectos

---

## Resumen

Implementar un modal interactivo que carga una demo HTML bajo demanda cuando el usuario hace clic en "Live Preview". Se usará React para manejar el estado de carga y la experiencia del modal.

---

## Arquitectura

### Stack tecnológico
- **Framework UI:** React (via Astro islands)
- **Estado:** useState, useEffect para loading/error
- **Estilo:** Tailwind CSS existente

### Componentes

| Componente | Responsabilidad |
|-----------|----------------|
| `ProjectCard` | Tarjeta de proyecto con botón Live Preview |
| `ProjectModal` | Modal fullscreen con iframe y controles |
| `LoadingSpinner` | Loader pixel art para estado cargando |

---

## Flujo de usuario

```
1. Usuario ve ProjectCard con captura/thumbnail
          ↓
2. Hace clic en botón "LIVE PREVIEW"
          ↓
3. Modal abre con LoadingSpinner
          ↓
4. Iframe carga el HTML (bajo demanda)
          ↓
5. Demo interactiva lista
          ↓
6. Usuario interactúa con la demo
          ↓
7. Cierra modal → iframe se desmonta
```

---

## Estados del Modal

| Estado | UI |
|--------|-----|
| `idle` | Modal cerrado |
| `loading` | Spinner pixel + "CARGANDO..." |
| `ready` | Iframe visible e interactivo |
| `error` | Mensaje de error + retry |

---

## UI/UX del Modal

### Apariencia
- Fullscreen overlay con fondo oscuro (#000000/cc)
- Borde pixel (#00E5FF) estilo既存
- Botón cerrar(X) en esquina superior derecha
- Header compacto con título del proyecto
- Iframe escalado para adaptarse

### Interacciones
- Click fuera del modal → cerrar
- Tecla Escape → cerrar
- Scroll permitido dentro del iframe

---

## Integración con proyectos existentes

### Actualizar estructura de datos

```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  year: string;
  technologies: string[];
  thumbnail: string;    // Nueva: imagen preview
  demoUrl: string;     // Nueva: ruta al HTML
  hasDemo: boolean;   // Nueva: indicador
}
```

### Nuevo proyecto ("Prototipo Landing")
- `thumbnail`: `/projects/proyecto-a-large.webp`
- `demoUrl`: `/demos/prototipo-landing/index.html`
- `hasDemo`: true

---

## Archivos a crear/modificar

| Archivo | Acción |
|---------|--------|
| `src/components/ProjectCard.tsx` | Crear (React) |
| `src/components/ProjectModal.tsx` | Crear (React) |
| `src/components/LoadingSpinner.tsx` | Crear (React) |
| `src/pages/proyectos.astro` | Modificar (integrar React) |
| `public/demos/` | Nueva carpeta (mover HTML) |
| `package.json` | Agregar React |

---

## Carga de assets (mover HTML)

1. Mover `myresources/landing-proyecto.html` → `public/demos/prototipo-landing/index.html`
2. Ajustar rutas internas si es necesario
3. Copiar recursos (CSS, JS, imágenes) si hay

---

## Critérios de éxito

- [ ] Modal abre al hacer clic en Live Preview
- [ ] Loading spinner visible mientras carga
- [ ] Demo interactiva funciona correctamente
- [ ] Modal cierra con X, click fuera, o Escape
- [ ] Sin errores en consola
- [ ] Build compila sin errores

---

## Scope (fuera)

- Múltiples proyectos (futuro)
- Carrusel de imágenes (ya implementado)
- Transiciones animadas (futuro)