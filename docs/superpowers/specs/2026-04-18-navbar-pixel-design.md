# Navbar Pixel - Diseño

## Overview
Refactorización del navbar actual manteniendo estilo pixelado/retro pero incorporando layout de specs.

## Layout

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ [Logo] Inicio  Proyectos   Sobre Mi   Stack   [         Buscar 🔍     ] │
└──────────────────────────────────────────────────────────────────────────────┘
```

- **Izquierda**: Logo + "ALECDEV"
- **Centro**: Inicio, Proyectos, Sobre Mi, Stack (horizontal centered)
- **Derecha**: Input buscar + icono 🔍

## Especificaciones

### Posicionamiento
- Position: **sticky top** (no absolute)
- z-index: 50

### Estilos (mantiene estilo pixelado actual)
- Fondo: black (#000000)
- Borde: 2px solid cyan (#00E5FF)
- Box-shadow: 4px 4px 0 #00E5FF
- Border-radius: 2px

### Colores
- Texto inactivo: white (#FFFFFF)
- Texto hover: amber (#FFE500)
- Activo (underline): cyan (#00E5FF), 3px

### Tipografía
- Font: pixel (mantiene actual)
- Tamaño: text-xs (10px) mobile, text-sm (14px) desktop

### Interacciones
- Hover en links: scale(1.05) + color amber
- Link activo: underline 3px cyan

### Buscador
- Input funcional: busca proyectos por nombre
- Icono 🔍 dentro del input
- Fondo: black, borde 1px cyan

### Responsive (< 768px)
- Layout: hamburger menu
- Logo + hamburger menu (derecha)
- Menu desplegable con todos los items + buscador

## Links
| Label | Href |
|-------|------|
| Inicio | / |
| Proyectos | /proyectos |
| Sobre Mi | #sobre-mi |
| Stack | #stack |

## Stack Tecnológico (nueva sección)
- Ubicación: Después de "Sobre Mi" en homepage
- Tecnologías: HTML → CSS (Tailwind) → JS → React → Astro
- Estilo: bordes pixelados, iconos pixelados
- Descripción: breve y concisa por cada tecnología